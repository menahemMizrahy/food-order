import { useReducer } from "react";

import CartContext from "./cart-context";

const cartReducer = (lastState, action) => {
  let tempTotalPrice = lastState.totalPrice;
  const tempItems = [...lastState.items];

  if (action.type === "ADD") {
    tempTotalPrice += action.item.price * action.item.amount;
    const index = lastState.items.findIndex(
      (item) => item.id === action.item.id
    );
    if (index >= 0) {
      tempItems[index].amount += action.item.amount;
    } else {
      tempItems.push(action.item);
    }
  }

  if (action.type === "REMOVE") {
    const index = lastState.items.findIndex((item) => item.id === action.id);
    tempTotalPrice -= lastState.items[index].price;
    if (lastState.items[index].amount <= 1) {
      tempItems.splice(index, 1);
    } else {
      tempItems[index].amount--;
    }
  }

  if (action.type === "CLEAR") {
    return { items: [], totalPrice: 0 };
  }

  return { items: tempItems, totalPrice: tempTotalPrice };
};

const CartProvider = (props) => {
  const [cart, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalPrice: 0,
  });

  const addingToCart = (item) => {
    cartDispatch({ type: "ADD", item });
  };
  const removingFromCart = (id) => {
    cartDispatch({ type: "REMOVE", id });
  };
  const clearCart = () => {
    cartDispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        ...cart,
        addingToCart,
        removingFromCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
