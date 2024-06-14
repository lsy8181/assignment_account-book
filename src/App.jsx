import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  console.log("현재 유저 데이터:", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home user={user} />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
