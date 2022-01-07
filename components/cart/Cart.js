import React from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
//components
import Item from "./Item";
//icons
import { XIcon } from "@heroicons/react/outline";

function Cart() {
  const { showCart, cartToggler, cart, total, amount } = useGlobalContext();
  return (
    <article
      className={`py-4 px-10 z-50 glob-trans fixed top-0 right-0 w-screen md:w-[40vw] h-screen bg-primary text-primary`}
      style={
        showCart
          ? { transform: "translate(0%,0%)" }
          : { transform: "translate(0%, -200%)" }
      }
    >
      <button onClick={cartToggler} className="flex flex-row"><XIcon width='20px'/> close</button>
      {amount > 0 ? (
        cart.map((item, i) => <Item key={i} item={item} />)
      ) : (
        <h4>you bag is empty!</h4>
      )}
    </article>
  );
}

export default Cart;
