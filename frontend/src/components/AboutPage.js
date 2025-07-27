// src/components/AboutPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLeaf, FaTruck, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import Header from '../Layout/Header';
const AboutPage = () => {
  // Temporary state just for Header props
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header cartItems={cartItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Container className="py-5">
        <h1 className="mb-4">About FreshMart</h1>

        <Row className="mb-5">
          <Col md={6}>
            <h2>Our Story</h2>
            <p>
              FreshMart was founded in 2015 with a simple mission: to make fresh, 
              high-quality groceries accessible to everyone. What started as a small 
              local delivery service has grown into a trusted online grocery platform 
              serving thousands of happy customers.
            </p>
            <p>
              We partner directly with farmers and producers to bring you the freshest 
              products at competitive prices, all delivered to your doorstep with care.
            </p>
          </Col>
          <Col md={6}>
            <img 
              src="../images/about-us.jpg" 
              alt="FreshMart Team" 
              className="img-fluid rounded"
            />
          </Col>
        </Row>

        <h2 className="text-center mb-4">Why Choose Us</h2>
        <Row>
          <Col md={3} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaLeaf size={30} className="text-success" />
              </div>
              <Card.Title>Fresh Products</Card.Title>
              <Card.Text>
                Direct from farms to your table in the shortest time possible
              </Card.Text>
            </Card>
          </Col>
          <Col md={3} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaTruck size={30} className="text-success" />
              </div>
              <Card.Title>Fast Delivery</Card.Title>
              <Card.Text>
                Get your groceries in as little as 2 hours with our express service
              </Card.Text>
            </Card>
          </Col>
          <Col md={3} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaCheckCircle size={30} className="text-success" />
              </div>
              <Card.Title>Quality Guarantee</Card.Title>
              <Card.Text>
                We inspect every product to ensure it meets our high standards
              </Card.Text>
            </Card>
          </Col>
          <Col md={3} className="text-center mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <FaHeadset size={30} className="text-success" />
              </div>
              <Card.Title>24/7 Support</Card.Title>
              <Card.Text>
                Our customer service team is always ready to help you
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutPage;
