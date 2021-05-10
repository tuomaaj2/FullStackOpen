import React, { useState } from 'react'

const Button = ({ text, handleClick}) => {
  return(
    <button onClick={handleClick}> 
      {text}
    </button>
  )
}

const Leader = ({anecdots, points}) => {
  let i = points.indexOf(Math.max(...points));
  return(
    <div>
      {anecdots[i]} <br />
      has {points[i]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  let init = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0); 
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(init)
  
  const nextAnecdote = () => {
    let next = Math.floor(Math.random() * (anecdotes.length))
    setSelected(next)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    nextAnecdote()
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]} <br />
        has {points[selected]} votes
      </div>
      <Button text="Vote" handleClick={vote} />
      <Button text="next anecdote" handleClick={nextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Leader anecdots={anecdotes} points={points} />
    </div>
  )
}

export default App