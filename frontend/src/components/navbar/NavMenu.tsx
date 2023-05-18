import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navLink.css';
const NavMenu = () => {
  return (
    <div className="mt-5">
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Dorette Shop</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="nav">
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                to="cart"
              >
                Cart
              </NavLink>

              <NavLink
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                to="signin"
              >
                Sign in
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavMenu;
