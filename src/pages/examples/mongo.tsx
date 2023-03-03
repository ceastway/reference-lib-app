/*
Mongo DB

## start/stop brew mongo (or use the preference pane)
$ brew services start mongodb-community
$ brew services stop mongodb-community

## brew log location
/usr/local/var/log/


You can also use docker to install mongo
$ docker pull mongo

Install the Mongo Shell: https://www.mongodb.com/try/download/shell
  - I added it to the mongo dir: /usr/local/opt/mongodb-community@6.0/bin

I added this to my Bash Profile (nano ~/.bash_profile)
export PATH="/usr/local/opt/mongodb-community@6.0/bin:$PATH"

## open a mongo shell
$ mongo (this did not work for me)
$ mongosh (this worked after installing the mongo shell)

## export a database
sudo mongoexport --db todo -c todos --out ~/Desktop/todoTodosExport.json
sudo mongoexport --db todo -c users --out ~/Desktop/todoUserExport.json

sudo mongoimport --db todo --collection todos --file ~/Desktop/todoTodosExport.json


show dbs (show databases)
use TodoDb (use TodoDb database)
db.createCollection(users) (create a collection of users)
db.users.insert({ id: 1, name: 'John Doe', age: 24 }) (insert a user)
show collections (shows collections associated with a Db)
db.getCollectionInfos(); (get information on the collections )
db.COLLECTION_NAME.find(condition)
db.Todos.find().pretty();
mongosh --host mongodb0.example.com --port 28015 (connect to a remote db)
mongosh --host 0.0.0.0 --port 27017
mongosh --host localhost --port 27017

  ps -alx | grep mongod (check if mongo is running)

MongoDB Compass (Mongo GUI)


export PATH="/usr/local/opt/php@7.4/sbin:$PATH"
/usr/local/Cellar/mongodb-community/6.0.3/bin
brew prefix: /usr/local
mongod --config /usr/local/etc/mongod.conf --fork

export PATH=$PATH:/usr/local/opt/mongodb-community@6.0/bin
export PATH=${PATH}:/usr/local/opt/mongodb-community@6.0/bin


Note: The instance of MongoDB uses port 27017

mongodb://127.0.0.1

##Enable access control




*/

export {};
