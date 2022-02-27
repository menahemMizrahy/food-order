import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItems = cartCtx.items.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  const checkingoutHandler = () => {
    setIsCheckout(true);
  };

  const closeCartHandler = () => {
    if (!sent) props.onHideCart();
    else {
      cartCtx.clearCart();
      props.onHideCart();
    }
  };

  const sendOrderHandler = async (userInfo) => {
    setSending(true);
    await fetch(
      "https://react-http-efb49-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo,
          items: cartCtx.items,
        }),
      }
    ).catch(() => {});
    setSending(false);
    setSent(true);
  };

  return (
    <Modal onHide={closeCartHandler}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`${cartCtx.totalPrice.toFixed(2)}$`}</span>
      </div>
      {!isCheckout ? (
        <div className={classes.actions}>
          <button onClick={props.onHideCart}>Close</button>
          <button className={classes.button} onClick={checkingoutHandler}>
            Order
          </button>
        </div>
      ) : (
        !sending &&
        !sent && (
          <Checkout onCancel={props.onHideCart} onConfirm={sendOrderHandler} />
        )
      )}
      {sending && <p>Sending your order, Please wait...</p>}
      {sent && (
        <React.Fragment>
          <p>Your order hase complited</p>
          <div className={classes.actions}>
            <button onClick={closeCartHandler}>Close</button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
