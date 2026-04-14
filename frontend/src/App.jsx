import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import ResultsDashboard from './components/ResultsDashboard';
import { Sparkles, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Sub-component for smooth scrolling if on landing page, otherwise normal navigation
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const handleClick = (e) => {
    if (isHome && to.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        // Adjust for fixed header
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  if(!isHome && to.startsWith('#')) {
    to = `/${to}`;
  }

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className="relative font-bold text-gray-600 hover:text-purple-600 transition-colors duration-300 group px-2 py-1"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Ambient background is handled in index.css */}
        
        {/* Header - Floating Glass */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 glass-panel-heavy border-x-0 border-t-0 rounded-none' : 'py-5 bg-transparent border-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 z-50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center text-white font-black tracking-tighter text-lg shrink-0">
                S
              </div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
                StyleSense <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">AI</span>
              </h1>
            </Link>

            {/* Desktop Navigation Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="#how-it-works">How It Works</NavLink>
              <NavLink to="#features">Features</NavLink>
              <NavLink to="#occasions">Occasions</NavLink>
              <NavLink to="#faq">FAQ</NavLink>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <Link 
                to="/wizard" 
                className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Styled <Sparkles className="w-4 h-4" />
              </Link>
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-purple-600 bg-gray-100 rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Dropdown */}
          <div className={`md:hidden absolute top-full left-0 w-full glass-panel-heavy border-t border-gray-100 transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100 block' : 'scale-y-0 opacity-0 hidden'}`}>
            <nav className="flex flex-col p-6 gap-6">
              <NavLink to="#how-it-works">How It Works</NavLink>
              <NavLink to="#features">Features</NavLink>
              <NavLink to="#occasions">Occasions</NavLink>
              <NavLink to="#faq">FAQ</NavLink>
              <Link 
                to="/wizard" 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Styled <Sparkles className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow flex flex-col pt-24 pb-12">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/results" element={<ResultsDashboard />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="w-full py-10 glass-card border-x-0 border-b-0 rounded-none mt-auto text-center z-10 relative">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-black tracking-tighter text-sm">
                S
              </div>
              <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-lg">
                StyleSense AI
              </p>
            </Link>
            <p className="text-gray-500 text-sm font-semibold">
              &copy; {new Date().getFullYear()} Precision personal styling, powered by data.
            </p>
            <div className="flex gap-6 mt-4 opacity-60 hover:opacity-100 transition-opacity">
               <a href="#" className="font-medium text-xs text-gray-500 hover:text-purple-600">Privacy Policy</a>
               <a href="#" className="font-medium text-xs text-gray-500 hover:text-purple-600">Terms of Service</a>
               <a href="#" className="font-medium text-xs text-gray-500 hover:text-purple-600">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
