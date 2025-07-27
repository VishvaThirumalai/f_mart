// src/Layout/Header.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, InputGroup, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (setSearchQuery) {
      setSearchQuery(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  const cartItemsCount = getTotalItems();

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <h3 className="mb-0 text-success">FreshMart</h3>
          <small className="text-muted">🌱 Your Fresh Partner</small>
        </Navbar.Brand>

        <div className="d-flex align-items-center ms-auto me-3 order-lg-2">
          {/* Search Form - Desktop */}
          <Form className="d-none d-lg-flex me-3" onSubmit={handleSearchSubmit} style={{ minWidth: '300px' }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search fresh products..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="border-success"
              />
              <Button variant="success" type="submit" className="pulse-button">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>

          {/* Cart Icon */}
          <Nav.Link as={Link} to="/cart" className="position-relative me-3">
            <FaShoppingCart size={24} className="text-success" />
            {cartItemsCount > 0 && (
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {cartItemsCount}
              </Badge>
            )}
          </Nav.Link>
          
          {/* User Menu */}
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} className="p-0 d-flex align-items-center text-decoration-none">
                <div className="d-flex align-items-center">
                  <FaUser size={20} className="text-success me-2" />
                  <span className="d-none d-md-inline text-dark fw-semibold">
                    {user.name}
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="fw-bold">{user.name}</div>
                  <div className="small text-muted">{user.email}</div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/orders">
                  <FaBox className="me-2" /> My Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/cart">
                  <FaShoppingCart className="me-2" /> My Cart
                  {cartItemsCount > 0 && (
                    <Badge bg="success" className="ms-2">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-2">
              <Button 
                variant="outline-success" 
                size="sm" 
                as={Link} 
                to="/login"
                className="rounded-pill"
              >
                Login
              </Button>
              <Button 
                variant="success" 
                size="sm" 
                as={Link} 
                to="/register"
                className="rounded-pill"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" className="fw-semibold">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold">Contact</Nav.Link>
            <Nav.Link as={Link} to="/offers" className="fw-semibold text-danger">
              🔥 Offers
            </Nav.Link>
          </Nav>

          {/* Search Form - Mobile */}
          <Form className="d-lg-none mb-2" onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search fresh products..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="border-success"
              />
              <Button variant="success" type="submit">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;