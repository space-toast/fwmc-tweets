import { Request, Response } from "express";
import { ScraperService } from "../services/ScraperService";
import { TweetDataService } from "../services/TweetDataService";
import { PhotoDataService } from "../services/PhotoDataService";
import { Tweet } from "../entities/Tweet";
import { Photo } from "../entities/Photo";
import { Collection } from "../entities/Collection";
import { CollectionDataService } from "../services/CollectionDataService";

export class ScraperController {
    private scraperService: ScraperService;
    private collectionDataService: CollectionDataService;

    constructor() {
        this.scraperService = new ScraperService();
        this.collectionDataService = new CollectionDataService();
    }

    saveRepliesByTweetId = async (req: Request, res: Response): Promise<void> => {
        try {
            const parentTweetId = req.params.parentTweetId;
            const collectionName = req.body.collectionName;

            const collectionExists = await this.collectionDataService.doesCollectionExist(collectionName);

            if (collectionExists) {
                res.status(409).send("Collection name already exists");
                return;
            }

            await this.scraperService.login();

            const collection = new Collection();
            collection.name = collectionName;
            collection.parentTweetId = parentTweetId;
            const collectionId = (await this.collectionDataService.insertCollection(collection)).id;

            // get fwmc's replies to ruffians
            const fwmcReplies = await this.scraperService.getRepliesByUsername(parentTweetId, "fuwamoco_en");
    
            // get the ruffians' replies that fwmc responded to
            const tweetsRepliedTo = await this.scraperService.getTweetsRepliedTo(fwmcReplies);
    
            //combine the two arrays and save all the tweets
            const tweetsToScrape = fwmcReplies.concat(tweetsRepliedTo);

            for (const tweet of tweetsToScrape) {
                if (tweet.id === undefined || tweet.id === null) continue;

                if (tweet.photos.length > 0) {
                    const photoPromises = tweet.photos.map(async (photo) => {
                        let photoToSave = this.transformToPhoto(photo, tweet.id!);
                        await PhotoDataService.insertPhoto(photoToSave);
                    });
                    await Promise.all(photoPromises);
                }

                let tweetToSave = this.transformToTweet(tweet);

                if (collectionId !== undefined) {
                    tweetToSave.collectionId = collectionId;
                }

                await TweetDataService.insertTweet(tweetToSave);
            }
    
            res.send(tweetsToScrape);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving the tweets");
        }
    }

    private transformToPhoto(photo: any, tweetId: string): Photo {
        return {
            url: photo.url,
            tweetId: tweetId,
            createdAt: new Date()
        };
    }

    private transformToTweet(tweet: any): Tweet {
        return {
            id: tweet.id!,
            conversationId: tweet.conversationId!,
            text: tweet.text!,
            name: tweet.name!,
            username: tweet.username!,
            userId: tweet.userId!,
            permanentUrl: tweet.permanentUrl!,
            timeParsed: tweet.timeParsed!,
            timestamp: tweet.timestamp!,
            inReplyToStatusId: tweet.inReplyToStatusId!,
            createdAt: new Date()
        };
    }
}