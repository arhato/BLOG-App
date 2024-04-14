require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/db/connect');
// const session = require('express-session');


// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// // Import Routers
// const blogRouter = require('./routes/blogRouter');
// const commentRouter = require('./routes/commentRouter');
// const userRouter = require('./routes/userRouter');

const app = express();
const PORT = 2000 || process.env.PORT;



// Connect to the database
connectDB()
//     .then(() => {
//         
//     })
//     .catch((error) => {
//         console.error('Failed to connect to the database:', error);
//         process.exit(1); // Exit the process if unable to connect to the database
//     });

// // Middleware
app.use(express.static('public'));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser);

// // app.use(session({
// //     secret: process.env.JWT_SECRET,
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { maxAge: new Date(Date.now() + (3600000)) }
// // }));

// Set up EJS
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// // Routes
app.use('/', require('./server/routes/main'))// // app.use('/', mainRouter);
// app.use('/blogs', blogRouter); // Mount blog routes at /blogs
// app.use('/comments', commentRouter); // Mount comment routes at /comments
// app.use('/users', userRouter); // Mount user routes at /users

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}/`);
});