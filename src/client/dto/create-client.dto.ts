import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsAlphanumeric()
  name: string;
}
