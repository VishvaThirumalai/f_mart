// src/components/RegisterPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { register, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await register({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'danger';
      case 2:
      case 3: return 'warning';
      case 4:
      case 5: return 'success';
      default: return 'secondary';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Weak';
      case 2:
      case 3: return 'Medium';
      case 4:
      case 5: return 'Strong';
      default: return '';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-success mb-2">Join FreshMart!</h2>
                  <p className="text-muted">Create your account and start shopping</p>
                </div>

                {error && (
                  <Alert variant="danger" className="rounded-pill">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaUser className="me-2" />
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.name}
                      className="rounded-pill py-2"
                      style={{ fontSize: '16px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaEnvelope className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.email}
                      className="rounded-pill py-2"
                      style={{ fontSize: '16px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.password}
                        className="rounded-pill py-2 pe-5"
                        style={{ fontSize: '16px' }}
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ border: 'none', background: 'none', zIndex: 5 }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.password}
                      </Form.Control.Feedback>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Password Strength:</small>
                          <small className={`text-${getPasswordStrengthColor()} fw-bold`}>
                            {getPasswordStrengthText()}
                          </small>
                        </div>
                        <div className="progress" style={{ height: '4px' }}>
                          <div 
                            className={`progress-bar bg-${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <FaCheck className="me-2" />
                      Confirm Password
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.confirmPassword}
                        className="rounded-pill py-2 pe-5"
                        style={{ fontSize: '16px' }}
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ border: 'none', background: 'none', zIndex: 5 }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.confirmPassword}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100 rounded-pill fw-bold py-2 mb-3"
                    disabled={loading}
                    style={{ 
                      background: 'linear-gradient(45deg, #28a745, #20c997)',
                      border: 'none'
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-success fw-bold text-decoration-none"
                      state={{ from: location.state?.from }}
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;