
import { RequireAuth} from "react-auth-kit"
import React, { useEffect, useState } from "react";

import {Routes, Route} from "react-router-dom"

import RoomStudent from "./pages/RoomStudent"
import RoomHost from "./pages/RoomHost"
import HomeStudent from "./pages/HomeStudent"
import socketService from "./services/socketService";
import EmailVerify from "./components/EmailVerify"
import GamePlay from "./pages/GamePlay"
import Dashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/LeaderBoard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Login from "./pages/Login";




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
        <Route path="/" element= {<LecturerDashboard />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/login" element={<Login/>}/>
        <Route path= "/gameplay" element= {
          <RequireAuth loginPath="/login">
            <GamePlay />
          </RequireAuth>
        } />

        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/join/:roomId" element={<RoomStudent />} />

        <Route path= {`/game/:id`} element= {<GamePlay />} />
        <Route path="/join/:roomId" element={<RoomStudent />} />
        <Route path= {`/${1}`} element= {<GamePlay />} />
        {/* Room and Game play same route (Room isStart == true => GamePlay) */}
        <Route path= {`/room/:id`} element= {<GamePlay />} />
        <Route path="/room" element={<RoomStudent />} />
        <Route path="/roomhost" element={<RoomHost />} />
        <Route path="/homestudent" element={<HomeStudent />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App
