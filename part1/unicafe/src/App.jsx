import { useState } from "react"

const Display = (props) => {
  return (
    <h1> {props.text} </h1>
  )
}

const Button = (props) => {
  return ( 
    <button onClick={props.handler} > {props.text} </button>
  )
}
const Count = (props) => {
  return (
    <p>{props.text} {props.count} </p>
  )
}

const Statistics = (props) => {

  let average = 0
  let positive = 0 

  if (props.total != 0 ) {
    average = (props.good-props.bad)/props.total
    positive = props.good / props.total * 100
  }

  return (
    <div>
      <p> {"average"} {average} </p>
      <p> {"positive"} {positive} </p>
    </div>

  )
}

const App = (props) => {

  const [good,setGood] = useState(0) 
  const [neutral , setNeutral] = useState(0)
  const [bad , setBad ] = useState(0)
  const total = good+bad+neutral 

  const handleGood = ()=> {
    const newGood = good+1 
    setGood(newGood)
  }
  const handleNeutral = () => {
    const newNeutral = neutral+1 
    setNeutral(newNeutral)
  }
  const handleBad = () => {
    const newBad = bad+1
    setBad(newBad)
  }

  return (
    <div>
      <Display text = {"give feedback"} />
      
      <Button handler = {handleGood} text = {"good"} />
      <Button handler = {handleNeutral} text = {"neutral"} />
      <Button handler = {handleBad} text= {"bad"} />
      
      <Display text = {"statistics"} />
      <Count text= {"good"} count= {good} />
      <Count text= {"neutral"} count= {neutral} />
      <Count text= {"bad"} count= {bad} />
      <Count text= {"all"} count={total} />

      <Statistics good = {good} bad ={bad} total = {total} />

    </div>
  )
}



export default App