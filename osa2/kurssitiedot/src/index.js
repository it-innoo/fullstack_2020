import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h3>{text}</h3>
  )
}

const Part = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}
        </p>)
      }
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <Part parts={parts} />
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((summa, part) =>
    summa + part.exercises, 0);

  return (
    <p>Total of {total} exercises</p>
  )
}

const Course = ({ course }) => {
  console.log('in Course', course)
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.log('App toimii..')
  console.log(courses)
  const elements = () => courses.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )

  return (
    <div>
      <h1>Web development curricum</h1>
      {elements()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
