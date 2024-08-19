import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductRegisterDTO } from './productRegisterDTO';
import { ProductDetailsDTO } from './productDetailsDTO';

export interface ProductRegisterResponse {
  id?: number;
}
export interface ProductDetailsRegisterResponse {
  sku: {
    detailId: number;
    productId: number;
  };
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProductByTitle(title: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        title: title,
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        price: true,
        discount: true,
        new: true,
        category: true,
      },
    });

    return product;
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        price: true,
        discount: true,
        new: true,
        category: true,
      },
    });
    return product;
  }

  async registerBaseProduct(
    payload: ProductRegisterDTO,
  ): Promise<ProductRegisterResponse> {
    const existingProduct = await this.getProductByTitle(payload.title);

    if (existingProduct) {
      throw new BadRequestException('product already exists', {
        cause: new Error(),
        description: 'title already registered',
      });
    }

    const { images, ...product } = payload;

    const createdProduct = await this.prisma.product.create({
      data: product,
    });

    await this.prisma.productImages.createMany({
      data: images.map((imageUrl) => {
        return {
          productId: createdProduct.id,
          url: imageUrl,
        };
      }),
    });

    return await this.prisma.product.findFirst({
      where: {
        id: createdProduct.id,
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async registerProductDetails(payload: ProductDetailsDTO, productId: number) {
    const product = this.getProductById(productId);

    if (!product) {
      throw new BadRequestException("product doesn't exists", {
        cause: new Error(),
        description: 'id not registered',
      });
    }

    const createdDetails = await this.prisma.productDetails.create({
      data: {
        color: payload.color,
        size: payload.size,
        stock: payload.stock,
        productId: (await product).id,
      },
    });

    return {
      ...createdDetails,
      sku: `${createdDetails.productId}${createdDetails.detailId}`,
    };
  }
}
