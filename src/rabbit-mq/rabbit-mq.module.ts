import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
}
