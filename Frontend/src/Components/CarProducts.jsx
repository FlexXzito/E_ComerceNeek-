import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import React, { useState, useEffect, useCallback } from 'react';

export default function CartDrawer({ isOpen, onClose, children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductIdsFromCookie = useCallback(() => {
    const encrypted = Cookies.get('idproduct');
    let productIds = [];

    if (encrypted) {
      try {
        const bytes = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_KEY_SECRET);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        productIds = JSON.parse(decrypted);
      } catch (error) {
        console.error('Error al desencriptar la cookie:', error);
        productIds = [];
      }
    }

    return productIds;
  }, []);

  const setProductIdsToCookie = (productIds) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(productIds), import.meta.env.VITE_KEY_SECRET).toString();
      Cookies.set('idproduct', encrypted, { expires: 7 }); // Puedes ajustar expiración
    } catch (error) {
      console.error('Error al encriptar la cookie:', error);
    }
  };

  const fetchProductsByCookie = useCallback(async () => {
    setLoading(true);

    const productIds = getProductIdsFromCookie();

    if (productIds.length === 0) {
      setLoading(false);
      setProductos([]);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/MyEcomerceNeek/CarProducts`,
        { id: productIds }
      );
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, [getProductIdsFromCookie]);

  // NUEVA función para eliminar producto
  const handleEliminarProducto = (id) => {
    const productIds = getProductIdsFromCookie();
    const newProductIds = productIds.filter(productId => productId !== id);

    // Actualizar cookie con la lista sin el id eliminado
    setProductIdsToCookie(newProductIds);

    // Actualizar el estado local para que el UI se refresque rápido
    setProductos((prev) => prev.filter(producto => producto.id !== id));

    // Disparar evento storage para que otras pestañas/componentes escuchen el cambio
    window.dispatchEvent(new Event('cartUpdatedManually'));
  };

  useEffect(() => {
    fetchProductsByCookie();

    const updateCart = () => {
      fetchProductsByCookie();
    };

    const handleStorageChange = (e) => {
      if (e.key === 'cartUpdated') {
        updateCart();
      }
    };

    const handleCartUpdate = () => {
      updateCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdatedManually', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdatedManually', handleCartUpdate);
    };
  }, [fetchProductsByCookie]);

  useEffect(() => {
    if (isOpen) {
      fetchProductsByCookie();
    }
  }, [isOpen, fetchProductsByCookie]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
      aria-modal={isOpen}
      role="dialog"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="absolute inset-0 bg-[#00000088] bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      <aside
        className={`absolute top-0 right-0 h-full w-80 bg-gray-900 text-gray-300 shadow-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <header className="flex items-center justify-between p-4 border-b border-purple-600">
          <h2
            id="cart-drawer-title"
            className="text-lg font-bold text-green-400"
          >
            Tu Carrito ({productos.length})
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="text-gray-400 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          >
            <X size={24} />
          </button>
        </header>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
              <p className="text-gray-400 italic text-sm ml-3">Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 italic text-sm">Tu carrito está vacío.</p>
              <p className="text-gray-600 text-xs mt-2">¡Agrega algunos productos increíbles!</p>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {productos.map((producto) => {
                  const {
                    id,
                    nombre,
                    marca,
                    precio,
                    preciooferta,
                    cantidad,
                    estado,
                    caracteristicas,
                    Imagenes,
                  } = producto;

                  const imageUrl = Imagenes?.images?.[0]
                    ? `data:image/jpeg;base64,${Imagenes.images[0]}`
                    : "https://via.placeholder.com/150";

                  const caracteristicasEntries = caracteristicas
                    ? Object.entries(caracteristicas).slice(0, 2)
                    : [];

                  return (
                    <li key={id} className="flex gap-4 border-b border-gray-700 pb-4">
                      <img
                        src={imageUrl}
                        alt={nombre}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex flex-col flex-grow">
                        <h3 className="font-semibold text-green-300">{nombre}</h3>
                        <p className="text-sm text-gray-400">Marca: {marca}</p>
                        <p className="text-sm text-gray-400">
                          Cantidad: {cantidad}
                        </p>
                        <p className="text-sm">
                          Precio:{" "}
                          {preciooferta && preciooferta < precio ? (
                            <>
                              <span className="line-through text-red-500 mr-2">
                                ${precio.toFixed(2)}
                              </span>
                              <span className="text-green-400">${preciooferta.toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${precio.toFixed(2)}</span>
                          )}
                        </p>
                        <p className={`text-xs mt-1 px-2 py-1 inline-block rounded w-fit ${estado === "ofertaflash"
                          ? "bg-red-600 text-white"
                          : "bg-gray-600 text-gray-300"
                          }`}>
                          {estado}
                        </p>
                        {caracteristicasEntries.length > 0 && (
                          <ul className="mt-2 text-xs text-gray-400 space-y-1">
                            {caracteristicasEntries.map(([key, value]) => (
                              <li key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                                {value.toString()}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* BOTÓN ELIMINAR */}
                      <button
                        onClick={() => handleEliminarProducto(id)}
                        className="text-red-500 hover:text-red-700 font-semibold self-start"
                        aria-label={`Eliminar producto ${nombre}`}
                        title="Eliminar producto"
                      >
                        &times;
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                  <span>Total de artículos:</span>
                  <span>{productos.length}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-green-400">
                  <span>Total:</span>
                  <span>
                    ${productos.reduce((total, producto) => {
                      const precio = producto.preciooferta && producto.preciooferta < producto.precio
                        ? producto.preciooferta
                        : producto.precio;
                      return total + precio;
                    }, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

CartDrawer.defaultProps = {
  children: null,
};
