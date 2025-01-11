import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/products"
              element={
                <>
                  <Header />
                  <ProductsPage />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Header />
                  <CartPage />
                </>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;