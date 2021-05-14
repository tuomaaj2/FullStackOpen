import React from 'react'

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

export default Course