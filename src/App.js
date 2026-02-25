import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { useState } from "react";


function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={isAuth ? <Dashboard setIsAuth={setIsAuth} /> : <Login setIsAuth={setIsAuth} />} />
         <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
