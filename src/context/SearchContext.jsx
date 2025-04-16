import { createContext, useContext, useState } from "react";

// Create a search context
const SearchContext = createContext();

// Provider component
const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list");

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, view, setView }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using search context
const useSearch = () => useContext(SearchContext);

// Export at the end
export { SearchProvider, useSearch };
