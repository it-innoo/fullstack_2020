const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

afterAll(() => {
  mongoose.connection.close()
})

describe('Blogs Tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map((r) => r.title)
    expect(title).toContain('React patterns')
  })

  test('identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()

    const oneBlog = response.body[0]
    expect(oneBlog.__v).toBeUndefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      url: 'https://martinfowler.com/microservices/',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Microservices Resource Guide'
    )
  })

  it('likes get default value if not set', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      url: 'https://martinfowler.com/microservices/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const created = response
      .body
      .filter(r => r.title === 'Microservices Resource Guide')

    expect(created[0].likes).toBe(0)
  })

  it('blog is not added without title', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/microservices/',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.initialBlogs.length)
  })

  it('blog is not added without url', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      title: 'Microservices Resource Guide',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length)
      .toBe(helper.initialBlogs.length)
  })
})
