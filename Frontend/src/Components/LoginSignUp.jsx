import { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Facebook } from 'lucide-react';

export default function LoginSignUp({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Switch between login and signup tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle login submission
  const handleLogin = () => {
    console.log('Login submitted');
    // Add your login logic here
  };
  
  // Handle signup submission
  const handleSignup = () => {
    console.log('Signup submitted');
    // Add your signup logic here
  };
  
  return (
    <>
      {/* Modal overlay with backdrop blur */}
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4">
          {/* Modal container - positioned in the middle of the screen */}
          <div className="bg-gray-800 border-2 border-purple-500 rounded-lg w-full max-w-md relative overflow-hidden shadow-2xl">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
            >
              <X size={24} />
            </button>
            
            {/* Modal header with tabs */}
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
                        type={showPassword ? "text" : "password"}
                        className="w-full py-3 pl-10 pr-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
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
                  
                  {/* <div className="relative flex items-center pt-2 pb-4">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400">o continuar con</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition duration-200"
                    >
                      <Github size={18} className="mr-2" />
                      Github
                    </button>
                    <button
                      type="button" 
                      className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition duration-200"
                    >
                      <Facebook size={18} className="mr-2" />
                      Facebook
                    </button>
                  </div> */}
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
                        type={showPassword ? "text" : "password"}
                        className="w-full py-3 pl-10 pr-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-500 rounded"
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
                  
                  {/* <div className="relative flex items-center pt-2 pb-4">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400">o registrarse con</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition duration-200"
                    >
                      <Github size={18} className="mr-2" />
                      Github
                    </button>
                    <button
                      type="button" 
                      className="flex items-center justify-center py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition duration-200"
                    >
                      <Facebook size={18} className="mr-2" />
                      Facebook
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}