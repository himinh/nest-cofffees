import { IsString, IsNumber } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { Flavor } from '../entities/flavor.entity'
export class FindCoffeeDto {
  @IsNumber()
  readonly id: number

  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({ each: true })
  readonly flavors: Flavor[]
}

export class CreateCoffeeDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({ each: true })
  readonly flavors: string[]
}

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

export class CoffeeResponseDto extends PartialType(FindCoffeeDto) {}
