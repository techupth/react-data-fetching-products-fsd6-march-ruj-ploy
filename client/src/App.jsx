import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productInfo, setProductInfo] = useState([]);
  const getProductInfo = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductInfo(result.data.data);
  };
  const deleteProductInfo = async (id, itemIndex) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newproductInfo = [...productInfo];
    newproductInfo.splice(itemIndex, 1);
    setProductInfo(newproductInfo);
  };
  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        <ul>
          {productInfo.map((item, index) => {
            return (
              <>
                <div className="product" key={item.id}>
                  <div className="product-preview">
                    <img
                      src={item.image}
                      alt={item.name}
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
                    className="delete-button"
                    onClick={() => deleteProductInfo(item.id, index)}
                  >
                    x
                  </button>
                </div>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
