/*
http://localhost:3000/api/users
*/

import {connectToMongo} from '../../utils/connectMongo';

//req
export default async function userCollection(req, res): Promise<any>{

  //define mongo db
  const mongoDb = 'todo';

  //check if req.body exists
  if(!req.body){
    const { requestType, limit } = {requestType: 'bodyNotFound', limit: 1 };

    return res.json({
      reqMethod: req.method,
      reqType: requestType, //JSON.parse(req.body),
      limit: limit,
      data: JSON.parse(JSON.stringify(['body not found'])),
      success: false
    });
  }

  const { requestType } = JSON.parse(req.body);

  if(requestType === 'getUsers'){
    const { limit, requestWhere, requestCols } = JSON.parse(req.body);
    try {
      // connect to the database
      const { db } = await connectToMongo(mongoDb);
      // fetch the users
      const users = await db
        .collection('users')
        .find(requestWhere)
        .project(requestCols)
        .limit(limit)
        .toArray();
      // return the users
      return res.json({
        reqMethod: req.method,
        reqType: requestType, //JSON.parse(req.body),
        limit: limit,
        data: JSON.parse(JSON.stringify(users)),
        success: true
      });
    } catch (error) {
      // return the error
      return res.json({
        message: new Error(error).message,
        success: false
      });
    }
  } else if (requestType === 'addUser') {
    const { newUser } = JSON.parse(req.body);
    try {
      // connect to the database
      const { db } = await connectToMongo(mongoDb);
      // fetch the users
      const _ = await db
        .collection('users')
        .insertOne(newUser);
      // return the users
      return res.json({
        reqMethod: req.method,
        reqType: requestType, //JSON.parse(req.body),
        limit: '',
        data: JSON.parse(JSON.stringify('')),
        success: true
      });
    } catch (error) {
      // return the error
      return res.json({
        message: new Error(error).message,
        success: false
      });
    }  
  } else {
    return res.json({
      message: JSON.parse(JSON.stringify('invalid request')),
      success: false
    });
  }
}
