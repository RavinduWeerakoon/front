// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login.Jsx'
import Register from './components/auth/Register.jsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

// function Login() {
//   return <div>Login Page</div>
// }

function Logout() {
  return <div>Logout Page</div>
}


export default App