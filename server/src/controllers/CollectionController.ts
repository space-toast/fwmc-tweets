import { Request, Response } from "express";
import { CollectionDataService } from "../services/CollectionDataService";

export class CollectionController {
    private collectionDataService: CollectionDataService;

    constructor() {
        this.collectionDataService = new CollectionDataService();
    }

    getCollections = async (req: Request, res: Response): Promise<void> => {
        try {
            const collections = await this.collectionDataService.getCollections();

            res.json(collections);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving the collections");
        }
    }
}