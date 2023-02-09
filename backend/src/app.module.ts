import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { FeaturesModule } from './features';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';


@Module({
  imports: [FeaturesModule],
  controllers: [AppController],
  providers: [PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
