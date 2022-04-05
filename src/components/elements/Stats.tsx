import React, { FC, Fragment } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { FaQuestionCircle } from 'react-icons/fa';
import { LatestReport } from '../../types';

export interface StatsProps {
  latestReport: LatestReport;
}

export const Stats: FC<StatsProps> = ({ latestReport }) => {
  const dati = [
    {
      titolo: 'Attuali',
      data: latestReport.attuali,
    },
    {
      titolo: 'Ricoverati',
      data: latestReport.ricoverati,
    },
    {
      titolo: 'Guariti',
      data: latestReport.guariti,
    },
    {
      titolo: 'Deceduti',
      data: latestReport.deceduti,
    },
    {
      titolo: 'Nuovi Positivi',
      data: latestReport.nuovi_positivi,
    },
    {
      titolo: 'Variazione Attuali',
      data: latestReport.variazione,
    },
    {
      titolo: 'Tamponi',
      data: latestReport.tamponi,
    },
    {
      titolo: 'Totale Casi',
      data: latestReport.totale_casi,
    },
  ];
  return (
    <Fragment>
      <div className="pt--10 ptb--20">
        <Button
          size="sm"
          href="https://github.com/gabacode/f8lite/tree/main/dati-comuni"
          target="_blank"
        >
          Accesso Dati
        </Button>
        <div className="ptb--20 bold">
          Ultimo aggiornamento: {latestReport.lastUpdate}
          <span data-tip data-for="globInfo">
            &nbsp;
            <FaQuestionCircle />
          </span>
        </div>
        <ReactTooltip id="globInfo" place="right" effect="solid" type="info">
          Dati calcolati per data di inserimento e aggiornati quotidianamente, a
          fine giornata.
        </ReactTooltip>
        <Row>
          {dati.map((value, index) => (
            <Col xl={3} lg={6} key={index}>
              <Card className="mb-4 mb-xl-2">
                <Card.Body>
                  <Row>
                    <Col>
                      <h5 className="card-title text-uppercase text-muted mb-0">
                        {value.titolo}
                      </h5>
                      <span className="h2 font-weight-bold mb-0">
                        {value.data}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Fragment>
  );
};
