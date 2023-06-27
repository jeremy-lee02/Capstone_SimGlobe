import EmailVerify from "./components/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"


import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path= {`/${1}`} element= {<GamePlay />} />
      </Routes>
    </>
  )
}

export default App
