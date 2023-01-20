import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { writeSwaggerToFile } from '@sethtomy/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await bootstrapOpenApi(app);
  await app.listen(3001);
}

async function bootstrapOpenApi(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Riot Proxy API')
    .setDescription('A proxy service for the Riot API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  await writeSwaggerToFile(document, 'riot-proxy-api.json');
  SwaggerModule.setup('api', app, document);
}

bootstrap();
