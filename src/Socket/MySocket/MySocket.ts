import log from '@Log/Log'
import { Socket } from 'socket.io'

export default class MySocket {
  private readonly socket: Socket

  constructor (socket: Socket) {
    this.socket = socket
  }

  public get Id (): string { return (this.socket.id) };
  public get Socket (): Socket { return (this.socket) };

  protected on (label: string): void {
    this.Socket.on(label, (body) => {
      if (label !== 'disconnect') { this.log(`on ${label}`) }

      if ((this as MySocket)[label] === undefined) { return }

      (this as any)[label](body)
    })
  }

  protected emit (label: string, args: any): void {
    this.log(`emit ${label}`)

    this.Socket.emit(label, args)
  }

  protected broadcast (label: string, args: any): void {
    this.log(`broadcast ${label}`)

    this.Socket.broadcast.emit(label, args)
  }

  protected log (message: string): void {
    log(`${this.Id} ${message}`)
  }
}
