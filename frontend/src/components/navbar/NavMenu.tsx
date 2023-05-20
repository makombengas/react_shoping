import { useContext, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navLink.css';
import { Store } from '../../store/Store';
const NavMenu = () => {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);
  const swithModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };
  return (
    <div className="mt-5">
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/" className="homeNavLink">
            <Navbar.Brand>Dorette Shop</Navbar.Brand>
          </LinkContainer>
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
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </NavLink>

              <NavLink
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                to="signin"
              >
                Sign in
              </NavLink>
              <Button
                className="modeIcon"
                variant={mode}
                onClick={swithModeHandler}
              >
                <i
                  className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavMenu;
