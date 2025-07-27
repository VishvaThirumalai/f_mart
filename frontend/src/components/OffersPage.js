// src/components/OffersPage.js
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { deals } from '../data/products';
import Header from '../Layout/Header';

const OffersPage = () => {
  const [cartItems, setCartItems] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState(''); // ✅ Fix added

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  return (
    <>
      {/* ✅ Fixed JSX syntax + added props */}
      <Header 
        cartItems={cartItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Container className="py-5">
        <h1 className="mb-4">Special Offers</h1>
        
        <Row>
          {deals.map(deal => (
            <Col key={deal.id} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex">
                    <div style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
                      <img 
                        src={deal.image} 
                        alt={deal.name}
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <Card.Title>{deal.name}</Card.Title>
                        <Badge bg="danger">{deal.discount}</Badge>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaStar className="text-warning me-1" />
                        <span>{deal.rating}</span>
                      </div>
                      <Card.Text className="text-muted small">
                        {deal.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          <span className="fw-bold fs-5 text-success">₹{deal.price}</span>
                          {deal.oldPrice && (
                            <span className="text-decoration-line-through text-muted ms-2">
                              ₹{deal.oldPrice}
                            </span>
                          )}
                        </div>
                        <Button variant="success" size="sm" onClick={addToCart}>
                          <FaShoppingCart className="me-1" /> Add to Cart
                        </Button>
                      </div>
                    </div>
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

export default OffersPage;
