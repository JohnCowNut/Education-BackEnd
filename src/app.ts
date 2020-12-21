import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import Express, { Request, NextFunction } from "express";
import RouterUser from "./routes/User";
import RouterCourse from "./routes/Course";

import GlobalError from "./controllers/Error";
import AppError from "./utils/AppError";
import fs from 'fs'
const app = Express();
let data2 = JSON.parse(fs.readFileSync(`./data.json`, { encoding: 'utf-8' }))
console.log(data2.data)
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1/user", RouterUser);
app.use("/api/v1/course", RouterCourse);

app.all("*", (req: Request, _, next: NextFunction) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'failed';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(GlobalError);
export default app;
