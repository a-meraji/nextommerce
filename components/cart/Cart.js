import React from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
//components
import Item from "./Item";
import Check from "./Check";
//icons
import { XIcon } from "@heroicons/react/outline";
import EmptyCart from "./EmptyCart";

function Cart() {
  const { showCart, cartToggler, cart, total, amount } = useGlobalContext();
  return (
    <article
      className={`py-4 px-10 z-50 glob-trans fixed top-0 right-0 w-screen md:w-[35vw] h-screen bg-primary text-primary`}
      style={
        showCart
          ? { transform: "translate(0%,0%)" }
          : { transform: "translate(0%, -200%)" }
      }
    >
      <button onClick={cartToggler} className="flex flex-row">
        <XIcon width="20px" /> close
      </button>

      {amount > 0 ? (
      <div className="">
      <h4 className="my-4 text-2xl font-semibold"> My Cart </h4>
        {cart.map((item, i) => <Item key={i} index={i} item={item} />)}
        <Check total={total} />
        </div>
        ) : (
          <EmptyCart />
          )}
    </article>
  );
}

export default Cart;
