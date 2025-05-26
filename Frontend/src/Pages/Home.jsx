import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Tag, TrendingUp, Package, Clock } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newProducts, setNewProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const promoSlides = [
    {
      id: 1,
      title: "PS5 Pro - ¡Ya disponible para reserva!",
      description: "Experimenta el futuro del gaming con resolución 8K y 120fps",
      buttonText: "Reservar ahora",
      image: "../../public/1.webp",
      bgColor: "from-blue-900 via-blue-500 to-blue-200"
    },
    {
      id: 2,
      title: "Ofertas NVIDIA Serie 40",
      description: "Descuentos exclusivos en tarjetas RTX 4070 y 4080",
      buttonText: "Ver ofertas",
      image: "../../public/2.png",
      bgColor: "from-green-900 via-green-500 to-green-200"
    },
    {
      id: 3,
      title: "Colección Nintendo edición 35 aniversario",
      description: "Figuras y merchandising exclusivo de edición limitada",
      buttonText: "Descubrir colección",
      image: "../../public/3.png",
      bgColor: "from-red-900 via-red-500 to-red-200"
    }
  ];

  // Fallback products para cuando falla la API
  const fallbackProducts = [
    {
      id: "fallback-1",
      nombre: "Producto no disponible",
      precio: 0,
      preciooferta: 0,
      marca: "N/A",
      cantidad: 0,
      Imagenes: ["/api/placeholder/200/200"],
      caracteristicas: {}
    }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      // Productos Nuevos
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/MyEcomerceNeek/NewProducts`);
        setNewProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos nuevos:", error);
        setNewProducts(fallbackProducts);
      }

      // Productos Tendencias
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/MyEcomerceNeek/Tendencias`);
        setTrendingProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos en tendencia:", error);
        setTrendingProducts(fallbackProducts);
      }

      // Ofertas Flash
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/MyEcomerceNeek/OfertasFlash`);
        setFlashDeals(response.data);
      } catch (error) {
        console.error("Error al obtener ofertas flash:", error);
        setFlashDeals(fallbackProducts);
      }

      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [promoSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1));
  };

  const renderRatingStars = (rating = 4.5) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
          />
        ))}
      </div>
    );
  };

  const calculateDiscount = (precio, precioOferta) => {
    if (precioOferta >= precio) return 0;
    return Math.round(((precio - precioOferta) / precio) * 100);
  };

  const ProductCard = ({ product, showDiscount = false }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="relative">
        <img
          src={
            product.Imagenes && product.Imagenes.images
              ? `data:image/jpeg;base64,${product.Imagenes.images}`
              : "No Image"
          }
          alt={product.nombre}
          className="w-full h-full object-contain mb-4 bg-gray-900 rounded"
        />

        {product.preciooferta < product.precio && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
            -{calculateDiscount(product.precio, product.preciooferta)}%
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-white line-clamp-2">{product.nombre}</h3>
        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded whitespace-nowrap ml-2">{product.marca}</span>
      </div>

      <div className="mb-3 flex items-center justify-between">
        {/* {renderRatingStars()} */}
        <span className="text-gray-400 text-sm">({product.cantidad} disponibles)</span>
      </div>

      <div className="mb-4">
        {product.preciooferta < product.precio ? (
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold text-xl">${product.preciooferta}</span>
            <span className="text-gray-400 line-through text-sm">${product.precio}</span>
          </div>
        ) : (
          <span className="text-green-400 font-bold text-xl">${product.precio}</span>
        )}
      </div>

      {/* Características destacadas */}
      {product.caracteristicas && Object.keys(product.caracteristicas).length > 0 && (
        <div className="mb-4">
          {Object.entries(product.caracteristicas).slice(0, 2).map(([key, value]) => (
            <span key={key} className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded mr-1 mb-1">
              {key}: {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
            </span>
          ))}
        </div>
      )}

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold border border-green-400 transition duration-300 transform hover:scale-105"
        onClick={() => {
          // Leer la cookie existente
          const encrypted = Cookies.get('idproduct');
          let productArray = [];

          if (encrypted) {
            try {
              const bytes = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_KEY_SECRET);
              const decrypted = bytes.toString(CryptoJS.enc.Utf8);
              productArray = JSON.parse(decrypted);
            } catch (error) {
              console.error("Error al desencriptar la cookie:", error);
              productArray = [];
            }
          }

          // Agregar el nuevo ID si no está duplicado (opcional)
          const newId = product.id.toString();
          if (!productArray.includes(newId)) {
            productArray.push(newId);
          }

          // Encriptar el nuevo array
          const updatedEncrypted = CryptoJS.AES.encrypt(
            JSON.stringify(productArray),
            import.meta.env.VITE_KEY_SECRET
          ).toString();

          // Guardar la cookie actualizada
          Cookies.set('idproduct', updatedEncrypted);
          // Después de actualizar cookie 'idproduct'
          window.dispatchEvent(new Event('cartUpdatedManually'));
          alert(`Producto ${product.nombre} añadido al carrito`);
        }}>
        Añadir al carrito
      </button>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
      <p className="text-gray-400 mt-4">Cargando productos...</p>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen pb-16">
      {/* Hero Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {promoSlides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className={`bg-gradient-to-r ${slide.bgColor} h-96 flex items-center relative overflow-hidden`}>
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 z-10 mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      <span className="0">{slide.title.split(' ')[0]}</span>
                      <span className="text-white"> {slide.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-6">{slide.description}</p>
                    {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition duration-300 border-2 border-green-400 transform hover:scale-105">
                      {slide.buttonText}
                    </button> */}
                  </div>
                  <div className="md:w-1/2 flex justify-center relative z-0">
                    <div className="w-full h-64 md:h-80">
                      <img src={slide.image} alt={slide.title} className="object-contain h-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-400"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-purple-500"></div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-purple-600 transition">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-purple-600 transition">
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promoSlides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full ${currentSlide === idx ? "bg-green-400" : "bg-gray-600"}`} />
          ))}
        </div>
      </div>

      {/* Flash Deals */}
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
            </a>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} showDiscount={true} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Productos en Tendencia */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-green-400">[</span>
            <TrendingUp size={24} className="mx-2 text-orange-500" />
            Tendencias
            <span className="text-green-400 ml-2">]</span>
          </h2>
          <a href="#" className="text-orange-400 hover:text-orange-300 flex items-center">
          </a>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
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
          </a>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;