import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../App';
import { FiTrash2, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../css/ProductList.css';

function ProductList() {
  const { products, deleteProduct } = useContext(ProductContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleDeleteProduct = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
      setShowDeleteModal(false);
      setShowSuccessMessage(true);
    }
  };

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container container-product">
      <div className="product-list-title-container">
        <h2 className="product-list-title">Product List</h2>
      </div>
      <div className="options">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <label htmlFor="sort">Sort by:</label>
          <select id="sort">
            <option value="most-voted">Most Voted</option>
            <option value="least-voted">Least Voted</option>
          </select>
        </div>
        <button onClick={() => setShowAddModal(true)} className="add-btn">
          Add New Product
        </button>
      </div>
      <div className="products">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products available</p>
          </div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td className='actions'>
                    <ProductVoteButtons productId={product.id} />
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setShowDeleteModal(true);
                      }}
                      className="delete-btn action-delete-button"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="button-group">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="delete-btn" onClick={handleDeleteProduct}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <p>Would you like to add a new product?</p>
            <div className="button-group">
              <Link to="/add-product" className="add-btn">
                Add Product
              </Link>
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessMessage && (
        <div className="success-message">
          Deletion successful! Product has been deleted.
        </div>
      )}
    </div>
  );
}

function ProductVoteButtons({ productId }) {
  const [voted, setVoted] = useState(false);

  const handleVote = (type) => {
    console.log(`Product ID: ${productId}, Vote: ${type}`);
    setVoted(true);
  };

  return (
    <div className="vote-buttons">
      {!voted && (
        <>
          <button onClick={() => handleVote('up')} className="vote-btn">
            <FiThumbsUp size={20} />
          </button>
          <button onClick={() => handleVote('down')} className="vote-btn">
            <FiThumbsDown size={20} />
          </button>
        </>
      )}
      {voted && <p>Voted!</p>}
    </div>
  );
}

export default ProductList;
