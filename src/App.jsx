import Header from "./Header"
import Footer from "./Footer"
import Movies from "./Movies"
import { Fragment } from "react"



function App() {
  return(
    <>
        <Movies queryType={"upcoming"}/>  
    </>
    )
}

export default App
