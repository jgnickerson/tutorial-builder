# Tutorial Builder


### Setup

To install the required dependancies, run from the root directory:
~~~
npm install
cd client
npm install
cd ..
~~~
We have two separate package.json, one for the server and one for the client, hence we run npm install twice.

### Adding Test Data to MongoDB
#### Experimental NPM script
Run `npm run refresh` to (hopefully) seed the database automatically. Then ctrl-c out and run `npm start`. If that doesn't work (nothing shows up on a page where you expect things to show up) follow the below instructions to manually seed the db.

#### Manually add Test Data to db
To manually seed the db with test data, first create a db directory in the root folder, then run:
~~~
mongod --port 4201 --dbpath ./db
~~~

If you also need to remove all existing collections in the database, run:
~~~
mongo --port 4201 tutorial-builder --eval "db.dropDatabase()"
~~~

Then open a new terminal and run from the root directory:
~~~
mongoimport --port 4201 --db tutorial-builder --collection tutorials --jsonArray ./test_data/tutorials.json
mongoimport --port 4201 --db tutorial-builder --collection users --jsonArray ./test_data/users.json
~~~

### Running Server/Client
To run the client dev server and backend simultaneously, run
~~~
npm start
~~~

### Git Guidelines
Please add the following git alias to your shell (copy and paste into terminal):
~~~
git config --global alias.up '!git remote update -p; git merge --ff-only @{u}'
~~~
Now, instead of using `git pull` use `git up`. If you're interested in why, see the answer [here](https://stackoverflow.com/questions/15316601/in-what-cases-could-git-pull-be-harmful)

#### Starting a new Branch
When you're starting a new branch, you will:
~~~
git checkout master
git up
git checkout -b branch-name
~~~
This will go to the master branch, update it with new code from GitHub, and then branch off of master.

#### Commiting and Pushing
While working on your branch, commit your work as we saw in class. After you commit, you should `git push` to the github repo to make sure you're work is saved somewhere other than your own machine. The first time you push to github from your branch, you will need to set the upstream branch with `git push -u origin branch-name`, and then you can just `git push` as normally with every commit thereafter.

#### Pull Requests
When you finish building your feature or get to a place where you want someone else to review your code, you will open a pull request on GitHub. After you push to github, navigate to the main repository page on GitHub. You should see a "branches" button next to the "commits" one. Click this, and if everything worked correctly, you should see your branch listed. Next to your branch, it should say "Compare and Pull Request." Click that and follow the instructions.
