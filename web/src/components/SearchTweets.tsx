import { ChangeEvent, useState } from "react";

interface SearchTweetsProps {
  onTweetSearch: (query: string) => void;
}

export const SearchTweets = ({ onTweetSearch }: SearchTweetsProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (query: string) => {
    onTweetSearch(query);
    setSearchInput("");
  }

  return (
    <>
      <input 
        type="text" 
        className="rounded-md px-4 py-4 text-black w-full text-left bg-fwmc-light-pink hover:bg-fwmc-pink active:bg-fwmc-dark-pink focus:outline-none focus:ring-2 focus:ring-fwmc-dark-blue focus:border-transparent duration-300 mt-2 w-full" 
        placeholder="Search for tweets..." 
        value={searchInput} 
        onChange={handleInputChange}
      />
      {searchInput && 
        <button
          className="rounded-md bg-white hover:bg-fwmc-pink active:bg-fwmc-dark-pink mt-2 px-4 py-4 w-full"
          onClick={() => handleSearch(searchInput)}
        >
          Search
        </button>
      }
    </>
  );
};