import { TweetWithReply } from "../types/TweetWithReply";
import { TweetCard } from "./TweetCard";
import "../styles/tweetCardList.css";

interface TweetCardListProps {
  tweetsAndReplies: TweetWithReply[]
}

export const TweetCardList = ({ tweetsAndReplies }: TweetCardListProps) => {
  return (
    <>
      {tweetsAndReplies.map((tweetAndReply) => (
        <div className="relative flex-col items-center justify-center tweet-card-list-container" key={tweetAndReply.tweet.id}>
          <div className="after:block after:bg-fwmc-dark-pink after:w-[2px] after:h-8 after:mx-auto ">
            <TweetCard
              key={tweetAndReply.tweet.id}
              tweet={tweetAndReply.tweet}
            />
          </div>

          <div className="mb-10">
            <TweetCard
              key={tweetAndReply.reply.id}
              tweet={tweetAndReply.reply}
            />
          </div>
        </div>
      ))}
    </>
  )
};