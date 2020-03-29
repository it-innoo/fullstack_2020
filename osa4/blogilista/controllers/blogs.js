const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', (_request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
})

router.post('/', (request, response, next) => {
  const { body } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
  })

  blog
    .save()
    .then((result) => {
      response.status(201).json(result.toJSON())
    })
    .catch((error) => next(error))
})

module.exports = router
