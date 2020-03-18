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
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
    <table>
      <thead>
      </thead>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
      </tbody>

      <tfoot>
        <StatisticLine text='All' value={all} />
        <StatisticLine
          text='Average'
          value={(good - bad) / all}
        />
        <StatisticLine
          text="Positive"
          value={`${good / all * 100} %`}
        />
      </tfoot>
    </table>
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
