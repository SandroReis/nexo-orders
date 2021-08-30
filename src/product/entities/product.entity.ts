import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  isActive: boolean;

  @Column()
  currentQuantity: number;
}
