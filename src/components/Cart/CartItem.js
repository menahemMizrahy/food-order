import classes from "./CartItem.module.css";

import { useContext } from "react";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const removeHandler = (event) => {
    cartCtx.removingFromCart(props.item.id);
  };

  const addHandler = (event) => {
    cartCtx.addingToCart({ ...props.item, amount: 1 });
  };

  const itemPrice = `${props.item.price.toFixed(2)}$`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{itemPrice}</span>
          <span className={classes.amount}>{`x${props.item.amount}`}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={addHandler}>+</button>
        <button onClick={removeHandler}>-</button>
      </div>
    </li>
  );
};

export default CartItem;
