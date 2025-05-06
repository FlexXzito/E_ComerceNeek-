import { useState } from 'react';
import { Filter, Grid, List, ShoppingCart } from 'lucide-react';

const productos = [
  { id: 1, name: 'PlayStation 5', brand: 'sony', price: 550, discount: 10, rating: 4.8, features: ['8K', 'HDR'], image: 'https://via.placeholder.com/300', originalPrice: 600 },
  { id: 2, name: 'Xbox Series X', brand: 'microsoft', price: 500, discount: 5, rating: 4.7, features: ['4K', 'Game Pass'], image: 'https://via.placeholder.com/300', originalPrice: 530 },
  { id: 3, name: 'Nintendo Switch', brand: 'nintendo', price: 300, discount: 0, rating: 4.5, features: ['Portátil', 'Dock'], image: 'https://via.placeholder.com/300', originalPrice: 300 },
  { id: 4, name: 'PlayStation 4', brand: 'sony', price: 250, discount: 15, rating: 4.3, features: ['HDR'], image: 'https://via.placeholder.com/300', originalPrice: 295 },
];

const marcas = [
  { id: 'todas', name: 'Todas las marcas' },
  { id: 'sony', name: 'Sony' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'nintendo', name: 'Nintendo' },
];

const rangosPrecios = [
  { id: 'todos', name: 'Todos los precios' },
  { id: '0-200', name: 'Menos de 200€' },
  { id: '200-400', name: '200€ - 400€' },
  { id: '400-600', name: '400€ - 600€' },
  { id: '600+', name: 'Más de 600€' },
];

const ordenamientos = [
  { id: 'relevancia', name: 'Relevancia' },
  { id: 'precioAsc', name: 'Precio: de menor a mayor' },
  { id: 'precioDesc', name: 'Precio: de mayor a menor' },
  { id: 'rating', name: 'Mejor valoradas' },
  { id: 'descuento', name: 'Mayor descuento' },
];

export default function Catalogo() {
  const [filtroMarca, setFiltroMarca] = useState('todas');
  const [filtroPrecio, setFiltroPrecio] = useState('todos');
  const [ordenarPor, setOrdenarPor] = useState('relevancia');
  const [vista, setVista] = useState('grid');
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const productosFiltrados = productos
    .filter(p => filtroMarca === 'todas' || p.brand === filtroMarca)
    .filter(p => {
      if (filtroPrecio === 'todos') return true;
      const [min, max] = filtroPrecio.includes('+')
        ? [parseInt(filtroPrecio), Infinity]
        : filtroPrecio.split('-').map(Number);
      return p.price >= min && p.price <= max;
    })
    .sort((a, b) => {
      switch (ordenarPor) {
        case 'precioAsc': return a.price - b.price;
        case 'precioDesc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'descuento': return b.discount - a.discount;
        default: return 0;
      }
    });

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-400">Catálogo de Consolas</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setMostrarFiltros(!mostrarFiltros)} className="p-2 rounded-lg bg-gray-800 hover:bg-purple-400">
              <Filter />
            </button>
            <button onClick={() => setVista('grid')} className={`p-2 rounded-lg ${vista === 'grid' ? 'bg-purple-400 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
              <Grid />
            </button>
            <button onClick={() => setVista('list')} className={`p-2 rounded-lg ${vista === 'list' ? 'bg-purple-400 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
              <List />
            </button>
          </div>
        </div>

        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)} className="p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-orange-500 focus:outline-none">
              {marcas.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <select value={filtroPrecio} onChange={(e) => setFiltroPrecio(e.target.value)} className="p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-orange-500 focus:outline-none">
              {rangosPrecios.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)} className="p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-orange-500 focus:outline-none">
              {ordenamientos.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
        )}

        <div className={`grid ${vista === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-6'}`}>
          {productosFiltrados.map(producto => (
            <div key={producto.id} className={`bg-gray-800 rounded-2xl shadow-lg p-4 flex ${vista === 'list' ? 'flex-row gap-4' : 'flex-col'}`}>
              <img src={producto.image} alt={producto.name} className={`${vista === 'list' ? 'w-48 h-48 object-cover rounded-xl' : 'w-full h-48 object-cover rounded-xl mb-3'}`} />
              <div className="flex flex-col flex-1">
                <h2 className="font-semibold text-lg text-purple-400">{producto.name}</h2>
                <p className="text-sm text-gray-400 mb-2">{producto.features.join(', ')}</p>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-2xl text-green-400">{producto.price.toFixed(2)}€</p>
                  {producto.discount > 0 && (
                    <p className="text-sm line-through text-gray-500">{producto.originalPrice.toFixed(2)}€</p>
                  )}
                </div>
                <p className="text-yellow-400 text-sm">⭐ {producto.rating.toFixed(1)}</p>
                <div className="mt-auto">
                  <button className="flex items-center justify-center gap-2 bg-purple-400 hover:bg-green-400 text-white px-4 py-2 rounded-xl mt-3 transition">
                    <ShoppingCart size={18} /> Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
