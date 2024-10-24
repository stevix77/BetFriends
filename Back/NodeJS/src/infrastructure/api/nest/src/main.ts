import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ApplicationExceptionFilter } from './filters/ApplicationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, 
                                                              new FastifyAdapter({logger: true})
                                                              );
  app.useGlobalFilters(new ApplicationExceptionFilter());
  await app.listen(3000);
}
bootstrap();
