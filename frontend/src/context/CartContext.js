// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('freshmart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`Making API request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated || !user) {
      setCart([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching cart...');
      const { data } = await api.get('/api/cart');
      
      console.log('Cart fetch response:', data);
      
      if (data.success) {
        setCart(data.items || []);
      } else {
        throw new Error(data.message || 'Failed to fetch cart');
      }
    } catch (err) {
      console.error('Cart fetch error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch cart';
      setError(errorMsg);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated || !user) {
      return { 
        success: false, 
        message: 'Please login to add items to cart' 
      };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Adding to cart:', { product, quantity });
      const response = await api.post('/api/cart', {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      
      console.log('Add to cart response:', response.data);
      
      if (response.data.success) {
        setCart(response.data.items || []);
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to add to cart';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated || !user) {
      return { success: false, message: 'Please login first' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Removing from cart:', productId);
      const response = await api.delete(`/api/cart/${productId}`);
      
      console.log('Remove from cart response:', response.data);
      
      if (response.data.success) {
        setCart(response.data.items || []);
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Failed to remove from cart');
      }
    } catch (err) {
      console.error('Remove from cart error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to remove from cart';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated || !user) {
      return { success: false, message: 'Please login first' };
    }
    
    if (quantity < 0) {
      return { success: false, message: 'Quantity cannot be negative' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Updating quantity:', { productId, quantity });
      const response = await api.put(`/api/cart/${productId}`, { quantity });
      
      console.log('Update quantity response:', response.data);
      
      if (response.data.success) {
        setCart(response.data.items || []);
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Failed to update quantity');
      }
    } catch (err) {
      console.error('Update quantity error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to update quantity';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user) {
      return { success: false, message: 'Please login first' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Clearing cart...');
      const response = await api.delete('/api/cart');
      
      console.log('Clear cart response:', response.data);
      
      if (response.data.success) {
        setCart([]);
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Failed to clear cart');
      }
    } catch (err) {
      console.error('Clear cart error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to clear cart';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Increase item quantity by 1
  const increaseQuantity = async (productId) => {
    const item = cart.find(item => item.productId == productId);
    if (item) {
      return await updateQuantity(productId, item.quantity + 1);
    }
    return { success: false, message: 'Item not found in cart' };
  };

  // Decrease item quantity by 1
  const decreaseQuantity = async (productId) => {
    const item = cart.find(item => item.productId == productId);
    if (item) {
      if (item.quantity <= 1) {
        return await removeFromCart(productId);
      } else {
        return await updateQuantity(productId, item.quantity - 1);
      }
    }
    return { success: false, message: 'Item not found in cart' };
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.productId == productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cart.some(item => item.productId == productId);
  };

  const clearError = () => setError(null);

  // Fetch cart when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, user]);

  // Debug log on mount
  useEffect(() => {
    console.log('CartContext initialized with API_BASE_URL:', API_BASE_URL);
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getItemQuantity,
      isInCart,
      fetchCart,
      clearError
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};