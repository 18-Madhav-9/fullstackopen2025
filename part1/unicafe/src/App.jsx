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

const Stat = (props) => {
  return (
    <p>{props.text} {props.count} </p>
  )
}

const App = (props) => {

  const [good,setGood] = useState(0) 
  const [neutral , setNeutral] = useState(0)
  const [bad , setBad ] = useState(0)

  const handleGood = ()=> {setGood(good+1)}
  const handleNeutral = () => {setNeutral(neutral+1)}
  const handleBad = () => {setBad(bad+1)}


  return (
    <div>
      <Display text = {"give feedback"} />
      
      <Button handler = {handleGood} text = {"Good"} />
      <Button handler = {handleNeutral} text = {"Neutral"} />
      <Button handler = {handleBad} text= {"Bad"} />
      
      <Display text = {"statistics"} />
      <Stat text= {"Good"} count= {good} />
      <Stat text= {"Neutral"} count= {neutral} />
      <Stat text= {"Bad"} count= {bad} />

    </div>
  )
}



export default App