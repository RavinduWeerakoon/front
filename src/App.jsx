// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/auth/Register.jsx'
import WelcomPage from './Pages/GuestPage.jsx/index.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from 'src/Dashboard/Dashboard'
import JournalEntryPage from './components/basic/JournalEntryPage.jsx';
import SampleHome from './components/basic/sampleHome.jsx';
import RegisterDoc from './components/auth/RegisterDoc.jsx';
import SignIn from './pages/login/SignIn.jsx'
import UserDashboard from './Pages/UserDashboard/index.jsx';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e88e5', // Primary color
    },
    secondary: {
      main: '#ff4081', // Secondary color
    },
    background: {
      default: '#EEF5F7', // Background color
      paper: '#ffffff', // Paper color
      
    },
    text: {
      primary: '#333333', // Primary text color
      secondary: '#666666', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});
function App() {
  return (
    <BrowserRouter>
       <ThemeProvider theme={lightTheme}>
      <Routes>
        <Route path="/" element={<WelcomPage />} />
        <Route path="/JournalEntry" element={<JournalEntryPage />} />
        
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path='/sample' element={<SampleHome/>}/>
        <Route path='/registerdoc' element={<RegisterDoc/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/userdashboard/*' element={<UserDashboard/>}/>

      </Routes>
      </ThemeProvider>
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