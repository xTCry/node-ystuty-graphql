import { Server } from './lib/server';

(async () => {
    const server = new Server(4000);
    server.Start();
})();
