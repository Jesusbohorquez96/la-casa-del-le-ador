import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './components/Cart';

type Page = 'home' | 'menu';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToMenu = () => setCurrentPage('menu');
  const navigateToHome = () => setCurrentPage('home');

  return (
    <CartProvider>
      <div className="min-h-screen">
        {currentPage === 'home' && (
          <Home onNavigateToMenu={navigateToMenu} />
        )}
        
        {currentPage === 'menu' && (
          <Menu onNavigateHome={navigateToHome} />
        )}
        
        <Cart />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#000000',
              color: '#FFD700',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#FFD700',
                secondary: '#000000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#000000',
              },
            },
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;