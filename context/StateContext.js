import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  let foundProduct;
  let index;

  const onAddToCart = (product, quantity) => {
    const existingProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevQty) => prevQty + quantity);

    if (existingProductInCart) {
      const otherCartItems = cartItems.filter(
        (item) => item._id !== product._id
      );
      existingProductInCart.quantity += quantity;
      setCartItems([...otherCartItems, existingProductInCart]);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const onRemoveFromCart = (product) => {
    const productToRemove = cartItems.find((item) => item._id === product._id);
    const otherCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevPrice) =>
        prevPrice - productToRemove.price * productToRemove.quantity
    );
    setTotalQuantities((prevQty) => prevQty - productToRemove.quantity);
    setCartItems([...otherCartItems]);
  };

  const toggleCartItemQuantity = (id, value) => {
    const cartItem = cartItems.find((item) => item._id === id);
    const otherCartItems = cartItems.filter((item) => item._id !== id);
    if (value == "inc") {
      setCartItems([
        ...otherCartItems,
        { ...cartItem, quantity: cartItem.quantity + 1 },
      ]);
      setTotalPrice((prevPrice) => prevPrice + cartItem.price);
      setTotalQuantities((prevQty) => prevQty + 1);
    } else if (value == "dec") {
      if (cartItem.quantity - 1 > 0) {
        setCartItems([
          ...otherCartItems,
          { ...cartItem, quantity: cartItem.quantity - 1 },
        ]);
        setTotalPrice((prevPrice) => prevPrice - cartItem.price);
        setTotalQuantities((prevQty) => prevQty - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        setTotalQuantities,
        setTotalPrice,
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAddToCart,
        toggleCartItemQuantity,
        onRemoveFromCart,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
