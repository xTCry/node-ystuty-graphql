import express, { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import log from 'signale';
import Boom from '@hapi/boom';

import router from '../routers';

export class App {
    public appInstance: Application;

    constructor() {
        this.appInstance = express();

        this.appInstance.disable('x-powered-by');
        this.appInstance.use(morgan('dev'));
        this.appInstance.use(cors());
    }

    public init() {
        // Support application/json type post data
        this.appInstance.use(json());

        // Support application/x-www-form-urlencoded post data
        this.appInstance.use(urlencoded({ extended: false }));

        this.appInstance.use('/', router);

        // Default 404
        this.appInstance.use((_req, _res, next) => {
            next(Boom.notFound());
        });

        // Error handler
        this.appInstance.use((error: any, _req: Request, res: Response, _next: NextFunction): void => {
            log.watch(error.toString());

            if (res.headersSent) {
                console.error(error);
                res.end();
                return;
            }

            if (error.statusCode) {
                res.status(error.statusCode).json(error);
                return;
            }

            const errorMessage = error.message || 'An internal server error occurred';
            const defaultError = Boom.badImplementation(errorMessage);
            const { statusCode, payload } = error.isBoom ? error.output : defaultError.output;
            
            res.status(error.statusCode || statusCode);
            res.format({
                plain() {
                    res.send(errorMessage);
                },

                html() {
                    res.send(`<h1>Error</h1><p>${errorMessage}</p>`);
                },

                json() {
                    res.send(payload);
                },

                default() {
                    res.status(406).send('Not Acceptable');
                },
            });
        });
    }
}
