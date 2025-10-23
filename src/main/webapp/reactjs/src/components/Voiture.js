import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faSave, faRefresh } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      proprietaire: '', // garde vide par défaut
      show: false
    };
  }

  voitureChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitVoiture = (event) => {
    event.preventDefault();

    // ✅ Corrigé : structure attendue par le backend
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: parseInt(this.state.annee),
      prix: parseFloat(this.state.prix),
      proprietaire: this.state.proprietaire
    };

    console.log(voiture);

    axios.post("http://localhost:8080/api/voitures", voiture)
      .then(response => {
        if (response.data) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.resetForm();
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de la voiture :", error);
      });
  };

  resetForm = () => {
    this.setState({
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      proprietaire: ''
    });
  };

  render() {
    return (
      <>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faCar} /> Ajouter Voiture
          </Card.Header>

          <Form onSubmit={this.submitVoiture} onReset={this.resetForm} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="marque"
                    value={this.state.marque}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Marque"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="modele"
                    value={this.state.modele}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Modèle"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="couleur"
                    value={this.state.couleur}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Couleur"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="immatricule"
                    value={this.state.immatricule}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Immatricule"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="annee"
                    value={this.state.annee}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Année"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="prix"
                    value={this.state.prix}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Prix"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridProprietaire">
                  <Form.Label>Propriétaire (ID)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="proprietaire"
                    value={this.state.proprietaire}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="ID du Propriétaire"
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Submit
              </Button>{' '}
              <Button size="sm" variant="warning" type="reset">
                <FontAwesomeIcon icon={faRefresh} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>

        <MyToast
          message="Voiture ajoutée avec succès"
          show={this.state.show}
          type="success"
        />
      </>
    );
  }
}
