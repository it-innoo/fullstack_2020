import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text='All' value={all} />
      <StatisticLine
        text='Average'
        value={(good - bad) / all}
      />
      <StatisticLine
        text="Positive"
        value={`${good / all * 100} %`}
      />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (

    <div>
      <Header text="Give feedback" />

      <Button
        handleClick={() => setGood(good + 1)}
        text="Good"
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="Neutral"
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text="Bad"
      />

      <Header text="Statistics" />
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
