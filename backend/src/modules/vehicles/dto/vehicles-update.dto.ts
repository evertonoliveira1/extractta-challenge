import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class VehicleUpdateDto {
  @IsString({
    message: 'O campo título não pode estar vazio e deve ser uma string',
  })
  @IsNotEmpty({ message: 'O campo título não pode estar vazio' })
  title: string;

  @IsString({
    message: 'O campo marca não pode estar vazio e deve ser uma string',
  })
  @IsNotEmpty({ message: 'O campo marca não pode estar vazio' })
  brand: string;

  @IsString({
    message:
      'O campo modelo do automóvel não pode estar vazio e deve ser uma string',
  })
  @IsNotEmpty({ message: 'O campo modelo do automóvel não pode estar vazio' })
  vehicleModel: string;

  @Type(() => Number)
  @IsInt({ message: 'O ano deve ser um número inteiro' })
  @Min(1886, { message: 'O ano deve ser maior ou igual a 1886' })
  @Max(new Date().getFullYear(), {
    message: `O ano deve ser menor ou igual ao ano atual (${new Date().getFullYear()}).`,
  })
  year: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0.1, { message: 'O preço deve ser maior que 0' })
  price: number;

  @IsString({ message: 'A placa do veículo deve ser uma string' })
  @IsNotEmpty({ message: 'A placa do veículo não pode estar vazia' })
  @Length(7, 7, {
    message: 'A placa do veículo deve ter exatamente 7 caracteres',
  })
  licensePlate: string;

  @IsString({ message: 'A cor deve ser uma string' })
  @IsNotEmpty({ message: 'A cor não pode estar vazia' })
  color: string;

  @IsString({ message: 'O RENAVAM deve ser uma string' })
  @IsNotEmpty({ message: 'O RENAVAM não pode estar vazio' })
  @Length(11, 11, {
    message: 'O RENAVAM deve ter exatamente 11 caracteres',
  })
  renavam: string;

  constructor(dto?: Partial<VehicleUpdateDto>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }
}
