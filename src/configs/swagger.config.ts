import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('CyberAid')
    .setDescription('An online donation platform')
    .setVersion('1.0')
    .build();

export const startSwagger = (app: INestApplication) => {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('cyberaid', app, document);
};