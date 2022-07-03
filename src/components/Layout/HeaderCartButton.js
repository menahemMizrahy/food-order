import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonBump, setButtonBump] = useState(false);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (cartCtx.items.length) setButtonBump(true);
    const bumpTimer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => clearTimeout(bumpTimer);
  }, [cartCtx.items]);

  const totalAmount = cartCtx.items.reduce((num, item) => {
    return num + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${buttonBump && classes.bump}`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
