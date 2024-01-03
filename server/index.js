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
const paperDetails = require('./routes/paperDetails')

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

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);
app.use('/results', results);
app.use('/questions', questions);
app.use('/paper-details', paperDetails)

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));