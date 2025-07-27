// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroceryHome from './components/GroceryHome';
import ShopPage from './components/ShopPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OffersPage from './components/OffersPage';
import NotFoundPage from './components/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GroceryHome />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;