import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async isValidProduct(id: number, quantity: number): Promise<boolean> {
    const products = await this.productsRepository.findOne(id);
    if (!products) return false;

    const { currentQuantity } = products;
    if (!this.hasInventory(currentQuantity, quantity)) return false;

    return true;
  }

  hasInventory(currentQuantity: number, requestedQuantity: number) {
    if (currentQuantity <= 0) {
      return false;
    }

    if (currentQuantity < requestedQuantity) {
      return false;
    }

    return true;
  }

  async isAllProductsValid(
    products: { productId: number; quantity: number }[],
  ): Promise<boolean> {
    for (const product of products) {
      const { productId, quantity } = product;

      const isValidProduct = await this.isValidProduct(productId, quantity);
      if (!isValidProduct) return false;
    }

    return true;
  }
}
