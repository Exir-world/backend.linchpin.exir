import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Linchpin API')
        .setDescription('API documentation for Linchpin')
        .setVersion('1.0')
        .addBearerAuth()
        .addGlobalParameters(
            {
                name: 'Accept-Language',
                in: 'header',
                description: 'Language code for translations (e.g., en, fa)',
            },
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
}
