import { ApolloServerExpressConfig, ApolloServer, AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { get } from 'lodash';
import schema from '../graphql/schema';
import { Server } from './server';

const PLAYGROUND_ENABLED = process.env.PLAYGROUND_ENABLED === 'true';

const ValidateToken = async (str: string) => {
    // decode JWT
    return {
        data: {
            username: 'TEST',
        },
    };
}

const createApolloServer = (server: Server, config?: ApolloServerExpressConfig): ApolloServer => {
    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req }: { req: Request }) => {
            if (!req) {
                return;
            }

            // Allow GraphQL playground on localhost
            const originUrl: string = `localhost:${server.port}${req.baseUrl}`;
            const reg: RegExp = new RegExp(`${originUrl}$`, 'gi');
            const isLocalPlayground: boolean = reg.test(String(req.headers.referer));

            if (PLAYGROUND_ENABLED && !isLocalPlayground) {
                const username = get(req, 'headers.username');

                if (!username) {
                    throw new AuthenticationError('you must be logged in');
                }

                return {
                    userData: {
                        data: {
                            username,
                        },
                    },
                };
            }

            const authorization: string = String(req.headers.authorization) || '';
            const token: string = authorization.replace('Bearer ', '');
            
            let userData;
            try {
                userData = await ValidateToken(token);
            } catch (err) {
                console.log('Error:', err.message);
                throw new AuthenticationError('you must be logged in');
            }

            return { userData };
        },
        subscriptions: {
            onConnect: () => console.log('Connected to websocket'),
        },
        playground: PLAYGROUND_ENABLED,
        // introspection: PLAYGROUND_ENABLED,
        // tracing: PLAYGROUND_ENABLED,
        debug: false,
        ...config,
    });

    apolloServer.applyMiddleware({
        app: server.expressApp.appInstance,
        path: '/graphql',
    });

    return apolloServer;
};

export default createApolloServer;
