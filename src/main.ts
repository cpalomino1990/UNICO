import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
 
  const config = new DocumentBuilder()
    .setTitle('Olytu')
    .setDescription('Olytu API description')
    .setVersion('1.0')
    .addTag('Olytu')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe());  // 👈 Validacion global//
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
