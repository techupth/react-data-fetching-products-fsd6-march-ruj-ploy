import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [item, setitem] = useState([]);
  const getProductList = async (id) => {
    const result = await axios.get("http://localhost:4001/products/" );
    console.log(result.data.data)
    setitem(result.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getProductList()
  };
  useEffect (() => {getProductList()},[]);
  return (
    <>
      <div className="App">
        <div className="app-wrapper">
          <h1 className="app-title">Products</h1>
        </div>
        <div className="product-list">
          {item.map((product, index) => {
            return (
              <div className="product" key={index}>
                <div className="product-preview">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {product.name}</h1>
                  <h2>Product price: {product.price} Baht</h2>
                  <p>Product description: {product.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
