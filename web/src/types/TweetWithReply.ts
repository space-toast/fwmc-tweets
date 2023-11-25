import { Tweet } from "./Tweet";

export interface TweetWithReply {
    tweet: Tweet;
    reply: Tweet;
}