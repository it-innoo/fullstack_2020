const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({
      error: `Not Found: ${request.url}`
    })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError'
    && error.kind === 'ObjectId') {
    return response
      .status(400)
      .send({ error: 'malformatted id' })
  }
  return next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint,
}
