import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductRegisterDTO } from './productRegisterDTO';

export interface ProductRegisterResponse {
  id?: number;
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
}
