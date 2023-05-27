import './App.scss';
import { Home, ProductSingle, Cart, CategoryProduct, Search } from './pages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>

          {/* home page route */}
          <Route path='/' element={<Home />} />

          {/* single product route */}
          <Route path="/product/:id" element={<ProductSingle />} />

          {/* cart */}
          <Route path="/cart" element={<Cart />} />

          {/* category wise product listing route */}
          <Route path="/category/:category" element={<CategoryProduct />} />

          {/* searched products */}
          <Route path="/search/:searchTerm" element={<Search />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
