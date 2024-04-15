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

//GET - post:id
router.get('/post/:id', async (req, res) => {

    try {
        const posts = await Post.find();
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });
        const locals = {
            title: data.title,
            description: "Blog App with node.js, express and mongo"
        }
        res.render('post', { locals, posts, data });

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
    const locals = {
        title: "Contact Us",
        description: "Blog App with node.js, express and mongo"
    }
    res.render('contact', locals);});


//POST - category: tags
router.get('/category/:tags', async (req, res) => {
    try {
        const slug = req.params.tags;
        const currentPage = parseInt(req.query.page) || 1; // default page to 1 if not provided
        const limit = 10; // set the limit of items per page
        const startIndex = (currentPage - 1) * limit;

        const totalPosts = await Post.countDocuments({ tags: { $in: [slug] } });
        const totalPages = Math.ceil(totalPosts / limit);

        const data = await Post.find({ tags: { $in: [slug] } })
            .limit(limit)
            .skip(startIndex);

        const posts = await Post.find();

        const locals = {
            title: "Category: " + slug,
            description: "Blog App with node.js, express and mongo."
        }

        res.render('category', {
            data,
            posts,
            locals,
            currentPage,
            totalPages
        });
    } catch (error) {
        console.log(error);
    }
});



//all posts page route
router.get('/latest-posts', async (req, res) => {
    const locals = {
        title: "Latest Post",
        description: "Latest post in the website."
    }
    let limit = 10;
    let page = parseInt(req.query.page) || 1;

    try {
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);
        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.render('latest-posts', {
            locals,
            posts,
            currentPage: page,
            totalPages,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//POST - post: searchInput
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Blog App with node.js, express and mongo."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const page = parseInt(req.query.page) || 1; // default page to 1 if not provided
        const limit = 10; // set the limit of items per page

        const startIndex = (page - 1) * limit;

        // Query the database once to get both data and totalItems
        const [data, totalItems] = await Promise.all([
            Post.find({
                $or: [
                    { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { tags: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
                ]
            }).limit(limit).skip(startIndex),
            Post.countDocuments({
                $or: [
                    { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { tags: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
                ]
            })
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        const posts = await Post.find(); // Not sure if you need all posts for something else

        res.render('search', {
            data,
            locals,
            posts,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
