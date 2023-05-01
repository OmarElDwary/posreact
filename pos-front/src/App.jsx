import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import HomeComponent from "./components/HomeComponent";
import AddProduct from "./components/AddProduct";
import ProductsComponent from "./components/ProductsComponent";
import SalesComponent from "./components/SalesComponent";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import LoginComponent from "./components/LoginComponent";

const style = {
  aside: "h-screen",
  main: "w-full h-screen p-10",
};
function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const createProduct = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const price = Number(e.target[1].value);
    const quantity = Number(e.target[2].value);
    if (name === "" || price === "" || quantity === "")
      return alert("Please fill all the fields");
    const total = price * quantity;
    await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      quantity: quantity,
      total: total,
    });

    const newProduct = {
      name: name,
      price: price,
      quantity: quantity,
      total: total,
    };
    setProducts([...products, newProduct]);

    e.target[0].value = "";
    e.target[1].value = Number;
    quantity("");
    alert("Product Added Successfully");
  };

  // update product
  const updateProduct = async (product) => {
    if (products.length === 0) return; // check if products is empty
    const name = prompt("Enter new name", product.name);
    const price = Number(prompt("Enter new price", product.price));
    const quantity = Number(prompt("Enter new quantity", product.quantity));
    const total = price * quantity;
    if (name === "" || price === "" || quantity === "")
      return alert("Please fill all the fields");
    await updateDoc(doc(db, "products", product.id), {
      name: name,
      price: price,
      quantity: quantity,
      total: total,
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

  // read sales
  useEffect(() => {
    const q = query(collection(db, "sales"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sales = [];
      querySnapshot.forEach((doc) => {
        sales.push({ ...doc.data(), id: doc.id });
      });
      setSales(sales);
    });
    return unsubscribe;
  }, []);


  /*
  sales functions
  */
  // create sale
  const createSale = async (name, price, quantity, timestamp, total) => {
    const sales = {
      name,
      price,
      quantity,
      timestamp,
      total,
    };
    await addDoc(collection(db, "sales"), sales);
    alert("Sale Created Successfully");
  };
  // delete sale
  const deleteSale = async (id) => {
    await deleteDoc(doc(db, "sales", id));
    alert("Sale Deleted Successfully");
  };
  // const deleteSales = async () => {
  //   const q = query(collection(db, "sales"));

  return (
    <div className="App" style={{ display: "flex" }}>
      <aside className={style.aside}>
        <SideBar />
      </aside>
      <main className={style.main}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomeComponent onReadProducts={useEffect} products={products} onSale={createSale}/>
            }
          />

          <Route
            path="/add-product"
            element={
              <AddProduct addDoc={addDoc} createProduct={createProduct} />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsComponent
                onReadProducts={useEffect}
                products={products}
                deleteProduct={deleteProduct}
                deleteDoc={deleteDoc}
                updateProduct={updateProduct}
              />
            }
          />
          <Route path="/sales" element={<SalesComponent sales={sales} deleteSale={deleteSale}/>} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
