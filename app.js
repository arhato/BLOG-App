require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mainRoutes = require('./routes/main');
const { connectToMongodb } = require('./your-module-file-name');


const app = express();
const PORT = 2000 || process.env.PORT;

// connection to database module
connectToMongodb().then(() => {
    // Start listening only after successful connection to the database
    app.listen(PORT, () => {
        console.log(`App listening to port ${PORT}`);
    });
}).catch((error) => {
    //print to console of there is an error
    console.error('Failed to connect to the database:', error);
});

app.use(express.static('public'));
app.use(express.json());

//models import
const User = require('./models/user.js');
const Blog = require('./models/blog.js');
const Comment = require('./models/comment.js');
const secretKey = 'your-secret-key';

//Backend template 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//routes
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
})

