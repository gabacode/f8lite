import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { readRemoteFile } from "react-papaparse";
import { format } from "date-fns";
import Stats from "./Stats";
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
      latest: "https://raw.githubusercontent.com/gabacode/f8lite/main/dati-distretto39/dpc-covid19-ita-pa-39-latest.csv",
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

  getDay = (data) => {
    var l = Object.keys(data).length;
    var wv = [];
    var i;
    for (i=0;i<l;i++){
      wv.push((data)[i][2]);
    }
    var tw = wv.slice(-8).slice(0, -1).reduce((a, b) => a + b);
    var lw = wv.slice(-15).slice(0, -8).reduce((a, b) => a + b);
    this.setState({
      lastDay: data[l-2][0],
      lastWeek: parseInt(lw),
      thisWeek: parseInt(tw),
    });
  };

  getStats = (data) => {
    var i;
    var l = Object.keys(data).length;
    for (i=1;i<(l-1);i++){
      var city = (data[i][3]).toString();
      if(city === this.props.cityName){
        this.setState({
          lastUpdate: format(new Date(data[i][0]), "dd/MM/yyyy"),
          attuali: data[i][10],
          ricoverati: data[i][8],
          guariti: data[i][13],
          deceduti: data[i][14],
          // totali: data[i][15],
        });
      }else{
        //pass
      }      
    }
  };

  componentDidMount() {
    this.parseData(this.state.daySet, this.getDay);
    this.parseData(this.state.latest, this.getStats);
  }

  render() {
    return (
      <div className="App pt--40">
        <Container>
          <Row>
            <Container>
              <h1>Comune di {this.state.cityName}</h1>
              <h4>Popolazione: {this.props.pop} abitanti</h4>
              <small>Fonte dati: ASP DISTRETTO 39</small>
              <br />
            </Container>
          </Row>
          <Stats lastUpdate={this.state.lastUpdate} attuali={this.state.attuali} ricoverati={this.state.ricoverati} guariti={this.state.guariti} deceduti={this.state.deceduti}/>
          <Redzone tw={this.state.thisWeek} pop={this.state.pop} />
          <h3 className="pt--10 ptb--20">
            Incidenza giornaliera al {format(new Date(this.state.lastDay), "dd/MM/yyyy")}
          </h3>
          <Chart url={this.state.daySet} />
          <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button size="sm" href={this.state.daySet}>
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