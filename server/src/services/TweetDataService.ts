import { ILike } from "typeorm";
import { AppDataSource } from "../data/connection";
import { Tweet } from "../entities/Tweet";

export class TweetDataService {
    static async insertTweet(tweet: Tweet): Promise<void> {
        try {
            await AppDataSource.manager.createQueryBuilder()
                .insert()
                .into(Tweet)
                .values(tweet)
                .orIgnore(`("id") DO NOTHING`)
                .execute();
        } catch (error) {
            throw error;
        }
    };

    async getTweetById(id: string): Promise<Tweet | null> {
        try {
            const tweet = await AppDataSource.manager.findOne(Tweet, {
                where: { id }
            });

            if (!tweet) {
                return null;
            }

            return tweet;
        } catch (error) {
            throw error;
        }
    }

    async getTweetByInReplyToStatusId(inReplyToStatusId: string): Promise<Tweet> {
        try {
            const tweet = await AppDataSource.manager.findOne(Tweet, {
                where: { inReplyToStatusId }
            });

            if (!tweet) {
                throw new Error("Tweet not found");
            }

            return tweet;
        } catch (error) {
            throw error;
        }
    }

    async getTweetsByQuery(query: string): Promise<Tweet[]> {
        try {
            const tweets = await AppDataSource.manager.find(Tweet, {
                where: { text: ILike(`%${query}%`) }
            });
    
            return tweets;
        } catch (error) {
            throw error;
        }
    };

    async getTweetsByCollectionId(collectionId: string): Promise<Tweet[]> {
        try {
            const tweets = await AppDataSource.manager.find(Tweet, {
                where: { collectionId }
            });
    
            return tweets;
        } catch (error) {
            throw error;
        }
    };
}