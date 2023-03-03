import React from 'react';

interface ReactExe1 {
  ref: React.MutableRefObject<any>;
}

const ReactExe1: React.FC<ReactExe1> = ({ref}) => {

  return (
    <>
      <input
        name='testInput'
        id='testInput'
        type="text"
        className = "Test Input"
        ref={ref}
      />
    </>
  );
};

export default ReactExe1;
