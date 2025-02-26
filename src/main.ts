import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unvalidated properties
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are sent
      transform: true, // Automatically transform payloads to DTO classes
    }),
  );

  app.useGlobalInterceptors(app.get<ResponseInterceptor>(ResponseInterceptor));

  setupSwagger(app);

  // cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace with your frontend origin
    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:10809',
      'http://blackfriday.ex.pro',
      'https://blackfriday.ex.pro',
      'http://mystery.ex.pro',
      'https://mystery.ex.pro',
      'http://linchpin.ex.pro',
      'https://linchpin.ex.pro',
      'http://token.ex.pro',
      'https://token.ex.pro',
      'http://crossfunding.ex.pro',
      'https://crossfunding.ex.pro',
      'https://7694-31-25-92-200.ngrok-free.app',
      'http://127.0.0.1:40410',
      'http://localhost:51664',
    ], // Replace with your frontend origin
    // origin: [/\.ex\.pro$/],
    credentials: true, // Allow cookies to be sent
    // allowedHeaders: '*',
    // methods: '*',
  });

  await app.listen(configService.get('PORT') ?? 3000);

}
bootstrap();
