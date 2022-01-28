import React from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
//components
import Item from "./Item";
import Check from "./Check";
//icons
import { XIcon } from "@heroicons/react/outline";
import EmptyCart from "./EmptyCart";
import { langs } from "../../Contexts/values/LangValues";

function Cart() {
  const { lang, showCart, cartToggler, cart, total, amount } =
    useGlobalContext();
  return (
    <article
      className={`${
        lang === langs["fa"] ? "left-0" : "right-0"
      } py-4 px-10 z-50 fixed top-0 bottom-0  w-screen md:w-[60vw] lg:w-[35vw] bg-primary text-primary`}
      style={{
        transition: "transform 0.5s ease-in-out"
        ,transform: showCart ? "translate(0%,0%)" : "translate(0%,-200%)",
      }}
    >
      <button
        onClick={cartToggler}
        className="absolute top-2 left-2 flex flex-row"
      >
        <XIcon width={25} />
      </button>

      {amount > 0 ? (
        <>
          <h4 className="my-4 text-2xl font-semibold"> My Cart </h4>
          <div className="h-[87%] flex flex-col justify-between">
            <div className="overflow-scroll scrollbar-hide">
              {cart.map((item, i) => (
                <Item key={i} index={i} item={item} />
              ))}
            </div>
            <Check cartToggler={cartToggler} total={total} />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </article>
  );
}

export default Cart;
