import express  from 'express'
import { Request,Response } from 'express'
import bodyParser from 'body-parser'
import { loadConfig } from './app/common/helper/config.helper'
import { IUser } from './app/user/user.dto'
import helmet from "helmet";
import morgan from 'morgan'
import errorHandler from './app/common/middleware/error-handler.middleware'
import router from './app/routes'
import cors from 'cors'
require('dotenv').config();


import http from 'http'
import { initPassport } from './app/common/services/passport-jwt.service'
import { setupSwagger } from './app/common/config/swagger.config'

loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> { }
    interface Request {
      user?: User;
    }
  }
}

const port = (process.env.PORT) ?? 5000;
console.log(process.env.JWT_REFRESH_SECRET)
const app = express();

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
setupSwagger(app);
const initApp = async (): Promise<void> => {
//   // init mongodb
//   await initDB();

  // passport init
  initPassport();

  // set base path to /api
  app.use("/api", router);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is runnuing on port", port);
  });
};

void initApp();