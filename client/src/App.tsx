import Home from "./pages/Home"

import {Routes, Route} from "react-router-dom"
import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/room" element={<RoomStudent />} />
        <Route path="/roomhost" element={<RoomHost />} />
      </Routes>
    </>
  )
}

export default App
