import React, { useState } from "react";

const style = {
  form: "w-full max-w-sm mt-10 px-3",
  formGroup: "flex flex-wrap -mx-3 mb-6",
  label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
  input: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
  button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
};

function AddProduct({ addDoc, createProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || price === "" || quantity === "")
      return alert("Please fill all the fields");
    createProduct(e);
    setName(""); 
    setPrice();
    setQuantity("");
    alert("Product Added Successfully");
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor= "name">
            Name
          </label>
          <input
            className={style.input}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="price">
            Price
          </label>
          <input
            className={style.input}
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="quantity">
            Quantity
          </label>
          <input
            className={style.input}
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Product Quantity"
          />
        </div>
        <div className={style.formGroup}>
          <button onSubmit={() => addDoc} className={style.button} type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
