import * as Express from "express";
import { Server as HttpServer } from "http";
import { port as httpPort, env, contentType } from "../config/server.config";
import * as BodyParser from "body-parser";
import * as Compression from "compression";
import { AppsRoute } from "../routes/v1/apps.route";

export class HTTPServer {
    http: HttpServer;
    app: Express.Application;

    constructor() {
        this.app = Express();
        this.app.use(BodyParser.urlencoded({ extended: false })); //application/x-www-form-urlencoded
        this.app.use(BodyParser.json({ type: contentType })); //json with custom content-type
        this.app.use(Compression());
        this.app.use('/apps', new AppsRoute().router);
    }

    start(): void {
        try {
            const server = this.app;
            this.http = server.listen(httpPort, function () {
                console.log(`Server is now running on port ${httpPort} (${env})`);
            });
        } catch (error) {
            console.error(`Server creation error : ${error.message}`);
        }
    }
}