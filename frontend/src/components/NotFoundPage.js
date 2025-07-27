// src/components/NotFoundPage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-4">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Button variant="success" onClick={() => navigate('/')}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;