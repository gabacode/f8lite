import React, { Component, Fragment } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { FaFeatherAlt, FaGithub } from 'react-icons/fa';

export default class Menu extends Component{
    render(){
        return(
            <Fragment>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/"><FaFeatherAlt/> f8lite</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/bagheria">Bagheria</Nav.Link>
                        <Nav.Link href="/santaflavia">Santa Flavia</Nav.Link>
                        <Nav.Link href="/ficarazzi">Ficarazzi</Nav.Link>
                        <Nav.Link href="/casteldaccia">Casteldaccia</Nav.Link>
                        <Nav.Link href="/altavilla">Altavilla Milicia</Nav.Link>
                    </Nav>
                    <Nav inline>
                        <Button size="sm" href="https://github.com/gabacode/f8lite" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </Button>
                    </Nav>
                </Navbar>
            </Fragment>
        )
    }
}
