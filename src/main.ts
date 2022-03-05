import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { join } from 'path';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { json, raw } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { EnvType } from '@core/enum';

const initCors = () => {
  const validateOrigin = (origin, next) => {
    if (process.env.NODE_ENV === EnvType.PROD) {
      next(null, true);
    } else if (process.env.NODE_ENV === EnvType.UAT) {
      next(null, true);
    } else if (process.env.NODE_ENV === EnvType.QA) {
      next(null, true);
    } else if (process.env.NODE_ENV === EnvType.DEV) {
      next(null, true);
    } else {
      next(null, true);
    }
  };

  return { origin: validateOrigin, credentials: true };
};

const initHelmet = () => {
  return helmet({
    referrerPolicy: { policy: 'no-referrer' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
};

const initSwagger = (app) => {
  const hideModel = process.env.SWAGGER_HIDE_MODELS === 'true' ? true : false;

  const options = new DocumentBuilder()
    .setTitle('Nomera API')
    .setVersion('1.0.0')
    .setDescription('Nomera API Documentation')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    ...(hideModel ? { swaggerOptions: { defaultModelsExpandDepth: -1 } } : {}),
  });
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/',
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.set('trust proxy', true);
  app.enableCors(initCors());
  app.use(initHelmet());
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

  const docsAuth = basicAuth({
    challenge: true,
    users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD },
  });

  app.use('/docs', docsAuth);
  app.use('/docs-json', docsAuth);

  initSwagger(app);
  await app.listen(process.env.PORT);
}
bootstrap();
