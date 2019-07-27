import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MessageDto } from '../dto/message-dto';

@Injectable()
export class RabbitMqSenderService {

  private static readonly assertQueueOptions = { durable: true };
  private static readonly sendToQueueOptions = { persistent: true };

  sendMessage(message: MessageDto) {
    return this._sendHardTaskToQueue(process.env.RABBITMQ_CONNECTION_URL, message);
  }

  private _sendHardTaskToQueue(uri: string, message: MessageDto) {
    return amqp.connect(uri)
      .then(connection => connection.createChannel())
      .then(channel => this._assertAndSendToQueue(channel, message));
  }

  private _assertAndSendToQueue(channel: any, message: MessageDto) {
    const bufferedData = Buffer.from(message.message);
    return channel
      .assertQueue(process.env.QUEUE_DEFAULT, RabbitMqSenderService.assertQueueOptions)
      .then(() => channel.sendToQueue('worker_queue', bufferedData, RabbitMqSenderService.sendToQueueOptions))
      .then(() => channel.close());

  }
}
