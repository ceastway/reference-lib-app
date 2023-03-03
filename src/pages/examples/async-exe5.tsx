/*
http://localhost:3000/references/async-exe5

Example of ASYNC/Fetch
  - separate component for getData/Fetch
  - Try/Catech/Finally
*/

import React, { useEffect, useState } from 'react';

function getData(query): [any, boolean] {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=Ij6bARHghsbt9Yvs5FYlMwyYOa1UGoLZ&q=${query}&limit=5&offset=0&rating=g&lang=en`
        );
        const json = await response.json();
        console.log({ json });
        setResults(
          json.data.map((item) => {
            return item.images.preview.mp4;
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchData();
    }
  }, [query]);

  return [results, loading];
}

const Exe5 = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = getData(query);

  return (
    <div>
      <h1>Async React Hooks</h1>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          value={search}
          onChange={(e): void => setSearch(e.target.value)}
          placeholder="Search for something"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div>Content is loading</div>
      ) : (
        results.map((item, index) => {
          return (
            <div key={item}>
              <h3 key={'h3_' + index}>{item}</h3>
              <video autoPlay loop key={item} src={item} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Exe5;
