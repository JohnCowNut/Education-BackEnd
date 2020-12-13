require('dotenv').config();
import cors from 'cors';
import morgan from 'morgan';
import { Express, MongoDB } from '@shyn123/express-rest';
import UserController from './modules/Users&Auth/User.controller';
const MDW = [cors(), morgan('dev')]
const app = new Express({
  port: +process.env.PORT || 3000,
  middleWares: MDW,
  databaseConfigs:
    [
      {
        database: MongoDB,
        url: process.env.mongoURL
      }

    ],
  controllers: [
    new UserController(),
  ]
})

app.listen();