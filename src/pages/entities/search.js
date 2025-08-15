import React, { useState } from "react";
import { useRouter } from "next/router";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    e.preventDefault();
    router.push({
      pathname: `/search`,
      query: { q: searchTerm },
    });
  };

  const { q } = router.query;

  return (
    <>
      {q ? (
        <div>{`You searched for ${q}`}<br/><br /><form>
          <input
            type="text"
            placeholder="Search.."
            name="q"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button onClick={handleSearch}>Submit</button>
        </form></div>
      ) : (
        <form>
          <input
            type="text"
            placeholder="Search.."
            name="q"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button onClick={handleSearch}>Submit</button>
        </form>
      )}
    </>
  );
};

export default SearchPage;

