import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development')
        .description('The application environment'),

    PORT: Joi.number()
        .default(3000)
        .description('The port the application will run on'),

    DATABASE_HOST: Joi.string()
        .required()
        .description('Database host address'),

    DATABASE_PORT: Joi.number()
        .port()
        .default(5432)
        .description('Database port'),

    DATABASE_USERNAME: Joi.string()
        .required()
        .description('Database username'),

    DATABASE_PASSWORD: Joi.string()
        .required()
        .description('Database password'),

    DATABASE_NAME: Joi.string()
        .required()
        .description('Database name'),

    JWT_SECRET: Joi.string()
        .required()
        .description('Secret key for JWT authentication'),

    REFRESH_SECRET: Joi.string()
        .required()
        .description('Secret key for Refresh authentication'),

    FALLBACK_LANGUAGE: Joi.string()
        .required()
        .description('Fallback language like en'),
});
