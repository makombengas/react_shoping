import { Col, Row } from 'react-bootstrap';
import { sampleProducts } from '../../data';

const Home = () => {
  return (
    <Row>
      {sampleProducts.map((product) => (
        <Col sm={6} md={4} lg={3} key={product.slug} className="products">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <h2>{product.name}</h2>
          <p>{product.price} €</p>
        </Col>
      ))}
    </Row>
  );
};

export default Home;
