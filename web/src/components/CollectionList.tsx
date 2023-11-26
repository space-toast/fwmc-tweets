import { ChangeEvent } from "react";
import { Collection } from "../types/Collection";

interface CollectionListProps {
    collections: Collection[];
    onCollectionSelect: (id: string) => void;
}

export const CollectionList = ({ collections, onCollectionSelect }: CollectionListProps) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onCollectionSelect(e.target.value);
    };
  
    return (
      <select onChange={handleChange} className="rounded-md px-4 py-4 text-black text-left bg-fwmc-light-pink hover:bg-fwmc-pink active:bg-fwmc-dark-pink duration-300 mt-2 w-full">
        <option value="" disabled selected>Select a Rawr N' Response</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
    );
  };