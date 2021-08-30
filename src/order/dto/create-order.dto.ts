import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  products: { productId: number; quantity: number }[];

  @ApiProperty()
  clientId: number;
}
