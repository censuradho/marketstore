import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
  imports: [UserModule, AuthModule],
  exports: [UserModule, AuthModule],
})
export class FeaturesModule {}
