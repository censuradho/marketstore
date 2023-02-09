import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { SaleModule } from './sale';

@Module({
  imports: [UserModule, AuthModule, SaleModule],
  exports: [UserModule, AuthModule, SaleModule],
})
export class FeaturesModule {}
