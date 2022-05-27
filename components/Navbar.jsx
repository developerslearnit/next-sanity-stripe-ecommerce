import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">DevLearnIt Shop</Link>
      </p>
      <button
        onClick={() => setShowCart(true)}
        type="button"
        className="cart-icon"
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart ? <Cart /> : null}
    </div>
  );
};

export default Navbar;
