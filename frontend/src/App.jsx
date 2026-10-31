import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import ContactUs from './pages/ContactUs.jsx'

function Placeholder({ title }) {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 pb-16 pt-32 sm:px-8">
      <h1 className="font-['Montserrat',sans-serif] text-3xl font-extrabold tracking-tight text-[var(--ink)]">
        {title}
      </h1>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="*" element={<Placeholder title="Page not found" />} />
    </Routes>
  )
}

export default App
