const express = require('express');
const router = express.Router();
const Post = require('../models/post')
//Routes

//GET - home
router.get('', async (req, res) => {
    const locals = {
        title: "Node Blog API",
        description: "Blog App with node.js, express and mongo"
    }
    try {
        const data = await Post.find();
        res.render('index', { locals, data });

    } catch (error) {
        console.log(error)
    }
});



//about page route
router.get('/about', (req, res) => {
    res.render('about');
});

//contact page route
router.get('/contact', (req, res) => {
    res.render('contact');
});


//category page route
router.get('/category', (req, res) => {
    res.render('category');
});

//category page route
router.get('/single-post', (req, res) => {
    res.render('single-post');
});

//category page route
router.get('/search-result', (req, res) => {
    res.render('search-result');
});


module.exports = router;