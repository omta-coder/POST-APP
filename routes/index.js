var express = require('express');
var router = express.Router();
var POSTS=[
  {
    image:"https://images.unsplash.com/photo-1623771702313-39dc4f71d275?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    name:"xyz",
    like:0
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create-post', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.post('/create-post', function(req, res, next) {
  const post ={
            ...req.body,
            date:new Date(),
            like:0
          }
          POSTS.push(post)
          res.redirect("/read-posts")
          //res.json(post)
});

router.get('/read-posts', function(req, res, next) {
  res.render('read', { post: POSTS });
});

router.get('/delete/:index', function(req, res, next) {
  POSTS.splice(req.params.index,1)
  res.redirect("/read-posts")
});

router.get('/update/:index', function(req, res, next) {
  const dets = POSTS[req.params.index]
  res.render("update",{ post:dets,index:req.params.index });
});

router.post('/update/:index', function(req, res, next) {
  POSTS[req.params.index] = req.body; 
  res.redirect(`/read-posts`)
});

router.get('/like/:index', function(req, res, next) {
   const post = POSTS[req.params.index];
   post.like+=1;
   POSTS[req.params.index]=post;
  res.redirect(`/read-posts`)
});

module.exports = router;
