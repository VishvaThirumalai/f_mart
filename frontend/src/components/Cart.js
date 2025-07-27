// src/components/Cart.js
import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Button, Table, Alert, 
  Spinner, Modal, Badge, Form 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaShoppingCart, FaTrash, FaPlus, FaMinus, 
  FaArrowLeft, FaCreditCard, FaShoppingBag,
  FaTimes, FaExclamationTriangle
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../Layout/Header';

const Cart = () => {
  const { 
    cart, 
    loading, 
    error, 
    removeFromCart, 
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState({});
  const [localError, setLocalError] = useState(null);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 0) return;
    
    setItemLoading(prev => ({ ...prev, [productId]: true }));
    setLocalError(null);
    
    try {
      const result = await updateQuantity(productId, newQuantity);
      if (!result.success) {
        setLocalError(result.message);
      }
    } catch (err) {
      setLocalError('Failed to update quantity');
    } finally {
      setItemLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    setItemLoading(prev => ({ ...prev, [productId]: true }));
    setLocalError(null);
    
    try {
      const result = await increaseQuantity(productId);
      if (!result.success) {
        setLocalError(result.message);
      }
    } catch (err) {
      setLocalError('Failed to increase quantity');
    } finally {
      setItemLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    setItemLoading(prev => ({ ...prev, [productId]: true }));
    setLocalError(null);
    
    try {
      const result = await decreaseQuantity(productId);
      if (!result.success) {
        setLocalError(result.message);
      }
    } catch (err) {
      setLocalError('Failed to decrease quantity');
    } finally {
      setItemLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = async (productId, itemName) => {
    setItemLoading(prev => ({ ...prev, [productId]: true }));
    setLocalError(null);
    
    try {
      const result = await removeFromCart(productId);
      if (result.success) {
        // Success message could be shown here
        console.log(`${itemName} removed from cart`);
      } else {
        setLocalError(result.message);
      }
    } catch (err) {
      setLocalError('Failed to remove item');
    } finally {
      setItemLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleClearCart = async () => {
    setClearLoading(true);
    setLocalError(null);
    
    try {
      const result = await clearCart();
      if (result.success) {
        setShowClearModal(false);
        console.log('Cart cleared successfully');
      } else {
        setLocalError(result.message);
      }
    } catch (err) {
      setLocalError('Failed to clear cart');
    } finally {
      setClearLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Container className="py-5 text-center">
          <FaShoppingCart size={64} className="text-muted mb-4" />
          <h4 className="fw-bold mb-3">Please login to view your cart</h4>
          <Button 
            variant="success" 
            size="lg" 
            onClick={() => navigate('/login')}
            className="rounded-pill px-4"
          >
            Login Now
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-success mb-1">
                  <FaShoppingCart className="me-3" />
                  Shopping Cart
                </h2>
                <p className="text-muted">
                  {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
                </p>
              </div>
              <Button 
                variant="outline-secondary" 
                as={Link} 
                to="/shop"
                className="rounded-pill"
              >
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Button>
            </div>

            {(error || localError) && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => {
                  setLocalError(null);
                }}
              >
                {error || localError}
              </Alert>
            )}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Loading cart...</p>
              </div>
            ) : cart.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <FaShoppingBag size={64} className="text-muted mb-4" />
                  <h4 className="fw-bold mb-3">Your cart is empty</h4>
                  <p className="text-muted mb-4">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Button 
                    variant="success" 
                    size="lg" 
                    as={Link} 
                    to="/shop"
                    className="rounded-pill px-4"
                  >
                    Start Shopping
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row>
                <Col lg={8}>
                  <Card className="mb-4">
                    <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Cart Items</h5>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => setShowClearModal(true)}
                        className="rounded-pill"
                      >
                        <FaTrash className="me-1" />
                        Clear Cart
                      </Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Table responsive className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <tr key={item.productId}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.image || '/images/placeholder-product.jpg'}
                                    alt={item.name}
                                    style={{ 
                                      width: '60px', 
                                      height: '60px', 
                                      objectFit: 'cover' 
                                    }}
                                    className="rounded me-3"
                                    onError={(e) => {
                                      e.target.src = '/images/placeholder-product.jpg';
                                    }}
                                  />
                                  <div>
                                    <h6 className="mb-1">{item.name}</h6>
                                    <small className="text-muted">
                                      Product ID: {item.productId}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle">
                                <span className="fw-bold text-success">
                                  ₹{item.price}
                                </span>
                              </td>
                              <td className="align-middle">
                                <div className="d-flex align-items-center">
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleDecreaseQuantity(item.productId)}
                                    disabled={itemLoading[item.productId] || item.quantity <= 1}
                                    className="rounded-circle me-2"
                                    style={{ width: '32px', height: '32px' }}
                                  >
                                    <FaMinus size={10} />
                                  </Button>
                                  
                                  <Form.Control
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQuantity = parseInt(e.target.value);
                                      if (newQuantity > 0 && newQuantity <= 99) {
                                        handleQuantityChange(item.productId, newQuantity);
                                      }
                                    }}
                                    disabled={itemLoading[item.productId]}
                                    className="text-center mx-2"
                                    style={{ width: '60px' }}
                                  />
                                  
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleIncreaseQuantity(item.productId)}
                                    disabled={itemLoading[item.productId] || item.quantity >= 99}
                                    className="rounded-circle ms-2"
                                    style={{ width: '32px', height: '32px' }}
                                  >
                                    <FaPlus size={10} />
                                  </Button>
                                </div>
                                {itemLoading[item.productId] && (
                                  <div className="text-center mt-1">
                                    <Spinner size="sm" animation="border" />
                                  </div>
                                )}
                              </td>
                              <td className="align-middle">
                                <span className="fw-bold fs-5 text-success">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </td>
                              <td className="align-middle">
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleRemoveItem(item.productId, item.name)}
                                  disabled={itemLoading[item.productId]}
                                  className="rounded-pill"
                                >
                                  {itemLoading[item.productId] ? (
                                    <Spinner size="sm" animation="border" />
                                  ) : (
                                    <FaTrash />
                                  )}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={4}>
                  <Card className="sticky-top">
                    <Card.Header className="bg-success text-white">
                      <h5 className="mb-0">Order Summary</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Items ({getTotalItems()}):</span>
                        <span>₹{getTotalPrice().toFixed(2)}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between mb-3">
                        <span>Delivery:</span>
                        <span className="text-success">
                          {getTotalPrice() >= 500 ? 'FREE' : '₹40'}
                        </span>
                      </div>
                      
                      {getTotalPrice() < 500 && (
                        <Alert variant="info" className="small">
                          <strong>Tip:</strong> Add ₹{(500 - getTotalPrice()).toFixed(2)} more for FREE delivery!
                        </Alert>
                      )}
                      
                      <hr />
                      
                      <div className="d-flex justify-content-between mb-4">
                        <span className="fw-bold fs-5">Total:</span>
                        <span className="fw-bold fs-4 text-success">
                          ₹{(getTotalPrice() + (getTotalPrice() >= 500 ? 0 : 40)).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <Button 
                          variant="success" 
                          size="lg"
                          onClick={handleCheckout}
                          className="fw-bold"
                        >
                          <FaCreditCard className="me-2" />
                          Proceed to Checkout
                        </Button>
                        
                        <Button 
                          variant="outline-secondary"
                          as={Link}
                          to="/shop"
                        >
                          Continue Shopping
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="d-flex align-items-center text-success mb-2">
                          <Badge bg="success" className="me-2">✓</Badge>
                          <small>Secure checkout</small>
                        </div>
                        <div className="d-flex align-items-center text-success mb-2">
                          <Badge bg="success" className="me-2">✓</Badge>
                          <small>Free returns within 7 days</small>
                        </div>
                        <div className="d-flex align-items-center text-success">
                          <Badge bg="success" className="me-2">✓</Badge>
                          <small>24/7 customer support</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        {/* Clear Cart Confirmation Modal */}
        <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <FaExclamationTriangle className="text-warning me-2" />
              Clear Cart
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <FaTrash size={48} className="text-danger mb-3" />
              <h5 className="mb-3">Are you sure?</h5>
              <p className="text-muted mb-0">
                This will remove all {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} from your cart. 
                This action cannot be undone.
              </p>
              
              <div className="bg-light rounded p-3 mt-3">
                <div className="d-flex justify-content-between">
                  <span>Total items:</span>
                  <span className="fw-bold">{getTotalItems()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total value:</span>
                  <span className="fw-bold text-success">₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowClearModal(false)}
              disabled={clearLoading}
            >
              Keep Items
            </Button>
            <Button 
              variant="danger" 
              onClick={handleClearCart}
              disabled={clearLoading}
            >
              {clearLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Clearing...
                </>
              ) : (
                <>
                  <FaTimes className="me-2" />
                  Clear Cart
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Cart;