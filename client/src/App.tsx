import EmailVerify from "./components/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"
import HomeStudent from "./pages/HomeStudent"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path= {`/${1}`} element= {<GamePlay />} />
        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/room" element={<RoomStudent />} />
        <Route path="/roomhost" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
