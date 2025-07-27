import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import Header from '../Layout/Header';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToCart(product);
    if (result.success) {
      console.log('Added to cart successfully');
    } else {
      alert(result.message || 'Failed to add to cart');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container className="py-5">
        <h2 className="mb-4">All Products</h2>
        <Row>
          {filteredProducts.map(product => (
            <Col key={product.id} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={product.image || '/images/placeholder-product.jpg'}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-product.jpg';
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <div className="d-flex align-items-center mb-2">
                    <div className="d-flex text-warning me-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} className={i < Math.floor(product.rating) ? '' : 'text-muted'} />
                      ))}
                    </div>
                    <span className="small text-muted">({product.rating})</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <span className="fw-bold text-success">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-decoration-line-through text-muted small ms-2">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-1" />
                      Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ShopPage;