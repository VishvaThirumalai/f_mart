// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add items to cart' };
    }
    
    setLoading(true);
    try {
      await axios.post('/api/cart/add', {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add to cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await axios.post('/api/cart/remove', { productId });
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to remove from cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      await axios.post('/api/cart/update', { productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update quantity';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      // Remove all items one by one (or implement a clear endpoint in your API)
      await Promise.all(cartItems.map(item => 
        axios.post('/api/cart/remove', { productId: item.productId })
      ));
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to clear cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ 
      cartItems,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      fetchCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);