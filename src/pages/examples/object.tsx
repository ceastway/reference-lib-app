import React from 'react';
import ExampleNav from './_nav';
import OutputExample from './outputExample';

/*
let x = ...

object.forEach(refItem => {
  x = 
  <>
  {x}
  refItem.id ...
  </>
}

*/

interface Object1Interface {
  a: string;
  b: number;
  myProperties: ()=>{
    //
  };
  redefineAFunction: ()=>{
    //
  };
}

const objectObject: React.FC = () => {

  const object1: Object1Interface = {
    a: 'somestring',
    b: 42,
    myProperties: function(){
      const myPropsString = Object.entries(this).map((e): string => {
        return `${e[0]}: ${e[1]}`;
      });

      return myPropsString;
    },
    redefineAFunction: function(){
      return '';
    }
  };

  object1.toString = function(): string {
    const result = 'a = ' + this.a + ', b = ' + this.b;
    return result;
  };

  console.log(object1.toString()); //a = somestring, b = 42

  object1.redefineAFunction = function(): string {
    const result = 'a2 = ' + this.a + ', b2 = ' + this.b;
    return result;
  };

  console.log('redefineAFunction: ', object1.redefineAFunction()); //a2 = somestring, b2 = 42
  console.log('myProperties: ', object1.myProperties());

  /*
  object1.myProperties
  [
    'a: somestring', 
    'b: 42', 
    'myProperties: function() {\n            const myPro…  });\n            return myPropsString;\n        }', 
    'redefineAFunction: function() {\n        const resu… ", b2 = " + this.b;\n        return result;\n    }', 
    'toString: function() {\n        const result = "a =…+ ", b = " + this.b;\n        return result;\n    }']
  */

  const object2 = { b: 4, c: 5 };
  const array1 = [['foo', 'bar'], ['baz', 42]];

  const pageContent = (
    <>
      <OutputExample
        label = ""
        exampleString = "object1"
        result = {JSON.stringify(object1)}
        result2 = ""
        result2Label = ""
      />
      <OutputExample
        label = ""
        exampleString = "object2"
        result = {JSON.stringify(object2)}
        result2 = ""
        result2Label = ""
      />
      <OutputExample
        label = ""
        exampleString = "array1"
        result = {JSON.stringify(array1)}
        result2 = ""
        result2Label = ""
      />
    </>
  );

  const objectAssign = Object.assign(object2, object1);

  const myObject = {
    foo: 'a',
    bar: 'b'
  };

  const createObject = Object.create(myObject);
  createObject.foo = 'c';

  Object.freeze(createObject);

  try {
    createObject.foo = 'd';
  } catch (error) {
    console.log(error);
  }

  interface Person {
    name: string;
    age: number;
    location: string
  }

  //keyof Person = 'name' | 'age' | 'location'
  function logAccess(object: Person, key: keyof Person): Person {
    return proxy(object, key);
  }


  const John = {
    name: 'John',
    age: 25,
    location: 'Texas'
  };

  function proxy(any: any, any2: any): any{
    //do nothing
    console.log(any, any2);
    return John;
  }

  logAccess(John, 'age');

  const Message = {
    listen: 'we have to listen',
    tell: 'we can also tell something',
    yell: 'yell is also an option',
    abandon: 'abandon something'
  };

  type MessageKey = keyof typeof Message;

  function reply(key: MessageKey): string {
    return Message[key];
  }

  console.log(reply('listen')); //we have to listen

  const course = {
    name: 'Web Programming'
  };

  const grade = {
    score: 92
  };

  const finalResult = Object.assign(course, grade, { teacher: 'Mr. Smith'});

  console.log('finalResult', finalResult); //{name: 'Web Programming', score: 92, teacher: 'Mr. Smith'}

  
  return (
    <>
      <ExampleNav/>
      <div style={{ padding: '10px;' }}>
        <h1>Objects</h1>
        {pageContent}
      </div>
    
  
      <div style={{ padding: '10px;' }}>
    

        <strong>object2</strong><br/>
        {JSON.stringify(object2)}
        <hr/>

        <strong>array1</strong><br/>
        {JSON.stringify(array1)}
        <hr/><br/><br/>

        <strong>Object.entries(object1)</strong><br/>
        {JSON.stringify(Object.entries(object1))}
        <hr/><br/>

        <strong>objectAssign = Object.assign(object2, object1)</strong><br/>
        <i>&nbsp;- method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.</i><br/>
        {JSON.stringify(objectAssign)}
        <hr/><br/>
    
        <strong>createObject = Object.create(myObject)</strong><br/>
      createObject.foo = "c";<br/>
        <i>&nbsp;- method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.</i><br/>
        {JSON.stringify(createObject)}
        <hr/><br/>

        <strong>Object.hasOwn(object1, 'undefinedProp')</strong><br/>
        {JSON.stringify(Object.hasOwn(object1, 'undefinedProp'))}
        <hr/><br/>

        <strong>Object.is(object1, object2)</strong><br/>
        {JSON.stringify(Object.is(object1, object2))}
        <hr/><br/>

        <strong>Object.keys(object1)</strong><br/>
        {JSON.stringify(Object.keys(object1))}
        <hr/><br/>

        <strong>Object.values(object1)</strong><br/>
        {JSON.stringify(Object.values(object1))}
        <hr/><br/>

        <strong>Object.entries(object1)</strong><br/>
        {JSON.stringify(Object.entries(object1))}
        <hr/><br/>
    


        {/* <b>Object.entries(object1).map((item, index)</b><br/>
      {Object.entries(object1).map((item, index) =>
        {return <>Index: {index}, property: {item[0]}, value: {item[1]},  <br/></>;}
      )}
      <hr/><br/> */}
      </div>
    </>
  );
};

export default objectObject;
