import * as Express from "express";
import * as BodyParser from "body-parser";
import * as Compression from "compression";
import { AppsRoute } from "../src/routes/v1/apps.route";
// import { Router } from "express";
import { DBServer } from "../src/servers/database.server";

const dbServer = new DBServer();
dbServer.start();

var app = Express();

// var router = Router();
// router.post('/', (req, res) => {
//     try {
//         console.log(req.body);
//         res.json({ message: 'Success!' });
//     } catch (err) {
//         res.status(500)
//         res.json({ error: `Failed saving data ${err.message}` });
//     };
// });

// router.get('/', function (req, res) {
//     res.json({
//         message: 'GET / success'
//     });
// });

app.settings.port = 3000;
app.use(BodyParser.json());
app.use(Compression());

app.use('/apps', new AppsRoute().router);

app.listen(app.settings.port);
console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);