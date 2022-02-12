import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CoffeesService } from './coffees.service'
import {
  CoffeeResponseDto,
  CreateCoffeeDto,
  FindCoffeeDto,
  UpdateCoffeeDto,
} from './dto/coffees.dto'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  async getCoffees(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<FindCoffeeDto[]> {
    return await this.coffeeService.getCoffees(paginationQuery)
  }

  @Get(':id')
  getCoffee(@Param('id') id: number): Promise<FindCoffeeDto> {
    return this.coffeeService.getCoffee(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body: CreateCoffeeDto): Promise<CoffeeResponseDto> {
    return this.coffeeService.createCoffee(body)
  }

  @Patch('/:id')
  updateCoffee(
    @Param('id') id: number,
    @Body() body: UpdateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    return this.coffeeService.updateCoffee(id, body)
  }

  @Delete('/:id')
  deleteCoffee(@Param('id') id: number): Promise<CoffeeResponseDto> {
    return this.coffeeService.deleteCoffee(id)
  }
}
