// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.timeout = 10000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('freshmart_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Get stored user
      const storedUser = localStorage.getItem('freshmart_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (err) {
          console.error('Error parsing user data:', err);
          logout();
        }
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/login', { 
        email: email.trim(), 
        password 
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success && response.data.token && response.data.user) {
        const { token: newToken, user: userData } = response.data;
        
        // Store in localStorage
        localStorage.setItem('freshmart_token', newToken);
        localStorage.setItem('freshmart_user', JSON.stringify(userData));
        
        // Update state
        setToken(newToken);
        setUser(userData);
        
        // Set axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/register', {
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password
      });
      
      console.log('Register response:', response.data);
      
      if (response.data.success && response.data.token && response.data.user) {
        const { token: newToken, user: newUser } = response.data;
        
        // Store in localStorage
        localStorage.setItem('freshmart_token', newToken);
        localStorage.setItem('freshmart_user', JSON.stringify(newUser));
        
        // Update state
        setToken(newToken);
        setUser(newUser);
        
        // Set axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Invalid response from server');
      }
    } catch (err) {
      console.error('Register error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('freshmart_token');
    localStorage.removeItem('freshmart_user');
    if (user?.id) {
      localStorage.removeItem(`freshmart_orders_${user.id}`);
    }
    
    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear state
    setToken(null);
    setUser(null);
    setError(null);
    
    // Navigate to home
    navigate('/');
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!token && !!user,
      loading,
      error,
      login,
      register,
      logout,
      setError,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};