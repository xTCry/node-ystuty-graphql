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
        this._init();
    }

    private _init() {
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
        this.appInstance.use((err: any, req: Request, res: Response, _next: NextFunction): void => {
            log.watch(err.toString());

            if (err.statusCode) {
                res.status(err.statusCode).json(err);
                return;
            }

            if (err.isBoom) {
                const { statusCode, payload } = err.output;
                res.status(statusCode).json(payload);
                return;
            }

            const defaultError = Boom.badImplementation(err.message || 'An internal server error occurred');
            const { statusCode, payload } = defaultError.output;
            res.status(statusCode).json(payload);
        });
    }
}
