import http from 'http';
import { Server } from "socket.io";

export default (server: http.Server): Server => {
    const io = new Server(server);

    io.on('connection', (socket: any) => {
        console.log('a user connected');
    });

    return (io);
}
