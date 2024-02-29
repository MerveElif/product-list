// App.js

import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import './css/App.css'; // CSS dosyaları

// ProductContext oluştu
export const ProductContext = createContext();

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/">Product List</Link>
            </li>
            <li>
              <Link to="/add-product">Add New Product</Link>
            </li>
          </ul>
        </nav>

        {/* ProductContext.Provider ile ProductList ve AddProduct bileşenlerine state geçirildi */}
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
          <Switch>
            <Route exact path="/">
              <ProductList />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>
          </Switch>
        </ProductContext.Provider>
      </div>
    </Router>
  );
}

export default App;
