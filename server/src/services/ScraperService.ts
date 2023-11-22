import { Scraper, SearchMode, Tweet } from "@the-convocation/twitter-scraper";
import "dotenv/config";

export class ScraperService {
    private scraper: Scraper;

    constructor() {
        this.scraper = new Scraper({
            transform: {
                request(input: RequestInfo | URL, init?: RequestInit) {
                    if (input instanceof URL) {
                        const proxy = "https://corsproxy.org/?" + encodeURIComponent(input.href);

                        return [proxy, init];
                    } else if (typeof input === "string") {
                        const proxy = "https://corsproxy.org/?" + encodeURIComponent(input);

                        return [proxy, init];
                    } else {
                        throw new Error("Unexpected request input type");
                    }
                },
            },
        });
    }

    async login(): Promise<void> {
        if (!process.env.TWITTER_USERNAME || !process.env.TWITTER_PASSWORD || !process.env.TWITTER_EMAIL) {
            throw new Error("Twitter credentials not provided");
        }

        await this.scraper.login(
            process.env.TWITTER_USERNAME,
            process.env.TWITTER_PASSWORD,
            process.env.TWITTER_EMAIL
        );

        console.log("Logged in status: " + await this.scraper.isLoggedIn());
    }

    // get all replies to a tweet by given username
    async getRepliesByUsername (parentTweetId: string, username: string): Promise<Tweet[]> {
        const replies: Tweet[] = [];
        const parentTweet: Tweet | null = await this.scraper.getTweet(parentTweetId);

        // if there are no replies, no need to search through the conversation
        if (parentTweet === null || parentTweet.replies === undefined) {
            return replies;
        }

            for await (const replyTweet of this.scraper.searchTweets(`conversation_id:${parentTweetId} AND from:${username}`, parentTweet.replies, SearchMode.Latest)) {
            // ignore original tweet
            if (replyTweet.inReplyToStatusId === parentTweetId) continue;

            // check if reply is from the original poster
            if (replyTweet.username === username) {
                replies.push(replyTweet);
            }
        }

        return replies;
    };

    // for each tweet in an array, get the tweet it replied to
    async getTweetsRepliedTo(replies: Tweet[]): Promise<Tweet[]> {
        const tweetsRepliedTo: Tweet[] = [];

        for await (const reply of replies) {
            if (reply.inReplyToStatusId === undefined || reply.inReplyToStatusId === null) continue;

            const tweetRepliedTo = await this.scraper.getTweet(reply.inReplyToStatusId);

            if (tweetRepliedTo !== null) {
                tweetsRepliedTo.push(tweetRepliedTo);
            }
        }

        return tweetsRepliedTo;
    }
}