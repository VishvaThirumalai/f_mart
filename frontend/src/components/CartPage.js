// src/components/CartPage.js
import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Button, Table, Form, 
  Badge, Alert, Spinner, Modal 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft,
  FaShoppingCart, FaCheckCircle
} from 'react-icons/fa';
import Header from '../Layout/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { 
    cart, 
    loading, 
    error, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(productId);
      return;
    }
    
    try {
      setOperationLoading(true);
      const result = await updateQuantity(productId, newQuantity);
      if (!result || !result.success) {
        alert(result?.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }

    try {
      setOperationLoading(true);
      const result = await removeFromCart(productId);
      if (!result || !result.success) {
        alert(result?.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
      return;
    }

    try {
      setOperationLoading(true);
      const result = await clearCart();
      if (!result || !result.success) {
        alert(result?.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = async () => {
    try {
      // Create order object
      const order = {
        id: `ORDER-${Date.now()}`,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getTotalPrice(),
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        paymentMethod: 'cod',
        deliveryAddress: '123 Main Street, Chennai, Tamil Nadu, India',
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(
        localStorage.getItem(`freshmart_orders_${user.id}`) || '[]'
      );
      existingOrders.unshift(order);
      localStorage.setItem(
        `freshmart_orders_${user.id}`, 
        JSON.stringify(existingOrders)
      );

      // Clear cart after successful order
      await clearCart();
      
      setOrderPlaced(true);
      setTimeout(() => {
        setShowCheckoutModal(false);
        setOrderPlaced(false);
        navigate('/orders');
      }, 2000);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  // Handle quantity input change with validation
  const handleQuantityInputChange = (productId, value) => {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return; // Don't update if invalid
    }
    handleQuantityChange(productId, newQuantity);
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading your cart...</p>
        </Container>
      </>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const isOperationInProgress = operationLoading || loading;

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
                  {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
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

            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            {!cart || cart.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <FaShoppingBag size={64} className="text-muted mb-4" />
                  <h4 className="fw-bold mb-3">Your cart is empty</h4>
                  <p className="text-muted mb-4">
                    Add some delicious items to your cart and they will appear here.
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
              <>
                <Row>
                  <Col lg={8}>
                    <Card className="shadow-sm">
                      <Card.Header className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Cart Items</h5>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={handleClearCart}
                            disabled={isOperationInProgress}
                            className="rounded-pill"
                          >
                            {isOperationInProgress ? (
                              <>
                                <Spinner size="sm" className="me-2" />
                                Clearing...
                              </>
                            ) : (
                              'Clear Cart'
                            )}
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Table responsive hover className="mb-0">
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
                                      <h6 className="mb-0">{item.name}</h6>
                                      <small className="text-muted">
                                        Fresh & Quality
                                      </small>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <span className="fw-bold text-success">
                                    ₹{parseFloat(item.price).toFixed(2)}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <div className="d-flex align-items-center">
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={() => handleQuantityChange(
                                        item.productId, 
                                        item.quantity - 1
                                      )}
                                      disabled={isOperationInProgress || item.quantity <= 1}
                                      className="rounded-circle"
                                      style={{ width: '32px', height: '32px' }}
                                    >
                                      <FaMinus size={10} />
                                    </Button>
                                    <Form.Control
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => handleQuantityInputChange(
                                        item.productId, 
                                        e.target.value
                                      )}
                                      onBlur={(e) => {
                                        // Ensure minimum quantity of 1 on blur
                                        if (parseInt(e.target.value) < 1) {
                                          e.target.value = 1;
                                          handleQuantityChange(item.productId, 1);
                                        }
                                      }}
                                      disabled={isOperationInProgress}
                                      className="mx-2 text-center"
                                      style={{ width: '60px' }}
                                      min="1"
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={() => handleQuantityChange(
                                        item.productId, 
                                        item.quantity + 1
                                      )}
                                      disabled={isOperationInProgress}
                                      className="rounded-circle"
                                      style={{ width: '32px', height: '32px' }}
                                    >
                                      <FaPlus size={10} />
                                    </Button>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <span className="fw-bold">
                                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleRemoveItem(item.productId)}
                                    disabled={isOperationInProgress}
                                    className="rounded-pill"
                                  >
                                    {isOperationInProgress ? (
                                      <Spinner size="sm" />
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
                    <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
                      <Card.Header className="bg-success text-white">
                        <h5 className="mb-0">Order Summary</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Items ({totalItems}):</span>
                          <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Delivery:</span>
                          <span className="text-success">FREE</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                          <strong>Total:</strong>
                          <strong className="text-success fs-5">
                            ₹{totalPrice.toFixed(2)}
                          </strong>
                        </div>
                        
                        <div className="mb-3">
                          <Badge bg="success" className="w-100 p-2">
                            🎉 FREE Delivery on orders over ₹150
                          </Badge>
                        </div>

                        <Button 
                          variant="success" 
                          size="lg" 
                          className="w-100 rounded-pill fw-bold"
                          onClick={handleCheckout}
                          disabled={isOperationInProgress || !cart || cart.length === 0}
                        >
                          {isOperationInProgress ? (
                            <>
                              <Spinner size="sm" className="me-2" />
                              Processing...
                            </>
                          ) : (
                            'Proceed to Checkout'
                          )}
                        </Button>

                        <div className="text-center mt-3">
                          <small className="text-muted">
                            🔒 Secure checkout with 256-bit SSL encryption
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>

        {/* Checkout Modal */}
        <Modal 
          show={showCheckoutModal} 
          onHide={() => !orderPlaced && setShowCheckoutModal(false)}
          centered
          backdrop={orderPlaced ? 'static' : true}
          keyboard={!orderPlaced}
        >
          <Modal.Header closeButton={!orderPlaced}>
            <Modal.Title>
              {orderPlaced ? 'Order Confirmed!' : 'Checkout'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {orderPlaced ? (
              <div>
                <FaCheckCircle size={64} className="text-success mb-3" />
                <h4 className="text-success mb-3">Thank you for your order!</h4>
                <p className="text-muted">
                  Your order has been placed successfully. You will be redirected to the orders page.
                </p>
                <Spinner animation="border" variant="success" />
              </div>
            ) : (
              <div>
                <h5 className="mb-4">Order Summary</h5>
                <div className="text-start">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Amount:</span>
                    <strong>₹{totalPrice.toFixed(2)}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Payment Method:</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="mb-3">
                    <strong>Delivery Address:</strong>
                    <p className="text-muted small mb-0">
                      123 Main Street, Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          {!orderPlaced && (
            <Modal.Footer>
              <Button 
                variant="secondary" 
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="success" 
                onClick={handlePlaceOrder}
                className="px-4"
              >
                Place Order
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default CartPage;