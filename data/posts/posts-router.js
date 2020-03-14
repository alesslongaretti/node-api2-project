const express = require('express');

const posts = require('../db.js');

const router = express.Router();


// POST
router.post('/', (req, res) => {
    const newPost = req.body;

    console.log(req.body)

    posts.insert(newPost)
        .then(post => {
            if(!newPost.title && !newPost.contents) {
                res.status(400).json({ message: "Please provide title and contents for the post"})
            } else {
                res.status(201).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        })
})
 
 // GET 
 
 router.get('/' , (req,res) => {
     console.log(req.query);
     posts.find(req.query)
         .then(post => {
             res.status(201).json(post);
         })
         .catch(err => {
             console.log(err)
             res.status(500).json({ 
                 message: 'The posts information could not be retrieved.'
             });
         });
 });
 
 
 module.exports = router;