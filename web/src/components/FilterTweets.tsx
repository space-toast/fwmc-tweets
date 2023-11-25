import { FormEvent } from "react";

interface FilterTweetProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterTweets = ({ value, onChange }: FilterTweetProps) => {

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onChange(value);
  }

  return (
    <>
      <div className="bg-white rounded-lg p-5 shadow-md flex flex-col space-y-4">
        <form onSubmit={handleSearch}>
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <input
                className="resize-none w-full h-16 p-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fwmc-pink focus:border-transparent"
                placeholder="Filter tweets..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}