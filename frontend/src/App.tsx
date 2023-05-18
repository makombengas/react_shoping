// import './App.css';

import Home from './pages/home/Home';
import NavMenu from './components/navbar/NavMenu';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/products/ProductPage';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <NavMenu />
      <Routes>
        <Route index={true} path="/" element={<Home />} />
        <Route path="product/:slug" element={<ProductPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
