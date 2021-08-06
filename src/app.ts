import "reflect-metadata";
import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from './shared/infra/http/routes';
import  swaggerUi from 'swagger-ui-express';
import swaggerFile from "./swagger.json";

import createConnection from "./database"

import "./shared/container"
import instance from "tsyringe/dist/typings/dependency-container";
import { AppError } from "./errors/AppError";
import upload from "./config/upload";
import cors from "cors";
import rateLimiter from "./shared/infra/http/middlewares/rateLimiter";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

createConnection();

const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

app.use(express.json());
app.use(rateLimiter)

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));
app.use(cors());

app.use(Sentry.Handlers.errorHandler());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app }