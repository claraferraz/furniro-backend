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
export interface TagsDTO {
  id: number;
  name: string;
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
      include: {
        images: {
          select: {
            url: true,
          },
        },
        ProductDetails: true,
        ProductTags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return product;
  }

  async getProductDetails(id: number) {
    const product = await this.prisma.productDetails.findFirst({
      where: {
        detailId: id,
      },
      include: {
        product: true,
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

    const { images, tags, ...product } = payload;

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

    await this.prisma.productTags.createMany({
      data: tags.map((tagIds) => {
        return {
          productId: createdProduct.id,
          tagId: tagIds,
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
        ProductTags: {
          select: {
            id: true,
            tagId: true,
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

  async registerTags(payload: TagsDTO): Promise<TagsDTO> {
    const existingTag = await this.prisma.tags.findFirst({
      where: {
        name: payload.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (existingTag) {
      throw new Error('Tag already exists');
    }

    return await this.prisma.tags.create({
      data: {
        name: payload.name,
      },
    });
  }

  async getProductsList(
    order: string | undefined,
    page: number = 0,
    offset: number = 16,
  ) {
    Number.isNaN(page) ? (page = 1) : (page = page);
    Number.isNaN(offset) ? (offset = 16) : (offset = offset);

    const total = await this.prisma.product.count();

    let productList;
    switch (order) {
      case 'AlphaAsc':
        productList = await this.prisma.product.findMany({
          skip: (page - 1) * offset,
          take: offset,
          orderBy: {
            title: 'asc',
          },
          include: {
            images: {
              select: {
                url: true,
              },
            },
            ProductDetails: true,
          },
        });
        break;
      case 'AlphaDesc':
        productList = await this.prisma.product.findMany({
          skip: (page - 1) * offset,
          take: offset,
          orderBy: {
            title: 'desc',
          },
          include: {
            images: {
              select: {
                url: true,
              },
            },
            ProductDetails: true,
          },
        });
        break;
      case 'PriceAsc':
        productList = await this.prisma.product.findMany({
          skip: (page - 1) * offset,
          take: offset,
          orderBy: {
            price: 'asc',
          },
          include: {
            images: {
              select: {
                url: true,
              },
            },
            ProductDetails: true,
          },
        });
        break;
      case 'PriceDesc':
        productList = await this.prisma.product.findMany({
          skip: (page - 1) * offset,
          take: offset,
          orderBy: {
            price: 'desc',
          },
          include: {
            images: {
              select: {
                url: true,
              },
            },
            ProductDetails: true,
          },
        });
        break;
      default:
        productList = await this.prisma.product.findMany({
          skip: (page - 1) * offset,
          take: offset,
          include: {
            images: {
              select: {
                url: true,
              },
            },
            ProductDetails: true,
          },
        });
        break;
    }

    return {
      total: total,
      productList: productList,
    };
  }
}
