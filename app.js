
// set the port for the server
const PORT = 4200

// load the required modules
const http = require('http'),
	express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser');

// create the server
const app = express();
const server = http.createServer(app);

// configure the server
const corsOptions = {
	methods: ['GET', 'PUT', 'POST'],
	origin: '*',
	allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

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

// setup the routes
app.get('/', (req, res)=>{
	res.send("<h1>Homepage</h1>");
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

// get the info about the users
app.get('/users/:id*?', (req, res) => {
	// if we have a specific id to look up
	if (req.params.id) {
		db.collection("users").find({_id: new ObjectID(req.params.id)}).toArray((err, result) =>{
			if (err) {
				console.log(err);
			}
			res.send(result[0]);
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

// create a new user
app.post('/users', (req, res) =>{
	let newUser = req.body;
	db.collection("users").insert(newUser, (err, storedUser) => {
		if (err) {
			console.log(err);
		}

		res.send(storedUser.ops);
	});
});

// create a new tutorial
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

// create a new user
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
	db.collection("tutorials").update(
		{_id: new ObjectID(req.params.id)},
		updatedTutorial,
		(err) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.sendStatus(200);
			}
		}
	);
});

// update a specific user's account
app.put('/users/:id', (req, res) => {
	let updatedUser = req.body;
	db.collection("users").update(
		{_id: new ObjectID(req.params.id)},
		updatedUser,
		(err) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.sendStatus(200);
			}
		}
	);
});
