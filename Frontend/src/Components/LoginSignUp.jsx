import { useState, useEffect } from 'react';
import { X, User, Mail, Lock, ArrowRight, LogOut } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default function LoginSignUp({ isOpen = false, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Acepto, setAcepto] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  
  // Check if user is logged in on component mount and cookie changes
  useEffect(() => {
    checkUserSession();
  }, []);
  
  // Function to check if user is logged in by verifying cookies
  const checkUserSession = () => {
    const userId = Cookies.get('id_User');
    const username = Cookies.get('Username');
    
    if (userId && username) {
      try {
        // Decrypt username to display
        const decryptedUsername = CryptoJS.AES.decrypt(
          username,
          import.meta.env.VITE_KEY_SECRET
        ).toString(CryptoJS.enc.Utf8);
        
        setIsLoggedIn(true);
        setCurrentUser(decryptedUsername);
      } catch (error) {
        console.error("Error decrypting user data:", error);
        handleLogout(); // Clear invalid cookies
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser('');
    }
  };
  
  // Function to handle user logout
  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('id_User', { path: '/' });
    Cookies.remove('Username', { path: '/' });
    
    // Update state
    setIsLoggedIn(false);
    setCurrentUser('');
    
    // Reset form fields
    setUsername('');
    setPassword('');
    setEmail('');
    setAcepto(false);
    
    alert("Sesión cerrada exitosamente");
    onClose();
  };
  
  // Switch between login and signup tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  
  const handleLogin = async () => {
    if (!Email || !Password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/MyEcomerceNeek/login`, {
        Email,
        Password
      });
      
      const encryptedId = CryptoJS.AES.encrypt(
        res.data.usuario.id_User,
        import.meta.env.VITE_KEY_SECRET
      ).toString();
      
      const encryptedUsername = CryptoJS.AES.encrypt(
        res.data.usuario.Username,
        import.meta.env.VITE_KEY_SECRET
      ).toString();
      
      Cookies.set('id_User', encryptedId, { 
        expires: 1, 
        secure: true,
        sameSite: "Strict",
        path: "/",
      });
      
      Cookies.set('Username', encryptedUsername, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      setPassword("");
      setEmail("");
      
      alert("Inicio de sesión exitoso");
      checkUserSession(); // Update login state
      
      // Notificar al componente padre sobre el login exitoso y cerrar el modal
      if (onLoginSuccess) {
        onLoginSuccess(res.data.usuario.Username);
      }
      onClose();
    }
    catch(error) {
      if (error.status === 401) {
        alert("Contraseña incorrecta");
      }
      if (error.status === 404) {
        alert("Correo no registrado");
      }
      console.error("Error en el inicio de sesión:", error);
    }
  };
  
  const handleSignup = async () => {
    if (!Username || !Password || !Email) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (!Acepto) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/MyEcomerceNeek/signup`, {
        Username,
        Password,
        Email,
        Acepto
      });
      
      alert("Usuario creado exitosamente");
      setUsername("");
      setPassword("");
      setEmail("");
      setAcepto(false);
      setActiveTab('login');
    }
    catch(error) {
      if (error.status === 500) {
        alert("Correo ya registrado");
      }
      console.error("Error en el registro:", error);
    }
  };
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-purple-500 rounded-lg w-full max-w-md relative overflow-hidden shadow-2xl">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
            >
              <X size={24} />
            </button>
              <>
                <div className="flex border-b border-purple-500">
                  <button
                    className={`flex-1 py-4 font-bold text-lg transition-colors ${
                      activeTab === 'login'
                        ? 'bg-gray-700 text-green-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => switchTab('login')}
                  >
                    <span className="text-purple-400 mr-1">[</span>
                    Iniciar Sesión
                    <span className="text-purple-400 ml-1">]</span>
                  </button>
                  <button
                    className={`flex-1 py-4 font-bold text-lg transition-colors ${
                      activeTab === 'signup'
                        ? 'bg-gray-700 text-green-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => switchTab('signup')}
                  >
                    <span className="text-purple-400 mr-1">[</span>
                    Registrarse
                    <span className="text-purple-400 ml-1">]</span>
                  </button>
                </div>
                
                {/* Login form */}
                {activeTab === 'login' && (
                  <div className="p-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2 text-white">
                        Bienvenido a <span className="text-purple-400">Neek</span><span className="text-green-400">+</span>
                      </h2>
                      <p className="text-gray-400">
                        Inicia sesión para acceder a tu cuenta
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="email"
                            className="w-full py-3 pl-10 pr-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            placeholder="tu@email.com"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Contraseña
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="password"
                            className="w-full py-3 pl-10 pr-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            placeholder="••••••••"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end">
                          <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleLogin}
                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center justify-center transition duration-200"
                      >
                        Iniciar Sesión
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Signup form */}
                {activeTab === 'signup' && (
                  <div className="p-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2 text-white">
                        Únete a <span className="text-purple-400">Neek</span><span className="text-green-400">+</span>
                      </h2>
                      <p className="text-gray-400">
                        Crea una cuenta para empezar a comprar
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Nombre de usuario
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            className="w-full py-3 pl-10 pr-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            placeholder="username"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="email"
                            className="w-full py-3 pl-10 pr-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            placeholder="tu@email.com"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Contraseña
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="password"
                            className="w-full py-3 pl-10 pr-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            placeholder="••••••••"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-500 rounded"
                          checked={Acepto}
                          onChange={(e) => setAcepto(e.target.checked)}
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                          Acepto los <a href="#" className="text-purple-400 hover:text-purple-300">Términos de servicio</a> y la <a href="#" className="text-purple-400 hover:text-purple-300">Política de privacidad</a>
                        </label>
                      </div>
                      
                      <button
                        onClick={handleSignup}
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center justify-center transition duration-200"
                      >
                        Crear Cuenta
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </>
          </div>
        </div>
      )}
    </>
  );
}