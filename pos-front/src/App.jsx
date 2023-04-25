import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import HomeComponent from "./components/HomeComponent";
import AddProduct from "./components/AddProduct";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      total: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 1,
      total: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 1,
      total: 300,
    },
  ]);

  const createProduct = (product) => {
    product.id = products.length + 1;
    product.name = products.name;
    product.price = products.price;
    product.quantity = products.quantity;
    product.total = products.total;
    setProducts([...products, product]);
  };
  return (
    <div className="App" style={{ display: "flex" }}>
      <aside style={{ padding: "0 30px 0 0"}}>
        <SideBar />
      </aside>
      <main>
        <Routes>
          <Route exact path="/" element={<HomeComponent products={products} />} />

          <Route path="/add-product" element={<AddProduct onCreateProduct={createProduct} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
