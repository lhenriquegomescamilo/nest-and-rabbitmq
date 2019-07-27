import { Module } from '@nestjs/common';
import { RabbitMqSenderService } from './rabbit-mq-sender.service';
import { RabbitMqWorkerService } from './rabbit-mq-worker.service';

@Module({
  providers: [RabbitMqSenderService, RabbitMqWorkerService],
  exports: [RabbitMqSenderService],
})
export class RabbitMqModule {
}
