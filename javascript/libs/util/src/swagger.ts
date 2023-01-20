import { OpenAPIObject } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Logger } from '@nestjs/common';

export async function writeSwaggerToFile(
  document: OpenAPIObject,
  fileName: string,
) {
  const logger = new Logger('Swagger');
  const path = join(__dirname, `../../../../openapi/${fileName}`);
  try {
    await writeFile(path, JSON.stringify(document));
    logger.log(`Successfully wrote Open API Spec to ${path}`);
  } catch (error) {
    // Eat error
    logger.warn(error);
  }
}
