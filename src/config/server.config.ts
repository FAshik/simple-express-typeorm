import { environment } from "../enums/environment.enum";

class Config {
    static environment: string = environment.dev;

    static set() {
        if (process.argv[2] && process.argv[2] === "--env" && process.argv[3] && env.hasOwnProperty(process.argv[3])) {
            this.environment = env[process.argv[3]];
        }
        if (process.env.ENVIRONMENT && env.hasOwnProperty(process.env.ENVIRONMENT)) {
            this.environment = process.env.ENVIRONMENT as environment;
        }
    }

    static load() {
        this.set();
        require('dotenv').config({ path: `${__dirname}/../env/${this.environment}.env` });
    }
}

Config.load();

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const contentType = process.env.CONTENT_TYPE;
const typeorm = {
    type: process.env.TYPEORM_TYPE,
    name: process.env.TYPEORM_NAME,
    port: process.env.TYPEORM_PORT,
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DB,
    user: process.env.TYPEORM_USER,
    pwd: process.env.TYPEORM_PWD,
    sync: Config.environment === environment.prod ? false : !!process.env.TYPEORM_SYNC
};

export { env, port, contentType, typeorm };