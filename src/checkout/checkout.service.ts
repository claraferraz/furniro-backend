import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShippingDTO } from './shippingDTO';
import { CartDTO } from './cartDTO';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  async createCartOrder(payload: CartDTO, user) {
    const createdOrder = await this.prisma.order.create({
      data: {
        userId: user.id,
      },
    });

    await this.prisma.orderProduct.createMany({
      data: payload.products.map(({ productId, detailsId, amount }) => {
        return {
          productId: productId,
          productDetails: detailsId,
          amount: amount,
          orderId: createdOrder.id,
        };
      }),
    });

    //calc prices
    const order = await this.prisma.order.findFirst({
      where: {
        id: createdOrder.id,
      },
      include: {
        products: {
          select: {
            id: true,
            productId: true,
            productDetails: true,
            amount: true,
          },
        },
      },
    });

    const getCartPrices = async () => {
      const products = await this.prisma.product.findMany({
        where: {
          id: {
            in: order.products.map((orderProduct) => orderProduct.productId),
          },
        },
      });

      const pricesByProductId: Record<string, number> = {};

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const discount = (100 - product.discount) / 100;
        const productPrice = parseFloat(product.price.toFixed(2));

        pricesByProductId[product.id] = discount * productPrice;
      }

      return pricesByProductId;
    };

    const getStock = async () => {
      const productDetails = await this.prisma.productDetails.findMany({
        where: {
          detailId: {
            in: order.products.map(
              (orderProduct) => orderProduct.productDetails,
            ),
          },
        },
      });

      const detailsByProductId: Record<
        string,
        { stock: number; amount: number }
      > = {};

      for (let i = 0; i < productDetails.length; i++) {
        const detail = productDetails[i];
        const stock = detail.stock;
        const amount =
          order.products.find((orderProduct) => {
            return orderProduct.productId === detail.productId;
          })?.amount || null;

        const sku = `${detail.productId}${detail.detailId}`;

        if (amount === null) {
          throw new HttpException(
            `product ${sku} was not found in the order`,
            HttpStatus.BAD_REQUEST,
          );
        }

        if (amount > stock) {
          throw new HttpException(
            `product ${sku} doesn't have enough stock available`,
            HttpStatus.BAD_REQUEST,
          );
        }

        detailsByProductId[detail.productId] = {
          stock,
          amount,
        };
      }

      return detailsByProductId;
    };

    const calcTotal = async () => {
      const [prices, stock] = await Promise.all([getCartPrices(), getStock()]);

      const productIds = Object.keys(prices);
      let total = 0;

      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const amount = stock[productId].amount;
        total += prices[productId] * amount;
      }

      return total;
    };

    const totalValue = await calcTotal();

    await this.prisma.order.delete({
      where: {
        id: createdOrder.id,
      },
    });

    await this.prisma.order.update({
      where: {
        id: createdOrder.id,
      },
      data: {
        total: totalValue,
      },
    });

    return this.prisma.order.findFirst({
      where: {
        id: createdOrder.id,
      },
      include: {
        products: true,
      },
    });
  }

  async registerShippingOrder(payload: ShippingDTO, user, orderId: string) {
    const [firstName, ...lastName] = user.username.split(' ');

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        products: {
          select: {
            id: true,
            productId: true,
            productDetails: true,
            amount: true,
            product: {
              select: {
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!order.total || parseFloat(order.total.toFixed(2)) <= 0) {
      throw new HttpException(`order total not valid`, HttpStatus.BAD_REQUEST);
    }

    const updateStock = async () => {
      const productsList = order.products.map((p) => {
        if (p.amount > p.product.stock) {
          throw new HttpException(
            `${p.productId}${p.productDetails} amount not valid`,
            HttpStatus.BAD_REQUEST,
          );
        }
        return {
          sku: {
            productId: p.productId,
            detailId: p.productDetails,
          },
          amount: p.amount,
          stock: p.product.stock,
        };
      });

      for (let i = 0; i < productsList.length; i++) {
        await this.prisma.productDetails.update({
          where: {
            sku: productsList[i].sku,
          },
          data: {
            stock: {
              decrement: productsList[i].amount,
            },
          },
        });
      }
    };

    updateStock();

    const createdShippingOrder = await this.prisma.shipping.create({
      data: {
        userFirstName: firstName,
        userLastName: lastName.join(' '),
        email: user.email,
        companyName: payload.companyName,
        zipCode: payload.zipCode,
        region: payload.region,
        address: payload.address,
        city: payload.city,
        province: payload.province,
        addOnAddress: payload.addOnAddress,
        Information: payload.information,
      },
      select: {
        id: true,
      },
    });

    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        shippingId: createdShippingOrder.id,
      },
    });
    return await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        products: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                stock: true,
              },
            },
          },
        },
        shipping: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}
