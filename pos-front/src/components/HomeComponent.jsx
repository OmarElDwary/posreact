import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiFillDelete } from "react-icons/ai";

const style = {
  container: "flex flex-row justify-between p-10",
  component: "bg-white shadow-md rounded-md p-50",
  cards: " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 ",
  card: "bg-white shadow-md rounded-md p-4 cursor-pointer transition duration-300 ease-in-out hover:shadow-lg",
  cardHeader: "flex justify-between items-center",
  icon: "text-2xl",
  cardBody: "flex justify-center items-center",
  table: "table-auto border-collapse border border-gray-400",
  th: "border border-gray-400 px-4 py-2 . p-3",
  td: "border border-gray-400 px-4 py-2 text-center",
  p: "text-center font-bold text-2xl",
  button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center  w-full",
};

function HomeComponent(props) {
  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === existingCartItem.id
            ? { ...item, quantity: item.quantity + 1, total: item.total + item.price }
            : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          ...product,
          quantity: 1,
          total: product.price,
        },
      ]);
    }
  };

  const removeFromCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem.quantity === 1) {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== product.id)
      );
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === existingCartItem.id
            ? { ...item, quantity: item.quantity - 1, total: item.total - item.price }
            : item
        )
      );
    }
  };
  // Calculate the total based on the cartItems
  const total = cartItems.reduce((acc, cur) => acc + cur.total, 0);

  const printRecipt = () => {
    const timestamp = new Date();
    cartItems.forEach((item) => {
      const sale = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        timestamp: timestamp.toDateString(),
        total: item.total,
      };
      addDoc(collection(db, "sales"), sale);
    });
    const recipt = document.getElementById("recipt");
    const w = window.open();
    w.document.write(`<style>#print{display:none}</style>`);
    w.document.write(recipt.innerHTML);
    w.print();
    w.close();
    setCartItems([]);
  };

  // discount
  const makeDiscount = () => {
    const prompt = window.prompt("Enter Discount Percentage");
    const discount = parseInt((total * prompt) / 100);
    const discountedTotal = (total - discount);

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      total: ((item.price * item.quantity) / total) * discountedTotal,
    }));
  
    setCartItems(updatedCartItems);
  };
  

  return (
    <div className={style.container}>
      <div className={style.cards}>
        {props.products.map((product) => (
          <div
            onClick={() => addToCart(product)}
            className={style.card}
            key={product.id}
          >
            <h3>{product.name}</h3>
            <div className={style.cardBody}>
              <h2>{product.price}</h2>
            </div>
          </div>
        ))}
      </div>
      <div id="recipt">
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.th}></th>
              <th className={style.th}>Product</th>
              <th className={style.th}>Price</th>
              <th className={style.th}>Quantity</th>
              <th className={style.th}>Total</th>
              <th className={style.th}></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className={style.td}>
                  <button onClick={() => removeFromCart(item)} className={style.delete}>
                    <AiFillDelete />
                  </button>
                </td>
                <td className={style.td}>{item.name}</td>
                <td className={style.td}>{item.price}</td>
                <td className={style.td}>{item.quantity}</td>
                <td className={style.td}>{item.total}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3" className="text-right font-bold">
                Total:
              </td>
              <td className={style.td}>{total}</td>
              <td className={style.td}>
                  <button onClick={() => makeDiscount()} className={style.delete}>
                    Discount
                  </button>
                </td>
            </tr>
          </tfoot>
        </table>
        <p className={style.p}>Have A Nice Meal</p>
        <button id="print" className={style.button} onClick={() => printRecipt()}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default HomeComponent;
