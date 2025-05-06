import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Tag, TrendingUp, Package, Clock } from 'lucide-react';

function Home() {
  // Estado para el carrusel principal
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Datos simulados para promociones destacadas
  const promoSlides = [
    {
      id: 1,
      title: "PS5 Pro - ¡Ya disponible!",
      description: "Experimenta el futuro del gaming con resolución 8K y 120fps",
      buttonText: "Reservar ahora",
      image: "/api/placeholder/800/400",
      bgColor: "from-purple-900 to-gray-900"
    },
    {
      id: 2,
      title: "Ofertas NVIDIA Serie 40",
      description: "Descuentos exclusivos en tarjetas RTX 4070 y 4080",
      buttonText: "Ver ofertas",
      image: "/api/placeholder/800/400",
      bgColor: "from-green-900 to-gray-900"
    },
    {
      id: 3,
      title: "Colección Nintendo edición 35 aniversario",
      description: "Figuras y merchandising exclusivo de edición limitada",
      buttonText: "Descubrir colección",
      image: "/api/placeholder/800/400",
      bgColor: "from-purple-900 to-gray-900"
    }
  ];

  // Datos simulados para nuevos productos
  const newProducts = [
    {
      id: 1,
      name: "DualSense Edge Controller",
      price: 179.99,
      image: "/api/placeholder/300/300",
      category: "Accesorios",
      rating: 4.8
    },
    {
      id: 2,
      name: "RTX 4080 Super 16GB",
      price: 999.99,
      image: "/api/placeholder/300/300",
      category: "PC Gaming",
      rating: 4.9
    },
    {
      id: 3,
      name: "Figura Zelda Tears of Kingdom",
      price: 89.99,
      image: "/api/placeholder/300/300",
      category: "Coleccionables",
      rating: 4.7
    },
    {
      id: 4,
      name: "Headset Razer Kraken V3",
      price: 129.99,
      image: "/api/placeholder/300/300",
      category: "Periféricos",
      rating: 4.5
    }
  ];

  // Ofertas limitadas
  const flashDeals = [
    {
      id: 1,
      name: "SSD NVMe 2TB",
      originalPrice: 249.99,
      salePrice: 179.99,
      discount: 28,
      timeLeft: "08:45:32",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "Monitor Gaming 144Hz IPS",
      originalPrice: 349.99,
      salePrice: 249.99,
      discount: 29,
      timeLeft: "03:22:15",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "Teclado Mecánico RGB",
      originalPrice: 129.99,
      salePrice: 79.99,
      discount: 38,
      timeLeft: "05:17:44",
      image: "/api/placeholder/200/200"
    }
  ];

  // Avanzar automáticamente el carrusel cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [promoSlides.length]);

  // Funciones para avanzar y retroceder el carrusel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1));
  };

  // Renderizar estrellas de calificación
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pb-16">
      {/* Hero Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promoSlides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className={`bg-gradient-to-r ${slide.bgColor} h-96 flex items-center relative overflow-hidden`}>
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 z-10 mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      <span className="text-green-400">{slide.title.split(' ')[0]}</span>
                      <span className="text-white"> {slide.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-6">{slide.description}</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition duration-300 border-2 border-green-400 transform hover:scale-105">
                      {slide.buttonText}
                    </button>
                  </div>
                  <div className="md:w-1/2 flex justify-center relative z-0">
                    <div className="w-full h-64 md:h-80">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="object-contain h-full w-full"
                      />
                    </div>
                  </div>
                </div>
                {/* Efecto de líneas neon */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-400"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-purple-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles del carrusel */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-purple-600 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-purple-600 transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores de slide */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promoSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === idx ? "bg-green-400" : "bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Ofertas Flash */}
      <div className="bg-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="text-green-400">[</span> 
              <Clock size={24} className="mx-2 text-red-500" /> 
              Ofertas Flash 
              <span className="text-green-400 ml-2">]</span>
            </h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 flex items-center">
              Ver todas <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500 transition duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="relative">
                  <img src={deal.image} alt={deal.name} className="w-full h-48 object-contain bg-gray-800 p-4" />
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 font-bold">
                    -{deal.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{deal.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-green-400 font-bold text-xl">${deal.salePrice}</span>
                      <span className="text-gray-400 line-through text-sm ml-2">${deal.originalPrice}</span>
                    </div>
                    <div className="bg-gray-800 px-3 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1 text-red-400" />
                      <span className="text-sm">{deal.timeLeft}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-2 rounded-md font-bold transition duration-300 border border-green-400">
                    Comprar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nuevos Productos */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-purple-400">[</span>
            <Package size={24} className="mx-2 text-green-400" />
            Nuevos Productos
            <span className="text-purple-400 ml-2">]</span>
          </h2>
          <a href="#" className="text-green-400 hover:text-green-300 flex items-center">
            Ver todos <ChevronRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="p-4 bg-gray-900">
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium bg-purple-900 text-purple-200 px-2 py-1 rounded">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg mt-2 mb-1 text-white">{product.name}</h3>
                <div className="flex items-center mb-3">
                  {renderRatingStars(product.rating)}
                  <span className="text-gray-400 text-xs ml-1">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-bold text-xl">${product.price}</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded font-medium text-sm transition duration-300 border border-green-400">
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner promocional */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-green-400">Únete</span> al Club Neek+
              </h2>
              <p className="text-gray-300 mb-6">
                Obtén recompensas exclusivas, descuentos anticipados y puntos por cada compra que realices.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition duration-300 border-2 border-purple-500 transform hover:scale-105">
                Registrarme Ahora
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/300" alt="Club Neek+" className="w-full h-auto" />
            </div>
          </div>
          {/* Líneas de decoración neon */}
          <div className="h-1 bg-gradient-to-r from-purple-500 via-green-400 to-purple-500"></div>
        </div>
      </div>

      {/* Tendencias */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-green-400">[</span>
            <TrendingUp size={24} className="mx-2 text-purple-400" />
            Tendencias
            <span className="text-green-400 ml-2">]</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            <img src="/api/placeholder/300/300" alt="Gaming Laptops" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-bold">Gaming Laptops</h3>
            </div>
            <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            <img src="/api/placeholder/300/300" alt="Auriculares Premium" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-bold">Auriculares Premium</h3>
            </div>
            <div className="absolute inset-0 bg-green-600 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            <img src="/api/placeholder/300/300" alt="Figuras Anime" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-bold">Figuras Anime</h3>
            </div>
            <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            <img src="/api/placeholder/300/300" alt="Retrotech" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-bold">Retrotech</h3>
            </div>
            <div className="absolute inset-0 bg-green-600 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;