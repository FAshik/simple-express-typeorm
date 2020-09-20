import { Apps } from "../entities/apps.entity";
import { getConnection } from "typeorm";
import { typeorm } from "../../config/server.config";

export class AppsRepo {
    async bulkUpload(appConnections) {
        await getConnection(typeorm.name)
            .createQueryBuilder()
            .insert()
            .into(Apps)
            .values(appConnections)
            .orUpdate({ conflict_target: ['name'], overwrite: ['connections'] })
            .execute();
    }
}