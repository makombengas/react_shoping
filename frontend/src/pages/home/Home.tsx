import { Col, Container, Row } from 'react-bootstrap';

import LoadingBox from '../../components/loading/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import ProductItem from '../../components/productItem/ProductItem';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '../../hooks/ProductHooks';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {getError(error as ApiError)} </MessageBox>
  ) : (
    <div>
      <Container className="mt-5 vh-100">
        <Row>
          <Helmet>
            <title>Dorette Shop</title>
          </Helmet>
          {products!.map((product) => (
            <Col sm={6} md={4} lg={3} key={product.slug} className="products">
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
