const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require('morgan');

const app = express();
const cors = require('cors');

const results = require("./routes/results");
const users = require("./routes/users");
const questions = require('./routes/question');
const paperDetails = require('./routes/paperDetails');
const email = require('./routes/email');

//CORS middleware
app.use(cors())

//Logger
app.use(logger("dev"));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// DB Config
mongoose.set('strictQuery', false);
const db = require("./config/keys").mongoURI;
const pgdb = require('./config/keys').pool;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.get('/pgdb-check', async (req, res) => {
    try {
      const client = await pgdb.connect();
      const result = await client.query('SELECT * FROM users');
      const results = { 'results': (result) ? result.rows : null };
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

// Routes
app.use("/users", users);
app.use('/results', results);
app.use('/questions', questions);
app.use('/paper-details', paperDetails);
app.use('/email',email);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));