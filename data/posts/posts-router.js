const express = require('express');

const posts = require('../db.js');

const router = express.Router();


// POST *****
router.post('/', (req, res) => {

    newPost = req.body;
    console.log(req.body)

    if(!newPost.title || !newPost.contents){
        res.status(400).json({ success: false, message: "Please provide title and contents for the post" })
    } else {
    posts.insert(newPost)
        .then(post => {     
                res.status(201).json({ success: true, newPost })
        })
        .catch(err => {
            res.status(500).json({ success: false,  message: "There was an error while saving the post to the database", err })
        })
    }
});


// POST Comments by ID ***

router.post('/:id/comments', (req, res) => {

    const text = req.body.text;
    const id = req.params.id;
    const newComment = { text: text, post_id: id}

    if(!text) {
        res.status(400).json({success: false, message: "Please provide text for the comment."})
    } else {
        posts.findById(id)
            .then(idExists => {
                if(!idExists) {
                res.status(404).json({ success: false, message: "The post with the specified ID does not exist."})
                 } else {
                     posts.insertComment(newComment)
                        .then((comment ) => {
                                res.status(201).json({success: true, comment})
                        })
                        .catch(err => {
                            res.status(500).json({ success: false, message: "There was an error while saving the comment to the database", err})
                        }) 
            } })  
    }
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

// DELETE ***
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    posts.remove(id)
        .then(deletePost => {
            if(deletePost) {
                res.status(204).end();
            } else {
                res.status(404).json({ success: false, message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: "The post could not be removed", err})
        }) 

})


// PUT ***
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    posts.update(id, changes)
        .then(updatedPost => {
            if(!updatedPost) {
                res.status(404).json({ success: false, message: "The post with the specified ID does not exist."  })
            } else if (!changes.title || !changes.contents) {
                res.status(400).json({ success: false, message: "Please provide title and contents for the post."})
            } else {
                res.status(200).json({ success: true, changes})
            }
        })
        .catch(err => {
            res.status(500).json({ sucess: false, message: "The post information could not be modified."})
        })
});


module.exports = router;