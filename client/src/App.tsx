
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




function App() {

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
        <Route path="/" element= {<Home />} />
        <Route path="/admin" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path= "/gameplay" element= {
          <RequireAuth loginPath="/">
            <GamePlay />
          </RequireAuth>
        } />
<<<<<<< HEAD
        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/join/:roomId" element={<RoomStudent />} />
=======
        <Route path= {`/${1}`} element= {<GamePlay />} />
        {/* Room and Game play same route (Room isStart == true => GamePlay) */}
        <Route path= {`/room/:id`} element= {<GamePlay />} />
        <Route path="/room" element={<RoomStudent />} />
>>>>>>> tin
        <Route path="/roomhost" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
