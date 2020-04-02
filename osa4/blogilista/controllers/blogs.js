const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

router.post('/', async (request, response) => {
  const { body } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  return response
    .status(204)
    .end()
})

router.put('/:id', async (request, response) => {
  const { body } = request

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: body.likes },
    { new: true },
  )
  response.status(201).json(updatedBlog.toJSON())
})

module.exports = router
