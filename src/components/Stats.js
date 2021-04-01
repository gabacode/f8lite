import React, { Component, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default class Stats extends Component{
    render(){ 
        const dati = [
            {
                titolo: "Attuali",
                data: this.props.attuali,
            },
            {
                titolo: "Ricoverati",
                data: this.props.ricoverati,
            },
            {
                titolo: "Guariti",
                data: this.props.guariti,
            },
            {
                titolo: "Deceduti",
                data: this.props.deceduti,
            },
        ]
        return(
            <Fragment>
                <div className="pt--20 ptb--20">
                    <div className="ptb--20 bold">Ultimo aggiornamento: {this.props.lastUpdate}</div>
                    <Row>
                    {dati.map((value , index) => (
                        <Col xl={3} lg={6} key={index}>
                            <Card className="mb-4 mb-xl-0">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h5 className="card-title text-uppercase text-muted mb-0">{value.titolo}</h5>
                                            <span className="h2 font-weight-bold mb-0">{value.data}</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </div>
            </Fragment>
        )
    }
}
