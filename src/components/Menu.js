import React, { Component, Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaFeatherAlt } from 'react-icons/fa';

export default class Menu extends Component{
    render(){
        return(
            <Fragment>
                <Container>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/"><FaFeatherAlt/> f8lite</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/bagheria">Bagheria</Nav.Link>
                    <Nav.Link href="/santaflavia">Santa Flavia</Nav.Link>
                    <Nav.Link href="/ficarazzi">Ficarazzi</Nav.Link>
                    <Nav.Link href="/casteldaccia">Casteldaccia</Nav.Link>
                    <Nav.Link href="/altavilla">Altavilla Milicia</Nav.Link>
                    </Nav>
                </Navbar>
                </Container>
            </Fragment>
        )
    }
}