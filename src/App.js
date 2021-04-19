import React , {useState} from "react"
import Zoom from "./Zoom"
import "./App.css"

const App = () => {

  const [launch, setLaunch] = useState(false)
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("false")

  return (
    <div>
      <h2 >Zoom here</h2>
      <label>Enter Zoom ID</label>
      <input placeholder="Enter Id" onChange={e => setNumber(e.target.value)}/>
      <label>Enter Password</label>
      <input placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={() => setLaunch(true)}>Click to join</button>
      {launch && <Zoom mNumber={parseInt(number)} password={password}/>}
    </div>
  )

}

export default App