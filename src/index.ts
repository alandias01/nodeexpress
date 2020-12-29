import express from "express";
import mongoose from "mongoose";
import winston from "winston";

const timezoned = () => new Date().toLocaleString("en-US");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}

const app = express();

let connected = false;
let error = "";

logger.info("Node works");
logger.error("Test Error");

app.use((req, res, next) => {
  logger.info(req.originalUrl);
  next();
});

app.get("/api", (req, res) => {
  res.status(200).json({ status: "Success", connected, error });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ NonDefaultErrorHandler: err });
    logger.error(err);
  }
);

if (process.env.NODE_ENV === "production") {
  app.listen();
} else {
  app.listen(3000, () => {
    logger.info("Express Listening");
  });
}

const user = process.env.MONGOATLAS_USER;
const pw = process.env.MONGOATLAS_PASSWORD;
const db = process.env.MONGOATLAS_DB;
const mongoAtlasConnectionString = `mongodb+srv://${user}:${pw}@cluster0-yznr0.mongodb.net/${db}?retryWrites=true&w=majority`;
const connOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//logger.info(mongoAtlasConnectionString);

mongoose
  .connect(mongoAtlasConnectionString, connOptions)
  .then(() => {
    logger.info("Mongoose connected");
    connected = true;
  })
  .catch((err) => {
    error = err;
    logger.error(err);
  });
