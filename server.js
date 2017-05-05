
// set the port for the server
const PORT = 4200

// load the required modules
const http = require('http'),
	express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	jwtMiddleware = require('express-jwt');

// create the server
const app = express();
const server = http.createServer(app);

//TODO move this jwt passphrase to a config/.env file
const passphrase = "Amir is cool";

// configure the server
const corsOptions = {
	methods: ['GET', 'PUT', 'POST'],
	origin: '*',
	allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//connect to the database and store the reference
const MongoClient = require('mongodb').MongoClient;
var db;

// Get the objectID type
var ObjectID = require('mongodb').ObjectID;

// connect to the database
MongoClient.connect('mongodb://localhost:4201/tutorial-builder', (err, database) => {
  if (err) {
    throw err;
  }
  db = database;

	// then start the server
	server.listen(PORT);
	console.log('Listening on port %d', server.address().port);
});


/*

SERVER Routes

*/

app.post('/login',(req, res) => {
	db.collection('users').findOne({username: username}).then(user => {
		//TODO add salting/hasing using bcrypt
		if (req.body.password === user.password) {
			return res.json(buildJwtResponse(user));
		} else {
			//TODO incorrect password, send it back
		}
	}, err => {
		//TODO handle this err, user not found, or something similar
		console.log(err);
	})
});

// create a new user
app.post('/users', (req, res) =>{
	const findOrAddUser = db.collection('users').findOne({username: username}).then(user => {
		return new Promise((resolve, reject) => {
			if (!user) {
				db.collection("users").insertOne(req.body, (err, result) => {
					if (err) { reject(err) } else { resolve() }
				});
			} else {
				//TODO return error saying username already exists
				reject("user already exists");
			}
		})
	}, err => console.log(err))

	//what happens to this chain if the above promise catches?
	findOrAddUser.then(() => {
		console.log('executing this');
		db.collection('users').findOne({username: username}).then(user => {
			return res.json(buildJwtResponse(user))
		}, err => { console.log(err); return res.sendStatus(500) })
	}, err => { console.log(err); return res.sendStatus(403); //username already exists ?
	})
});

function buildJwtResponse(user) {
	const tokenData = {
		username: user.username,
		id: user._id
	};

	const response = {
		username: user.username,
		token: jwt.sign(tokenData, passphrase)
	}

	return response;
}

app.get('/test',
	jwtMiddleware({secret: passphrase}),
	(req, res) => {
		console.log(req.user);
		res.send(req.user);
});

// get the info about the tutorials
app.get('/tutorials/:id*?', (req, res) => {
	// if we have a specific id to look up
	if (req.params.id) {
		db.collection("tutorials").find({_id: new ObjectID(req.params.id)}).toArray((err, result) => {
      if (err) {
        console.log(err);
      }
			res.send(result[0]);
	  });
	// otherwise send all entries
	} else {
		db.collection("tutorials").find().toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			res.send(result);
		});
	}
});

// get info about the specific tutorial used by the user
app.get('/users/:username/:tutorial', (req, res) => {

	db.collection("users").find({username: req.params.username}).toArray((err, result) => {
		if (err) {
			console.log(err);
		}

		let userObj = result[0],
			tutorialObj, tutorialIndex;

		userObj.tutorialsUsed.forEach((item, index) => {
			if (item._id == req.params.tutorial) {
				tutorialObj = item;
				tutorialIndex = index;
			}
		});

		if (tutorialObj) {
			res.send(tutorialObj);

		} else {

			db.collection("tutorials").find({_id: new ObjectID(req.params.tutorial)}).toArray((err, result) => {
				if (err) {
					console.log(err);
				}
				let originalTutorial = result[0];
				originalTutorial.js = originalTutorial.stages[0].code.js;
				originalTutorial.html = originalTutorial.stages[0].code.html;
				originalTutorial.css = originalTutorial.stages[0].code.css;
				originalTutorial.currentStage = 0;

				db.collection("users").update(
					{ username: req.params.username },
					{$push: { tutorialsUsed: originalTutorial}}
				).then(() => {
					res.send(originalTutorial);
				});
			});
		}
	});
});

// get the info about the users
app.get('/users/:username*?', (req, res) => {
	// if we have a specific username to look up
	if (req.params.username) {
		db.collection("users").find({username: req.params.username}).toArray((err, result) =>{
			if (err) {
				console.log(err);
			}

			if (result[0]) {
				res.send(result[0]);
			} else {
				res.sendStatus(500);
			}
		});
	} else {
		db.collection("users").find().toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			res.send(result);
		});
	}
});

// create a new tutorial
app.post('/tutorials', (req, res) =>{
	let newTutorial = req.body;
	db.collection("tutorials").insert(newTutorial, (err, storedTutorial) => {
		if (err) {
			console.log(err);
		}

		res.send(storedTutorial.ops);
	});
});

// deletes a tutorial
app.delete('/tutorials/:id', (req, res) => {
	db.collection("tutorials").remove({_id: new ObjectID(req.params.id)}, (err) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

// delete a user
app.delete('/users/:id', (req, res) => {
	db.collection("users").remove({_id: new ObjectID(req.params.id)}, (err) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

// update a specific tutorial
app.put('/tutorials/:id', (req, res) => {
	let updatedTutorial = req.body;
	updatedTutorial._id = ObjectID.createFromHexString(updatedTutorial._id);

	db.collection("tutorials").findOneAndUpdate(
		{_id: updatedTutorial._id},
		{$set: updatedTutorial},
		{returnOriginal: false},
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.send(result.value);
			}
		}
	);
});

// update a specific user's account
app.put('/users/:id', (req, res) => {
	let updatedUser = req.body;
	updatedUser._id = ObjectID.createFromHexString(updatedUser._id);

	db.collection("users").findOneAndUpdate(
		{_id: updatedUser._id},
		{$set: updatedUser},
		{returnOriginal: false},
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.send(result.value);
			}
		}
	);
});
