import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeSwaggerToFile } from '@sethtomy/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await bootstrapOpenApi(app);
  await app.listen(3002);
}

async function bootstrapOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription(
      'A service for the mapping from Discord Users to Riot Summoners.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  await writeSwaggerToFile(document, 'user-api.json');
  SwaggerModule.setup('api', app, document);
}

bootstrap();
