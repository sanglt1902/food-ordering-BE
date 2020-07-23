import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { logger } from './logger';
import { customAuthChecker } from './auth/CustomAuthChecker';
import { Sequelize } from 'sequelize-typescript';


export const sequelize = new Sequelize({
    database: 'diemtamaty',
    dialect: 'postgres',
    username: 'leclevn',
    password: 'leclevn',
    models: [__dirname + '/models/entities'],
});

dotenv.config();
const main = async () => {

    // Uncomment force: true to reset DB
    // await sequelize.sync({
    //     force: true,
    // });

    const schema = await buildSchema({
        authChecker: customAuthChecker,
        emitSchemaFile: path.resolve(__dirname, '..', 'schema', 'schema.gql'),
        // .js instead of .ts because ts will transpile into js
        resolvers: process.env.NODE_ENV === 'production' ? [`${__dirname}/modules/*/*.resolver.js`] : [`${__dirname}/modules/*/*.resolver.ts`],
    });
    const app = express();
    app.use('*', cors());
    app.use(compression());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(
        process.env.app_GRAPHQL_PATH || '/graphql',
        expressJwt({
            credentialsRequired: false,
            secret: process.env.app_CRYPTO_KEY!,
        }),
    );
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    const server = new ApolloServer({
        context: ({ req }: any) => {
            const context = {
                req,
                user: req.user, // `req.user` comes from `express-jwt`
            };
            return context;
        },
        validationRules: [depthLimit(7)],
        introspection: true,
        playground: true,
        schema,
    });

    server.applyMiddleware({ app, path: process.env.app_GRAPHQL_PATH });

    const httpServer = createServer(app);
    logger.info(app.settings.env, '---------- app setting evn ----------');
    httpServer.listen(
        { port: process.env.PORT || 3000 },
        (): void => logger.info(`\n🚀      GraphQL is now running on http://localhost:3000${process.env.app_GRAPHQL_PATH}`));
}

main();
