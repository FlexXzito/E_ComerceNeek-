import { useState, useEffect, useMemo } from 'react';
import {
  Filter,
  Grid,
  List,
  ShoppingCart,
  Star,
} from 'lucide-react';
import axios from 'axios';

// Constantes estáticas fuera del componente
const RANGOS_PRECIOS = [
  { id: 'todos', name: 'Todos los precios' },
  { id: '0-200', name: 'Menos de 200€' },
  { id: '200-400', name: '200€ - 400€' },
  { id: '400-600', name: '400€ - 600€' },
  { id: '600+', name: 'Más de 600€' },
];

const ORDENAMIENTOS = [
  { id: 'relevancia', name: 'Relevancia' },
  { id: 'precioAsc', name: 'Precio: de menor a mayor' },
  { id: 'precioDesc', name: 'Precio: de mayor a menor' },
];

const FALLBACK_PRODUCTS = [
  {
    id: 'fallback-1',
    nombre: 'Producto no disponible',
    precio: 0,
    preciooferta: 0,
    marca: 'N/A',
    cantidad: 0,
    Imagenes: ['/placeholder.jpg'],
    caracteristicas: {},
  },
];

// Spinner de carga
const LoadingSpinner = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
    <p className="text-gray-400 mt-4">Cargando productos...</p>
  </div>
);

// Calcula porcentaje de descuento
const calculateDiscount = (precio, precioOferta) => {
  if (precioOferta >= precio) return 0;
  return Math.round(((precio - precioOferta) / precio) * 100);
};

// Renderiza estrellas (rating fijo en 4.5)
const renderRatingStars = (rating = 4.5) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-400'
        }
      />
    ))}
  </div>
);

// Tarjeta de producto
const ProductCard = ({ product }) => {
  const precioNum = Number(product.precio || 0);
  const precioOfertaNum = Number(product.preciooferta || 0);
  const hasDiscount = precioOfertaNum < precioNum;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex flex-col">
      <div className="relative">
        <img
          src={
            product.Imagenes && product.Imagenes.images
              ? `data:image/jpeg;base64,${product.Imagenes.images}`
              : "/api/placeholder/200/200"
          }
          alt={product.nombre}
          className="w-full h-48 object-contain mb-4 bg-gray-900 rounded"
        />

        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
            -{calculateDiscount(precioNum, precioOfertaNum)}%
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-white line-clamp-2">
          {product.nombre}
        </h3>
        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded whitespace-nowrap ml-2">
          {product.marca}
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between">
        {/* {renderRatingStars()} */}
        <span className="text-gray-400 text-sm">
          ({product.cantidad} disponibles)
        </span>
      </div>

      <div className="mb-4">
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold text-xl">
              {precioOfertaNum.toFixed(2)}€
            </span>
            <span className="text-gray-400 line-through text-sm">
              {precioNum.toFixed(2)}€
            </span>
          </div>
        ) : (
          <span className="text-green-400 font-bold text-xl">
            {precioNum.toFixed(2)}€
          </span>
        )}
      </div>

      {/* Características destacadas (hasta 2) */}
      {product.caracteristicas &&
        Object.keys(product.caracteristicas).length > 0 && (
          <div className="mb-4 flex flex-wrap">
            {Object.entries(product.caracteristicas)
              .slice(0, 2)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded mr-1 mb-1"
                >
                  {key}:{' '}
                  {typeof value === 'boolean'
                    ? value
                      ? 'Sí'
                      : 'No'
                    : value}
                </span>
              ))}
          </div>
        )}

      <button className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold border border-green-400 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
        <ShoppingCart size={18} /> Añadir al carrito
      </button>
    </div>
  );
};

export default function PcGaming() {
  const [productos, setProductos] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([
    { id: 'todas', name: 'Todas las marcas' },
  ]);
  const [loading, setLoading] = useState(true);
  const [filtroMarca, setFiltroMarca] = useState('todas');
  const [filtroPrecio, setFiltroPrecio] = useState('todos');
  const [ordenarPor, setOrdenarPor] = useState('relevancia');
  const [vista, setVista] = useState('grid');
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const tipo = 'pcgaming';

  // Fetch de productos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/MyEcomerceNeek/getTipo`,
          { tipo }
        );
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Generar lista de marcas dinámicamente a partir de "productos"
  useEffect(() => {
    const marcasUnicas = Array.from(
      new Set(productos.map((p) => p.marca))
    ).filter((m) => m); // filtrar valores falsy por si acaso
    const opciones = [
      { id: 'todas', name: 'Todas las marcas' },
      ...marcasUnicas.map((m) => ({ id: m, name: m })),
    ];
    setMarcasDisponibles(opciones);
    // Si el filtro previo ya no existe, restablecer a "todas"
    if (
      filtroMarca !== 'todas' &&
      !marcasUnicas.includes(filtroMarca)
    ) {
      setFiltroMarca('todas');
    }
  }, [productos]);

  const filtrarPorMarca = (producto) =>
    filtroMarca === 'todas' || producto.marca === filtroMarca;

  const filtrarPorPrecio = (producto) => {
    if (filtroPrecio === 'todos') return true;
    const [min, max] = filtroPrecio.includes('+')
      ? [parseInt(filtroPrecio), Infinity]
      : filtroPrecio.split('-').map(Number);
    const precioNum = Number(producto.precio || 0);
    return precioNum >= min && precioNum <= max;
  };

  const ordenarProductos = (a, b) => {
    const precioA = Number(a.precio || 0);
    const precioB = Number(b.precio || 0);

    switch (ordenarPor) {
      case 'precioAsc':
        return precioA - precioB;
      case 'precioDesc':
        return precioB - precioA;
      default:
        return 0; // relevancia: deja el orden original
    }
  };

  const productosFiltrados = useMemo(() => {
    return productos
      .filter(filtrarPorMarca)
      .filter(filtrarPorPrecio)
      .sort(ordenarProductos);
  }, [productos, filtroMarca, filtroPrecio, ordenarPor]);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-400">
            Catálogo de Consolas
          </h1>
          <div className="flex items-center gap-2">
            <button
              aria-label="Mostrar u ocultar filtros"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-purple-400"
            >
              <Filter />
            </button>
            <button
              onClick={() => setVista('grid')}
              className={`p-2 rounded-lg ${
                vista === 'grid'
                  ? 'bg-purple-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              aria-label="Vista en cuadrícula"
            >
              <Grid />
            </button>
            <button
              onClick={() => setVista('list')}
              className={`p-2 rounded-lg ${
                vista === 'list'
                  ? 'bg-purple-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              aria-label="Vista en lista"
            >
              <List />
            </button>
          </div>
        </div>

        {/* Filtros */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="marcaSelect" className="sr-only">
                Filtrar por marca
              </label>
              <select
                id="marcaSelect"
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 p-2 rounded"
              >
                {marcasDisponibles.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="precioSelect" className="sr-only">
                Filtrar por precio
              </label>
              <select
                id="precioSelect"
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 p-2 rounded"
              >
                {RANGOS_PRECIOS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ordenSelect" className="sr-only">
                Ordenar productos
              </label>
              <select
                id="ordenSelect"
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 p-2 rounded"
              >
                {ORDENAMIENTOS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Lista de productos o mensajes */}
        {loading ? (
          <LoadingSpinner />
        ) : productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-400">
            No se encontraron consolas con esos criterios.
          </p>
        ) : (
          <div
            className={`grid ${
              vista === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'grid-cols-1 gap-6'
            }`}
          >
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
