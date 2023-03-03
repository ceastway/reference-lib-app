/*
http://localhost:3000/references/react-exe3
*/
import React, { useEffect, useRef } from 'react';
import { Layout } from '../../fragments';

const ReactExe3: React.FC = () => {

  useEffect(() => {
    myRef.current.value = 'test789';
  });

  const myRef = useRef(null);

  return (
    <>
      <Layout>
      ReactExe3
        <form>
          <input
            className='myInput'
            name='testInput'
            id='testInput'
            type="text"
            ref={myRef}
          />
        </form>
      </Layout>
    </>
  );
};

export default(ReactExe3);
