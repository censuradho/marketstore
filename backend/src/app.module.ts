import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { FeaturesModule } from './features';


@Module({
  imports: [FeaturesModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
