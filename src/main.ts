import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { Logger } from '@nestjs/common';

const NODE_PORT = 3000;

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://localhost:5672`],
  //     queue: 'cats_queue',
  //     queueOptions: { durable: false },
  //   },
  // });
  // await app.startAllMicroservicesAsync();
  await app.listen(NODE_PORT);
  // @ts-ignore
  await Promise.resolve(logger.log(`
  Hello
  o               .        ___---___                    .
       .              .--\\        --.     .     .         .
                    ./.;_.\\     __/~ \\.
                   /;  / \`-'  __\\    . \\                            
 .        .       / ,--'     / .   .;   \\        |
                 | .|       /       __   |      -O-       .
                |__/    __ |  . ;   \\ | . |      |
                |      /  \\\\_    . ;| \\___|    
   .    o       |      \\  .~\\\\___,--'     |           .
                 |     | . ; ~~~~\\_    __|
    |             \\    \\   .  .  ; \\  /_/   .
   -O-        .    \\   /         . |  ~/                  .
    |    .          ~\\ \\   .      /  /~          o
  .                   ~--___ ; ___--~       
                 .          ---         .              - by - Camilo
  `));
  // @ts-ignore
  return Promise.resolve(logger.log(`Server running on port ${NODE_PORT}`));
}

// @ts-ignore
bootstrap();
