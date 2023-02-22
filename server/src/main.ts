import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BalinkSeats API')
    .setDescription('API for the Balink company seats reservation system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Swagger - BalinkSeats API',
    swaggerOptions: {
      operationsSorter: (a, b) => {
        const methodsOrder = ['get', 'post', 'put', 'delete'];
        return (
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'))
        );
      },
    },
  });

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(PORT || 3000);
}
bootstrap();
