const User = require('../models/User')
const {idGenerator} = require("../controllers/userController");
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const updateDocuments = async () => {
    try {
        // Fetch all documents from the collection
        const documents = await User.find();

        // Update each document with a unique userId
        for (const document of documents) {
            document.userId = (document.teacher ? 't' : 's') + idGenerator();
            await document.save();
        }

        console.log('Documents updated with unique userIds.');
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        mongoose.connection.close();
    }
};

updateDocuments();
