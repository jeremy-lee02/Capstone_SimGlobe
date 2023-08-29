<<<<<<< HEAD
import EmailVerify from "./pages/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"
import { RequireAuth} from "react-auth-kit"
=======

import { RequireAuth} from "react-auth-kit"
import React, { useEffect, useState } from "react";
>>>>>>> test
import {Routes, Route} from "react-router-dom"

import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"
import HomeStudent from "./pages/HomeStudent"
<<<<<<< HEAD
import Dashboard from "./pages/Dashboard"




function App() {

=======
import socketService from "./services/socketService";
import EmailVerify from "./components/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Home from "./pages/Home"
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

  
>>>>>>> test
  return (
    <>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
<<<<<<< HEAD
        <Route path= {`/${1}`} element= {<GamePlay />} />
        {/* Room and Game play same route (Room isStart == true => GamePlay) */}
        <Route path= {`/room/:id`} element= {<GamePlay />} />
        <Route path="/room" element={<RoomStudent />} />
=======
        <Route path= "/gameplay" element= {
          <RequireAuth loginPath="/">
            <GamePlay />
          </RequireAuth>
        } />
        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/join/:roomId" element={<RoomStudent />} />
>>>>>>> test
        <Route path="/roomhost" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
