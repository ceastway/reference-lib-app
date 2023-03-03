import React from 'react';

interface OutputExample {
  label: string;
  exampleString: string;
  result: string;
  result2Label: string;
  result2: string;
}

const OutputExample: React.FC<OutputExample> = ({label, exampleString, result, result2, result2Label}) => {

  const outputStr = <>
    <div style = {{ fontWeight: 'bold'}}>{label}</div>
    <div className='display-linebreaks'>{exampleString}</div>
    { result ? <div>result: {result}</div> : <></> }
    { result2 ? <div>{result2Label}: {result2}</div> : <></> }
    <hr/><br/>
  </>;

  return (outputStr);
};

export default OutputExample;
