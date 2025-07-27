// src/components/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, Modal, 
  Spinner, Alert, Accordion, Table 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBox, FaCalendar, FaMapMarkerAlt, FaCreditCard, 
  FaEye, FaDownload, FaArrowLeft, FaClock, FaCheck,
  FaTruck, FaReceipt, FaShoppingBag
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Header from '../Layout/Header';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/orders' } } });
      return;
    }
    
    loadOrders();
  }, [user, navigate]);

  const loadOrders = () => {
    setLoading(true);
    try {
      const savedOrders = localStorage.getItem(`freshmart_orders_${user.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'primary';
      case 'processing': return 'warning';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return <FaCheck />;
      case 'processing': return <FaClock />;
      case 'shipped': return <FaTruck />;
      case 'delivered': return <FaBox />;
      case 'cancelled': return <FaArrowLeft />;
      default: return <FaClock />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const downloadInvoice = (order) => {
    const invoiceText = `
FreshMart Invoice
=================

Order ID: ${order.id}
Order Date: ${formatDate(order.orderDate)}
Customer: ${user.name}
Email: ${user.email}

Delivery Address:
${order.deliveryAddress}

Items:
------
${order.items.map(item => 
  `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
).join('\n')}

Total Amount: ₹${order.totalAmount}
Payment Method: ${order.paymentMethod.toUpperCase()}
Status: ${order.status.toUpperCase()}

Thank you for shopping with FreshMart!
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FreshMart-Invoice-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading your orders...</p>
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
                  <FaBox className="me-3" />
                  My Orders
                </h2>
                <p className="text-muted">
                  Track and manage your orders
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

            {orders.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <FaShoppingBag size={64} className="text-muted mb-4" />
                  <h4 className="fw-bold mb-3">No orders yet</h4>
                  <p className="text-muted mb-4">
                    You haven't placed any orders yet. Start shopping to see your orders here.
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
              <div>
                {orders.map((order) => (
                  <Card key={order.id} className="mb-4 shadow-sm">
                    <Card.Header className="bg-light">
                      <Row className="align-items-center">
                        <Col md={6}>
                          <div className="d-flex align-items-center">
                            <div className="me-3">
                              <Badge 
                                bg={getStatusColor(order.status)} 
                                className="p-2 rounded-pill"
                              >
                                {getStatusIcon(order.status)}
                                <span className="ms-2">
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </Badge>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">Order #{order.id}</h6>
                              <small className="text-muted">
                                <FaCalendar className="me-1" />
                                {formatDate(order.orderDate)}
                              </small>
                            </div>
                          </div>
                        </Col>
                        <Col md={3} className="mt-2 mt-md-0">
                          <div className="text-md-center">
                            <span className="fw-bold text-success fs-5">
                              ₹{order.totalAmount}
                            </span>
                            <br />
                            <small className="text-muted">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </small>
                          </div>
                        </Col>
                        <Col md={3} className="mt-2 mt-md-0 text-md-end">
                          <div className="d-flex flex-column flex-md-row gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                              className="rounded-pill"
                            >
                              <FaEye className="me-1" />
                              View
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => downloadInvoice(order)}
                              className="rounded-pill"
                            >
                              <FaDownload className="me-1" />
                              Invoice
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <div className="mb-3">
                            <h6 className="fw-bold mb-2">Items Ordered:</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <div key={index} className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
                                  <img
                                    src={item.image || '/images/placeholder-product.jpg'}
                                    alt={item.name}
                                    style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                                    className="rounded-circle me-2"
                                  />
                                  <span className="small">{item.name} x{item.quantity}</span>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="bg-secondary text-white rounded-pill px-3 py-1">
                                  <span className="small">+{order.items.length - 3} more</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="text-md-end">
                            <div className="mb-2">
                              <FaMapMarkerAlt className="text-muted me-2" />
                              <span className="small">
                                {order.deliveryAddress.slice(0, 50)}
                                {order.deliveryAddress.length > 50 ? '...' : ''}
                              </span>
                            </div>
                            <div className="mb-2">
                              <FaCreditCard className="text-muted me-2" />
                              <span className="small">
                                {order.paymentMethod.toUpperCase()}
                              </span>
                            </div>
                            {order.estimatedDelivery && (
                              <div>
                                <FaTruck className="text-muted me-2" />
                                <span className="small text-success">
                                  Est. Delivery: {formatDate(order.estimatedDelivery)}
                                </span>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>

        {/* Order Details Modal */}
        <Modal 
          show={showOrderDetails} 
          onHide={() => setShowOrderDetails(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div>
                <Row className="mb-4">
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Order Information</h6>
                    <div className="mb-2">
                      <strong>Order ID:</strong> #{selectedOrder.id}
                    </div>
                    <div className="mb-2">
                      <strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong>
                      <Badge 
                        bg={getStatusColor(selectedOrder.status)} 
                        className="ms-2"
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <strong>Payment Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}
                    </div>
                    {selectedOrder.estimatedDelivery && (
                      <div className="mb-2">
                        <strong>Estimated Delivery:</strong> {formatDate(selectedOrder.estimatedDelivery)}
                      </div>
                    )}
                  </Col>
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Delivery Address</h6>
                    <p className="mb-3">{selectedOrder.deliveryAddress}</p>
                    
                    {selectedOrder.notes && (
                      <>
                        <h6 className="fw-bold mb-2">Special Instructions</h6>
                        <p className="text-muted">{selectedOrder.notes}</p>
                      </>
                    )}
                  </Col>
                </Row>

                <h6 className="fw-bold mb-3">Order Items</h6>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image || '/images/placeholder-product.jpg'}
                              alt={item.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              className="rounded me-3"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td className="fw-bold">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">
                        Total Amount:
                      </td>
                      <td className="fw-bold">₹{selectedOrder.totalAmount}</td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowOrderDetails(false)}
            >
              Close
            </Button>
            {selectedOrder && (
              <Button 
                variant="success" 
                onClick={() => downloadInvoice(selectedOrder)}
                className="px-4"
              >
                <FaDownload className="me-2" />
                Download Invoice
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default OrdersPage;