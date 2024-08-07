import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/Menu/Menu'
import LayoutMenus from './layout/DefaultLayout'
import { Navigate, Route, Routes, useLocation, redirect as Redirect  } from 'react-router-dom'
import Login from './components/authentication/Login'
import { useAuthContext } from './context/AuthContext'
import Register from './components/authentication/Register'


function App() {
const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()
  
	const { authUser } = useAuthContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <div>
        <Routes>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/edittask/:slug"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="/alltask" element={!authUser ? <Navigate to="/login" /> :<Menu condition="all" />} />
        <Route path="/todaytask" element={!authUser ? <Navigate to="/login" /> :<Menu condition="today" />} />
        <Route path="/completetask" element={!authUser ? <Navigate to="/login" /> :<Menu condition="completed" />} />
        <Route path="/incompletetask" element={!authUser ? <Navigate to="/login" /> :<Menu condition="incomplete" />} />
        <Route path="/" element={<Navigate to="/alltask" />} />
      </Routes>
  </div>
  )
}

export default App
