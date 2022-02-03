import Home from './components/common/Home';
import Footer from './components/common/Footer';
import NavBar from './components/common/navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import About from './components/common/About';
import Contact from './components/common/Contact';
import ProductDetail from './components/products/ProductDetail';
import Products from './components/products/Products';
import PageNotFound from './components/common/PageNotFound';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path = '/products' element={<Products/>} />
      <Route exact path='products/:id' element={<ProductDetail/>} />
      <Route exact path='/about' element={<About/>} />
      <Route exact path='/contact' element={<Contact/>} />
      <Route path= "*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
