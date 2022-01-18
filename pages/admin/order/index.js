import { useState } from "react";
import { server } from "../../../config/index";
import TableOrder from "../../../components/TableOrder";
import { TruckIcon, ReplyIcon, NewspaperIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function index({ orders }) {
  const [ordSt, setOrdSt] = useState(orders);
  const UpdateSent = async (id, status) => {
    const data = await fetch(`${server}/api/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const res = await data.json();
    if (res.message == "updated") {
      var newOrders = ordSt;
      newOrders = newOrders.map((order) => {
        if (order._id === id) {
          order.sent = !res.docs.sent;
        }
        return order;
      });

      setOrdSt(newOrders);
    }
  };
  const [name, setName]=useState("undefined");
  const [lastname, setLastname]=useState("undefined");
  const [sent, setSent]=useState("undefined");

  const router = useRouter();
  const fetchOrders = () => {
    var keys="";
    var values="";
    if(name!="undefined"){keys="name"; values = name;}
    if(lastname!="undefined"){keys+="_lastname"; values += `_${lastname}`;}
    if(sent!="undefined"){keys+="_sent"; values += `_${sent}`;}

    router.push(server + "/admin/order?key=" + keys + "&value=" + values);
  };
  return (
    <div className="bg-secondary text-secondary py-12 px-5">
      <div className="flex flex-row">
        <label htmlFor="name">name:</label>
        <input className="bg-third rounded-full p-1" id="name" type="text" onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="lastname" className="ml-4">lastname:</label>
        <input className="bg-third rounded-full p-1" id="lastname" type="text" onChange={(e)=>setLastname(e.target.value)}/>
        <select onChange={(e)=>setSent(e.target.value)}>
          <option value='undefined'>all</option>
          <option value='true'>sent orders</option>
          <option value='false'>in process orders</option>
        </select>
        <button onClick={fetchOrders}>search</button>
      </div>
      <ul className="my-5 mx-3 p-6 sm:p-10">
        {ordSt.map((order, i) => (
          <li
            className={`relative px-9 py-5 my-3 rounded-2xl w-full
            ${order.sent ? "bg-green-600" : "bg-[#f09100]"}`}
            key={i}
          >
            <div className="absolute top-0 right-0 pt-5 pr-8 text-white">
              <button
                onClick={() => {
                  UpdateSent(order._id, !order.sent);
                }}
              >
                {order.sent ? (
                  <ReplyIcon width={20} />
                ) : (
                  <TruckIcon width={20} />
                )}
              </button>
            </div>
            <div>
              <div className="text-gray-100">
                <span className="text-lg text-white">name: </span> {order.name}{" "}
                {order.lastname}
              </div>
              <div className="text-gray-100">
                <span className="text-lg text-white">phone: </span>{" "}
                {order.phone}
              </div>
              <div className="text-gray-100">
                <span className="text-lg text-white">address: </span>{" "}
                {order.address}
              </div>
            </div>
            <TableOrder cart={order.cart} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        input[type="checkbox"] {
          opacity: 0.7;
        }
        input[type="checkbox"]:checked {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { key, value } = context.query;
  const res = await fetch(`${server}/api/order?key=${key}&value=${value}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return {
    props: { orders: data.orders }, // will be passed to the page component as props
  };
}
