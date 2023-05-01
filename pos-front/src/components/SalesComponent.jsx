import React from "react";
import { AiFillDelete } from "react-icons/ai";

const style = {
  table: "table-auto w-full",
  thead: "bg-gray-400",
  th: "border border-gray-400 px-4 py-2 . p-3",
  td: "border border-gray-400 px-4 py-2 text-center",
};

const SalesComponent = (props) => {
  
  return (
    <div>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className={style.th}>Product</th>
            <th className={style.th}>Price</th>
            <th className={style.th}>Quantity</th>
            <th className={style.th}>Time Stamp</th>
            <th className={style.th}>Total</th>
            <th className={style.th}>
              <button>Delete</button>
            </th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {props.sales.map((sale) => (
            <tr className={style.tr} key={sale.id}>
              <td className={style.td}>{sale.name}</td>
              <td className={style.td}>{sale.price}</td>
              <td className={style.td}>{sale.quantity}</td>
              <td className={style.td}>
                {new Date().toLocaleString()}
              </td>
              <td className={style.td}>{sale.total}</td>
              <td className={style.td}>
                <button onClick={() => props.deleteSale(sale.id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default SalesComponent;
