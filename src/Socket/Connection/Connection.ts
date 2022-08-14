import { Socket } from "socket.io";
import MySocket from "../MySocket/MySocket";

export default class Connection extends MySocket {
    private static countConnectionsInstance = 0;
    private static connectionsInstance: { [id: string]: Connection } = {};

    constructor(socket: Socket) {
        super(socket);

        this.log("connected");

        this.on('disconnect');

        Connection.addInstance(this);
    }

    public static connection(socket: Socket) {
        new Connection(socket);
    }

    private disconnect() {
        this.log("disconnected");

        Connection.removeInstance(this);
    }

    private static removeInstance(instance: Connection) {
        delete Connection.connectionsInstance[instance.Id];
        Connection.countConnectionsInstance--;
    }

    private static addInstance(instance: Connection) {
        Connection.connectionsInstance[instance.Id] = instance;
        Connection.countConnectionsInstance++;
    }
}
