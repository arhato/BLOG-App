const express= require('express');
const router=express.Router();

//Routes

//home page routes
router.get('', (req,res)=>{
    res.render('index');
});

//404 page route
router.get('/404', (req,res)=>{
    res.render('404');
});

//about page route
router.get('/about', (req,res)=>{
    res.render('about');
});

//contact page route
router.get('/contact', (req,res)=>{
    res.render('contact');
});

//article page route
router.get('/article', (req,res)=>{
    res.render('article');
});

//travel page route
router.get('/travel', (req,res)=>{
    res.render('travel');
});

//privacy-policy page route
router.get('/privacy-policy', (req,res)=>{
    res.render('privacy-policy');
});

//terms-conditions page route
router.get('/terms-conditions', (req,res)=>{
    res.render('terms-conditions');
});


module.exports=router;