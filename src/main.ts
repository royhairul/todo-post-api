import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('TODO Post API')
    .setDescription('API for managing social media to-do list posts')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Menggunakan exception filter global untuk menangani error Zod
  app.useGlobalFilters(new ZodExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Menghapus field yang tidak didefinisikan dalam DTO
      forbidNonWhitelisted: true, // Menolak request jika ada field yang tidak sesuai
      transform: true, // Mengubah tipe data sesuai DTO (misalnya string ke number)
    }),
  );

  // logger Configuration
  const logger = app.get(WINSTON_MODULE_PROVIDER);
  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
