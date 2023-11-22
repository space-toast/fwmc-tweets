import { Tweet } from "../entities/Tweet";

export type TweetWithReply = {
    tweet: Tweet;
    reply?: Tweet;
};