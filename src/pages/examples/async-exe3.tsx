/*
http://localhost:3000/references/async-exe3

Example of ASYNC/Fetch from a single component
*/

import React, { useEffect, useState } from 'react';

const Exe3 = ():JSX.Element => {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData(): Promise<void>{
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Ij6bARHghsbt9Yvs5FYlMwyYOa1UGoLZ&q=${query}&limit=5&offset=0&rating=g&lang=en`);
        const json = await response.json();
        //console.log({ json });
        setResults(
          json.data.map(item => {
            return item.images.preview.mp4;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (query !== ''){
      fetchData();
    }
  }, [query]);

  //console.log('results', results);

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
          placeholder='Search for something'
        />
        <button type ='submit'>Search</button>
      </form>
      {results.map(
        ( item, index ) => {
          return (<div key={item}>
            <h3 key={'h3_' + index}>{item}</h3>
            <video autoPlay loop key={item} src={item} />
          </div>);
        }
      )}
    </div>
  );
};

export default(Exe3);
