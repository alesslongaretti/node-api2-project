const express = require('express');

const posts = require('../db.js');

const router = express.Router();


// POST
router.post('/', (req, res) => {
    const newPost = req.body;

    console.log(req.body)

    posts.insert(newPost)
        .then(post => {
            if (!newPost.title && !newPost.contents) {
                res.status(400).json({ success: false, message: "Please provide title and contents for the post" })
            } else {
                res.status(201).json({ success: true, post })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
})


// POST Comments by ID

router.post('/:id/comments', (req, res) => {
    const Text = req.body;
    const id = req.params.id;

    posts.findById(id)
    .then(findId => {
        if(!findId) {
            res.status(404).json({ success: false, message: "The post with the specified ID does not exist."})
        } 
    posts.insertComment(Text, id)
        .then( comment => {
            if(comment.text) {
                res.status(201).json({ success: true, comment})
            } else {
                res.status(400).json({ success: false, message: "Please provide text for the comment."})
            }
        })
        .catch ( err => {
            res.status(500).json({ message: "There was an error while saving the comment to the database", err})
        })
        
    })
})
    

// GET Posts *****

router.get('/', (req, res) => {
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

// GET Posts by ID *****

router.get('/:id', (req, res) => {
    const id = req.params.id;

    posts.findById(id)
        .then(post => {
            if(post) {
                res.status(201).json({ success: true, post})
            } else {
                res.status(404).json({ success: false,  message: "The post with the specified ID does not exist." })
            }
        })
        .catch( err => {
            res.status(500).json({ succes: false, message: "The post information could not be retrieved.", err })
        });
});



// GET Comments by ID ***

router.get('/:id/comments', (req, res ) => {
    const { id } = req.params;

    posts.findCommentById(id) 
        .then(commentId => {
            if(!commentId) {
                res.status(404).json({ success: false, message: "The post with the specified ID does not exist." })
            } else {
                res.status(201).json({ success: true, commentId})
            }
        })
        .catch( err => {
            res.status(500).json({ message: "The comments information could not be retrieved.", err })
        });
});

// DELETE
router.delete('/:id', (req, res) => {

})


// PUT 
router.put('/:id', (req, res) => {
    
})




module.exports = router;