import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PageNotFound from './lib/PageNotFound';
import Portfolio from './pages/Portfolio';
import ProjectCaseStudy from './pages/ProjectCaseStudy';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
