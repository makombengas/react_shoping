// import './App.css';

import Home from './pages/home/Home';
import NavMenu from './components/navbar/NavMenu';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/products/ProductPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/cartPage/CartPage';
function App() {
  return (
    <div className="d-flex flex-column h-100">
      <ToastContainer position="bottom-center" limit={1} />
      <NavMenu />
      <Routes>
        <Route index={true} path="/" element={<Home />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
