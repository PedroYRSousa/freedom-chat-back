export interface Content {
    author: String,
    content: String
}

export default class Chat {
    private static __instance: Chat;

    private chats: { [id: string]: Array<Content> } = {};

    private constructor() { }

    public static getInstance() {
        if (!Chat.__instance)
            Chat.__instance = new Chat();

        return Chat.__instance;
    }

    public static getChat(primaryId: string, secondaryId: string) {
        const key_1 = primaryId + secondaryId;
        const key_2 = secondaryId + primaryId;

        const _instance = Chat.getInstance();

        if (_instance.chats[key_2])
            return (_instance.chats[key_2]);

        if (!_instance.chats[key_1])
            _instance.chats[key_1] = [];

        return (_instance.chats[key_1]);
    }

    public static addMessage(primaryId: string, secondaryId: string, message: string) {
        const chat = Chat.getChat(primaryId, secondaryId);
        chat.push({ author: primaryId, content: message });
    }

    public static removeChat(primaryId: string) {
        const _instance = Chat.getInstance();

        for (var key in _instance.chats) {
            if (key.includes(primaryId))
                delete _instance.chats[key];
        }
    }
}
