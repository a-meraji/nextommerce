import { useState, useEffect } from "react";
import { server } from "../../../config/index";
import TableOrder from "../../../components/TableOrder";
import {
  TruckIcon,
  ReplyIcon,
  CalendarIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import DatePicker from "../../../components/admin/DatePicker";
import format from "date-fns/format";

export default function index({ orders }) {
  const router = useRouter();

  // query keys and values states
  const [ordSt, setOrdSt] = useState(orders);
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [sent, setSent] = useState();
  const [dateQuery, setDateQuery] = useState();
  useEffect(() => {
    setOrdSt(orders);
  }, [orders]);

  // date states for passing to DatePicker Component
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  //show calender
  const [showCalender, setShowCalender] = useState(false);

  // change sent boolean in database and then change ui
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

  // fech orders base on new query states
  const fetchOrders = () => {
    var keys = "";
    var values = "";
    if (name != "undefined" && name != undefined && name != "") {
      console.log(name);
      keys = "name";
      values = name;
    }
    if (lastname != "undefined" && lastname != undefined && lastname != "") {
      keys += "_lastname";
      values += `_${lastname}`;
    }
    if (sent != "undefined" && sent != undefined && sent != "") {
      keys += "_sent";
      values += `_${sent}`;
    }
    if (dateQuery != "undefined" && dateQuery != undefined && dateQuery != "") {
      keys += "_createdAt";
      values += `_${dateQuery}`;
    }
    router.push(server + "/admin/order?key=" + keys + "&value=" + values);
  };
  return (
    <div className="bg-secondary text-secondary py-12 px-5 relative w-full">
      {/* query inputs */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row align-middle w-full justify-start">
            <input
            placeholder="name"
              className="bg-third rounded-full py-2 px-3"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
            placeholder="lastname"
              className="bg-third rounded-full py-2 px-3 ml-5 mr-1"
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          <select
            className="ml-5 rounded-full py-1 px-3 bg-third"
            value={sent}
            onChange={(e) => setSent(e.target.value)}
          >
            <option value="undefined">all</option>
            <option value="true">sent orders</option>
            <option value="false">in process orders</option>
          </select>
          <button
            className="ml-5 flex px-4 py-1 bg-third text-secondary rounded-full"
            onClick={() => setShowCalender(true)}
          >
            <span className="mr-1 my-auto">calender</span>
            <CalendarIcon className="my-auto" width={20} />
          </button>
        </div>
          <button
            className="rounded-full bg-success text-white px-6 py-2  flex justify-center"
            onClick={fetchOrders}
          >
            <span>search</span> <SearchIcon width={20} />
          </button>
      </div>

      {/* orders */}
      <ul className="my-5 mx-3 p-6 sm:p-10">
        {ordSt.map((order, i) => (
          <li
            className={`relative px-9 py-5 my-3 rounded-2xl w-full
            ${order.sent ? "bg-[#2ea3fa]" : "bg-[#f1970e]"}`}
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
              <div className="text-gray-100">
                <span className="text-lg text-white">order date: </span>{" "}
                {format(new Date(order.createdAt), "dd-MMM-yyy")}
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
      {/* date range calender conditional rendering */}
      {showCalender ? (
        <div className="z-50 absolute flex flex-col justify-center w-full h-screen bg-[#000000e3] top-0 lef-0 right-0">
          <div className="w-min mx-auto">
            <DatePicker state={date} setState={setDate} />
          </div>
          <button
            className="mt-8 px-6 py-2 bg-success mx-auto text-center rounded-full text-white text-xl"
            onClick={() => {
              setDateQuery(
                `${format(
                  new Date(date[0]["startDate"]),
                  "yyyy-MM-dd'T'HH:mm:ss.SSS"
                )}to${format(
                  new Date(date[0]["endDate"]),
                  "yyyy-MM-dd'T'HH:mm:ss.SSS"
                )}`
              );
              setShowCalender(false);
            }}
          >
            set date
          </button>
        </div>
      ) : null}
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
