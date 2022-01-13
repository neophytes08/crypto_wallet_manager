import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as helmet from 'helmet';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { json, raw } from 'body-parser';

// const initCors = () => {
//   const validateOrigin = (origin, next) => {
//     if (process.env.NODE_ENV === EnvType.PROD) {
//       next(null, true);
//     } else if (process.env.NODE_ENV === EnvType.UAT) {
//       next(null, true);
//     } else if (process.env.NODE_ENV === EnvType.QA) {
//       next(null, true);
//     } else if (process.env.NODE_ENV === EnvType.DEV) {
//       next(null, true);
//     } else {
//       next(null, true);
//     }
//   };

//   return { origin: validateOrigin, credentials: true };
// };

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.set('trust proxy', true);
  // app.enableCors(initCors());
  // app.use(initHelmet());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.use(json());
  app.use(raw({ type: ['application/xml', 'text/xml'] }));

  await app.listen(process.env.PORT);
}
bootstrap();
