const express = require('express');
const router = express.Router();
const db = require('../db/models');
const Author = db.Author;
const Blog = db.Blog;

router.get('/', (req, res) => {
    Author
    .findAll()
    .then(authors => {
        res.status(200).json(authors);
    });
});

router.post('/', (req, res) => {
    var newAuthor = new Author(req.body)
    newAuthor.save()
    .then(item => {
        res.status(201).json(item)
    })
    .catch(err => {
        res.status(404).send(err)
    })
});

router.put('/:id', (req, res) => {
    Author
    .findById(req.params.id)
    .then(author => {
        if(author) {
            author.update(req.body)
           return author.save();
        } else {
            res.status(404).send("Unknown Author ID")
        }
    })
    .then(updatedBlog => res.status(204).json(updatedBlog))
    .catch(err => {
        res.status(500).send(err)
    })
});

router.get('/:id', (req, res) => {
    Author
    .findById(req.params.id)
    .then(author => {
        author ? 
        res.status(200).json(author) : 
        res.status(404).send("Unknown Author")
    })
    .catch(err => {
        res.status(500).send(err)
    })
});


router.delete('/:id', (req, res) => {
    Author
    .findById(req.params.id)
    .then(author => {
        if(author) {
           return author.destroy();
        } else {
            res.status(404).send("Unknown Author ID")
        }
    })
    .then(deletedAuthor => res.status(200).json(deletedAuthor))
    .catch(err => {
        res.status(500).send(err)
    })
});

router.get('/:id/blogs', (req, res) => {
    Blog
    .findAll({where: {authorId: req.params.id}})
    .then( item => {
        res.status(200).send(item)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

module.exports = router;
