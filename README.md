# Tutorial Builder

To install the required dependancies, run from the root directory:

~~~
npm install
cd client
npm install
cd ..
~~~
We have two separate package.json, one for the server and one for the client, hence we run npm install twice.


To seed the db with test data, run from the root directory:
~~~
mongod --port 4201 --dbpath ./db
~~~
If you also need to remove all existing collections in the database, run:
~~~
mongo --port 4201 tutorial-builder --eval "db.dropDatabase()"
~~~
Then open a new terminal and run from the root directory:
~~~
mongoimport --port 4201 --db tutorial-builder --collection tutorials --file ./test_data/tutorials.json
mongoimport --port 4201 --db tutorial-builder --collection users --file ./test_data/users.json
~~~


To run the client dev server and backend simultaneously, run
~~~
npm start
~~~
