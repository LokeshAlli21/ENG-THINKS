import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar navs={navs} />
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
