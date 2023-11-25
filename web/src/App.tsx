import { useEffect, useState } from "react";
import "./App.css";
import { FilterTweets } from "./components/FilterTweets";
import { TweetCardList } from "./components/TweetCardList";
import { CollectionList } from "./components/CollectionList";
const SERVER_HOSTNAME = import.meta.env.VITE_SERVER_HOSTNAME;

function App() {
  const [tweets, setTweets] = useState<any[]>([])
  const [filteredTweets, setFilteredTweets] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>("")

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
      setLoading(true);
      const collectionResponse = await fetch(`${SERVER_HOSTNAME}/api/tweets/collection/` + id);
      const collectionTweetData = await collectionResponse.json();
      setTweets(collectionTweetData);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleFilter = async (keyword: string) => {
    const filteredTweets = tweets.filter((tweetAndReply) => {
      return tweetAndReply.tweet.text.toLowerCase().includes(keyword.toLowerCase()) || tweetAndReply.reply.text.toLowerCase().includes(keyword.toLowerCase())
    });
    setFilteredTweets(filteredTweets);
  }

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <>
      <div className="bg-fwmc-light-blue min-h-screen">
        <div className="mx-auto w-full sm:w-1/2 ">
          <div className="text-center text-3xl font-bold pt-10">FuwaMoco Roar N' Responses</div>

          <div className="flex-row mt-10">
            <CollectionList collections={collection} onCollectionSelect={handleCollectionSelect} />
          </div>

          {/* filter on tweets array */}
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

            {!loading && keyword !== "" ? (
              <TweetCardList
                tweets={filteredTweets}
              />
            ) : (
              <TweetCardList
                tweets={tweets}
              />
            )}

            {(filteredTweets.length === 0 && keyword !== "") && 
              <div className="text-center">No tweets found</div>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default App
