
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
import AdminLogin from "./pages/AdminLogin";




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
        //Lecture
        <Route path="/login" element={<Login/>}/>
        <Route path="/roomhost/:room" element={
          <RequireAuth loginPath={'/login'}>
            <RoomHost />
          </RequireAuth>} />
        <Route path="/" element={
          <RequireAuth loginPath={'/login'}>
            <LecturerDashboard />
          </RequireAuth>} />
        <Route path="/users/:id/verify/:token" element={
          <RequireAuth loginPath={'/login'}>
            <EmailVerify />
          </RequireAuth>} />

        //User
        <Route path= "/play" element= {<GamePlay/>} />
        <Route path="/join/:roomId" element={<RoomStudent />} />
        <Route path="/homestudent" element={<HomeStudent />} />

        //Admin
        <Route path="/admin" element={
          <RequireAuth loginPath={'/login'}>
            <AdminLogin />
          </RequireAuth>} />
        <Route path="/admin/dashboard" element={
          <RequireAuth loginPath={'/login'}>
            <Dashboard />
          </RequireAuth>} />
        <Route path="/leaderboard" element={
          <RequireAuth loginPath={'/login'}>
            <Leaderboard />
          </RequireAuth>} />
      </Routes>
    </>
  )
}

export default App
