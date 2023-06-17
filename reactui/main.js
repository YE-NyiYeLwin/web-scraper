import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './About';
import Navbar from './Navbar';
import Job from './Job';

const Main = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/news" element={<App />}/>
        <Route path="/youtube" element={<About />}/>
        <Route path="/job" element={<Job />}/>
      </Routes>
    </Router>
  );
};

export default Main;
