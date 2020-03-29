const dummy = () => 1

const totalLikes = (blogs) => blogs
  .map((blog) => blog.likes)
  .reduce((total, amount) => total + amount, 0)

const byLikes = (a, b) => b.likes - a.likes

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs === null || blogs.length === 0) {
    return {}
  }

  const { title, author, likes } = blogs.sort(byLikes)[0]

  return { title, author, likes }
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
}
