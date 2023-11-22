import { AppDataSource } from "../data/connection";
import { Photo } from "../entities/Photo";

export class PhotoDataService {
    static async insertPhoto(photo: Photo): Promise<void> {
        try {
            await AppDataSource.manager.createQueryBuilder()
                .insert()
                .into(Photo)
                .values(photo)
                .orIgnore(`("url") DO NOTHING`)
                .execute();
        } catch (error) {
            throw error;
        }
    }
}