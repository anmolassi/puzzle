//require the library
const mongoose = require('mongoose');

//connect to the database
// mongoose.connect('mongodb+srv://assianmol:dashmeshassi@cluster0.385raui.mongodb.net/?retryWrites=true&w=majority');
// mongodb+srv://aassibe20:dashmeshassi@cluster0.f0po6ro.mongodb.net/test
mongoose.connect(process.env.MONGODB_URL);

// mongoose.connect('mongodb://127.0.0.1/Game_db');
//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});