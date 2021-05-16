const express = require('express');
const port = 8000;
const path = require('path');

// Including database config file
const db = require("./config/mongoose");
// Importing the collection ListItem
const ListItem = require("./models/item");

const app = express();

// app.use() is used for adding middlewares
// This is needed so that we can parse the post request conatining the data sent from Form
app.use(express.urlencoded());
// This is needed to include static files(css, javascript) to our project
app.use(express.static("assests"));

// Setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, resp){
    // Fetching data from database and displaying it
    ListItem.find({}, function(err, items){
        if(err){
            console.log("Error in fetching items: ", err);
            return;
        }

        return resp.render('home', {
            items: items
        });
    });
});

app.post('/add-item', function(req, resp){
    //console.log(req.body);

    // Creating a document and adding it to the collection that we imported
    ListItem.create(req.body, function(err, newItem){
        if(err){
            console.log("Error in creating item: ", err);
            return;
        }
        //console.log(newItem);

        // To go back to immediate previous page...we can go as
        return resp.redirect("back");
    });
});

app.get('/delete-item', function(req, resp){
    let id = req.query.id;

    // Every document created have a unique id which we can use for deleting
    // findByIdAndDelete is a function which takes an id query..finds object corresponding to it and deletes it automatically
    ListItem.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting: ", err);
            return;
        }
        return resp.redirect("back");
    });
});

app.listen(port, function(err){
    if(err){
        console.log("Error in starting server.", err);
        return;
    }

    console.log("Express server started!!");
});