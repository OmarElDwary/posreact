import React from "react";
import { AiFillHome } from "react-icons/ai";
import { AiFillPieChart } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";

const style = {
  bg: "bg-[#0097e6] h-screen w-64 flex flex-col hight-[100vh]",
  logo: "text-3xl text-white font-bold p-4 flex justify-between items-center",
  btn: "text-2xl text-white hover:text-[#f5f6fa] transition duration-300 ease-in-out",
  ul: "flex flex-col",
  li: "flex items-center space-x-4 p-4 text-[#dcdde1] hover:text-[#2f3640] hover:bg-[#40739e] cursor-pointer transition duration-300 ease-in-out font-semibold",
  icon: "text-2xl",
  title: "text-xl",
  menu: "color-[#f5f6fa] display-[none] hidden p-2"
};

function SideBar() {
    const closeSidebar = () => {
        document.querySelector('ul').style.display = "none";
        document.querySelector('h3').style.display = "none";
        document.querySelector("#back").style.width = "50px";
        document.querySelector("#closeBtn").style.display = "none";
        document.querySelector("#menu").style.display = "block";
    }
    const openSidebar = () => {
        document.querySelector('ul').style.display = "flex";
        document.querySelector('h3').style.display = "block";
        document.querySelector("#back").style.width = "250px";
        document.querySelector("#closeBtn").style.display = "block";
        document.querySelector("#menu").style.display = "none";
    }

  return (
    <aside>
        <div id="back" className={style.bg}>
          <div className={style.logo}>
            <h3 className={style.logo}>DAWDAW</h3>
            <button id="closeBtn" onClick={() => closeSidebar()} className={style.btn}>
              <AiOutlineClose />
            </button>
          </div>
          <div id="menu" className={style.menu}>
            <button onClick={() => openSidebar()} className={style.btn}>
                <AiOutlineMenuUnfold />
            </button>
        </div>
          <ul className={style.ul}>
            <Link to="/">
                <li className={style.li}>
                  <span className={style.icon}>
                    <AiFillHome />
                  </span>
                  <span className={style.title}>Home</span>
                </li>
            </Link>
            <li className={style.li}>
              <span className={style.icon}>
                <AiFillPieChart />
              </span>
              <span className={style.title}>Sales</span>
            </li>
            <li className={style.li}>
                <span className={style.icon}>
                    <FaProductHunt />
                </span>
                <span className={style.title}>products</span>
            </li>
            <Link to="/add-product">
                <li className={style.li}>
                    <span className={style.icon}>
                        <IoIosAdd />
                    </span> 
                    <span className={style.title}>Add Product</span>
                </li>
            </Link>
          </ul>
        </div>
    </aside>
  );
}

export default SideBar;
