import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { readRemoteFile } from "react-papaparse";
import { format } from "date-fns";
import Chart from "./components/Chart";
import Redzone from "./components/Redzone";
import Trend from "./components/Trend";
import Footer from "./components/Footer";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWeek: 1,
      thisWeek: 1,
    };
  }

  lastUpdate = "2021, 3, 26";
  cityName = "Bagheria";
  daySet = "./datasets/1d.csv";
  weekSet = "./datasets/1w.csv";

  parseData(url, callBack) {
    readRemoteFile(url, {
      download: true,
      header: false,
      dynamicTyping: true,
      complete: (results) => {
        callBack(results.data);
      },
    });
  }
  getWeek = (data) => {
    var l = Object.keys(data).length;
    this.setState({
      thisWeek: data[l-2][1],
      lastWeek: data[l-3][1],
    });
  };

  componentDidMount() {
    this.parseData(this.weekSet, this.getWeek);
  }

  render() {
    return (
      <div className="App pt--40">
        <Container>
          <Row>
            <Container>
              <h1>Positivi Giornalieri a {this.cityName}</h1>
              <h2>
                Aggiornato al {format(new Date(this.lastUpdate), "dd/MM/yyyy")}
              </h2>
              <small>Fonte: ASP DISTRETTO 39</small>
              <br />
              <Redzone tw={this.state.thisWeek} />
            </Container>
          </Row>
          <Chart url={this.daySet} />
          <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button
                size="sm"
                href={this.daySet}
                download={`covid19-${this.cityName.toLowerCase()}-${format(
                  new Date(this.lastUpdate),
                  "yyyyMMdd"
                )}.csv`}
              >
                Scarica Dataset
              </Button>
            </Col>
          </Row>
          <Container className="center">
            <Row>
              <Col xs={12}>
                <Trend tw={this.state.thisWeek} lw={this.state.lastWeek} />
              </Col>
            </Row>
          </Container>
          <Footer />
        </Container>
      </div>
    );
  }
}