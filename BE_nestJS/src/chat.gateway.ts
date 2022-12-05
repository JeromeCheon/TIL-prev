import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log.apply(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  // handleMessage(client, data): void {} // client 직접적으로 사용하면 이렇게도 가능
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
