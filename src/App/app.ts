import express, { Express } from 'express'

import Routes from './routes/routes'

export default (): Express => {
  const app = express()

  app.use(express.json())
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: false }))

  Routes(app)

  return (app)
}
