import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

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
    <ScrollProgress />
      <Navbar navs={navs} />
      <App/>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
