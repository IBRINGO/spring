import './App.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Bienvenue from './components/Bienvenue';
import Footer from './components/Footer';
import Voiture from './components/Voiture';
import VoitureListeWithNavigate from './components/VoitureListe'  ;
import EditionVoiture from './components/EditionVoiture';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const marginTop = { marginTop: "20px" };
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
          <Router>
            <Routes>
              <Route path="/" element={<Bienvenue />} />
              <Route path="/add" element={<Voiture />} />
              <Route path="/list" element=  {<VoitureListeWithNavigate />} />
              <Route path="/edit/:id" element={<EditionVoiture />} />
            </Routes>
          </Router>

          </Col>
        </Row>

      </Container>
      <Footer />
    </div>
  );
}

export default App;
