import React from "react";
import CashierComponent from "./CashierComponent";

const style = {
  container: "flex flex-wrap justify-between p-10",
  component: "bg-white shadow-md rounded-md p-50",
  cards: " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 ",
  card: "bg-white shadow-md rounded-md p-4 cursor-pointer transition duration-300 ease-in-out hover:shadow-lg",
  cardHeader: "flex justify-between items-center",
  icon: "text-2xl",
  cardBody: "flex justify-center items-center",
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
        <CashierComponent className={style.component} cart={cartItems} />
    </div>
  );
}

export default HomeComponent;
