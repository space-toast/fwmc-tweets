import { Tweet } from "../types/Tweet";
import fwmcImage from "../assets/fwmc-pfp.jpg";
import pero from "../assets/pero.jpg";

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard = ({ tweet }: TweetCardProps) => {
  let parsedText = ""; 

  parsedText = tweet.text.split(" ").map((word) => {
    if (word.startsWith("@")) {
      return `<a class="text-blue-500" href="https://twitter.com/${word.slice(1)}" target="_blank" rel="noopener noreferrer">${word}</a>`;
    } else {
      return word;
    }
  }).join(" ");

  parsedText = parsedText.split(" ").map((word) => {
    if (word.startsWith("#")) {
      return `<a class="text-blue-500" href="https://twitter.com/hashtag/${word.slice(1)}" target="_blank" rel="noopener noreferrer">${word}</a>`;
    } else {
      return word;
    }
  }).join(" ");

  return (
    <div className="bg-white rounded-lg p-5 shadow-lg flex flex-col space-y-5 pb-8">
      <div className="flex items-center space-x-4">
        <img 
          className="w-16 h-16 rounded-full" 
          src={tweet.username === "fuwamoco_en" ? fwmcImage : pero} 
          alt="Profile picture" />
        <h2 className="text-lg font-bold">{tweet.name}</h2>
      </div>
      <div className="flex-grow">
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: parsedText }}></p>
      </div>
    </div>
  );
};