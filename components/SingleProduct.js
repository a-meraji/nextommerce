import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/globalContext/context";
import { useRouter } from "next/router";

//icons
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

function SingleProduct({ product }) {
  const router = useRouter();
  const { name, price, store, description } = product;

  const { addItem } = useGlobalContext();

  // take out all image urls from store and push into images[]
  var images = [];
  store.forEach((color) => {
    color["imgUrls"].forEach((url) => images.push(url));
  });

  // Product & Cart State
  const [color, setColor] = useState(store[0]["color"]);
  const [size, setSize] = useState(store[0]["sizeAmnt"][0]["size"]);

  // UI States
  const [imgIndex, setImgIndex] = useState(0);
  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);

  //set image index every time the single-product change
  useEffect(() => {
    setImgIndex(0);
  }, [router.query.name]);

  // image slider => horizontal slide functionallity
  function sideScroll(direction, speed, distance, step) {
    const sildeContainer = document.getElementById("slide-container");
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        sildeContainer.scrollLeft -= step;
      } else {
        sildeContainer.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }
  return (
    <section className="grid gridy">
      {/* col 1 */}
      <div className="">
        <div className="relative text-primary">
          <img
            className="h-[70vh] object-contain mx-auto"
            src={images[imgIndex]}
          />
          <div className="absolute top-0 left-0">
            <p className="bg-primary bg-opacity-70 pt-3 pb-1 px-6 text-4xl font-semibold capitalize">
              {name.replace(/_/g, " ")}
            </p>
            <p className="bg-primary bg-opacity-70 pb-3 px-6 text-xl font-thin w-min capitalize">
              {price}$
            </p>
          </div>

          <div className="absolute bottom-3 right-5 rounded-[50%] bg-primary bg-opacity-70 w-12  h-12 p-1 text-xs flex flex-row">
            <ArrowLeftIcon
              onClick={() => {
                if (imgIndex > 0) setImgIndex(imgIndex - 1);
                sideScroll("left", 25, 105, 10);
              }}
              className="pr-0.5 border-r-[0.5px] border-r-gray-500 hover:opacity-50"
            />
            <ArrowRightIcon
              onClick={() => {
                if (imgIndex < images.length - 1) setImgIndex(imgIndex + 1);
                sideScroll("right", 25, 105, 10);
              }}
              className="pl-0.5 hover:opacity-50"
            />
          </div>
        </div>
        {/* picture silder */}
        <div
          id="slide-container"
          className="flex  flex-cols bg-primary overflow-scroll scrollbar-hide"
        >
          {images.map((url, i) => (
            <img
              onClick={() => {
                sideScroll(
                  i - imgIndex > 0 ? "right" : "left",
                  25,
                  Math.abs((i - imgIndex) * 105),
                  10
                );
                setImgIndex(i);
              }}
              src={url}
              className={`${
                i === imgIndex ? "bg-primarycont" : null
              } w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain`}
            />
          ))}
        </div>
      </div>
      {/* cols 2 */}
      <div className="p-11">
        <div>
          <div>
            <h4 className="mb-1">Color</h4>
            <div className="flex flex-row mb-5">
              {store.map((item) => (
                <button onClick={() => setColor(item.color)} className="mr-2">
                  {item.color}
                </button>
              ))}
            </div>
            <h4 className="mb-1">Size</h4>
            <div className="flex flex-row mb-5">
              {store.map((item) => {
                if (item.color === color) {
                  return item["sizeAmnt"].map((subItem) => {
                    if (subItem.amount > 0) {
                      return (
                        <button
                          onClick={() => setSize(subItem.size)}
                          className="mr-2 text-sm"
                        >
                          {subItem.size}
                        </button>
                      );
                    }
                  });
                }
              })}
            </div>
          </div>
          <p className="mb-4">{description}</p>
          <button onClick={()=>addItem({name,price, amount:1, color, size})} className="bg-primarycont text-primarycont w-full text-lg curier  py-5 mx-auto my-8 hover:opacity-70">
            ADD TO CART
          </button>
          {/* dropdowns */}
          <div>
            <button
              className="m-1 flex text-xl"
              onClick={() => setDropDown1(!dropDown1)}
            >
              <ChevronRightIcon
                width="20px"
                className={`${dropDown1 ? "rotate-90" : "rotate-0"} chevron`}
              />{" "}
              <p className="ml-1">Care</p>
            </button>
            <p
              className={`${
                dropDown1 ? "h-[105%] opacity-100" : "h-0 opacity-0"
              } ml-5 dropdown p-2 shadow bg-base-100 rounded-box w-52`}
            >
              This is a limited edition production run. Printing starts when the
              drop ends.
            </p>
          </div>
          <div className="border-t-[0.5px] border-t-gray-300 py-3"></div>
          {/* dropdown 2 */}
          <div>
            <button
              className="m-1 flex text-xl"
              onClick={() => setDropDown2(!dropDown2)}
            >
              <ChevronRightIcon
                width="20px"
                className={`${dropDown2 ? "rotate-90" : "rotate-0"} chevron`}
              />
              <p className="ml-1">Details</p>
            </button>
            <p
              className={`${
                dropDown2 ? "h-[105%] opacity-100" : "h-0 opacity-0"
              } ml-5 dropdown p-2 shadow bg-base-100 rounded-box w-52`}
            >
              This is a limited edition production run. Printing starts when the
              drop ends. Reminder: Bad Boys For Life.
            </p>
          </div>
          <div className="border-t-[0.5px] border-t-gray-300 py-3"></div>
        </div>
      </div>
      <style svg>{`
        .gridy{
          
        }
        @media screen and (min-width: 640px) {
          .gridy{
            grid-template-columns: 65vw 35vw;
          }
        }
        .chevron{
          -webkit-transition: -webkit-transform .3s ease-in-out;
          -ms-transition: -ms-transform .3s ease-in-out;
          transition: transform .3s ease-in-out;  
        }
        .dropdown{
          transition: all .3s ease-in-out;  
        }
        `}</style>
    </section>
  );
}

export default SingleProduct;
