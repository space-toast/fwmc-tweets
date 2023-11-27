import { useEffect, useState } from "react";
import "./App.css";
import { FilterTweets } from "./components/FilterTweets";
import { TweetCardList } from "./components/TweetCardList";
import { CollectionList } from "./components/CollectionList";
import { SearchTweets } from "./components/SearchTweets";
const SERVER_HOSTNAME = import.meta.env.VITE_SERVER_HOSTNAME;

function App() {
  const [tweets, setTweets] = useState<any[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [showScroller, setShowScroller] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [collectionSelected, setCollectionSelected] = useState<boolean>(false);

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const loadCollections = async () => {
    try {
      const collectionResponse = await fetch(`${SERVER_HOSTNAME}/api/collections`);
      const collectionData = await collectionResponse.json();
      setCollection(collectionData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCollectionSelect = async (id: string) => {
    try {
      clearTweets();
      setLoading(true);
      const collectionResponse = await fetch(`${SERVER_HOSTNAME}/api/tweets/collection/` + id);
      const collectionTweetData = await collectionResponse.json();
      setTweets(collectionTweetData);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setCollectionSelected(true);
    }
  }

  const handleFilter = async (keyword: string) => {
    const keywordFilter = keyword.toLowerCase();

    const filteredTweets = tweets.filter((tweetAndReply) => {
      const tweetWords = tweetAndReply.tweet.text.toLowerCase().split(" ");
      const replyWords = tweetAndReply.reply.text.toLowerCase().split(" ");
      return tweetWords.includes(keywordFilter) || replyWords.includes(keywordFilter);
    });
    setFilteredTweets(filteredTweets);
  }

  const handleTweetSearch = async (query: string) => {
    try {
      clearTweets();
      setLoading(true);
      const tweetResponse = await fetch(`${SERVER_HOSTNAME}/api/tweets/search?query=` + query);
      const tweetData = await tweetResponse.json();
      setTweets(tweetData);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setSearchPerformed(true);
    }
  }

  const clearTweets = () => {
    setTweets([]);
    setFilteredTweets([]);
    setSearchPerformed(false);
    setCollectionSelected(false);
  }

  const checkScrollTop = () => {
    if (!showScroller && window.scrollY >= 400){
      setShowScroller(true);
    } else if (showScroller && window.scrollY <= 100){
      setShowScroller(false);
    }
    else {
      setShowScroller(false);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop)
    return () => window.removeEventListener("scroll", checkScrollTop)
  }, []);

  return (
    <>
      <div className="bg-fwmc-light-blue min-h-screen">
        <div className="mx-auto w-full sm:w-1/2 ">
          <div className="text-center text-3xl font-bold pt-4">
            <div className="rounded py-4 px-4 bg-white">
            🐾FUWAMOCO Rawr N' Responses🐾
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
            <div className="flex flex-col items-center w-full md:w-1/2">
              <p>Select a Rawr N' Response</p>
              <CollectionList collections={collection} onCollectionSelect={handleCollectionSelect} />
            </div>
            <div className="flex items-center justify-center md:mx-2">
              <span>OR</span>
            </div>
            <div className="flex flex-col items-center w-full md:w-1/2">
              <p>Search for Tweets by keyword</p>
              <SearchTweets onTweetSearch={handleTweetSearch} />
            </div>
          </div>

          {!loading && tweets.length > 0 && (
            <div className="flex-row mt-10">
              <FilterTweets
                value={keyword}
                onChange={(value: string) => {
                  setKeyword(value)
                  handleFilter(value)
                }}
              />
            </div>
          )}

          <div className="flex-row mt-10" >
            {loading && <div className="text-center">Loading...</div>}

            {!loading && (filteredTweets.length > 0 || tweets.length > 0) ? (
              <TweetCardList
                tweetsAndReplies={filteredTweets.length > 0 ? filteredTweets : tweets}
              />
            ) : (
              (searchPerformed || collectionSelected) && <div className="text-center">No tweets found</div>
            )}

          </div>
        </div>

        {showScroller &&
          <button onClick={scrollTop} className="rounded bg-fwmc-light-pink p-2 fixed bottom-5 right-5">
            Scroll to top
          </button>
        }
      </div>
    </>
  )
}

export default App
