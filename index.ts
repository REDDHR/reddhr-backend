import "core-js/stable";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import sanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path, { dirname } from "path";
import AppError from "./utils/AppError.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config({ path: "./config.env" });

app.use(cookieParser());
app.use(compression());

app.use(helmet());
app.use(
  sanitize({
    allowDots: true,
    replaceWith: "_",
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  }),
);
app.use(hpp());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  },
);
app.use(morgan("dev", { stream: accessLogStream }));

app.use(
  express.json({
    limit: "1mb",
  }),
);

const whitelist = ["*"];
const corsOptions = {
  origin: function (origin: string, callback: (err, allow?: boolean) => void) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failure",
    message: `cannot find ${req.originalUrl} on the server`,
  });
});

const handleCastError = (error) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDuplicateFieldError = (err) => {
  const message = `${err.keyValue.email} already exist`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    if (el instanceof Error) {
      el.message;
    }
  });
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = "Invalid jwt";
  return new AppError(message, 401);
};

const handleExpirationalError = () =>
  new AppError("your jwt token has expired", 404);

app.use((err, req, res, next) => {
  let { ...error } = err;
  if (err.name === "CastError") error = handleCastError(error);
  if (err.code === 11000) error = handleDuplicateFieldError(error);
  if (err.name === "ValidationError") error = handleValidationError(error);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleExpirationalError();
  res.status(error.statusCode).json({
    status: error.status,
    message: error.msg,
  });
  next();
});

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_PROD_URL!
      : process.env.MONGODB_DEV_URL!,
  )
  .then((connection) => {
    console.log("connected to db");
  });

app.listen(8000, () => {
  console.log("server is up and running");
});
