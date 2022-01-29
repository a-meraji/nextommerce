import { useGlobalContext } from "../Contexts/globalContext/context";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import TableOrder from "../components/product_components/TableOrder";
import { langs } from "../Contexts/values/LangValues";

export default function checkout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    translate: t,
    lang,
    cart,
    total,
    amount,
    clearCart,
  } = useGlobalContext();
  const [orders, setOrders] = useState({
    name: "",
    lastname: "",
    address: "",
    phone: 0,
    cart,
    amount,
    cost: total,
  });
  const [send, setSend] = useState(false);

  // set new order to sent
  const submitHandler = (form) => {
    // make a product model to send
    const { name, lastname, address, phone } = form;
    const newOrder = {
      name,
      lastname,
      address,
      phone,
      cart,
      cost: total,
      amount,
    };
    setOrders(newOrder);
    setSend(true);
  };

  //sending order
  const sendOrder = async () => {
    const data = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    });

    const res = await data.json();
    if (res.message && res.message === "saved") {
      clearCart();
      router.push("/");
      alert("your order submited successfuly");
    } else {
      if (res.message === "incomplete data") {
        alert("Please complete all fileds in the form");
      } else {
        alert("something went wrong! Try again moments later.");
      }
    }
  };

  return (
    <div
    style={{ direction: `${lang === langs["fa"] ? "rtl" : "ltr"}` }}
      className={`relative bg-secondary text-secondary py-10`}
    >
      <div className="w-4/5 max-w-[500px] border-2 bg-third border-third p-6 sm:px-10 mx-auto rounded-xl flex flex-col">
        <form
        
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col capitalize"
        >
          <label className="mb-1 text-primary text-lg" htmlFor="name">
            {t("name")}:
          </label>
          <input
            className="rounded-full px-2 mb-6 bg-secondary"
            id="name"
            type="text"
            placeholder="enter your name"
            {...register("name", {
              required: true,
              pattern:
                /^[^+={}()<>!@#$%^&*?;:,|\\/_.\d]*[^\s+={}()<>!@#$%^&*?;:,|\\/_.\d]$/,
            })}
          />
          {errors.name && (
            <p className="text-red-700 -mt-4 mb-4">
              {errors.name.type === "required"
                ? "* enter your name"
                : "* name should not end with white-space or contained any non-letter charachter"}
            </p>
          )}

          <label className="mb-1 text-primary text-lg" htmlFor="lastname">
            {t("lastname")}:
          </label>
          <input
            className="rounded-full px-2 mb-6 bg-secondary"
            type="text"
            id="lastname"
            placeholder="enter your lastname"
            {...register("lastname", {
              required: true,
              pattern:
                /^[^+={}()<>!@#$%^&*?;:,|\\/_.\d]*[^\s+={}()<>!@#$%^&*?;:,|\\/_.\d]$/,
            })}
          />
          {errors.lastname && (
            <p className="text-red-700 -mt-4 mb-4">
              {errors.lastname.type === "required"
                ? "* enter the your lastname"
                : "* name should not end with white-space or contained any non-letter charachter"}
            </p>
          )}

          <label className="mb-1 text-primary text-lg" htmlFor="phone">
            {t("phone")}:
          </label>
          <input
            className="rounded-full px-2 mb-6 bg-secondary"
            id="phone"
            type="text"
            placeholder="enter your phone number"
            {...register("phone", {
              required: true,
              pattern: /^\d+$/,
            })}
          />
          {errors.phone && (
            <p className="text-red-700 -mt-4 mb-4">
              {errors.phone.type === "required"
                ? "* enter your phone number"
                : "* phone number not valid"}
            </p>
          )}

          <label className="mb-1 text-primary text-lg" htmlFor="address">
            {t("address")}:
          </label>
          <input
            className="rounded-full px-2 mb-6 bg-secondary"
            id="address"
            type="text"
            placeholder="enter your address"
            {...register("address", {
              required: true,
            })}
          />
          {errors.address && (
            <p className="text-red-700 -mt-4 mb-4">* enter your address</p>
          )}

          <h3 className="text-lg mt-5 text-primary">{t("cart_table")}</h3>
          <TableOrder cart={cart} />
          <div className="w-1/2 flex flex-col items-center mx-auto mt-7">
            <button className="rounded-full w-full mx-auto text-xl py-3 bg-accent text-white shadow-md my-8">
              {t("SUBMIT")}
            </button>
          </div>
        </form>
        <button
          onClick={() => router.back()}
          className="text-center rounded-full w-1/3 mx-auto text-sm py-1 bg-danger text-white"
        >
          {t("cancel")}
        </button>
      </div>
      {/* modal */}
      {send === true ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000d3]">
          <div className="rounded-2xl bg-white w-3/4 min-w-[200px] max-w-[350px] pt-12 pb-9 text-center">
            <h5 className="text-xl text-gray-900 mb-14">{t("asure_q")}</h5>
            <div className="flex flex-row justify-around text-white w-full">
              <button
                onClick={() => {
                  setSend(false);
                }}
                className="bg-danger py-2 w-[40%] rounded-full"
              >
                {t("return")}
              </button>
              <button
                onClick={() => {
                  setSend(false);
                  sendOrder();
                }}
                className="bg-accent py-2 w-[45%] rounded-full"
              >
                {t("continue")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
