const express = require('express');

const posts = require('../db.js');

const router = express.Router();



 
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