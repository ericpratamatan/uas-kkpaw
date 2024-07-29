import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const BsNav = () => {
  return (
    <Navbar className="justify-content-between" bg="dark" data-bs-theme="dark">
      <Container>
          <Navbar.Brand>Library</Navbar.Brand>
        </Container>
    </Navbar>
  );
}

export default BsNav;