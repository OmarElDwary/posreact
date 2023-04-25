import React from "react";

const style = {
  table: "table-auto border-collapse border border-gray-400",
};

function CashierComponent({ cart }) {
  const total = cart.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-bold">
              Total:
            </td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CashierComponent;
