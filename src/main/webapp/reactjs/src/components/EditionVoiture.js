import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams, useNavigate } from 'react-router-dom';

function withRouter(Component) {
  return props => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  };
}

class EditionVoiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      show: false
    };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  componentDidMount() {
    const voitureId = this.props.params.id;

    axios.get(`http://localhost:8080/api/voitures/${voitureId}`)
      .then(response => {
        const voiture = response.data;
        this.setState({
          id: voiture.id,
          marque: voiture.marque,
          modele: voiture.modele,
          couleur: voiture.couleur,
          immatricule: voiture.immatricule,
          annee: voiture.annee,
          prix: voiture.prix
        });
      })
      .catch(error => {
        console.error("Erreur lors du chargement de la voiture :", error);
      });
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitVoiture(event) {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    axios.put(`http://localhost:8080/api/voitures/${this.state.id}`, voiture)
      .then(response => {
        if (response.status === 200 || response.status === 204) {
          this.setState({ show: true });
          setTimeout(() => {
            this.setState({ show: false });
            this.props.navigate('/list');
          }, 2000);
        }
      });
   this.setState({ show: true });
   setTimeout(() => {
     this.setState({ show: false });
     this.props.navigate('/list');
   }, 2000);
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast>
            {{
              show: this.state.show,
              message: "Voiture modifiée avec succès.",
              type: "success"
            }}
          </MyToast>
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Modifier Voiture</Card.Header>
          <Form onSubmit={this.submitVoiture} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control required type="text" name="marque" value={this.state.marque}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Marque" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control required type="text" name="modele" value={this.state.modele}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Modèle" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control required type="text" name="couleur" value={this.state.couleur}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Couleur" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control required type="text" name="immatricule" value={this.state.immatricule}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Immatricule" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control required type="number" name="annee" value={this.state.annee}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Année" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control required type="number" name="prix" value={this.state.prix}
                    onChange={this.voitureChange} className="bg-dark text-white" placeholder="Entrez Prix" />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">Modifier</Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default withRouter(EditionVoiture);
