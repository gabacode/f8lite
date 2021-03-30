import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { readRemoteFile } from "react-papaparse";
import { format } from "date-fns";
import Chart from "./Chart";
import Redzone from "./Redzone";
import Trend from "./Trend";
import Footer from "./Footer";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastDay: 1,
      lastWeek: 1,
      thisWeek: 1,
      scope: this.props.scope,
      cityName: this.props.cityName,
      pop: this.props.pop,
      daySet: "../datasets/"+this.props.scope+"/1d_"+this.props.scope+".csv",
      weekSet: "../datasets/"+this.props.scope+"/1w_"+this.props.scope+".csv",
    };
  }

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
  getDay = (data) => {
    var l = Object.keys(data).length;
    this.setState({
      lastDay: data[l-2][0],
    });
  };

  componentDidMount() {
    this.parseData(this.state.daySet, this.getDay);
    this.parseData(this.state.weekSet, this.getWeek);
  }

  render() {
    return (
      <div className="App pt--40">
        <Container>
          <Row>
            <Container>
              <h1>Positivi Giornalieri a {this.state.cityName}</h1>
              <h2>
                Aggiornato al {format(new Date(this.state.lastDay), "dd/MM/yyyy")}
              </h2>
              <small>Fonte: ASP DISTRETTO 39</small>
              <br />
              <Redzone tw={this.state.thisWeek} pop={this.state.pop} />
            </Container>
          </Row>
          <Chart url={this.state.daySet} />
          <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button
                size="sm"
                href={this.state.daySet}
                download={`covid19-${this.state.cityName.toLowerCase()}-${format(
                  new Date(this.state.lastDay),
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