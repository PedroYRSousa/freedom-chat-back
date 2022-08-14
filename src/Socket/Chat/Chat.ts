export interface Content {
  author: String
  content: String
}

export default class Chat {
  private static __instance: Chat

  private chats: { [id: string]: Content[] } = {}

  private constructor () { }

  public static getInstance (): Chat {
    if (Chat.__instance === undefined) { Chat.__instance = new Chat() }

    return Chat.__instance
  }

  public static getChat (primaryId: string, secondaryId: string): Content[] {
    const keyPrimary = primaryId + secondaryId
    const keySecondary = secondaryId + primaryId

    const _instance = Chat.getInstance()

    if (_instance.chats[keySecondary] !== undefined) { return (_instance.chats[keySecondary]) }

    if (_instance.chats[keyPrimary] === undefined) { _instance.chats[keyPrimary] = [] }

    return (_instance.chats[keyPrimary])
  }

  public static addMessage (primaryId: string, secondaryId: string, message: string): void {
    const chat = Chat.getChat(primaryId, secondaryId)
    chat.push({ author: primaryId, content: message })
  }

  public static removeChat (primaryId: string): void {
    const _instance = Chat.getInstance()

    for (const key in _instance.chats) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      if (key.includes(primaryId)) { delete _instance.chats[key] }
    }
  }
}
