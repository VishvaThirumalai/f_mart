// src/components/GroceryHome.js - Key fixes for Add to Cart functionality
import React, { useState } from 'react';
import { 
  Container, Navbar, Nav, Carousel, Card, Row, Col, Button, Form, InputGroup, Badge 
} from 'react-bootstrap';
import { 
  FaSearch, FaShoppingCart, FaUser, FaStar, FaHeart, FaPhone, FaEnvelope, 
  FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaTruck, FaLeaf, 
  FaCheckCircle, FaHeadset, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay,
  FaArrowRight, FaFire, FaClock, FaShieldAlt
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import freshVegetablesBanner from '../assets/images/fresh-vegetables.jpg';
import organicfruitesBanner from '../assets/images/organic-fru.jpg';
import { products, deals } from '../data/products';
import placeholder from '../assets/images/placeholder-category.jpg';
import Marquee from 'react-fast-marquee';
// Import category images
import bakery from '../assets/images/categories/bakery.jpg';
import dairyEgg from '../assets/images/categories/dairy_egg.webp';
import beverages from '../assets/images/categories/beverages.png';
import fishMeat from '../assets/images/categories/fish-meat.jpg';
import fruitsVeggies from '../assets/images/categories/fruite_vege.png';
import snacks from '../assets/images/categories/snacks.jpg';
import Header from '../Layout/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Define parentCategories directly if not using categoryUtils
const parentCategories = [
  {
    name: "Bakery",
    slug: "bakery",
    image: bakery,
    subcategories: []
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    image: dairyEgg,
    subcategories: []
  },
  {
    name: "Beverages",
    slug: "beverages",
    image: beverages,
    subcategories: []
  },
  {
    name: "Fish & Meat",
    slug: "meat-fish",
    image: fishMeat,
    subcategories: []
  },
  {
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    image: fruitsVeggies,
    subcategories: []
  },
  {
    name: "Snacks",
    slug: "snacks",
    image: snacks,
    subcategories: []
  }
];

const GroceryHome = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();
  const { addToCart, getTotalItems } = useCart();

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    try {
      const result = await addToCart(product, 1);
      if (result.success) {
        // You can add a toast notification here
        console.log('Product added to cart successfully');
      } else {
        console.error('Failed to add to cart:', result.message);
        alert(result.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const featuredProducts = products.slice(0, 6);
  const filteredProducts = featuredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartItemsCount = getTotalItems();

  return (
    <div className="grocery-home">
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #1c51d8ff 0%, #764ba2 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .floating-card {
          animation: float 6s ease-in-out infinite;
          box-shadow: 0 20px 40px rgba(120, 243, 26, 0.1);
          transition: all 10s ease;
        }
        
        .floating-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(12, 57, 238, 0.15);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .category-card {
          transition: all 0.3s ease;
          border: none;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(145deg, #55aaa4ff, #b1efedff);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          will-change: transform; 
          backface-visibility: hidden;
        }
        
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .category-card img {
        image-rendering: auto;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }
        
        .product-card {
          transition: all 0.3s ease;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          position: relative;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #66eacdff 0%, #c2a8a8ff 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(-10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .neon-text {
          color: #00ff88;
          text-shadow: 0 0 10px #00ff88;
        }
        
        .pulse-button {
          animation: pulse 5s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
        }
        
        .top-bar {
          background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
          color: white;
        }
        
        .navbar-brand h2 {
          background: linear-gradient(45deg, #4a945bff, #20c997);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .deals-timer {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          padding: 5px 8px;
          border-radius: 25px;
          display: inline-block;
          animation: glow 10s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { box-shadow: 0 0 10px #f99a9aff; }
          to { box-shadow: 0 0 20px #0b0a0aff; }
        }
        
        .feature-icon {
          background: linear-gradient(135deg, #a1abd6ff 0%, #764ba2 100%);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .newsletter-section {
          background: linear-gradient(135deg, #b6c0ebff 10%, #95d2d4ff 50%);
          color: black;
        }
        
        .footer-dark {
          background: linear-gradient(135deg, #b6c0ebff 10%, #95d2d4ff 50%);
        }
      `}</style>

      {/* Enhanced Top Bar */}
      <div className="top-bar py-2 d-none d-md-block">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <FaPhone className="me-2" />
                <span className="me-3">+91 7010799366</span>
                <FaEnvelope className="me-2" />
                <span>Freshmart@gmail.com</span>
              </div>
            </Col>
            <Col md={6} className="text-end">
              <span className="me-3">🎉 Free delivery on orders over  ₹ 150!</span>
              {!isAuthenticated && (
                <>
                  <Link to="/login" className="text-white text-decoration-none me-3">Login</Link>
                  <Link to="/register" className="text-white text-decoration-none">Register</Link>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Enhanced Navigation */}
      <Header 
        cartItems={cartItemsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        Welcome to FreshMart - your one-stop online destination for fresh fruits, vegetables, groceries, dairy products, personal care, and household essentials. Shop from the comfort of your home and enjoy same-day delivery, unbeatable prices, and farm-fresh quality. Experience hassle-free shopping, 24/7 customer support, and secure payments at FreshMart. Eat fresh, live healthy – only at FreshMart!
      </Marquee>

      {/* Hero Carousel */}
      <Carousel fade className="mb-5">
        <Carousel.Item>
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img
              className="d-block w-100 h-100"
              src={freshVegetablesBanner}
              alt="Fresh Vegetables"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <Carousel.Caption className="text-start" style={{ bottom: '30%', left: '10%', right: 'auto' }}>
            <h2 className="display-4 fw-bold">Fresh Vegetables</h2>
            <p className="lead">Get 20% off on your first order</p>
            <Link to='/shop'><Button variant="success" size="lg">Shop Now</Button></Link>  
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img
              className="d-block w-100 h-100"
              src={organicfruitesBanner}
              alt="Organic Fruits"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <Carousel.Caption className="text-start" style={{ bottom: '30%', left: '10%', right: 'auto' }}>
            <h2 className="display-4 fw-bold">Organic Fruits</h2>
            <p className="lead">Farm to table in 24 hours</p>
            <Link to='/shop'><Button variant="success" size="lg">Shop Now</Button></Link>  
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Enhanced Categories Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">🛒 Shop by Categories</h2>
            <p className="lead text-muted">Discover fresh products across all categories</p>
          </div>
          
          <Row className="g-4">
            {parentCategories.map((category, index) => (
              <Col key={category.slug} xs={6} sm={4} md={3} lg={2} className="d-flex">
                <Link 
                  to={`/category/${category.slug}`}
                  className="text-decoration-none w-100"
                  aria-label={`Browse ${category.name} category`}
                >
                  <Card className="category-card h-100 w-100 border-0 shadow-sm hover-shadow">
                    <div 
                      className="ratio ratio-1x1 position-relative overflow-hidden"
                      style={{ minHeight: '150px' }}
                    >
                      <Card.Img
                        variant="top"
                        src={category.image || placeholder}
                        alt={category.name}
                        className="object-fit-cover"
                        style={{ 
                          transition: 'transform 0.3s ease',
                          animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                          width: '100%',
                          height: '100%',
                          objectPosition: 'center'
                        }}
                        onError={(e) => { 
                          e.target.src = placeholder;
                        }}
                      />
                      <div className="position-absolute bottom-0 start-0 end-0 glass-effect p-2">
                        <small className="text-white fw-bold">
                          {category.subcategories.length} items
                        </small>
                      </div>
                    </div>
                    <Card.Body className="text-center p-3">
                      <Card.Title className="fs-6 mb-1 text-dark fw-bold">
                        {category.name}
                      </Card.Title>
                      <small className="text-success">
                        Fresh & Quality ✨
                      </small>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
           
          <div className="text-center mt-5">
           <Button 
              variant="outline-success" 
              size="lg" 
              className="rounded-pill px-4"
              as={Link} 
              to="/shop"
            >
              <FaArrowRight className="me-2" />
              Explore All Categories
            </Button>
          </div>
        </Container>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-1 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div>
              <h6 className="display-5 fw-bold mb-2">⭐ Featured Products</h6>
              <p className="text-muted">Handpicked fresh items just for you</p>
            </div>
           <Link to='/shop'><Button variant="success" size="10px" className="rounded-pill">
              View All <FaArrowRight className="ms-2" />
            </Button></Link>
          </div>
          <Row className="g-4">
            {filteredProducts.map((product, index) => (
              <Col key={product.id} xs={6} md={4} lg={3} className="mb-2">
                <Card className="product-card h-100 border-0 shadow-sm">
                  <div className="position-absolute end-0 top-0 p-3 z-3">
                    <Button 
                      variant="link" 
                      className="p-0 rounded-circle bg-white shadow-sm" 
                      style={{ width: '40px', height: '40px' }}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <FaHeart 
                        size={18} 
                        color={wishlist.includes(product.id) ? '#dc3545' : '#6c757d'} 
                      />
                    </Button>
                  </div>
                  {product.oldPrice && (
                    <Badge bg="danger" className="position-absolute start-0 top-0 m-2 z-3">
                      {Math.round((1 - product.price/product.oldPrice) * 100)}% OFF
                    </Badge>
                  )}
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={product.image || '/images/placeholder-product.jpg'} 
                      alt={product.name}
                      style={{ 
                        objectFit: 'cover', 
                        height: '100%', 
                        width: '100%',
                        transition: 'transform 0.3s ease'
                      }}
                      className="hover-scale"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  <Card.Body className="p-3">
                    <span className="text-success small fw-bold">{product.category}</span>
                    <Card.Title className="fs-6 fw-bold mb-2">{product.name}</Card.Title>
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex text-warning me-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={12} className={i < Math.floor(product.rating) ? '' : 'text-muted'} />
                        ))}
                      </div>
                      <span className="small text-muted">({Math.floor(product.rating * 20)})</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold fs-5 text-success">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-decoration-line-through text-muted small ms-2">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="success" 
                        size="sm"
                        className="rounded-pill"
                        onClick={() => handleAddToCart(product)}
                        disabled={!isAuthenticated}
                      >
                        <FaShoppingCart className="me-1" />
                        {isAuthenticated ? 'Add' : 'Login'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Enhanced Deal of the Day */}
      <section className="py-5 gradient-bg">
        <Container>
          <div className="text-center mb-5">
            <div className="deals-timer d-inline-block mb-3">
              <FaFire className="me-2" />
              Deal Ends in: 23:59:59
            </div>
            <h2 className="display-5 fw-bold text-white">🔥 Deal of the Day</h2>
            <p className="lead text-white">Limited time offers you can't miss!</p>
          </div>
          <Row className="g-4">
            {deals.map(deal => (
              <Col key={deal.id} md={6} className="mb-4">
                <Card className="floating-card h-100 border-0 shadow-lg">
                  <Row className="g-0 h-100">
                    <Col md={5}>
                      <div style={{ height: '300px', overflow: 'hidden' }}>
                        <img 
                          src={deal.image || '/images/placeholder-product.jpg'} 
                          alt={deal.name}
                          style={{ 
                            objectFit: 'cover', 
                            height: '100%', 
                            width: '100%',
                            transition: 'transform 0.3s ease'
                          }}
                          onError={(e) => {
                            e.target.src = '/images/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    </Col>
                    <Col md={7}>
                      <Card.Body className="h-100 d-flex flex-column p-4">
                        <div className="mb-3">
                          <Badge bg="danger" className="fs-6 px-3 py-2">
                            {deal.discount}
                          </Badge>
                        </div>
                        <Card.Title className="fw-bold mb-3">{deal.name}</Card.Title>
                        <div className="d-flex align-items-center mb-3">
                          <div className="d-flex text-warning me-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < Math.floor(deal.rating) ? '' : 'text-muted'} />
                            ))}
                          </div>
                          <span className="small text-muted">({deal.rating})</span>
                        </div>
                        <div className="mt-auto">
                          <div className="d-flex align-items-center mb-3">
                            <span className="fw-bold display-6 text-success">₹{deal.price}</span>
                            {deal.oldPrice && (
                              <span className="text-decoration-line-through text-muted ms-3 fs-4">
                                ₹{deal.oldPrice}
                              </span>
                            )}
                          </div>
                          <div className="progress mb-3" style={{ height: '12px' }}>
                            <div 
                              className="progress-bar bg-gradient progress-bar-striped progress-bar-animated" 
                              role="progressbar" 
                              style={{ width: '65%' }}
                              aria-valuenow="65" 
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <small className="text-muted">⚡ Only 12 left in stock!</small>
                            <small className="text-success fw-bold">65% claimed</small>
                          </div>
                          <Button 
                            variant="success" 
                            className="w-100 pulse-button"
                            size="lg"
                            onClick={() => handleAddToCart(deal)}
                            disabled={!isAuthenticated}
                          >
                            <FaShoppingCart className="me-2" />
                            {isAuthenticated ? 'Grab Deal Now!' : 'Login to Buy'}
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">🌟 Why Choose FreshMart</h2>
            <p className="lead text-muted">Experience the difference with our premium service</p>
          </div>
          <Row className="g-4">
            <Col md={3} className="text-center mb-4">
              <div className="feature-icon">
                <FaTruck size={35} className="text-white" />
              </div>
              <h5 className="fw-bold mb-3">⚡ Lightning Fast Delivery</h5>
              <p className="text-muted">Get your order delivered in just 30 minutes with our express service</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="feature-icon">
                <FaLeaf size={35} className="text-white" />
              </div>
              <h5 className="fw-bold mb-3">🌱 Farm Fresh Products</h5>
              <p className="text-muted">Direct from organic farms to your table within 24 hours</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="feature-icon">
                <FaShieldAlt size={35} className="text-white" />
              </div>
              <h5 className="fw-bold mb-3">🛡️ Quality Guarantee</h5>
              <p className="text-muted">100% satisfaction guaranteed or your money back</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="feature-icon">
                <FaHeadset size={35} className="text-white" />
              </div>
              <h5 className="fw-bold mb-3">💬 24/7 Support</h5>
              <p className="text-muted">Our dedicated team is always here to help you</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Enhanced Newsletter */}
      <section className="newsletter-section py-4">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold text-black mb-3">📬 Stay Updated with Fresh Deals!</h2>
              <p className="lead text-black mb-3">
                Subscribe to our newsletter and get 15% off your first order plus exclusive offers
              </p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  className="rounded-pill-start py-2 px-4 border-0"
                  aria-label="Email for newsletter subscription"
                />
                <Button 
                  variant="success" 
                  className="rounded-pill-end px-4 py-1 pulse-button"
                >
                  Subscribe <FaArrowRight className="ms-2" />
                </Button>
              </Form>
              <p className="text-black-50 mt-3 small">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer-dark text-black py-5">
        <Container>
          <Row>
            <Col lg={4} className="mb-4">
              <h3 className="fw-bold mb-4">FreshMart</h3>
              <p className="text-black-70">
                Your one-stop shop for fresh, organic groceries delivered fast to your doorstep. 
                Quality you can trust, service you'll love.
              </p>
              <div className="d-flex gap-3 mt-4" >
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaFacebook />
                </Button>
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaTwitter />
                </Button>
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaInstagram />
                </Button>
              </div>
            </Col>
            <Col md={4} lg={2} className="mb-4">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
                <li className="mb-2"><Link to="/shop" className="text-white-50 text-decoration-none">Shop</Link></li>
                <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
                <li className="mb-2"><Link to="/faq" className="text-white-50 text-decoration-none">FAQs</Link></li>
              </ul>
            </Col>
            <Col md={4} lg={2} className="mb-4">
              <h5 className="fw-bold mb-4">Categories</h5>
              <ul className="list-unstyled">
                {parentCategories.slice(0, 5).map(category => (
                  <li key={category.name} className="mb-2">
                    <Link 
                      to={`/category/${category.slug}`} 
                      className="text-black-70 text-decoration-none"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={4} lg={4} className="mb-4">
              <h5 className="fw-bold mb-4">Contact Us</h5>
              <ul className="list-unstyled text-black-100">
                <li className="mb-3 d-flex align-items-start">
                  <FaMapMarkerAlt className="me-2 mt-1" />
                  <span>123 Fresh Street, chennai City, chennai 632001</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaPhone className="me-2" />
                  <span>+91 7092980042</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="me-2" />
                  <span>Freshmart@gmail.com</span>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <p className="mb-0 small">&copy; {new Date().getFullYear()} FreshMart. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex justify-content-md-end gap-3">
                <FaCcVisa size={24} />
                <FaCcMastercard size={24} />
                <FaCcPaypal size={24} />
                <FaCcApplePay size={24} />
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default GroceryHome;