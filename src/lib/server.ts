import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { Server as HTTPServer, createServer } from 'http';
import { App } from './app';
import createApolloServer from './apollo';

export class Server {
    public port: number;

    public expressApp!: App;
    public apolloServer!: ApolloServer;
    public serverInstance!: HTTPServer;

    constructor(port: number = 4000) {
        this.port = port;
        this.init();
    }

    private init() {
        this.expressApp = new App();
        this.apolloServer = createApolloServer(this, {});
        this.serverInstance = createServer(this.expressApp.appInstance);
        this.expressApp.init();

        this.apolloServer.installSubscriptionHandlers(this.serverInstance);
    }

    public Start() {
        if (!this.serverInstance) {
            console.error(`Server was not initialized`);
            return;
        }

        this.serverInstance.listen({ port: this.port }, () => {
            const addressInfo: any = this.serverInstance && this.serverInstance.address();
            const port: number = 'port' in addressInfo ? addressInfo.port : null;
            const address: string =
                'address' in addressInfo
                    ? addressInfo.address === '::'
                        ? 'http://localhost:'
                        : addressInfo.address
                    : '';

            console.log(`🚀  Server listening on ${address}${port}`);
            console.log(`🚀  GraphQL playground listening on ${address}${port}${this.apolloServer.graphqlPath}`);
            console.log(`🚀  Subscriptions ready at ws://localhost:${port}${this.apolloServer.subscriptionsPath}`);
        });
    }
}
