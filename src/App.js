import { useState, useContext, useEffect } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";

const App = () => {
  const cartCtx = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    if (cartCtx.items.length) setShowCart(true);
  };
  const hideCartHandler = () => setShowCart(false);

  useEffect(() => {
    if (!cartCtx.items.length) setShowCart(false);
  }, [cartCtx.items]);

  return (
    <>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
