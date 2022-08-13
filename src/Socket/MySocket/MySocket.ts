import Log from "../../Log/Log";
import { Socket } from "socket.io";

export default class MySocket {
    private id = "";
    private socket: Socket;

    constructor(socket: Socket) {
        this.id = socket.id;
        this.socket = socket;
    }

    public get Id() { return (this.id) };
    public get Socket() { return (this.socket) };

    protected on(label: string) {
        this.Socket.on(label, (body) => {
            if (label !== 'disconnect')
                this.log(`on ${label}`);

            if ((this as any)[label])
                (this as any)[label](body)
        });
    }

    protected emit(label: string, args: Array<any>) {
        this.log(`emit ${label}`);

        this.Socket.emit(label, args);
    }

    protected log(message: string) {
        Log.log(`${this.Id} ${message}`)
    }
}
