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
      <Part part={parts['part1']['name']} exercise={parts['part1']['exercises']} />
      <Part part={parts['part2']['name']} exercise={parts['part2']['exercises']} />
      <Part part={parts['part3']['name']} exercise={parts['part3']['exercises']} />
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <p> {parts['part1'] + parts['part2'] + parts['part3']} </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  } 
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={ {part1:part1 , part2:part2 ,part3:part3} } />
      <Total parts={ {part1:part1['exercises'],part2:part2['exercises'] ,part3:part3['exercises']} } />
    </div>
  )
}

export default App