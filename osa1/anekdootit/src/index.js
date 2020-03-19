import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(
    Array(6).fill(0)
  )

  const voteFor = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const max = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>


      <Button
        handleClick={() => voteFor()}
        text="Vote"
      />
      <Button
        handleClick={() => setSelected(
          Math.floor(Math.random() * 6))}
        text='Next anecdote'
      />

      <Header text="Anecdote with most votes" />
      <p>{props.anecdotes[max()]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)