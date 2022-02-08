import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import {
  CoffeeResponseDto,
  CreateCoffeeDto,
  FindCoffeeDto,
  UpdateCoffeeDto,
} from './dto/coffees.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  getCoffees(@Query() paginationQuery): FindCoffeeDto[] {
    const { limit, offset } = paginationQuery;

    return this.coffeeService.getCoffees();
  }

  @Get(':id')
  getCoffee(@Param('id') id: number): FindCoffeeDto {
    return this.coffeeService.getCoffee(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body: CreateCoffeeDto): CoffeeResponseDto {
    return this.coffeeService.createCoffee(body);
  }

  @Patch('/:id')
  updateCoffee(
    @Param('id') id: number,
    @Body() body: UpdateCoffeeDto,
  ): CoffeeResponseDto {
    return this.coffeeService.updateCoffee(id, body);
  }

  @Delete('/:id')
  deleteCoffee(@Param('id') id: number): CoffeeResponseDto {
    return this.coffeeService.deleteCoffee(id);
  }
}
