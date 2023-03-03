/*
http://localhost:3000/references/react-exe2
*/
import React, {useEffect, useRef} from 'react';
import ExampleNav from './_nav';
import ReactExe1 from './react-exe1';

const ReactExe2: React.FC = () => {

  const testInput = useRef(null);

  useEffect(() => {
    ///testInput.current.focus();
    testInput.current.value='test';
  });

  // ref={ref}
  return (
    <>
      <ExampleNav/>
      <ReactExe1 ref={testInput}></ReactExe1>
    </>
  );
};

export default ReactExe2;
