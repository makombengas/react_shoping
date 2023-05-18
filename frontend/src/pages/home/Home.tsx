import { Col, Container, Row } from 'react-bootstrap';
// import { sampleProducts } from '../../data';

import { Product } from '../../types/Product';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import LoadingBox from '../../components/loading/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import ProductItem from '../../components/productItem/ProductItem';
import { Helmet } from 'react-helmet-async';

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};
type Action =
  | { type: 'FETCH_REQUEST' }
  | {
      type: 'FETCH_SUCCESS';
      payload: Product[];
    }
  | {
      type: 'FETCH_FAIL';
      payload: string;
    };

const initialState: State = {
  products: [],
  loading: true,
  error: '',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {error} </MessageBox>
  ) : (
    <div>
      <Container className="mt-5">
        <Row>
          <Helmet>
            <title>Dorette Shop</title>
          </Helmet>
          {products.map((product) => (
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
