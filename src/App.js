import React , {Component, useState} from "react"
import Zoom from "./Zoom"
import "./App.css"

const App = () => {

  const [launch, setLaunch] = useState(false)
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("false")

  return (
    <div>
      <h2 >Zoom here</h2>
      <input onChange={e => setNumber(e.target.value)}/>
      <input onChange={e => setPassword(e.target.value)}/>
      <button onClick={() => setLaunch(true)}>Click to join</button>
      {launch && <Zoom mNumber={parseInt(number)} password={password}/>}
    </div>
  )

}

export default App