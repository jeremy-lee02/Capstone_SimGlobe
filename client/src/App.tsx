import EmailVerify from "./pages/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"
import { RequireAuth} from "react-auth-kit"
import {Routes, Route} from "react-router-dom"
import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"
import HomeStudent from "./pages/HomeStudent"
import Dashboard from "./pages/Dashboard"
import Rules2 from "./components/dashboard/Rules2"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/admin" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path= "/gameplay" element= {
          <RequireAuth loginPath="/">
            <GamePlay />
          </RequireAuth>
        } />
        <Route path= {`/${1}`} element= {<GamePlay />} />
        {/* Room and Game play same route (Room isStart == true => GamePlay) */}
        <Route path= {`/room/:id`} element= {<GamePlay />} />
        <Route path="/room" element={<RoomStudent />} />
        <Route path="/roomhost" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rules2" element={<Rules2 />} />
      </Routes>
    </>
  )
}

export default App
