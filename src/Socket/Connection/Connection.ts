import { Socket } from "socket.io";
import MySocket from "../MySocket/MySocket";

export default class Connection extends MySocket {
    private static countConnectionsInstance = 0;
    private static connectionsInstance: { [id: string]: Connection } = {};

    constructor(socket: Socket) {
        super(socket);

        this.log("connected");

        this.on('askChat');
        this.on('disconnect');
        this.on('getContacts');

        Connection.addInstance(this);
    }

    public static connection(socket: Socket) {
        new Connection(socket);
    }

    private askChat(body: any) {
        const { myId, contactId } = body;
    }

    private disconnect() {
        this.log("disconnected");

        Connection.removeInstance(this);
    }

    private getContacts() {
        var contacts: Array<string> = [];

        for (var id in Connection.connectionsInstance)
            if (id !== this.Id)
                contacts.push(id);

        this.emit('getContacts', { contacts });
    }

    private static removeInstance(instance: Connection) {
        delete Connection.connectionsInstance[instance.Id];
        Connection.countConnectionsInstance--;
        instance.broadcast('removeContact', { contact: instance.Id });
    }

    private static addInstance(instance: Connection) {
        Connection.connectionsInstance[instance.Id] = instance;
        Connection.countConnectionsInstance++;
        instance.broadcast('addContact', { contact: instance.Id });
    }
}
