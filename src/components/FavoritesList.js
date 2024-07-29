import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import '../App.css';

const FavoritesList = ({ favorites, removeFavorite }) => {
  return (
    <Container>
      <Row>
        {favorites.map(book => (
          <Col md={4} key={book.key} className="mb-4">
            <Card>
              <Card.Img 
                variant="top" 
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} 
                alt={`Cover of ${book.title}`} 
                className="card-img-top"
              />
              <Card.Body className="card-body">
                <Card.Title className="card-title">{book.title.length > 25 ? `${book.title.substring(0, 25)}...` : book.title}</Card.Title>
                <Button variant="danger" onClick={() => removeFavorite(book)}>Remove from Favorites</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesList;
