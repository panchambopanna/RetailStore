import { useEffect, useContext } from 'react';
import Home from './components/common/Home';
import Footer from './components/common/Footer';
import NavBar from './components/common/navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import About from './components/common/About';
import Contact from './components/common/Contact';
import ProductDetail from './components/products/ProductDetail';
import Products from './components/products/Products';
import PageNotFound from './components/common/PageNotFound';
import Basket from './components/basket/Basket';
import { StoreContext } from './context/StoreContext'
import agent from './api/axios';
import { getCookie } from './api/utils'
import CheckoutPage from './components/checkout/CheckoutPage';


function App() {
  const { setBasket} = useContext(StoreContext);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId){
      agent.basket.get()
        .then(res => setBasket(res))
        .catch(e => e.message)
    }
  }, [setBasket]);
  

  return (
    <>
      <NavBar />
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path = '/products' element={<Products/>} />
      <Route path='products/:id' element={<ProductDetail/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/basket' element={<Basket/>} />
      <Route path='/checkout' element={<CheckoutPage/>} />
      <Route path= "*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;