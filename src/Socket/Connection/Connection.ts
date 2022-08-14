import { Socket } from "socket.io";
import Chat from "../Chat/Chat";
import MySocket from "../MySocket/MySocket";

export default class Connection extends MySocket {
    private static countConnectionsInstance = 0;
    private static connectionsInstance: { [id: string]: Connection } = {};

    private contactSelected: string = "";

    constructor(socket: Socket) {
        super(socket);

        this.log("connected");

        this.on('askChat');
        this.on('addMessage');
        this.on('disconnect');
        this.on('getContacts');

        Connection.addInstance(this);
    }

    public static connection(socket: Socket) {
        new Connection(socket);
    }

    public get ContactSelected() { return this.contactSelected; }

    private askChat(body: any) {
        const { contactId } = body;

        if (!Connection.connectionsInstance[contactId])
            return;

        const chat = Chat.getChat(this.Id, contactId);

        this.contactSelected = contactId;
        this.emit('getChat', { chat });
    }

    private addMessage(body: any) {
        const { contactId, message } = body;

        if (!Connection.connectionsInstance[contactId])
            return;

        Chat.addMessage(this.Id, contactId, message);

        const chat = Chat.getChat(this.Id, contactId);

        if (Connection.connectionsInstance[contactId].ContactSelected === this.Id)
            Connection.connectionsInstance[contactId].emit('getChat', { chat });
        else
            Connection.connectionsInstance[contactId].emit('alertNewContentChat', { contactId: this.Id });

        this.emit('getChat', { chat });
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
        Chat.removeChat(instance.Id);
        instance.broadcast('removeContact', { contact: instance.Id });
    }

    private static addInstance(instance: Connection) {
        Connection.connectionsInstance[instance.Id] = instance;
        Connection.countConnectionsInstance++;
        instance.broadcast('addContact', { contact: instance.Id });
    }
}
