const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const {
  unknownEndpoint,
} = require('./utils/middleware')

const app = express()

logger.info(`Environment on app.js: ${process.env.NODE_ENV}`)
app.use(cors())
app.use(express.json())

morgan
  .token('body', (req) => JSON.stringify(req.body))
app.use(morgan(
  ':method '
  + ':url '
  + ':status '
  + ':res[content-length] - '
  + ':response-time ms '
  + ':body',
))


logger.info('connecting to https://cloud.mongodb.com/v2/5e7cac3ad304d4549b07e897#')

mongoose.connect(config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)

module.exports = app
