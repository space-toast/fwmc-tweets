import { AppDataSource } from "../data/connection"
import { Collection } from "../entities/Collection";

export class CollectionDataService {
    async insertCollection(collection: Collection): Promise<Collection> {
        try {
            await AppDataSource.manager.createQueryBuilder()
                .insert()
                .into(Collection)
                .values(collection)
                .orIgnore(`("id") DO NOTHING`)
                .execute();

            return collection;
        } catch (error) {
            throw error;
        }
    };

    async getCollections(): Promise<Collection[]> {
        try {
            const collections = await AppDataSource.manager.find(Collection);

            return collections;
        } catch (error) {
            throw error;
        }
    };

    async doesCollectionExist(collectionName: string): Promise<boolean> {
        try {
            const doesCollectionExist = await AppDataSource.manager.findOne(Collection, { where: { name: collectionName } });

            if (doesCollectionExist != null) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw error;
        }
    }
}