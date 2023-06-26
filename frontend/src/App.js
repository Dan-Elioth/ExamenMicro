import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/loginn'
import Category from './pages/Categoria';
import Product from './pages/Producto';



function App() {

  
  return (

    <>

     
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/category" element={<Category />}>
          
      </Route>

      <Route path="/producto" element={<Product />}>
          
      </Route>
     
      {/* <Route path="register" element={<Register />} />
      <Route path='store' element={<Client />}>
        <Route path="" element={<Home />} />
        <Route path="detail/:id/:category" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
      </Route> */}
    </Routes>
    </>
  );
}

export default App;
