import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  // handleMessage(client, data): void {} // client 직접적으로 사용하면 이렇게도 가능
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
