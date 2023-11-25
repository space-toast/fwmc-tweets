import { TweetWithReply } from "../types/TweetWithReply";
import { TweetCard } from "./TweetCard";
import "../styles/tweetCardList.css";

interface TweetCardListProps {
  tweets: TweetWithReply[]
}

export const TweetCardList = ({ tweets }: TweetCardListProps) => {
  return (
    <>
      {tweets.map((tweet) => (
        <div className="relative flex-col items-center justify-center tweet-card-list-container" key={tweet.tweet.id}>
          <div className="after:block after:bg-fwmc-dark-pink after:w-[2px] after:h-8 after:mx-auto ">
            <TweetCard
              key={tweet.tweet.id}
              tweet={tweet.tweet}
            />
          </div>

          <div className="mb-10">
            <TweetCard
              key={tweet.reply.id}
              tweet={tweet.reply}
            />
          </div>
        </div>
      ))}
    </>
  )
};