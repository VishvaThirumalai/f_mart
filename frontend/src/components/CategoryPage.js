// src/components/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, InputGroup, 
  Badge, Dropdown, Pagination, Modal, Spinner, Toast
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaHeart, 
  FaStar, 
  FaShoppingCart, 
  FaFilter, 
  FaEye, 
  FaShare,
  FaChevronDown, 
  FaLeaf, 
  FaTruck, 
  FaShieldAlt, 
  FaFire, 
  FaThumbsUp,
  FaCheckCircle,
  FaTh,
  FaList,
  FaSortAmountDown
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { findCategoryBySlug } from '../utils/categoryUtils';
import Header from '../Layout/Header';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cartItems, setCartItems] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    onSale: false,
    inStock: true,
    freeShipping: false
  });
  
  const productsPerPage = viewMode === 'grid' ? 12 : 8;

  // Find current category
  const currentCategory = findCategoryBySlug(categoryName, categories);
  
  // Get products with enhanced filtering
  const categoryProducts = currentCategory
    ? products.filter(p => 
        p.category === currentCategory.name || 
        p.subcategory === currentCategory.name
      )
    : [];

  // Add breadcrumbs
  const parentCategory = currentCategory?.parentCategory;

  // Enhanced filtering logic
  const filteredProducts = categoryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesFilters = 
      (!selectedFilters.organic || product.organic) &&
      (!selectedFilters.onSale || product.oldPrice) &&
      (!selectedFilters.inStock || product.inStock !== false) &&
      (!selectedFilters.freeShipping || product.freeShipping);
    
    return matchesSearch && matchesPrice && matchesFilters;
  });

  // Enhanced sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      case 'newest': return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
      case 'popular': return (b.popularity || 0) - (a.popularity || 0);
      default: return a.id - b.id;
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handlers
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      const newWishlist = isInWishlist 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId];
      
      setToastMessage(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
      setShowToast(true);
      
      return newWishlist;
    });
  };

  const addToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCartItems(prev => prev + 1);
      setToastMessage(`${product.name} added to cart!`);
      setShowToast(true);
    }, 500);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const resetFilters = () => {
    setSelectedFilters({
      organic: false,
      onSale: false,
      inStock: true,
      freeShipping: false
    });
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };

  // Get display name for the category
  const displayCategoryName = currentCategory?.name || decodeURIComponent(categoryName.replace(/-/g, ' '));

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{opacity: 0.5}} />);
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-muted" />);
    }
    
    return stars;
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed-header">
        <Header 
          cartItems={cartItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <style jsx>{`
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .category-page {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
          padding-top: 80px; /* Account for fixed header */
        }
        
        .hero-header {
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          position: sticky;
          top: 80px;
          z-index: 900;
        }
        
        .hero-content {
          padding: 0.75rem 0;
        }
        
        .main-content {
          padding-top: 0;
        }
        
        .fixed-sidebar {
          position: fixed;
          top: 170px; /* Below breadcrumbs */
          left: 0;
          width: 300px;
          height: calc(100vh - 170px);
          overflow-y: auto;
          background: white;
          border-radius: 0 20px 20px 0;
          box-shadow: 2px 0 15px rgba(0,0,0,0.1);
          z-index: 800;
          padding: 25px;
        }
        
        .fixed-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .fixed-sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .fixed-sidebar::-webkit-scrollbar-thumb {
          background: #28a745;
          border-radius: 3px;
        }
        
        .content-area {
          margin-left: 320px; /* Account for fixed sidebar */
          padding: 20px;
        }
        
        .breadcrumb-above-sidebar {
          position: fixed;
          top: 140px;
          left: 20px;
          z-index: 850;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 6px 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          width: fit-content;
          font-size: 0.8rem;
        }
        
        .view-toggle-top {
          position: fixed;
          top: 140px;
          right: 20px;
          z-index: 850;
          background: white;
          border-radius: 12px;
          padding: 4px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.1);
        }
        
        .product-card {
          transition: all 0.3s ease;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          background: white;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .product-image-container {
          position: relative;
          overflow: hidden;
          background: #f8f9fa;
        }
        
        .product-image {
          transition: transform 0.3s ease;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05); /* Reduced from 1.1 */
        }
        
        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .product-card:hover .product-overlay {
          opacity: 1;
        }
        
        .quick-actions {
          display: flex;
          gap: 10px;
        }
        
        .quick-action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        
        .quick-action-btn:hover {
          transform: scale(1.1);
          background: #28a745;
          color: white;
        }
        
        .product-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 3;
        }
        
        .organic-badge {
          background: linear-gradient(45deg, #4CAF50, #81C784);
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        }
        
        .sale-badge {
          background: linear-gradient(45deg, #FF5722, #FF8A65);
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
        }
        
        .wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 3;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .wishlist-btn:hover {
          background: white;
          transform: scale(1.05);
        }
        
        .filter-sidebar {
          background: transparent;
        }
        
        .filter-title {
          color: #333;
          font-weight: bold;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f8f9fa;
        }
        
        .custom-checkbox {
          position: relative;
          margin-bottom: 15px;
        }
        
        .custom-checkbox input[type="checkbox"] {
          opacity: 0;
          position: absolute;
        }
        
        .custom-checkbox label {
          position: relative;
          padding-left: 35px;
          cursor: pointer;
          font-size: 0.95rem;
          color: #666;
          transition: color 0.3s ease;
        }
        
        .custom-checkbox label:before {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 4px;
          background: white;
          transition: all 0.3s ease;
        }
        
        .custom-checkbox input[type="checkbox"]:checked + label:before {
          background: #28a745;
          border-color: #28a745;
        }
        
        .custom-checkbox input[type="checkbox"]:checked + label:after {
          content: '✓';
          position: absolute;
          left: 4px;
          top: 0px;
          color: white;
          font-size: 14px;
          font-weight: bold;
        }
        
        .view-toggle {
          background: white;
          border-radius: 15px;
          padding: 5px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          position: sticky;
          top: 200px;
          z-index: 600;
          margin-bottom: 20px;
        }
        
        .view-toggle-btn {
          padding: 8px 15px;
          border: none;
          background: transparent;
          color: #666;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .view-toggle-btn.active {
          background: #28a745;
          color: white;
          box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
        }
        
        .list-view-card {
          display: flex;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        
        .list-view-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }
        
        .stats-bar {
          background: white;
          border-radius: 15px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          position: sticky;
          top: 180px;
          z-index: 600;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .search-bar {
          background: white;
          border-radius: 20px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.1);
          border: none;
          overflow: hidden;
        }
        
        .search-input {
          border: none;
          padding: 12px 18px;
          font-size: 0.95rem;
        }
        
        .search-input:focus {
          box-shadow: none;
          outline: none;
        }
        
        .search-btn {
          background: linear-gradient(45deg, #28a745, #20c997);
          border: none;
          padding: 12px 18px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .search-btn:hover {
          background: linear-gradient(45deg, #218838, #1aa179);
        }
        
        .pagination-custom .page-link {
          border: none;
          border-radius: 8px;
          margin: 0 3px;
          padding: 10px 15px;
          background: white;
          color: #666;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .pagination-custom .page-link:hover {
          background: #28a745;
          color: white;
          transform: translateY(-1px);
        }
        
        .pagination-custom .page-item.active .page-link {
          background: #28a745;
          color: white;
          box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
        }
        
        .toast-container {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10000;
        }
        
        .custom-toast {
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
          border: none;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
        }
        
        .breadcrumb-custom .breadcrumb-item + .breadcrumb-item::before {
          content: "›";
          color: #666;
          font-weight: normal;
          margin: 0 6px;
        }
        
        .breadcrumb-custom .breadcrumb-item a {
          color: #28a745;
          text-decoration: none;
          font-size: 0.8rem;
        }
        
        .breadcrumb-custom .breadcrumb-item.active {
          color: #333;
          font-weight: 500;
          font-size: 0.8rem;
        }
        
        .view-toggle-btn-top {
          padding: 6px 10px;
          border: none;
          background: transparent;
          color: #666;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .view-toggle-btn-top.active {
          background: #28a745;
          color: white;
          box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);
        }
        
        /* Simple hero styles */
        .simple-hero-title {
          color: #333;
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0;
        }
        
        .simple-hero-count {
          color: #28a745;
          font-weight: 500;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .fixed-sidebar {
            width: 280px;
          }
          .content-area {
            margin-left: 300px;
          }
        }
        
        @media (max-width: 992px) {
          .fixed-sidebar {
            position: relative;
            width: 100%;
            height: auto;
            border-radius: 15px;
            margin-bottom: 20px;
          }
          .content-area {
            margin-left: 0;
          }
        }
      `}</style>

      <div className="category-page">

        {/* Fixed View Toggle - Top Right */}
        <div className="view-toggle-top d-none d-lg-flex">
          <button
            className={`view-toggle-btn-top ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <FaTh />
          </button>
          <button
            className={`view-toggle-btn-top ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <FaList />
          </button>
        </div>

        {/* Simple Hero Header */}
        <div className="hero-header">
          <Container className="hero-content">
            <Row className="align-items-center">
              <Col>
                <h1 className="simple-hero-title">
                  {displayCategoryName}
                </h1>
              </Col>
              <Col xs="auto">
                <span className="simple-hero-count">
                  {sortedProducts.length} products
                </span>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Fixed Sidebar - Left */}
        <div className="fixed-sidebar d-none d-lg-block">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="filter-title mb-0">🔍 Filters</h5>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={resetFilters}
              className="rounded-pill"
            >
              Reset
            </Button>
          </div>

          {/* Search Filter */}
          <div className="mb-4">
            <InputGroup className="search-bar">
              <Form.Control
                type="search"
                placeholder={`Search in ${displayCategoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <Button className="search-btn">
                <FaSearch />
              </Button>
            </InputGroup>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">💰 Price Range</h6>
            <Form.Range
              min={0}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="mb-2"
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>₹0</span>
              <span className="fw-bold text-success">₹{priceRange[1]}</span>
            </div>
          </div>

          {/* Filter Options */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">🏷️ Product Types</h6>
            
            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="organic"
                checked={selectedFilters.organic}
                onChange={(e) => setSelectedFilters(prev => ({...prev, organic: e.target.checked}))}
              />
              <label htmlFor="organic">🌱 Organic Products</label>
            </div>

            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="onSale"
                checked={selectedFilters.onSale}
                onChange={(e) => setSelectedFilters(prev => ({...prev, onSale: e.target.checked}))}
              />
              <label htmlFor="onSale">🔥 On Sale</label>
            </div>

            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="freeShipping"
                checked={selectedFilters.freeShipping}
                onChange={(e) => setSelectedFilters(prev => ({...prev, freeShipping: e.target.checked}))}
              />
              <label htmlFor="freeShipping">🚚 Free Shipping</label>
            </div>

            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="inStock"
                checked={selectedFilters.inStock}
                onChange={(e) => setSelectedFilters(prev => ({...prev, inStock: e.target.checked}))}
              />
              <label htmlFor="inStock">✅ In Stock Only</label>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h6 className="fw-bold mb-3">📊 Sort By</h6>
            <Dropdown className="w-100">
              <Dropdown.Toggle 
                variant="outline-success" 
                className="w-100 d-flex justify-content-between align-items-center rounded-pill"
              >
                <div className="d-flex align-items-center">
                  <FaSortAmountDown className="me-2" />
                  {sortOption === 'featured' && 'Featured'}
                  {sortOption === 'price-low' && 'Price: Low to High'}
                  {sortOption === 'price-high' && 'Price: High to Low'}
                  {sortOption === 'rating' && 'Customer Rating'}
                  {sortOption === 'newest' && 'Newest First'}
                  {sortOption === 'popular' && 'Most Popular'}
                </div>
                <FaChevronDown />
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <Dropdown.Item onClick={() => setSortOption('featured')}>
                  ⭐ Featured
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption('price-low')}>
                  💰 Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption('price-high')}>
                  💎 Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption('rating')}>
                  ⭐ Customer Rating
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption('newest')}>
                  🆕 Newest First
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption('popular')}>
                  🔥 Most Popular
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Main Content Area - Right side */}
        <div className="content-area">
          {/* Products Section */}
          {currentProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <Row className="g-4">
                {currentProducts.map((product, index) => (
                  <Col key={product.id} xs={6} md={6} lg={4} className="mb-4">
                    <Card className={`product-card h-100 animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="product-image-container" style={{ height: '200px' }}>
                        {/* Product Badges */}
                        <div className="product-badge">
                          {product.organic && (
                            <div className="organic-badge mb-2">
                              🌱 Organic
                            </div>
                          )}
                          {product.oldPrice && (
                            <div className="sale-badge">
                              🔥 {Math.round((1 - product.price/product.oldPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button 
                          className="wishlist-btn"
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <FaHeart 
                            size={16} 
                            color={wishlist.includes(product.id) ? '#dc3545' : '#6c757d'} 
                          />
                        </button>

                        <img
                          src={product.image || '/images/placeholder-product.jpg'}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/images/placeholder-product.jpg';
                          }}
                        />

                        {/* Hover Overlay with Quick Actions */}
                        <div className="product-overlay">
                          <div className="quick-actions">
                            <button 
                              className="quick-action-btn"
                              onClick={() => handleQuickView(product)}
                              title="Quick View"
                            >
                              <FaEye />
                            </button>
                            <button 
                              className="quick-action-btn"
                              onClick={() => addToCart(product)}
                              title="Add to Cart"
                            >
                              <FaShoppingCart />
                            </button>
                            <button 
                              className="quick-action-btn"
                              title="Share"
                            >
                              <FaShare />
                            </button>
                          </div>
                        </div>
                      </div>

                      <Card.Body className="p-3">
                        <div className="mb-2">
                          <span className="text-success small fw-bold">
                            {product.category || product.subcategory}
                          </span>
                          <Card.Title className="fs-6 fw-bold mt-1 mb-2">
                            {product.name}
                          </Card.Title>
                          
                          {/* Rating */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="d-flex me-2">
                              {renderStars(product.rating || 4.5)}
                            </div>
                            <span className="small text-muted">
                              ({Math.floor((product.rating || 4.5) * 20)})
                            </span>
                          </div>
                        </div>

                        {/* Price Container */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <span className="fw-bold fs-5 text-success">
                                ₹{product.price}
                              </span>
                              {product.oldPrice && (
                                <span className="text-decoration-line-through text-muted ms-2 small">
                                  ₹{product.oldPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-muted small">{product.unit || 'per lb'}</span>
                          </div>
                          
                          {/* Product Features */}
                          <div className="d-flex gap-1 mb-3">
                            {product.freeShipping && (
                              <Badge bg="success" className="rounded-pill small">
                                <FaTruck className="me-1" style={{fontSize: '8px'}} />
                                Free
                              </Badge>
                            )}
                            {product.organic && (
                              <Badge bg="success" className="rounded-pill small">
                                <FaLeaf className="me-1" style={{fontSize: '8px'}} />
                                Organic
                              </Badge>
                            )}
                          </div>

                          <Button 
                            variant="success" 
                            className="w-100 rounded-pill fw-bold"
                            onClick={() => addToCart(product)}
                            disabled={loading}
                            size="sm"
                          >
                            {loading ? (
                              <Spinner size="sm" className="me-2" />
                            ) : (
                              <FaShoppingCart className="me-2" />
                            )}
                            Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              // List View
              <div>
                {currentProducts.map((product, index) => (
                  <div key={product.id} className={`list-view-card animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                    <div style={{ width: '180px', height: '130px', flexShrink: 0 }}>
                      <img
                        src={product.image || '/images/placeholder-product.jpg'}
                        alt={product.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-grow-1 p-4">
                      <div className="d-flex justify-content-between">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-success small fw-bold">
                              {product.category || product.subcategory}
                            </span>
                            {product.organic && (
                              <Badge bg="success" className="rounded-pill small">
                                🌱 Organic
                              </Badge>
                            )}
                            {product.oldPrice && (
                              <Badge bg="danger" className="rounded-pill small">
                                🔥 Sale
                              </Badge>
                            )}
                          </div>
                          <h5 className="fw-bold mb-2">{product.name}</h5>
                          <div className="d-flex align-items-center mb-2">
                            <div className="d-flex me-2">
                              {renderStars(product.rating || 4.5)}
                            </div>
                            <span className="small text-muted">
                              ({Math.floor((product.rating || 4.5) * 20)} reviews)
                            </span>
                          </div>
                          <p className="text-muted mb-3 small">
                            {product.description || "Fresh, high-quality product perfect for your daily needs."}
                          </p>
                          <div className="d-flex gap-2">
                            {product.freeShipping && (
                              <Badge bg="outline-success" className="rounded-pill small">
                                <FaTruck className="me-1" />
                                Free Shipping
                              </Badge>
                            )}
                            <Badge bg="outline-primary" className="rounded-pill small">
                              <FaShieldAlt className="me-1" />
                              Quality Guaranteed
                            </Badge>
                          </div>
                        </div>
                        <div className="text-end" style={{ minWidth: '140px' }}>
                          <div className="mb-3">
                            <span className="fw-bold fs-4 text-success d-block">
                              ₹{product.price}
                            </span>
                            {product.oldPrice && (
                              <span className="text-decoration-line-through text-muted small">
                                ₹{product.oldPrice}
                              </span>
                            )}
                            <small className="text-muted d-block">{product.unit || 'per lb'}</small>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            <Button 
                              variant="success" 
                              className="rounded-pill fw-bold"
                              onClick={() => addToCart(product)}
                              disabled={loading}
                              size="sm"
                            >
                              <FaShoppingCart className="me-2" />
                              Add to Cart
                            </Button>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                className="rounded-pill flex-grow-1"
                                onClick={() => handleQuickView(product)}
                              >
                                <FaEye />
                              </Button>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                className="rounded-pill"
                                onClick={() => toggleWishlist(product.id)}
                              >
                                <FaHeart 
                                  color={wishlist.includes(product.id) ? '#dc3545' : '#6c757d'} 
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-5">
              <div className="mb-4">
                <FaSearch size={64} className="text-muted" />
              </div>
              <h4 className="fw-bold mb-3">No products found</h4>
              <p className="text-muted mb-4">
                We couldn't find any products matching your criteria.
              </p>
              <Button 
                variant="success" 
                className="rounded-pill px-4"
                onClick={resetFilters}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination className="pagination-custom">
                <Pagination.Prev 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => prev - 1)}
                />
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage > totalPages - 3) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === currentPage}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                />
              </Pagination>
            </div>
          )}

          {/* Mobile View Toggle */}
          <div className="d-lg-none d-flex justify-content-end mb-3">
            <div className="view-toggle d-inline-flex">
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <div className="d-lg-none mb-4">
            <div className="filter-sidebar bg-white rounded p-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="filter-title mb-0">🔍 Filters</h6>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={resetFilters}
                  className="rounded-pill"
                >
                  Reset
                </Button>
              </div>

              {/* Mobile Search Filter */}
              <div className="mb-3">
                <InputGroup className="search-bar">
                  <Form.Control
                    type="search"
                    placeholder={`Search in ${displayCategoryName}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <Button className="search-btn">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </div>

              {/* Mobile Sort Options */}
              <div>
                <Dropdown className="w-100">
                  <Dropdown.Toggle 
                    variant="outline-success" 
                    className="w-100 d-flex justify-content-between align-items-center rounded-pill"
                    size="sm"
                  >
                    <div className="d-flex align-items-center">
                      <FaSortAmountDown className="me-2" />
                      {sortOption === 'featured' && 'Featured'}
                      {sortOption === 'price-low' && 'Price: Low to High'}
                      {sortOption === 'price-high' && 'Price: High to Low'}
                      {sortOption === 'rating' && 'Customer Rating'}
                      {sortOption === 'newest' && 'Newest First'}
                      {sortOption === 'popular' && 'Most Popular'}
                    </div>
                    <FaChevronDown />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setSortOption('featured')}>
                      ⭐ Featured
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('price-low')}>
                      💰 Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('price-high')}>
                      💎 Price: High to Low
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('rating')}>
                      ⭐ Customer Rating
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('newest')}>
                      🆕 Newest First
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('popular')}>
                      🔥 Most Popular
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <Modal 
          show={showQuickView} 
          onHide={() => setShowQuickView(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title>Quick View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Row>
                <Col md={6}>
                  <img
                    src={selectedProduct.image || '/images/placeholder-product.jpg'}
                    alt={selectedProduct.name}
                    className="w-100 rounded"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <span className="text-success small fw-bold">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <h4 className="fw-bold mb-3">{selectedProduct.name}</h4>
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex me-2">
                      {renderStars(selectedProduct.rating || 4.5)}
                    </div>
                    <span className="small text-muted">
                      ({Math.floor((selectedProduct.rating || 4.5) * 20)} reviews)
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="fw-bold fs-3 text-success">
                      ₹{selectedProduct.price}
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-decoration-line-through text-muted ms-2">
                        ₹{selectedProduct.oldPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-muted mb-4">
                    {selectedProduct.description || "Fresh, high-quality product perfect for your daily needs."}
                  </p>
                  <div className="d-flex gap-2 mb-4">
                    {selectedProduct.organic && (
                      <Badge bg="success" className="rounded-pill">
                        🌱 Organic
                      </Badge>
                    )}
                    {selectedProduct.freeShipping && (
                      <Badge bg="success" className="rounded-pill">
                        🚚 Free Shipping
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="success" 
                      className="flex-grow-1 rounded-pill"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setShowQuickView(false);
                      }}
                    >
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      className="rounded-pill"
                      onClick={() => toggleWishlist(selectedProduct.id)}
                    >
                      <FaHeart 
                        color={wishlist.includes(selectedProduct.id) ? '#dc3545' : '#6c757d'} 
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>

        {/* Loading Overlay */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div className="text-center text-white">
              <Spinner size="lg" className="mb-3" />
              <h5>Adding to cart...</h5>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <div className="toast-container">
          <Toast 
            show={showToast} 
            onClose={() => setShowToast(false)}
            className="custom-toast"
            autohide
            delay={3000}
          >
            <Toast.Body className="d-flex align-items-center">
              <FaCheckCircle className="me-2" />
              {toastMessage}
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;