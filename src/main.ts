import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const PORT = 3000 || process.env.PORT;
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn'],
    });

    const config = new DocumentBuilder()
        .setTitle("Codica test task")
        .setDescription("Swagger docs")
        .addTag('vasilyev.yaroslavv@gmail.com')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Started listening port = ${PORT}`));
}

bootstrap();
