import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  clientId: number;

  @ApiProperty()
  @Column()
  name: string;
}
