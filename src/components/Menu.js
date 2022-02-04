import React from "react";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { FaFeatherAlt, FaGithub } from 'react-icons/fa';

export default function Menu({data}){

    const MenuItems = () => (
        data.map((comune, i) => (
            <Nav.Link key={i} className="text-white" href={comune.path}>{comune.cityName}</Nav.Link>
        ))
    )
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <FaFeatherAlt/> f8lite
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <MenuItems/>
                </Nav>
                <Nav>
                    <Button size="sm" href="https://github.com/gabacode/f8lite/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </Button>
                </Nav>
            </Container> 
        </Navbar>
    )
}