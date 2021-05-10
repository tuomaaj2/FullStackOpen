import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  const { text, value, char } = props
  return(
    <tbody>
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
        <td>
          {char}
        </td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  let avg = (good*1 + neutral*0 + bad*(-1))/(good + neutral + bad)
  let all = good + neutral + bad
  let positive = (good)/(good+neutral+bad)*100

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
  <>
    <table>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={all}/>
    <StatisticLine text="average" value={avg}/>
    <StatisticLine text="positive" value={positive} char="%"/>
    </table>
  </>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App