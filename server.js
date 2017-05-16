
// set the port for the server
const PORT = 4200

// load the required modules
const http = require('http'),
	express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	jwtMiddleware = require('express-jwt'),
	boom = require('boom'),
	bcrypt = require('bcrypt');

// number of rounds of salting
const saltRounds = 10;

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
app.put('/changepass', jwtMiddleware({secret: passphrase}), (req, res) => {
	db.collection('users').findOne({_id: new ObjectID(req.user.id)}).then(user => {
		if (!user) {
			return res.send(boom.unauthorized('invalid username'));
		}

		return bcrypt.compare(req.body.password, user.password, function(err, resp) {
			if(err) {
				return res.send(boom.badImplementation(err));
			}

			if(resp) {
			  	bcrypt.hash(req.body.newPass, saltRounds, function(err, hash) {
					if(err) {
						res.send(boom.badImplementation(err));
					} else {
						const updatedUser = {
							username: user.username,
							password: hash,
							tutorialsUsed: user.tutorialsUsed,
							tutorialsOwned: user.tutorialsOwned
						}

						db.collection("users").findOneAndUpdate(
							{_id: new ObjectID(req.user.id)},
							{$set: updatedUser},
							{returnOriginal: false},
							(err, result) => {
								if (err) {
									console.log(err);
									res.sendStatus(500);
								}
							}
						);
					}
				});

				return res.json(buildJwtResponse(user));
			}
		});
	});
});

app.post('/login',(req, res) => {
	db.collection('users').findOne({username: req.body.username}).then(user => {
		if (!user) {
			return res.send(boom.unauthorized('invalid username'));
		}

		return bcrypt.compare(req.body.password, user.password, function(err, resp) {
		  if(err) {
		  	return res.send(boom.badImplementation(err));
		  }

		  if(resp) {
		   	return res.json(buildJwtResponse(user));
		  } else {
		   	return res.send(boom.unauthorized('Invalid password'));
		  } 
		});

	//there was some other mongo error
	}, err => {
		return res.send(boom.badImplementation(err));
	})
});

// create a new user
app.post('/users', (req, res) =>{
	const findOrAddUser = db.collection('users').findOne({username: req.body.username}).then(user => {
		return new Promise((resolve, reject) => {
			if (!user) {
				bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
					if(err) {
						res.send(boom.badImplementation(err));
					}

					if(hash) {
						const user = {
							username: req.body.username,
							password: hash,
							tutorialsUsed: [],
							tutorialsOwned: []
						};

						db.collection("users").insertOne(user, (err, result) => {
							if (err) { reject(boom.badImplementation(err)) }
							resolve();
						});

					} else {
						// WHAT TO PUT HERE
					}
				});

			} else {
				reject(boom.badData('username already exists'));
			}
		})
	}, err => res.send(boom.badImplementation(err)));

	//what happens to this chain if the above promise catches?
	findOrAddUser.then(() => {
		db.collection('users').findOne({username: req.body.username}).then(user => {
			return res.json(buildJwtResponse(user))
		}, err => res.send(boom.badImplementation(err)));
	}, err => res.send(err));
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

// get the info about the tutorials
app.get('/tutorials/:id*?',
	jwtMiddleware({secret: passphrase, credentialsRequired: false}),
	(req, res) => {
	// if we have a specific id to look up
	if (req.params.id) {
		if (req.user) {
			db.collection("users").findOne({_id: new ObjectID(req.user.id)})
			.then(user => {
				const tutorial = user.tutorialsUsed.find(tutorial => tutorial._id.equals(new ObjectID(req.params.id)));
				if (tutorial) {
					return res.send(tutorial);
				} else {
					db.collection("tutorials").findOne({_id: new ObjectID(req.params.id)})
					.then(tutorial => {
						db.collection("users").update(
							{_id: new ObjectID(req.user.id)},
							{$push: {tutorialsUsed: tutorial}})
						.then(() => res.send(tutorial), err => res.send(boom.badImplementation(err)));
					}, err => res.send(boom.badImplementation(err)));
				}
			}, err => res.send(boom.badImplementation(err)));
		} else {
			db.collection("tutorials").findOne({_id: new ObjectID(req.params.id)})
			.then(tutorial => res.send(tutorial), err => res.send(boom.badImplementation(err)));
		}
	// otherwise send all entries
	} else {
		db.collection("tutorials").find().toArray((err, result) => {
			if (err) {
				res.send(boom.badImplementation(err));
			} else {
				result = result.filter(tutorial=> tutorial.published);
				res.send(result);
			}
		});
	}
});

// create a new tutorial
app.post('/tutorials', (req, res) =>{
	const newTutorial = req.body;
	newTutorial.lastUpdate = Date().toString();

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

//adds newly created tutorial to tutorials and tutorialsOwned
app.post('/users/owner/',
	jwtMiddleware({secret: passphrase}),
	(req,res) => {
		db.collection("tutorials").insert(req.body)
		.then(insertResponse => {
			const tutorial = req.body;
			tutorial._id = new ObjectID(insertResponse.ops[0]._id);
			db.collection("users").update(
					{_id: new ObjectID(req.user.id)},
					{$push: {"tutorialsOwned": tutorial}})
			.then(() => {
				res.send(tutorial);
			}, err => res.send(boom.badImplementation(err)));
		}, err => res.send(boom.badImplementation(err)));
});


//publish tutorial
app.post('/users/owner/:tutorialID',
	jwtMiddleware({secret: passphrase}),
	(req,res) =>{
		db.collection("users").findOne(
			{_id: new ObjectID(req.user.id)},
			{ tutorialsOwned: {$elemMatch: { _id : new ObjectID(req.params.tutorialID)}}},
			(err, result) =>{
				if(err)  return res.send(boom.badImplementation(err))
				const tutorial = result.tutorialsOwned[0]
				tutorial.published = true;
				tutorial.lastUpdate = new Date();
				tutorial.creator = req.user.username;
				db.collection('tutorials').findOneAndUpdate(
					{_id: new ObjectID(tutorial._id)},
					{$set: tutorial},
					{returnOriginal: false},
					(err, result) => {
						if(err){
							console.log(err)
							return res.send(boom.badImplementation(err))
						} else {
							return res.sendStatus(200)
						}
					}
				)
			}
		)
	}
);

//persisting tutorial edits for owner
app.put('/users/owner/:tutorialID',
	jwtMiddleware({secret: passphrase}),
	(req,res) => {
		// update tutorial in tutorialsOwned
		const tutorial = req.body;
		tutorial._id = new ObjectID(req.params.tutorialID);
		db.collection("users").update(
			{_id: new ObjectID(req.user.id), "tutorialsOwned._id": new ObjectID(req.params.tutorialID)},
			{$set: {"tutorialsOwned.$": tutorial}},
			(err, result) => {
				if (err) {
					res.send(boom.badImplementation(err));
				} else {
					res.sendStatus(200);
				}
		});
});

//persisting tutorial code while a user is taking the tutorial, see below commented out.
//below code will not work for a single tutorial object. Amir is pushing the entire user object again
app.put('/users/:tutorialID',
	jwtMiddleware({secret: passphrase}),
	(req,res) => {
		//expecting persisting js, html, and css in the body
		db.collection("users").update(
			{_id: new ObjectID(req.user.id), "tutorialsUsed._id": new ObjectID(req.params.tutorialID)},
			{$set: {
				"tutorialsUsed.$.js": req.body.js,
				"tutorialsUsed.$.html": req.body.html,
				"tutorialsUsed.$.css": req.body.css
			}},
			(err) => {
				if (err) {
					res.send(boom.badImplementation(err));
				} else {
					res.sendStatus(200);
				}
		});
});

app.get('/users/owner',
	jwtMiddleware({secret: passphrase}),
	(req, res) => {
		db.collection('users').findOne({_id: new ObjectID(req.user.id)}).then(
			user=> res.send(user.tutorialsOwned),
			err => res.send(boom.badImplementation(err)));
});

app.get('/users/owner/:tutorialID',
	jwtMiddleware({secret: passphrase}),
	(req, res) => {
		db.collection('users').findOne({_id: new ObjectID(req.user.id) }, { tutorialsOwned: {$elemMatch: { _id : new ObjectID(req.params.tutorialID)}}},
		(err, result) => {
			if (err) {
				return res.send(boom.badImplementation(err));
			} else {
				return res.send(result.tutorialsOwned[0]);
			}
		});
})

app.get('/users/tutorials',
	jwtMiddleware({secret: passphrase}),
	(req, res) => {
		db.collection('users').findOne({_id: new ObjectID(req.user.id)}).then(
			user=> res.send(user.tutorialsUsed),
			err => res.send(boom.badImplementation(err)));
});
