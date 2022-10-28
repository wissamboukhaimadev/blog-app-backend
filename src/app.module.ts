import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaLogicModule } from './prisma-logic/prisma-logic.module';

@Module({
  imports: [AuthModule, CommentsModule, PrismaLogicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
