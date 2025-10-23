// 🚀 VoitureListe.jsx
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  editVoiture = (voitureId) => {
    this.props.navigate(`/edit/${voitureId}`);
  };
  
  componentDidMount() {
    axios.get("http://localhost:8080/api/voitures")
      .then(response => {
        this.setState({ voitures: response.data });
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete(`http://localhost:8080/api/voitures/${voitureId}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            voitures: this.state.voitures.filter(v => v.id !== voitureId),
            show: true
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      });
  }

  render() {
    return (
      <>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Liste des Voitures
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Aucune Voiture disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map((voiture) => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => this.editVoiture(voiture.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteVoiture(voiture.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <MyToast
          message="Voiture modifiée avec succès"
          show={this.state.show}
          type="success"
        />
      </>
    );
  }
}

// ⚡ Wrapper fonctionnel qui injecte `navigate` en prop
export default function VoitureListeWithNavigate(props) {
  const navigate = useNavigate();
  return <VoitureListe {...props} navigate={navigate} />;
}
