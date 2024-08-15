import { Outlet } from "react-router-dom"
import Movies from "./routes/Movies"
import { Fragment } from "react"

function App() {
  return(
    <>
        <Movies queryType={"upcoming"}/>

        <Outlet/> 
    </>
    )
}

export default App
