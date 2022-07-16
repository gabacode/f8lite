import React, { FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { FaQuestionCircle } from 'react-icons/fa';
import { Constants } from '../constants';
import { Comune } from '../types';
import { useGetData } from '../hooks/useGetData';

import { Vax } from './elements/Vax';
import { Stats } from './elements/Stats';
import { Redzone } from './elements/Redzone';
import { Chart } from './elements/Chart';
import { Trend } from './elements/Trend';
import { Footer } from './layout/Footer';
import { LastAlert } from './elements/LastAlert';

interface DashboardProps {
  comune: Comune;
}

export const Dashboard: FC<DashboardProps> = ({ comune }) => {
  const daySet = Constants.DAILY_PREFIX + comune.scope + `.csv`;
  const latest = Constants.LATEST_URL + comune.istat + `-latest.csv`;
  const { formatDate, weeklyReport, latestReport } = useGetData(daySet, latest);

  return (
    <>
      <LastAlert comune={comune.cityName} />
      <Container className="App pt--40">
        <Row>
          <Container>
            <img src={`./images/${comune.istat}.jpg`} alt={comune.cityName} />
            <h1 className="bold mt-2">Comune di {comune.cityName}</h1>
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
              <ReactTooltip
                id="incInfo"
                place="right"
                effect="solid"
                type="info"
              >
                Dati calcolati per date dei primi tamponi positivi (dt1,
                et1=Positivo) a partire dal {formatDate(weeklyReport.firstDay)},
                <br /> potrebbero essere aggiornati con qualche giorno di
                ritardo.
              </ReactTooltip>
              <h6>
                <Redzone
                  thisWeek={weeklyReport.thisWeek}
                  population={comune.pop}
                />
              </h6>
              <Chart url={daySet} mode="positivi" label="Positivi" />
            </div>

            <div>
              <h3>
                Decessi al {formatDate(weeklyReport.lastDay)}
                <span data-tip data-for="decInfo">
                  &nbsp;
                  <FaQuestionCircle />
                </span>
              </h3>
              <ReactTooltip
                id="decInfo"
                place="right"
                effect="solid"
                type="info"
              >
                Dati calcolati per data di decesso (ddec, stato=Deceduto) a
                partire dal {formatDate(weeklyReport.firstDay)},<br />{' '}
                potrebbero essere aggiornati con qualche giorno di ritardo.
              </ReactTooltip>
              <Chart url={daySet} mode="deceduti" label="Decessi" />
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
    </>
  );
};
