import React from "react";
import { BsPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
const style = {
    container: "w-full h-full flex justify-center items-center position-relative m-0 p-0",
    table: "table-auto border-collapse border border-gray-400 bg-[#ecf0f1] w-full h-full vh-100 vw-100 position-relative",
    thead: "bg-[#2c3e50] text-white",
    th: "border border-gray-400 px-4 py-2",
    tr: "border border-gray-400",
    td: "border border-gray-400 px-4 py-2 text-center",
    btnupdate: "bg-[#f1c40f] hover:bg-[#f39c12] text-white text-center font-bold rounded items-center  w-full flex justify-center items-center",
    btndelete: "bg-red-500 hover:bg-red-700 text-white font-bold rounded text-center  w-full",
};

function ProductsComponent({ onReadProducts, products, updateProduct, deleteProduct }){
    return (
            <div className={style.container}>
                <table className={style.table}>
                <thead className={style.thead}>
                    <tr className={style.tr}>
                        <th className={style.th}>Product</th>
                        <th className={style.th}>Price</th>
                        <th className={style.th}>Quantity</th>
                        <th className={style.th}>Total</th>
                        <th className={style.th}>Update</th>
                        <th className={style.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className={style.tr} key={product.id}>
                            <td className={style.td}>{product.name}</td>
                            <td className={style.td}>{product.price}</td>
                            <td className={style.td}>{product.quantity}</td>
                            <td className={style.td}>{product.total}</td>
                            <td className={style.td}>
                                <button onClick={() => updateProduct(product)} className={style.btnupdate}>
                                    {/* <BsPencilFill />  */}
                                    Update
                                </button>
                            </td>
                            <td className={style.td}>
                                <button onClick={() => deleteProduct(product.id)} className={style.btndelete}>
                                    {/* <AiFillDelete /> */}
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
}

export default ProductsComponent;