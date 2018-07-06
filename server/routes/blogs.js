const express = require('express');
const router = express.Router();
const db = require('../db/models');
const Blog = db.Blog;

router.get('/', (req, res) => {
    Blog
    .findAll()
    .then(blogs => {
        res.status(200).json(blogs);
    });
});

router.get('/featured', (req, res) => {
    Blog
    .findAll({where: {featured: true}})
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(404).send(err)
    })
});

router.post('/', (req, res) => {
    const { authorId } = req.query
    const blogPost = { ...req.body, authorId }

    Blog.create(blogPost)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(404).send(err)
        })
});

router.put('/:id', (req, res) => {
    Blog
    .findById(req.params.id)
    .then(blog => {
        if(blog) {
            blog.update(req.body)
           return blog.save();
        } else {
            res.status(404).send("Unknown Blog ID")
        }
    })
    .then(updatedBlog => res.status(204).json(updatedBlog))
    .catch(err => {
        res.status(500).send(err)
    })
});

router.get('/:id', (req, res) => {
    Blog
    .findById(req.params.id)
    .then(blog => {
        blog ?
        res.status(200).json(blog) :
        res.status(404).send("Unknown Blog")
    })
    .catch(err => {
        res.status(500).send(err)
    })
});

router.delete('/:id', (req, res) => {
    Blog
    .findById(req.params.id)
    .then(blog => {
        if(blog) {
           return blog.destroy(req.body);
        } else {
            res.status(404).send("Unknown Blog ID")
        }
    })
    .then(deletedBlog => res.status(200).json(deletedBlog))
    .catch(err => {
        res.status(500).send(err)
    })
});

module.exports = router;
