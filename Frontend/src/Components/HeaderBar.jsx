import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Gamepad, LogOut } from 'lucide-react';
import LoginSignUp from './LoginSignUp.jsx';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

function HeaderBar({ onPageChange, activePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Login/SignUp');
  
  // Manage visit counter
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Check login status on component mount and when cookies change
    checkLoginStatus();
    
    // Track visits
    const currentVisits = parseInt(localStorage.getItem('visitCount') || '0', 10);
    const newVisits = currentVisits + 1;
    localStorage.setItem('visitCount', newVisits);
    setVisits(newVisits);
  }, []);

  // Function to check if user is logged in
  const checkLoginStatus = () => {
    const usernameEncrypted = Cookies.get('Username');
    
    if (usernameEncrypted) {
      try {
        const bytes = CryptoJS.AES.decrypt(usernameEncrypted, import.meta.env.VITE_KEY_SECRET);
        const decryptedUsername = bytes.toString(CryptoJS.enc.Utf8);
        setUsername(decryptedUsername);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decrypting username:", error);
        handleLogout(); // Clear invalid cookies
      }
    } else {
      setUsername('Login/SignUp');
      setIsLoggedIn(false);
    }
  };
  
  // Handle successful login
  const handleLoginSuccess = (newUsername) => {
    checkLoginStatus(); // Refresh login status
    setIsLoginModalOpen(false); // Close modal
  };
  
  // Handle logout
  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('id_User', { path: '/' });
    Cookies.remove('Username', { path: '/' });
    
    // Update state
    setIsLoggedIn(false);
    setUsername('Login/SignUp');
    
    alert("Sesión cerrada exitosamente");
  };

  // Open login modal
  const openLoginModal = () => setIsLoginModalOpen(true);
  
  // Close login modal
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigation clicks
  const handleNavClick = (page) => {
    onPageChange(page);
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-10 border-b-2 border-purple-500">
      {/* Top bar with logo, search, and actions */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo area */}
        <div className="flex items-center">
          <div className="mr-4 md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-purple-400 hover:text-purple-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="flex items-center">
            <Gamepad size={28} className="text-purple-400 mr-2" />
            <div className="text-2xl font-bold">
              <span className="text-purple-400">Neek</span>
              <span className="text-green-400">+</span>
            </div>
          </div>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:block flex-grow mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Juegos, Computadoras, coleccionables..."
              className="w-full py-2 px-4 rounded-lg bg-gray-800 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
            />
            <button className="absolute right-3 top-2 text-purple-400 hover:text-green-400">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            // User is logged in - show username and logout button
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleLogout}
                className="flex flex-row text-gray-300 hover:text-red-500 focus:outline-none transition duration-200"
              >
                <span className="text-green-400 font-bold mr-2">{username}</span>
                <LogOut size={20}/>
              </button>
            </div>
          ) : (
            // User is not logged in - show login button
            <button 
              className="flex flex-row text-gray-300 hover:text-green-400 focus:outline-none transition duration-200"
              onClick={openLoginModal}
            >
              <User size={24} className="mr-2" />
              <p className="text-green-400 font-bold">Login/SignUp</p>
            </button>
          )}
          
          <button className="text-gray-300 hover:text-green-400 focus:outline-none relative transition duration-200">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-green-500 text-black font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
              1
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Juegos, Computadoras, coleccionables..."
            className="w-full py-2 px-4 rounded-lg bg-gray-800 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
          />
          <button className="absolute right-3 top-2 text-purple-400">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className={`bg-gray-800 ${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-purple-600`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:justify-center">
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'home' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
                className="flex items-center"
              >
                <span className="text-green-400 mr-2"></span>Home<span className="text-green-400 ml-2"></span>
              </a>
            </li>
            {/* <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'novedades' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('novedades'); }} 
                className="flex items-center"
              >
                <span className="text-purple-400 mr-2"></span>Novedades<span className="text-purple-400 ml-2">]</span>
              </a>
            </li> */}
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'consolas' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('consolas'); }} 
                className="flex items-center"
              >
                <span className="text-green-400 mr-2"></span>Consolas<span className="text-green-400 ml-2"></span>
              </a>
            </li>
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'pcgaming' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('pcgaming'); }} 
                className="flex items-center"
              >
                <span className="text-purple-400 mr-2"></span>PC_Gaming<span className="text-purple-400 ml-2"></span>
              </a>
            </li>
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'perifericos' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('perifericos'); }} 
                className="flex items-center"
              >
                <span className="text-green-400 mr-2"></span>Perifericos<span className="text-green-400 ml-2"></span>
              </a>
            </li>
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'merchandising' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('merchandising'); }} 
                className="flex items-center"
              >
                <span className="text-purple-400 mr-2"></span>Merchandising<span className="text-purple-400 ml-2"></span>
              </a>
            </li>
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'coleccionables' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('coleccionables'); }} 
                className="flex items-center"
              >
                <span className="text-green-400 mr-2"></span>Coleccionables<span className="text-green-400 ml-2"></span>
              </a>
            </li>
            <li className={`py-2 md:py-3 md:px-6 hover:bg-gray-700 transition duration-200 ${activePage === 'accesorios' ? 'bg-gray-700' : ''}`}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('accesorios'); }} 
                className="flex items-center"
              >
                <span className="text-purple-400 mr-2"></span>Accesorios<span className="text-purple-400 ml-2"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Login/SignUp Modal */}
      <LoginSignUp 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}

export default HeaderBar;