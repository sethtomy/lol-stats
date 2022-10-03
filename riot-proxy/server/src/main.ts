import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  bootstrapOpenApi(app);
  await app.listen(3001);
}

function bootstrapOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Riot Proxy Service')
    .setDescription('A proxy service for the Riot API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
