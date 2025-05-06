import { 
  Mail, 
  Phone, 
  MapPin, 
  Cpu, 
  Gamepad, 
  Monitor, 
  Headphones, 
  Youtube, 
  Instagram, 
  Twitter, 
  Facebook, 
  Twitch,
  MessageCircle, 
  ChevronRight,

} from 'lucide-react';

function FooterBar({ onPageChange }) {
  // Función para manejar la navegación desde el footer
  const handleNavClick = (page) => {
    // Si recibimos la prop onPageChange, la usamos para navegar
    if (onPageChange) {
      onPageChange(page);
      // Scroll hacia arriba cuando cambiamos de página
      window.scrollTo(0, 0);
    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-2 border-purple-500">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info column */}
          <div>
            <div className="flex items-center mb-4">
              <Gamepad size={24} className="text-purple-400 mr-2" />
              <h3 className="text-xl font-bold">
                <span className="text-purple-400">Geek</span>
                <span className="text-green-400">+</span>
              </h3>
            </div>
            <p className="mb-4 text-sm">Tu destino definitivo para todo lo relacionado con gaming y cultura geek. Desde los últimos videojuegos hasta coleccionables exclusivos.</p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-200">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-200">
                <Twitch size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition duration-200">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          {/* Categories column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center">
              <Cpu size={18} className="mr-2" />
              NAVEGACIÓN
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('novedades'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Novedades
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('consolas'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Consolas
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('pcgaming'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  PC Gaming
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('perifericos'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Periféricos
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('merchandising'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Merchandising
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('coleccionables'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Coleccionables
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-purple-400 mr-1" />
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('accesorios'); }}
                  className="hover:text-green-400 transition duration-200"
                >
                  Accesorios
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center">
              <Headphones size={18} className="mr-2" />
              CONTACTO
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span>Calle Innovación Digital, 42<br />28001 Madrid, España</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                <span>+34 91 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-purple-400 mr-2 flex-shrink-0" />
                <a href="mailto:info@geekplus.com" className="hover:text-green-400 transition duration-200">info@Neekplus.com</a>
              </li>
            </ul>
            
            {/* Newsletter signup */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">SUSCRÍBETE A NUESTRO NEWSLETTER</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="py-2 px-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm w-full"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-r-lg transition duration-200">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div className="bg-gray-800 py-4 border-t border-gray-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-2 md:mb-0">
            © 2025 Neek+ | Todos los derechos reservados
          </div>
          <div className="flex space-x-4">
            {/* <img src="/api/placeholder/40/25" alt="payment-visa" className="h-6" />
            <img src="/api/placeholder/40/25" alt="payment-mastercard" className="h-6" />
            <img src="/api/placeholder/40/25" alt="payment-paypal" className="h-6" />
            <img src="/api/placeholder/40/25" alt="payment-apple" className="h-6" /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterBar;