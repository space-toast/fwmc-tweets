
import { Request, Response } from "express";
import { TweetDataService } from "../services/TweetDataService";
import { Tweet } from "../entities/Tweet";
import { TweetWithReply } from "../models/TweetWithReply";

export class TweetController {
    private tweetDataService: TweetDataService;

    constructor() {
        this.tweetDataService = new TweetDataService();
    }

    getTweetsByQuery = async (req: Request, res: Response): Promise<void> => {
        const { query } = req.query;

        if (!query) {
            res.status(400).send("Query is required");
            return;
        }
        if (typeof query !== "string") {
            res.status(400).send("Query must be a string");
            return;
        }

        try {
            const tweets = await this.tweetDataService.getTweetsByQuery(query);

            const tweetsAndReplies = await this.formatTweets(tweets);

            res.json(tweetsAndReplies);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving the tweets");
        }
    }

    getTweetsByCollectionId = async (req: Request, res: Response): Promise<void> => {
        const { collectionId } = req.params;

        if (!collectionId) {
            res.status(400).send("Collection ID is required");
            return;
        }
        if (typeof collectionId !== "string") {
            res.status(400).send("Collection ID must be a string");
            return;
        }

        try {
            const tweets = await this.tweetDataService.getTweetsByCollectionId(collectionId);
            const tweetsAndReplies = await this.formatTweets(tweets);

            res.json(tweetsAndReplies);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving the tweets");
        }
    }

    private formatTweets = async (tweets: Tweet[]): Promise<TweetWithReply[]> => {
        const ruffianReplies: Tweet[] = [];
        const replies: Tweet[] = [];

        for (const tweet of tweets) {
            try {
                if (tweet.username === "fuwamoco_en") {
                    const inReplyToStatusId = tweet.inReplyToStatusId;
                    const inReplyToStatus = tweets.find(tweet => tweet.id === inReplyToStatusId);
                    
                    if (!inReplyToStatus) {
                        const inReplyToTweet = await this.tweetDataService.getTweetById(inReplyToStatusId);
                        if (inReplyToTweet) {
                            ruffianReplies.push(inReplyToTweet);
                        } else {
                            console.error(`Error processing tweet with id ${tweet.id}: inReplyToStatusId ${inReplyToStatusId} not found`);
                            continue;
                            // remove this tweet from the list of tweets to return   
                        }
                    } else {
                        ruffianReplies.push(inReplyToStatus);
                    }
                    replies.push(tweet);
                } else {
                    const id = tweet.id;
                    const reply = tweets.find(tweet => tweet.inReplyToStatusId === id);
                    
                    if (!reply) {
                        const replyTweet = await this.tweetDataService.getTweetByInReplyToStatusId(id);
                        if (replyTweet) {
                            replies.push(replyTweet);
                        } else {
                            console.error(`Error processing tweet with id ${tweet.id}: reply with inReplyToStatusId ${id} not found`);
                            continue;
                        }
                    } else {
                        replies.push(reply);
                    }
                }
            } catch (error) {
                console.error(`Error processing tweet with id ${tweet.id}: ${error}`);
                continue;
            }
        }

        const tweetsAndReplies: TweetWithReply[] = [];
            ruffianReplies.forEach(ruffianReply => {
                try {
                    const reply = replies.find(reply => reply.inReplyToStatusId === ruffianReply.id);
                    tweetsAndReplies.push({tweet: ruffianReply, reply: reply});
                } catch (error) {
                    console.error(`Error processing ruffian reply with id in tweetandreplies ${ruffianReply.id}: ${error}`);
                }
            });
            
        return tweetsAndReplies;
    }
}