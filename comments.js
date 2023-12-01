// Create web server with Node.js and Express framework.
// GET and POST requests.
// GET requests are used to send data to the server.
// POST requests are used to receive data from the server.
// REST API.
// Use JSON file as database.
// Use AJAX to get data from the server.
// Use AJAX to send data to the server.
// Use AJAX to update data in the server.
// Use AJAX to delete data in the server.
// Use AJAX to upload files to the server.

// Load the express module.
var express = require('express');

// Create the express app.
var app = express();

// Load the body-parser module.
var bodyParser = require('body-parser');

// Load the multer module.
var multer = require('multer');

// Load the fs module.
var fs = require('fs');

// Load the path module.
var path = require('path');

// Load the comments.json file.
var comments = require('./comments.json');

// Set the view engine to ejs.
app.set('view engine', 'ejs');

// Set the views directory.
app.set('views', './views');

// Set the static files directory.
app.use(express.static('./public'));

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json.
app.use(bodyParser.json());

// Create the upload directory.
var uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Create the storage.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Create the upload.
var upload = multer({ storage: storage });

// Create the homepage route.
app.get('/', function (req, res) {
    res.render('index', { comments: comments });
});

// Create the add comment route.
app.post('/add-comment', function (req, res) {
    var comment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    comments.unshift(comment);
    res.redirect('/');
});

// Create the edit comment route.
app.get('/edit-comment/:email', function (req, res) {
    var email = req.params.email;
    var comment = comments.find(function (comment) {
        return comment.email === email;
    });
    res.render(''); // TODO
});