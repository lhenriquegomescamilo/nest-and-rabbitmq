import { Injectable, Logger } from '@nestjs/common';
import * as ampq from 'amqplib';

@Injectable()
export class RabbitMqWorkerService {

  private readonly logger = new Logger('RabbitMqWorkerService');

  private static readonly assertQueueOptions = { durable: true };
  private static readonly consumeQueueOptions = { noAck: false };

  constructor() {
    this.listemToQueue();
  }

  listemToQueue() {
    return ampq
      .connect(process.env.RABBITMQ_CONNECTION_URL)
      .then(connection => connection.createChannel())
      .then(channel => this.assertAndConsumeQueue(channel));
  }

  private assertAndConsumeQueue(channel) {
    this.logger.log('Worker is running! Waiting for new messages...');
    // @ts-ignore
    const ackMessage = (message: any) => Promise.resolve(message)
      .then((msg: any) => {
        this.logger.log(`THE MESSSAGE IS ${msg.content.toString()}`);
        return message;
      })
      .then((msg: any) => channel.ack(msg));

    return channel.assertQueue(process.env.QUEUE_DEFAULT, RabbitMqWorkerService.assertQueueOptions)
      .then(() => channel.prefetch(1))
      .then(() => channel.consume(process.env.QUEUE_DEFAULT, ackMessage, RabbitMqWorkerService.consumeQueueOptions));
  }

}
