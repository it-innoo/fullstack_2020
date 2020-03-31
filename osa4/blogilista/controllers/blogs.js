const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
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
