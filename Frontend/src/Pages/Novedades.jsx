import { useState } from 'react';
import { Tag, TrendingUp, Calendar, Clock, Share2, ThumbsUp, MessageSquare, Bookmark, ChevronRight } from 'lucide-react';

function Novedades() {
  // Estados para las pestañas y filtros
  const [activeTab, setActiveTab] = useState('todas');
  const [activeFilter, setActiveFilter] = useState('recientes');
  
  // Datos simulados para destacados
  const featuredNews = {
    id: 1,
    title: "The Legend of Zelda: Echoes of Wisdom rompe récords de ventas",
    excerpt: "El último título de Nintendo supera los 10 millones de unidades vendidas en su primera semana, convirtiéndose en el lanzamiento más exitoso de la franquicia.",
    category: "Gaming",
    author: "Maria Rodriguez",
    date: "2 mayo, 2025",
    readTime: "5 min",
    image: "/api/placeholder/800/450",
    tags: ["Nintendo", "Zelda", "Lanzamientos"]
  };
  
  // Datos simulados para noticias recientes
  const recentNews = [
    {
      id: 1,
      title: "PlayStation 6 confirmado para 2026, según fuentes internas",
      excerpt: "Documentos filtrados revelan las especificaciones preliminares y fecha de lanzamiento de la próxima consola de Sony.",
      category: "Gaming",
      author: "Carlos Vega",
      date: "5 mayo, 2025",
      readTime: "4 min",
      likes: 452,
      comments: 87,
      image: "/api/placeholder/400/250",
      tags: ["PlayStation", "Sony", "Consolas"]
    },
    {
      id: 2,
      title: "Chainsaw Man anuncia tercera temporada y película",
      excerpt: "El popular anime continuará su adaptación con una nueva temporada en 2026 y una película que cubrirá el arco del Asesino del Diablo.",
      category: "Anime",
      author: "Ana Gómez",
      date: "4 mayo, 2025",
      readTime: "3 min",
      likes: 687,
      comments: 124,
      image: "/api/placeholder/400/250",
      tags: ["Anime", "Chainsaw Man", "MAPPA"]
    },
    {
      id: 3,
      title: "NVIDIA revela su nueva arquitectura de GPUs para 2026",
      excerpt: "La próxima generación de tarjetas gráficas promete un salto generacional en rendimiento y eficiencia energética.",
      category: "Hardware",
      author: "Roberto Álvarez",
      date: "3 mayo, 2025",
      readTime: "6 min",
      likes: 321,
      comments: 56,
      image: "/api/placeholder/400/250",
      tags: ["NVIDIA", "GPUs", "Hardware"]
    },
    {
      id: 4,
      title: "¡Éxito rotundo! Comic-Con Latinoamérica 2025 bate récords de asistencia",
      excerpt: "El evento reunió a más de 150,000 fans en tres días con invitados de renombre internacional.",
      category: "Eventos",
      author: "Laura Sánchez",
      date: "2 mayo, 2025",
      readTime: "4 min",
      likes: 512,
      comments: 93,
      image: "/api/placeholder/400/250",
      tags: ["Comic-Con", "Eventos", "Cosplay"]
    },
    {
      id: 5,
      title: "Análisis: Las 10 figuras coleccionables más valiosas de 2025",
      excerpt: "Expertos evalúan qué figuras de edición limitada se han revalorizado más en los últimos meses.",
      category: "Coleccionables",
      author: "Miguel Torres",
      date: "1 mayo, 2025",
      readTime: "7 min",
      likes: 289,
      comments: 42,
      image: "/api/placeholder/400/250",
      tags: ["Coleccionables", "Figuras", "Inversiones"]
    },
    {
      id: 6,
      title: "Nuevo estudio de desarrollo formado por veteranos de BioWare y CD Projekt",
      excerpt: "El equipo ya trabaja en un ambicioso RPG de mundo abierto con temática cyberpunk.",
      category: "Industria",
      author: "Pedro Martínez",
      date: "30 abril, 2025",
      readTime: "5 min",
      likes: 378,
      comments: 67,
      image: "/api/placeholder/400/250",
      tags: ["Estudios", "RPG", "Desarrolladores"]
    }
  ];
  
  // Datos simulados para tendencias
  const trendingTopics = [
    "PlayStation 6",
    "RTX 5090",
    "Chainsaw Man",
    "Zelda",
    "Comic-Con",
    "Intel Core Ultra",
    "One Piece",
    "Final Fantasy",
    "Steam Deck 2",
    "Cyberpunk 2077"
  ];
  
  // Datos simulados para eventos próximos
  const upcomingEvents = [
    {
      id: 1,
      name: "E3 2025",
      date: "10-13 Junio, 2025",
      location: "Los Angeles, CA",
      image: "/api/placeholder/100/60"
    },
    {
      id: 2,
      name: "Tokyo Game Show",
      date: "24-27 Septiembre, 2025",
      location: "Tokio, Japón",
      image: "/api/placeholder/100/60"
    },
    {
      id: 3,
      name: "Anime Expo",
      date: "3-6 Julio, 2025",
      location: "Los Angeles, CA",
      image: "/api/placeholder/100/60"
    },
    {
      id: 4,
      name: "Gamescom",
      date: "20-24 Agosto, 2025",
      location: "Colonia, Alemania",
      image: "/api/placeholder/100/60"
    }
  ];
  
  // Categorías para filtrar noticias
  const categories = [
    { id: 'todas', name: 'Todas' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'anime', name: 'Anime' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'eventos', name: 'Eventos' },
    { id: 'coleccionables', name: 'Coleccionables' },
    { id: 'industria', name: 'Industria' }
  ];
  
  // Filtros de ordenación
  const sortFilters = [
    { id: 'recientes', name: 'Más recientes' },
    { id: 'populares', name: 'Más populares' },
    { id: 'comentadas', name: 'Más comentadas' }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen pb-16">
      {/* Cabecera de la página */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 py-8 border-b border-purple-500">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-purple-400">[</span> Novedades <span className="text-purple-400">]</span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Las últimas noticias y actualizaciones del mundo gaming, geek y anime. Mantente al día con los lanzamientos, eventos y tendencias.
          </p>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda - Artículos */}
          <div className="lg:w-2/3">
            {/* Pestañas de categorías */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-4 py-2 rounded-t-lg transition duration-200 whitespace-nowrap ${
                      activeTab === category.id
                        ? 'bg-gray-800 border-t-2 border-l border-r border-green-400 text-green-400'
                        : 'bg-gray-800 bg-opacity-50 hover:bg-gray-800 text-gray-400'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="h-1 bg-gray-800"></div>
            </div>
            
            {/* Filtros y ordenación */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                {sortFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`text-sm transition duration-200 ${
                      activeFilter === filter.id
                        ? 'text-purple-400 font-medium'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Artículo destacado */}
            <div className="mb-8">
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition duration-300 group">
                <div className="relative">
                  <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-80 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredNews.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span>{featuredNews.author}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{featuredNews.readTime} lectura</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition duration-200">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredNews.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="flex items-center text-purple-400 hover:text-purple-300 transition duration-200">
                      Leer artículo completo <ChevronRight size={16} className="ml-1" />
                    </button>
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-purple-400 transition duration-200">
                        <ThumbsUp size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-green-400 transition duration-200">
                        <MessageSquare size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition duration-200">
                        <Share2 size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-yellow-400 transition duration-200">
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lista de artículos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentNews.map(article => (
                <div key={article.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-400 transition duration-300 group h-full flex flex-col">
                  <div className="relative">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition duration-200">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-md text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <div className="flex items-center">
                          <ThumbsUp size={14} className="mr-1" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare size={14} className="mr-1" />
                          <span>{article.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 transition duration-200">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Paginación */}
            <div className="flex justify-center mt-10">
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition duration-200">
                  1
                </button>
                <button className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center text-white">
                  2
                </button>
                <button className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition duration-200">
                  3
                </button>
                <button className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition duration-200">
                  4
                </button>
                <button className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition duration-200">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Sidebar */}
          <div className="lg:w-1/3">
            {/* Buscador */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-3">
                <span className="text-green-400">[</span> Buscar <span className="text-green-400">]</span>
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button className="absolute right-3 top-2 text-gray-400 hover:text-purple-400">
                </button>
              </div>
            </div>
            
            {/* Tendencias */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="text-purple-400">[</span>
                <TrendingUp size={18} className="mx-2 text-purple-400" />
                Tendencias
                <span className="text-purple-400 ml-2">]</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition duration-200"
                  >
                    #{topic}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Próximos eventos */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="text-green-400">[</span>
                <Calendar size={18} className="mx-2 text-green-400" />
                Próximos Eventos
                <span className="text-green-400 ml-2">]</span>
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center space-x-3 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                    <img src={event.image} alt={event.name} className="w-16 h-12 object-cover rounded" />
                    <div>
                      <h4 className="font-medium text-white">{event.name}</h4>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {event.date}
                      </div>
                      <div className="text-xs text-gray-500">{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-purple-400 hover:text-purple-300 flex items-center mt-4 text-sm">
                Ver todos los eventos <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            
            {/* Newsletter */}
            <div className="bg-gradient-to-r from-purple-900 to-gray-800 rounded-lg p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="w-full h-full" style={{ 
                  backgroundImage: "url('/api/placeholder/300/300')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">
                  <span className="text-green-400">Suscríbete</span> a nuestro boletín
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Recibe las últimas noticias y ofertas exclusivas directamente en tu correo.
                </p>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full py-2 px-4 rounded-lg bg-gray-700 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
                  />
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition duration-300 border border-purple-400">
                  Suscribirse
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-purple-500 to-green-400"></div>
            </div>
            
            {/* Artículo patrocinado */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-yellow-500 mb-6">
              <div className="bg-yellow-500 text-black px-4 py-1 text-xs font-bold">
                PATROCINADO
              </div>
              <div className="p-4">
                <img src="/api/placeholder/400/200" alt="Patrocinado" className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="font-bold text-lg mb-2">Descubre la nueva línea de periféricos Razer x Pokémon</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Edición limitada de ratones, teclados y auriculares con diseños exclusivos de tus Pokémon favoritos.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded transition duration-200 w-full">
                  Ver colección
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Novedades;