import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'

const navs = [
  { path: '/', label: 'Home' },
  { path: '/aboutus', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/contactus', label: 'Contact Us' },
]

function AppShell() {
  const { pathname } = useLocation()
  const showNavbar = navs.some((nav) => nav.path === pathname)

  return (
    <>
      {showNavbar && <Navbar navs={navs} />}
      <App />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>,
)
