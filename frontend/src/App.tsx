import './App.css';
import { sampleProducts } from './data';

function App() {
  return (
    <div>
      <header>TS Amazona</header>
      <main>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.slug} className="products">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>{product.price} €</p>
            </li>
          ))}
        </ul>
      </main>

      <footer>all rights reserved</footer>
    </div>
  );
}

export default App;
