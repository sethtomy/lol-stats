import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  bootstrapOpenApi(app);
  await app.listen(3002);
}

function bootstrapOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription(
      'A service for the mapping from Discord Users to Riot Summoners.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
