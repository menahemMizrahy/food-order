import { useContext } from "react";

import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.item.price.toFixed(2)}`;

  const addingToCartHandler = (amount) => {
    cartCtx.addingToCart({ ...props.item, amount });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.item.name}</h3>
        <div className={classes.description}>{props.item.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm
        item={{ ...props.item }}
        onAddingToCart={addingToCartHandler}
      />
    </li>
  );
};

export default MealItem;
