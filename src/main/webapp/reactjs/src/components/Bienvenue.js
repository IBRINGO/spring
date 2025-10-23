import React from 'react';
import { Card, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    const marginTop = { marginTop: "20px" };

    return (
      <Col lg={12} style={marginTop}>
        <Card className="bg-dark text-white">
          <Card.Body>
            <h1>Bienvenue au Magasin des Voitures</h1>
            <blockquote className="blockquote mb-0">
              <p>Le meilleur de nos voitures est exposé près de chez vous</p>
              <footer className="blockquote-footer">Master MIOLA</footer>
            </blockquote>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Bienvenue;
