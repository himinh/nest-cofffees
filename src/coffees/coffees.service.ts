import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import {
  CoffeeResponseDto,
  CreateCoffeeDto,
  FindCoffeeDto,
  UpdateCoffeeDto,
} from './dto/coffees.dto'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavor.entity'
import { Event } from 'src/events/entities/event.entity'

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,

    private readonly connection: Connection,
  ) {}

  getCoffees(paginationQuery: PaginationQueryDto): Promise<FindCoffeeDto[]> {
    const { limit, offset } = paginationQuery
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    })
  }

  async getCoffee(id: number): Promise<FindCoffeeDto> {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    })
    if (!coffee) throw new NotFoundException(`Coffee ${id} not found.`)
    return coffee
  }

  async createCoffee(
    createCoffeeDto: CreateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    )
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    })

    return this.coffeeRepository.save(coffee)
  }

  async updateCoffee(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    )
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    })

    if (!coffee) throw new NotFoundException(`Coffee ${id} not found`)
    return this.coffeeRepository.save(coffee)
  }

  async deleteCoffee(id: number): Promise<CoffeeResponseDto> {
    const coffee = await this.coffeeRepository.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ name })
    if (flavor) return flavor
    return this.flavorRepository.create({ name })
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      coffee.recommendations++

      const recommendEvent = new Event()
      recommendEvent.name = 'recommend_coffee'
      recommendEvent.type = 'coffee'
      recommendEvent.payload = { coffee: coffee.id }

      await queryRunner.manager.save(coffee)
      await queryRunner.manager.save(recommendEvent)

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}
