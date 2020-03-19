import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
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

const Total = (props) => {
  return (
    <p>
      Number of exercises  {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )

}

const App = () => {
  const course = {
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
