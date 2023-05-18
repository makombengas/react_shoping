// import './App.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Home from './pages/home/Home';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Dorette Shop</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#Cart">Cart</Nav.Link>
                <Nav.Link href="#signin">Sign in</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Home />
        </Container>
      </main>

      <footer className="text-center">
        <div>all rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
