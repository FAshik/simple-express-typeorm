import { createConnection, Connection, DatabaseType } from "typeorm";
import { typeorm } from "../config/server.config";

export class TypeormConnect {

  constructor() { }

  static async connect(): Promise<Connection> {
    let dbType;
    switch (typeorm.type) {
      case "mysql": dbType = "mysql"; break;
      case "postgres": dbType = "postgres"; break;
      default: dbType = "mysql";
    }
    
    return new Promise((resolve, reject) => {
      createConnection({
        type: dbType,
        name: typeorm.name,
        host: typeorm.host,
        port: parseInt(typeorm.port, 10),
        username: typeorm.user,
        password: typeorm.pwd,
        database: typeorm.database,
        entities: [`${__dirname}/entities/*{.js,.ts}`],
        synchronize: typeorm.sync,
        logging: false
      })
        .then((connection: Connection) => {
          resolve(connection);
        })
        .catch((error) => {
          console.error(error.message);
          reject(error);
        });
    });
  }
};