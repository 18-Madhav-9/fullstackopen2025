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
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let average = 0
  let positive = 0 

  if (props.total != 0 ) {
    average = (props.good-props.bad)/props.total
    positive = props.good / props.total * 100
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text= "good" value= {props.good} />
            <StatisticLine text= "neutral" value = {props.neutral} />
            <StatisticLine text= "bad" value = {props.bad} />
            <StatisticLine text= "all" value = {props.total} />
            <StatisticLine text= "average" value = {average.toFixed(1)} />
            <StatisticLine text= "positive" value = {`${positive.toFixed(1)} %`} />
          </tbody>
        </table>
      </div>
    )
  } 
  else return <div>No feedback given</div>

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
      <Statistics good = {good} bad ={bad} neutral={neutral} total = {total} />

    </div>
  )
}



export default App