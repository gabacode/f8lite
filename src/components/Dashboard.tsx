import React, { FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { FaQuestionCircle } from 'react-icons/fa';
import { Constants } from '../constants';
import { Comune } from '../types';
import { useGetData } from '../hooks/useGetData';
import { Stats } from './Stats';
import { Redzone } from './Redzone';
import { Trend } from './Trend';
import { Vax } from './Vax';
import { Footer } from './Footer';
import { Chart } from './ChartNew';

interface DashboardProps {
  comune: Comune;
}

export const Dashboard: FC<DashboardProps> = ({ comune }) => {
  const daySet = Constants.DAILY_PREFIX + comune.scope + `.csv`;
  const latest = Constants.LATEST_URL + comune.istat + `-latest.csv`;
  const { formatDate, weeklyReport, latestReport } = useGetData(daySet, latest);

  return (
    <Container className="App pt--40">
      <Row>
        <Container>
          <h1 className="bold">Comune di {comune.cityName}</h1>
          <h4>Popolazione: {comune.pop} abitanti</h4>
          <small>Fonte dati: ASP DISTRETTO 39</small>
          <br />
        </Container>
      </Row>

      <div style={{ margin: '20px' }}>
        <Vax istat={comune.istat} />
      </div>
      {latestReport && <Stats latestReport={latestReport} />}
      {weeklyReport && (
        <>
          <div className="pt--10 ptb--20">
            <h3>
              Incidenza giornaliera al {formatDate(weeklyReport.lastDay)}
              <span data-tip data-for="incInfo">
                &nbsp;
                <FaQuestionCircle />
              </span>
            </h3>
            <ReactTooltip id="incInfo" place="right" effect="solid" type="info">
              Dati calcolati per date dei primi tamponi positivi (dt1,
              et1=Positivo) a partire dal {formatDate(weeklyReport.firstDay)},
              <br /> potrebbero essere aggiornati con qualche giorno di ritardo.
            </ReactTooltip>
            <h6>
              <Redzone
                thisWeek={weeklyReport.thisWeek}
                population={comune.pop}
              />
            </h6>
            <Chart
              containerId="pos_chart"
              url={daySet}
              mode="nuovi_positivi"
              label="Positivi"
            />
          </div>

          <div>
            <h3>
              Decessi al {formatDate(weeklyReport.lastDay)}
              <span data-tip data-for="decInfo">
                &nbsp;
                <FaQuestionCircle />
              </span>
            </h3>
            <ReactTooltip id="decInfo" place="right" effect="solid" type="info">
              Dati calcolati per data di decesso (ddec, stato=Deceduto) a
              partire dal {formatDate(weeklyReport.firstDay)},<br /> potrebbero
              essere aggiornati con qualche giorno di ritardo.
            </ReactTooltip>
            <Chart
              containerId="dec_chart"
              url={daySet}
              mode="deceduti"
              label="Decessi"
            />
          </div>

          <Row>
            <Col xs={12} className="pt--0 ptb--30">
              <Button size="sm" href={daySet}>
                Scarica Dataset
              </Button>
            </Col>
          </Row>

          <Container className="center">
            <Row>
              <Col xs={12}>
                <Trend
                  thisWeek={weeklyReport.thisWeek}
                  lastWeek={weeklyReport.lastWeek}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </Container>
  );
};
