import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import HomeComponent from "./components/HomeComponent";
import AddProduct from "./components/AddProduct";
import { collection, doc, updateDoc, deleteDoc, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [products, setProducts] = useState([]);

  const createProduct = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const price = e.target[1].value;
    const quantity = e.target[2].value;
    if(name === "" || price === "" || quantity === "") return alert("Please fill all the fields");
    const total = price * quantity;
    await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      quantity: quantity,
      total: total,
    });
  
    const newProduct = { name: name, price: price, quantity: quantity, total: total };
    setProducts([...products, newProduct]);
  
    e.target[0].value = "";
    e.target[1].value = Number;
    quantity("");
    alert("Product Added Successfully");
  };
  
  // update product
  const updateProduct = async (id, name, price, quantity) => {
    await updateDoc(doc(db, "products", id), {
      name: name,
      price: price,
      quantity: quantity,
      total: price * quantity,
    });
    alert("Product Updated Successfully");
  };
  // delete product
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    alert("Product Deleted Successfully");
  };
  // read products
  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setProducts(products);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App" style={{ display: "flex" }}>
      <aside style={{ padding: "0 30px 0 0"}}>
        <SideBar />
      </aside>
      <main>
        <Routes>
          <Route exact path="/" element={<HomeComponent  onReadProducts={useEffect} products={products} />} />

          <Route path="/add-product" element={<AddProduct addDoc={addDoc} createProduct={createProduct} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
