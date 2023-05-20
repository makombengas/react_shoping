import { Button, Card } from 'react-bootstrap';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import { Store } from '../../store/Store';
import { useContext } from 'react';
import { CartItem } from '../../types/cart';
import { convertProductToCartItem } from '../../utils';
import { toast } from 'react-toastify';
const homeStyle = {
  boxShadow:
    'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
};
const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.success('Sorry, the product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success('product added successfully to cart');
  };
  return (
    <Card style={homeStyle}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body className="cardBody">
        <Link className="linkProductItem" to={`/products/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price} €</Card.Text>
        {product.countInStock === 0 ? (
          <Button className="outStockButton" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
