import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configOrm } from '../../orm.config'
import { CoffeesModule } from 'src/coffees/coffees.module'
@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(configOrm)],
  controllers: [],
  providers: [],
})
export class AppModule {}
