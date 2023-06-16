import Home from "./pages/Home"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/signin" element = {<SignIn />} />
        <Route path="/register" element = {<Register />} />
      </Routes>
    </>
  )
}

export default App
