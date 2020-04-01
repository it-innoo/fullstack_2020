const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const o = returnedObject
    o.id = returnedObject._id
    delete o._id
    delete o.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
