import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { SaleModule } from './sale';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [UserModule, AuthModule, SaleModule, CategoryModule],
  exports: [UserModule, AuthModule, SaleModule, CategoryModule],
})
export class FeaturesModule {}
