import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { SeleModule } from './sale';

@Module({
  imports: [UserModule, AuthModule, SeleModule],
  exports: [UserModule, AuthModule, SeleModule],
})
export class FeaturesModule {}
