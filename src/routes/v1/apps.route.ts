import { AppsRepo } from "../../database/repositories/apps.repository";
import { Router } from "express";

export class AppsRoute {

    router: Router = null;
    private appsRepo: AppsRepo = null;

    constructor() {
        this.router = Router();
        this.appsRepo = new AppsRepo();
        this.help();
        this.bulkLoad();
    }

    private help(): void {
        this.router.get('/', (req, res) => {
            res.json({ message: 'GET / request received' });
        });
    }

    private bulkLoad(): void {
        this.router.post('/', (req, res) => {
            this.appsRepo.bulkUpload(req.body).then(() => {
                res.json({ message: 'Success!' });
            }).catch((err) => {
                res.status(500)
                res.json({ error: `Failed saving data ${err.message}` });
            });
        });
    }
}
