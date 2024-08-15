import Movies from "./routes/Movies"
import { Fragment } from "react"

function App() {
  return(
    <>
        <Movies queryType={"upcoming"}/>  
    </>
    )
}

export default App
