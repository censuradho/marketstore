import { Module } from '@nestjs/common';
import { UserModule } from './user';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class FeaturesModule {}
