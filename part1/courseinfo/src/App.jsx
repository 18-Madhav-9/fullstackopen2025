const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part , exercise }) => {
  return (
    <p> {part} {exercise} </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].part} exercise={parts[0].exercise} />
      <Part part={parts[1].part} exercise={parts[1].exercise} />
      <Part part={parts[2].part} exercise={parts[2].exercise} />
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <p> {parts[0].exercise + parts[1].exercise + parts[2].exercise} </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [ { part:'Fundamentals of React' , exercise:10 } , 
    { part:'Using props to pass data' , exercise:7 } ,
    { part:'State of a component' , exercise:14 }  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App