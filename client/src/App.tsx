import Home from "./pages/Home"

import {Routes, Route} from "react-router-dom"
import RoomStudent from "./pages/RoomStudent"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/room" element={<RoomStudent />} />
      </Routes>
    </>
  )
}

export default App
