import App from '@App/app'
import Server from '@Server/server'
import Socket from '@Socket/socket'

const app = App()
const server = Server(app)
Socket(server)
