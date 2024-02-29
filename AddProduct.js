// AddProduct.js

import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../App';
import "../css/AddProduct.css"

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const [name, setName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // 2 saniye sonra mesajı kaldır
      return () => clearTimeout(timer);
    }
    if (showErrorMessage) {
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000); // 2 saniye sonra mesajı kaldır
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { // Boşlukları temizle ve kontrol et
      setShowErrorMessage(true);
      return;
    }
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      name: name,
    };
    addProduct(newProduct);
    setName('');
    setShowSuccessMessage(true);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-message">New product added successfully!</div>
      )}
      {showErrorMessage && (
        <div className="error-message">Please enter a valid product name.</div>
      )}
    </div>
  );
}

export default AddProduct;
