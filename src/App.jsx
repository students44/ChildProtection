import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ReportAbuse from './pages/ReportAbuse';
import Emergency from './pages/Emergency';
import Education from './pages/Education';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactUs from './pages/ContactUs';
import Games from './pages/Games';
import Stories from './pages/Stories';
import Quizzes from './pages/Quizzes';
import VisualTools from './pages/VisualTools';

function App() {
  return (
    // All the pages Routing
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="report" element={<ReportAbuse />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="education" element={<Education />} />
          <Route path="resources" element={<Resources />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="games" element={<Games />} />
          <Route path="stories" element={<Stories />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="visual-tools" element={<VisualTools />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;





