import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { getTotalItems } = useCart();
  const location = useLocation();

  return (
    <header className="bg-green-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <Leaf className="h-6 w-6" />
          <span>Paradise Nursery</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          {location.pathname !== '/products' && (
            <Link to="/products" className="hover:text-green-200 transition-colors">
              Shop Plants
            </Link>
          )}
          
          <Link to="/cart" className="relative hover:text-green-200 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}