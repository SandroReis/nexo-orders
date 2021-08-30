import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column()
  status: string;
}
