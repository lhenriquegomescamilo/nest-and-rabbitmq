import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';
import { MessageDto } from './dto/message-dto';

@Controller()
export class AppController {

  private readonly logger = new Logger('AppController');

  constructor(
    private readonly appService: AppService,
    private readonly rabbitMqService: RabbitMqService,
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendMessage(@Body() message: MessageDto) {
    this.logger.log(`Sending message ${message}`);
    return this.rabbitMqService.sendMessage(message);
  }
}
