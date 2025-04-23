import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import RepoDetail from './pages/RepoDetail'
import Portfolio from './components/Portfolio'
import axios from 'axios'
import AOS from 'aos';
import "aos/dist/aos.css";

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    AOS.init();
    axios.get("./data/data.json").then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Router basename="">
      <Header navItems={data.navItems} socialLinks={data.socialLinks} />
      <Routes>
        <Route path="/" element={<Home hero={data.hero} />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/repo/:name" element={<RepoDetail />} />
      </Routes>
      <Footer socialLinks={data.socialLinks} />
    </Router>
  )
}

export default App