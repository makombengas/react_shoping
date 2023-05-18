import { Col, Container, Row } from 'react-bootstrap';
import { sampleProducts } from '../../data';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Container className="mt-5">
        <Row>
          {sampleProducts.map((product) => (
            <Col sm={6} md={4} lg={3} key={product.slug} className="products">
              <Link to={'/product/' + product.slug}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <p>{product.price} €</p>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
