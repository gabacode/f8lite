import {Container, Row, Col, Button} from 'react-bootstrap';
import Chart from './components/Chart';
import Stats from './components/PieStats';
import Trend from './components/Trend';
// import Redzone from './components/Redzone';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App pt--40">
      <Container>
        <Row>
          <Container>
            <h1>Positivi Giornalieri a Bagheria</h1>
            <h2>Aggiornato al 22/03/2021</h2>
            <small>Fonte: ASP DISTRETTO 39</small>
          </Container>
        </Row>
        <Chart />
        <Row>
            <Col xs={12} className="pt--0 ptb--40">
              <Button size="sm" href="./datasets/1d.csv">
                Scarica Dataset
              </Button>
            </Col>
          </Row>
        <Container className="center">
          <Row>
            <Col xs={12} lg={6}>
              <Stats/>
            </Col>
            <Col xs={12} lg={6}>
              <Trend/>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
