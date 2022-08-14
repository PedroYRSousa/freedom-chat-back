import http from 'http'
import { Server } from 'socket.io'
import Connection from '@Socket/Connection/Connection'

export default (server: http.Server): Server => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', Connection.connection)

  return (io)
}
