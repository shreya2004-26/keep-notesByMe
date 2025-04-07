import { createContext, useContext, useState } from "react";

// create a search context
const SearchContext = createContext();

//provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
    {children}
  </SearchContext.Provider>;
};

//custom hook for using search context
export const useSearch = () => useContext(SearchContext);
