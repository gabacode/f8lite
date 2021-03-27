import {Container, Row, Col, Button} from 'react-bootstrap';
import { format } from 'date-fns';
import Chart from './components/Chart';
import Redzone from './components/Redzone';
import Trend from './components/Trend';
import Footer from './components/Footer';

function App() {
    let lastUpdate = "2021, 3, 24";
    let cityName = "Bagheria";
  return (
    <div className="App pt--40">
      <Container>
        <Row>
          <Container>
            <h1>Positivi Giornalieri a {cityName}</h1>
            <h2>Aggiornato al {format(new Date(lastUpdate), 'dd/MM/yyyy')}</h2>
            <small>Fonte: ASP DISTRETTO 39</small><br/>
            <Redzone/>
          </Container>
        </Row>
        <Chart />
        <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button size="sm" href="./datasets/1d.csv" download={`covid19-${cityName.toLowerCase()}-${format(new Date(lastUpdate), 'yyyyMMdd')}.csv`}>
                Scarica Dataset
              </Button>
            </Col>
          </Row>
        <Container className="center">
          <Row>
            <Col xs={12}>
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
