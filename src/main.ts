import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
   { whitelist : true} //  filter out properties that should not be received by the method handler.
  ));
  await app.listen(3000);
}
bootstrap();
