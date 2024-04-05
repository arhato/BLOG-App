require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mainRoutes = require('./server/routes/main');

const app = express();
const PORT = 2000

app.use(express.static('public'));

//Backend template middleware
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//routes
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
})