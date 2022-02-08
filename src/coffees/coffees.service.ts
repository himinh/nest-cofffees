import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CoffeeResponseDto,
  CreateCoffeeDto,
  FindCoffeeDto,
  UpdateCoffeeDto,
} from './dto/coffees.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private conffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  getCoffees(): FindCoffeeDto[] {
    return this.conffees;
  }

  getCoffee(id: number): FindCoffeeDto {
    return this.conffees.find((cf) => cf.id === id);
  }

  createCoffee(coffee: CreateCoffeeDto): CoffeeResponseDto {
    return this.conffees[0];
  }

  updateCoffee(id: number, coffee: UpdateCoffeeDto): CoffeeResponseDto {
    const isCoffeeExists = this.conffees.some((cf) => cf.id === id);
    if (!isCoffeeExists) throw new NotFoundException('Not found coffee.');
    return this.conffees.find((cf) => cf.id === id);
  }

  deleteCoffee(id: number): CoffeeResponseDto {
    return this.conffees.find((cf) => cf.id === id);
  }
}
