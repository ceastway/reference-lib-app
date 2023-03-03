/*
http://localhost:3000/references/mongo-exe1

basic example of ASYNC
*/
import React, { useEffect, useState } from 'react';


interface MongoExe1 {
  ref: React.MutableRefObject<any>;
}

const MongoExe1: React.FC<MongoExe1> = () => {

  const [responseObjString, setResponseObjString] = useState('');

  useEffect(() => {

    async function fetchData(): Promise<void>{
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'getUsers',
            requestWhere: {}, //{} = all, {name: 'alex'}, name: {$regex: 'alex*'}
            requestCols: {_id:0, name: 1},
            limit: 0
          })
        });
        const json = await response.json();

        console.log(json);

        setResponseObjString(
          `RequestMethod: ${json.reqMethod}\n` +
          `RequestType: ${json.reqType}\n` +
          `limit: ${json.limit}\n` +
          'data: ' + json.data.map(
            (item) => {
              return `${item.name} ${JSON.stringify(item)}\n`;
            }) + //${JSON.stringify(json.data)}
          ''
        );

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    async function addUser(): Promise<void>{
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'addUser',
            newUser: { name: 'jim', age: 21}
          })
        });
        const json = await response.json();

        console.log(json);

        setResponseObjString(
          `RequestMethod: ${json.reqMethod}\n` +
          `RequestType: ${json.reqType}\n` +
          `Status: ${json.status}\n` +
          ''
        );

      } catch (error) {
        console.log(error);
      }
    }

    ///addUser();

    // if (query !== ''){
    //   fetchData();
    // }


  });

  async function handleAddUser(): Promise<void>{
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'addUser',
          newUser: { name: 'jim', age: 21}
        })
      });
      const json = await response.json();

      console.log(json);

      setResponseObjString(
        `RequestMethod: ${json.reqMethod}\n` +
        `RequestType: ${json.reqType}\n` +
        `Status: ${json.status}\n` +
        ''
      );

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1>Mongo Data</h1>
        <div className='display-linebreaks'>
          { responseObjString }

          <button onClick={handleAddUser}>Add Jim Button</button>
        </div>
      </div>
    </>
  );
};

export default MongoExe1;
