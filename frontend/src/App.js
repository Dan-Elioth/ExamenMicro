import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/loginn'
import Category from './pages/Categoria';
import Product from './pages/Producto';
import Cliente from './pages/Cliente';



function App() {

  
  return (

    <>

     
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/category" element={<Category />}>
          
      </Route>

      <Route path="/producto" element={<Product />}>
          
      </Route>

      <Route path="/cliente" element={<Cliente />}>
          
      </Route>

     
    </Routes>
    </>
  );
}

export default App;
