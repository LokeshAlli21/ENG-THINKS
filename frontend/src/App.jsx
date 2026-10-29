import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import ContactUs from './pages/ContactUs.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
