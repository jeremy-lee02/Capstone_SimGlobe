import EmailVerify from "./components/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"
import { RequireAuth} from "react-auth-kit"

import {Routes, Route} from "react-router-dom"

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
      </Routes>
    </>
  )
}

export default App
