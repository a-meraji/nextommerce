import Link from "next/link";

export default function Check({ total: subtotal }) {
  return (
    <div className="my-3 text-sm  curier">
      <div className="min-w-full min-h-[1px] bg-primarycont my-2 -mx-10"></div>
      <div className="flex flex-row justify-between">
        <div>Subtotal</div>
        <div>$ {subtotal}</div>
      </div>
      <div className="my-1 flex flex-row justify-between">
        <div>Taxes</div>
        <div>Calculated at checkout</div>
      </div>
      <div className="flex flex-row justify-between">
        <div>Shipping</div>
        <div>FREE</div>
      </div>
      <div className="min-w-full min-h-[1px] bg-hover my-2"></div>
      <div className="flex flex-row justify-between text-base">
        <div>Total</div>
        <div>${subtotal}</div>
      </div>
      <div className="w-full mt-4 py-5 capitalize text-lg bg-primarycont text-primarycont text-center">
        <Link href="/checkout">proceed to checkout</Link>
      </div>
    </div>
  );
}
