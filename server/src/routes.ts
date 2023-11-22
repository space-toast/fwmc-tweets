import express from "express";
import { apiKeyMiddleware } from "./services/authService";
import { ScraperController } from "./controllers/ScraperController";
import { TweetController } from "./controllers/TweetController";
import { CollectionController } from "./controllers/CollectionController";

const scraperController = new ScraperController();
const tweetController = new TweetController();
const collectionController = new CollectionController();

export const router = express.Router();

// rawr n response test tweet: 1719912237618606231
router.post("/api/tweets/scrape/:parentTweetId", apiKeyMiddleware, scraperController.saveRepliesByTweetId);

router.get("/api/tweets/search", tweetController.getTweetsByQuery);

router.get("/api/collections", collectionController.getCollections);

router.get("/api/tweets/collection/:collectionId", tweetController.getTweetsByCollectionId);