import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
@Module({
  imports: [CoffeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
