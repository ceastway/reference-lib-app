/*
http://localhost:3000/references/async-exe4

Example of ASYNC/Fetch
  - with fetch outside of the component
*/

import React, { useEffect, useState } from 'react';

async function fetchData(query): Promise<any>{
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Ij6bARHghsbt9Yvs5FYlMwyYOa1UGoLZ&q=${query}&limit=5&offset=0&rating=g&lang=en`);
    const json = await response.json();
    console.log({ json });
    return (
      json.data.map(item => {
        return item.images.preview.mp4;
      })
    );
  } catch (error) {
    console.log(error);
  }
}

const Exe4 = ():JSX.Element => {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() !== ''){
      fetchData(query).then(
        (fetchResults) => {
          //console.log(fetchResults);
          setResults(fetchResults);
        }
      );
    }
  }, [query]);

  console.log('results', results);

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

export default(Exe4);
