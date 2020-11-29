const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const PORT = 5000;
const HOST = 'localhost';
//make an application from express() top-level function
const app = express();
const Item = require('./model/itemSchema');
const listRouter = require('./routes/listRouter');
const session = require('express-session');
const hbs = require('hbs');
// View engine setup
app.set('view engine', 'hbs');
app.use(express.json());
require('dotenv').config()
// static folder use
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
///connect to database**************
const MongoDB_URL = process.env.MongoDB_URL;

// connect DB****************
mongoose.connect(MongoDB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('MongoDB database is connected........');
    })
    .catch((error) => {
        console.log('Database is not connected because:' + error.message)
    });
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000 * 60 * 24 // 1 day
        }
    }));
    app.use(flash());
// Routes*********************
app.get('/', listRouter)
app.use('/list', listRouter)

// Routing Error handling
// asteric(*) means all other routes
app.get('*', (req, res) => {
    res.render('404', { url: req.url });
});
app.listen(PORT, HOST, () => {
    console.log("Server is running at port 5000")
})



