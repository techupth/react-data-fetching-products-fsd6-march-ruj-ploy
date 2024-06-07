import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchProductHandle = async () => {
    const response = await axios.get("http://localhost:4001/products");
    setProducts(response.data.data);
    console.log(response.data.data);
  };

  const deleteProductHandle = async (id) => {
    setIsloading(true);
    await axios.delete(`http://localhost:4001/products/${id}`);
    setIsloading(false);
  };

  useEffect(() => {
    fetchProductHandle();
  }, [isLoading]);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((item, index) => {
          return (
            <div key={index} className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                onClick={() => deleteProductHandle(item.id)}
                className="delete-button"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
