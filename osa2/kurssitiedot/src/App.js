import React from 'react'

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

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return(
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course}/>
  </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
  <h2>{props.course.name}</h2>
  )
}

const Content = ({course}) => {
  console.log(course)
  return (
  <>
    {course.parts.map(info => 
      <Part key={info.id} part={info} />
    )}
  </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, add) => sum + add.exercises,0)
  return (
    <b>total of {total} exercises</b>
  )
}

export default App