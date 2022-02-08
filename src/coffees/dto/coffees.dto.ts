import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class FindCoffeeDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

export class CoffeeResponseDto extends PartialType(FindCoffeeDto) {}
