import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components';


const Blank = (): JSX.Element => {

  return (
    <>
      <Layout>
        <div>hello world</div>
      </Layout>
    </>
  );
  
};

export default withUrqlClient(createUrqlClient)(Blank);
