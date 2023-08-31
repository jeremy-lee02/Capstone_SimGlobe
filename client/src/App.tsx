
import { RequireAuth} from "react-auth-kit"
import React, { useEffect, useState } from "react";
import EmailVerify from "./pages/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"

import {Routes, Route} from "react-router-dom"

import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"
import HomeStudent from "./pages/HomeStudent"
import socketService from "./services/socketService";
import Dashboard from "./pages/Dashboard"
import GameContext from "./gameContext";




function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [codeRoom, setCodeRoom] = useState("");
  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element= {
          <RequireAuth loginPath="/login">
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/admin" element= {<Home />} />
        <Route path="/login" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path= "/gameplay" element= {
          <RequireAuth loginPath="/login">
            <GamePlay />
          </RequireAuth>
        } />
        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/join/:roomId" element={<RoomStudent />} />
        <Route path="/play" element={<GamePlay />} />
        {/* Room and Game play same route (Room isStart == true => GamePlay) */}
        <Route path="/room" element={<RoomStudent />} />
        <Route path="/roomhost/:roomId" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
