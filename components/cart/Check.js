import Link from "next/link";
import { useGlobalContext } from "../../Contexts/globalContext/context";

export default function Check({ total: subtotal, cartToggler }) {
  const {translate : t} = useGlobalContext();
  return (
    <div className="my-3 text-sm  curier capitalize">
      <div className="min-w-full min-h-[1px] bg-primarycont my-2 -mx-10"></div>
      <div className="flex flex-row justify-between">
        <div>{t('subtotal')}</div>
        <div>$ {subtotal}</div>
      </div>
      <div className="my-1 flex flex-row justify-between">
        <div>{t('Tax')}</div>
        <div>{t("tax_cal")}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div>{t("Shipping")}</div>
        <div>{t("FREE")}</div>
      </div>
      <div className="min-w-full min-h-[1px] bg-hover my-2"></div>
      <div className="flex flex-row justify-between text-base">
        <div>{t("Total")}</div>
        <div>${subtotal}</div>
      </div>
      <div className="w-full mt-4 py-5 text-lg bg-primarycont text-primarycont text-center">
        <button onClick={cartToggler}>
        <Link href="/checkout">{t("proceed_checkout")}</Link>
        </button>
      </div>
    </div>
  );
}
