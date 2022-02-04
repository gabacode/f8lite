import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { readRemoteFile } from "react-papaparse";
import { format } from "date-fns";
import ReactTooltip from "react-tooltip";
import { FaQuestionCircle } from 'react-icons/fa';
import Stats from "./Stats";
import Chart from "./Chart";
import Redzone from "./Redzone";
import Trend from "./Trend";
import Vax from "./Vax";
import Footer from "./Footer";

export default function Dashboard(...props) {

  const input = props[0].data
  const [state] = useState({
    cityName: input.cityName,
    scope: input.scope,
    pop: input.pop,
    istat: input.istat,
    daySet: `../datasets/1d_${input.scope}.csv`,
    latest: `https://raw.githubusercontent.com/gabacode/f8lite/main/dati-comuni/dpc-covid19-ita-pa-${input.istat}-latest.csv`
  })
  const [latest, setLatest] = useState({})
  const [daily, setDaily] = useState({})

  const parseData = (url, callBack) => {
    readRemoteFile(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        callBack(results.data);
      },
    });
  }

  const formatDate = (date) => format(new Date(date), "dd/MM/yyyy")

  const getDay = (data) => {
    const length = Object.keys(data).length;
    let nuovi_positivi = []
    for (let i=0; i<length; i++){
      nuovi_positivi.push((data)[i].nuovi_positivi);
    }
    const this_week = nuovi_positivi.slice(-8).slice(0, -1).reduce((a, b) => a + b);
    const last_week = nuovi_positivi.slice(-15).slice(0, -8).reduce((a, b) => a + b);
    setDaily({
      firstDay: data[0].data,
      lastDay: data[length-2].data,
      thisWeek: parseInt(this_week),
      lastWeek: parseInt(last_week)
    })
  }

  useEffect(() => {
    const getStats = (data) => {
      const latest = data[0]
      setLatest({
        lastUpdate: formatDate(latest.data),
        attuali: latest.totale_positivi,
        ricoverati: latest.totale_ospedalizzati,
        guariti: latest.dimessi_guariti,
        deceduti: latest.deceduti,
        nuovi_positivi: latest.nuovi_positivi,
        variazione: latest.variazione_totale_positivi,
        totale_casi: latest.totale_casi,
        tamponi: latest.tamponi
      })
    }
    parseData(state.daySet, getDay);
    parseData(state.latest, getStats);
  },[state.daySet, state.latest])

    return (
        <Container className="App pt--40">
          
          <Row>
            <Container>
              <h1 className="bold">Comune di {state.cityName}</h1>
              <h4>Popolazione: {state.pop} abitanti</h4>
              <small>Fonte dati: ASP DISTRETTO 39</small>
              <br />
            </Container>
          </Row>
          
          <div style={{margin:'20px'}}>
            <Vax istat={input.istat} />
          </div>
          
          <Stats lastUpdate={latest.lastUpdate} attuali={latest.attuali} ricoverati={latest.ricoverati} guariti={latest.guariti} deceduti={latest.deceduti} nuovi_positivi={latest.nuovi_positivi} variazione={latest.variazione} totale_casi={latest.totale_casi} tamponi={latest.tamponi}/>
          
          <div className="pt--10 ptb--20">
            <h3>
              Incidenza giornaliera al {daily.lastDay}
              <span data-tip data-for="incInfo">
                &nbsp;<FaQuestionCircle />
              </span>
            </h3>
                <ReactTooltip id="incInfo" place="right" effect="solid" type="info">
                  Dati calcolati per date dei primi tamponi positivi (dt1, et1=Positivo) a partire dal {state.firstDay},<br/> potrebbero essere aggiornati con qualche giorno di ritardo.
                </ReactTooltip>
            <h6>
              <Redzone tw={daily.thisWeek} pop={state.pop} />
            </h6>
            <Chart containerId="pos_chart" url={state.daySet} mode="nuovi_positivi" label="Positivi"/>
          </div>
          
          <div>
            <h3>
                Decessi al {daily.lastDay}
                <span data-tip data-for="decInfo">
                &nbsp;<FaQuestionCircle />
                </span>
            </h3>
                <ReactTooltip id="decInfo" place="right" effect="solid" type="info">
                  Dati calcolati per data di decesso (ddec, stato=Deceduto) a partire dal {state.firstDay},<br/> potrebbero essere aggiornati con qualche giorno di ritardo.
                </ReactTooltip>
            <Chart containerId="dec_chart" url={state.daySet} mode="deceduti" label="Decessi"/>
          </div>
          
          <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button size="sm" href={state.daySet}>
                Scarica Dataset
              </Button>
            </Col>
          </Row>
          
          <Container className="center">
            <Row>
              <Col xs={12}>
                <Trend tw={daily.thisWeek} lw={daily.lastWeek} />
              </Col>
            </Row>
          </Container>
          
          <Footer />
        
        </Container>
    );
  }
