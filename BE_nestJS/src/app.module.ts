import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ChatGateway],
})
export class AppModule {}
