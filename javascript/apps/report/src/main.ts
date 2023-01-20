import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeSwaggerToFile } from '@sethtomy/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Reports Service')
    .setDescription('A report generation service for the Riot API.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await writeSwaggerToFile(document, 'report-api.json');
  await app.listen(3003);
}

bootstrap();
