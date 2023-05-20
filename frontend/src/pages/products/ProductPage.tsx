import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsBySlugQuery } from '../../hooks/ProductHooks';
import LoadingBox from '../../components/loading/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { convertProductToCartItem, getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../../components/rating/Rating';
import { Store } from '../../store/Store';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn('sorry product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success('product added successfully to cart');
    navigate('/cart');
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {getError(error as ApiError)} </MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product no found!</MessageBox>
  ) : (
    <div className="productPage">
      <Helmet>
        <title>product Page</title>
      </Helmet>
      <Row className="productRow">
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup style={{ paddingLeft: '1rem' }}>
              <h1>{product.name} </h1>
            </ListGroup>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>price: {product.price} €</ListGroup.Item>
            <ListGroup.Item>
              Description: <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
