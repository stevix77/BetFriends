import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ApplicationExceptionFilter } from './filters/ApplicationExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, 
                                                              new FastifyAdapter({logger: true})
                                                              );
  app.useGlobalFilters(new ApplicationExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('BetFriends')
    .setDescription('Api to make bets with your friends to win coins')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(3000);
}
bootstrap();
