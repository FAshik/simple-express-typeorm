import { environment } from "../enums/environment.enum";
import { Connection } from "typeorm";
import { TypeormConnect } from "../database/typeorm.connect";
import { env, typeorm } from "../config/server.config";

export class DBServer {

  connection: Connection;

  constructor() { }

  start(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      TypeormConnect.connect()
        .then((connection) => {
          this.connection = connection;
          if (env !== environment.test) {
            console.info(`Connection to database server established on port ${typeorm.port} (${env})`);
          }
          resolve(connection);
        })
        .catch((error) => {
          if (env !== environment.test) {
            console.log('error', `Database connection error : ${error.message}`);
          }
          reject(error.message)
        });
    });
  }
};