import express, { Application } from 'express';
import cors from 'cors';

import { dbConnection } from '../config/db';
import usersRoutes from './users/routes/users.routes';


export class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '12369';

        // Start methods
        this.connectDB();
        this.middlewares();
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }


    middlewares() {

        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use(this.apiPaths.users, usersRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });

    }

}