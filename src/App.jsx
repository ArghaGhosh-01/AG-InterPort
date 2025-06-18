import { useEffect } from 'react';
import Navbar from "./components/navbar";
import InteractiveBoxesSection from "./components/InteractiveBoxesSection";
import FullWidthName from "./components/FullWidthName";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  useEffect(() => {
    // Enable smooth scrolling for the entire app
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Reset when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="smooth-scroll-container">
      <Navbar />
      <InteractiveBoxesSection />
      <FullWidthName />
      <About />
      <Projects />
    </div>
  );
}

export default App;