import React, { useState, useEffect } from "react";
import sitemap from "./Sitemap.json";
import { Link, useParams } from "react-router-dom";

function Search() {
  const { key } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (key) {
      // Create a regular expression using the search key
      const regex = new RegExp(key, "i"); // 'i' flag for case-insensitive search

      // Filter sitemap array based on the regex pattern
      const results = sitemap.filter((item) => regex.test(item.title));

      // Update search results state
      setSearchResults(results);
    }
  }, [key]);

  return (
    <div
      id="UniqueFeature"
      style={{
        paddingBottom: "1em",
      }}
    >
      <div className="breadcrumb">{"Home > Results"}</div>
      <div className="section1">
        <div className="result-box">
          <h1>Search Results for "{key}"</h1>
          {searchResults.length === 0 ? (
            <p>Oops! No results available.</p>
          ) : (
            <ul>
              {searchResults.map((item, index) => (
                <Link key={index} to={item.ref}>
                  {item.title}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
