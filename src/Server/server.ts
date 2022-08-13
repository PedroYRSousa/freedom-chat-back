import http from 'http';
import { Express } from 'express';

export default (app: Express): http.Server => {
    const server = http.createServer(app);

    server.listen(process.env.PORT || 3000, () => {
        console.log(`listening on *:${process.env.PORT || 3000}`);
    });

    return (server);
}
