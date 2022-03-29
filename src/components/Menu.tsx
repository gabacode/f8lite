import React, { FC } from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { FaFeatherAlt, FaGithub } from 'react-icons/fa';
import { Comune } from '../types';

interface MenuProps {
  data: Comune[];
}

export const Menu: FC<MenuProps> = ({ data }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <FaFeatherAlt /> f8lite
        </Navbar.Brand>
        <Nav className="mr-auto">
          {data.map((comune, i) => (
            <Nav.Link key={i} className="text-white" href={comune.path}>
              {comune.cityName}
            </Nav.Link>
          ))}
        </Nav>
        <Nav>
          <Button
            size="sm"
            href="https://github.com/gabacode/f8lite/blob/main/README.md"
            target="_blank"
          >
            <FaGithub />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
