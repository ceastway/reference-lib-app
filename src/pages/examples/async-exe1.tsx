/*
http://localhost:3000/references/async-exe1

basic example of ASYNC
*/
import React, {useEffect, useState} from 'react';

const Exe1 = ():JSX.Element => {

  const [fetchText, setFetch] = useState('fetch1');
  const [timeoutText, setTimeoutText] = useState('timeout1');

  useEffect(()=>{
    setTimeout(
      ()=>{
        console.log('Async');
        setTimeoutText('timeout2');
      }, 50
    );
  
    fetch('/').then(
      () => {
        console.log('fetch');
        setFetch('fetch2');
      }
    );
  });

  const a=1;
  const b=2;

  console.log('synchronous');

  console.log('a', a);
  console.log('b', b);

  return (
    <>
      Test<br/>
      {fetchText}<br/>
      {timeoutText}<br/>
    </>
  );
};

export default(Exe1);
