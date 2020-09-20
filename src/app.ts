import { DBServer } from "./servers/database.server";
import { HTTPServer } from "./servers/http.server";

const dbServer = new DBServer();
dbServer.start();

const httpServer = new HTTPServer();
httpServer.start();