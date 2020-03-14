const express = require('express');

const posts = require('../db.js');

const router = express.Router();


// POST
router.post('/', (req, res) => {
    const changes = req.body;
 
     posts.insert(changes)
         .then(post => {
             if (!changes.title || !changes.contents) {
                res.status(400).json({ success: false, message: 'Please provide title and contents for the post.'})
                 } else {
                    res.status(201).json({ success: true, post});
             }
         })
         .catch(err => {
             console.log(err);
             res.status(5000).json({
                 message: 'There was an error while saving the post to the database'
             });
         });
 });
 
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