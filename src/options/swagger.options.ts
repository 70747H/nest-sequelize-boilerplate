import {DocumentBuilder} from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Justclean')
  .setDescription('The test API description')
  .setVersion('1.0')
  .addTag('test')
  .build();