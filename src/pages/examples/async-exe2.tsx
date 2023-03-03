/*
http://localhost:3000/references/async-exe2

Example of ASYNC/Fetch from a single component
  - http://apache.ce/data/?zipcode=
*/

import React, { useEffect, useState } from 'react';

const Exe2 = ():JSX.Element => {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData(): Promise<void>{
      try {
        const response = await fetch(`http://apache.ce/data/?zipcode=${query}`);
        const json = await response.json();
        ///console.log({ json });

        json.map(item => {
          console.log(item);
          // Object.entries(item).map(( p ) => {
          //   console.log(p[0], ':', p[1]);
          // });

          setResults(Object.entries(item));

        });

        // setResults(
        //   json.data.map(item => {
            
        //     return item.images.preview.mp4;
        //   })
        // );
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
      <h1>Zipcode Data</h1>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          value={search}
          onChange={(e): void => setSearch(e.target.value)}
          placeholder='Search for zip code'
        />
        <button type ='submit'>Search</button>
      </form>
      {results.map(
        ( item ) => {
          return (<div key={item}>
            {item[0] + ': ' + item[1]}
            {/* <h3 key={'h3_' + index}>{item}</h3> */}
            {/* <video autoPlay loop key={item} src={item} /> */}
          </div>);
        }
      )}
    </div>
  );
};

export default(Exe2);
