import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { server } from "../../../config/index";
// to shwo order product in table
import TableOrder from "../../../components/product_components/TableOrder";
// icons
import {
  TruckIcon,
  ReplyIcon,
  CalendarIcon,
  SearchIcon,
} from "@heroicons/react/outline";
// calender
import DatePicker from "../../../components/admin/DatePicker";
import format from "date-fns/format";
import authHandler from "../../../shared/utils/auth/authHandler";

export default function index({ orders }) {
  const router = useRouter();

  // order state to send to order api
  const [ordSt, setOrdSt] = useState(orders);
  useEffect(() => {
    setOrdSt(orders);
  }, [orders]);

  // query keys and values states for searhing orders from api
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [sent, setSent] = useState();
  const [dateQuery, setDateQuery] = useState();

  // date states for passing to DatePicker Component
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  //display calender boolean
  const [showCalender, setShowCalender] = useState(false);

  // when order delivered
  // change sent boolean in database and then change ui
  const UpdateSent = async (id, status) => {
    const data = await fetch(`${server}/api/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const athorized = data.headers.get("authorized") === "true";
    const res = await data.json();
    if (athorized === true) {
      if (res.message && res.message == "updated") {
        var newOrders = ordSt;
        newOrders = newOrders.map((order) => {
          if (order._id === id) {
            order.sent = !res.docs.sent;
          }
          return order;
        });
        setOrdSt(newOrders);
      } else {
        alert("couldn't update order");
        console.log(res);
      }
    } else {
      router.push("/admin/login");
    }
  };

  // fech orders base on new query states
  const fetchOrders = () => {
    var keys = "";
    var values = "";
    // check for undefined and empty and white space
    if (name !== undefined && name !== "" && name.indexOf(" ") < 0) {
      keys = "name";
      values = name;
    }
    if (
      lastname !== undefined &&
      lastname !== "" &&
      lastname.indexOf(" ") < 0
    ) {
      keys += "_lastname";
      values += `_${lastname}`;
    }
    if (sent !== "undefined" && sent !== undefined) {
      keys += "_sent";
      values += `_${sent}`;
    }
    if (dateQuery !== undefined && dateQuery !== "") {
      keys += "_createdAt";
      values += `_${dateQuery}`;
    }
    // requesting new query
    router.push(server + "/admin/order?key=" + keys + "&value=" + values);
  };
  return (
    <div className="bg-secondary text-secondary py-12 px-5 relative w-full">
      {/* query inputs */}
      <div className="flex flex-col gap-y-6  justify-center lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row align-middle w-3/4 mx-auto sm:w-full justify-start flex-wrap">
          <input
            placeholder="name"
            className="bg-third rounded-full py-2 px-3  "
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="lastname"
            className="bg-third rounded-full py-2 px-3  "
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <select
            className="rounded-full py-1 bg-third px-3 "
            value={sent}
            onChange={(e) => setSent(e.target.value)}
          >
            <option value="undefined">all</option>
            <option value="true">sent orders</option>
            <option value="false">in process orders</option>
          </select>
          <button
            className="flex py-1 bg-third text-secondary rounded-full  px-4"
            onClick={() => setShowCalender(true)}
          >
            <span className="mr-1 my-auto">calender</span>
            <CalendarIcon className="my-auto" width={20} />
          </button>
          <button
            className="flex px-4 py-2 bg-red-500 mx-auto sm:mx-0  text-white rounded-full"
            onClick={() => setDateQuery()}
          >
            reset calender
          </button>
        </div>
        <button
          className="rounded-full bg-success text-white py-2 px-6 max-h-12 min-w-[200px] lg:min-w-[150px] mx-auto"
          onClick={fetchOrders}
        >
          <div className="flex justify-center">
            <span>search</span> <SearchIcon width={20} />
          </div>
        </button>
      </div>

      {/* orders */}
      <ul className="my-5 sm:mx-3 p-6 sm:p-10">
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
            <div className="-px-9 sm:px-0">
              <TableOrder cart={order.cart} />
            </div>
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
  const { authorized, access, refresh } = await authHandler(
    context.req,
    context.res
  );

  if (authorized === true) {
    const { key, value } = context.query;
    const response = await fetch(
      `${server}/api/order?key=${key}&value=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          refresh: refresh,
          access: access,
        },
      }
    );
    const data = await response.json();
    return {
      props: { orders: data.orders }, // will be passed to the page component as props
    };
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
