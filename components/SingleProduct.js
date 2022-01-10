import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/globalContext/context";
import { useRouter } from "next/router";
import Image from "next/image";
import { shimmer, toBase64 } from "../shared/utils/imgPlaceholder";
//icons
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

function SingleProduct({ product }) {
  const router = useRouter();
  const { name, price, store, description } = product;

  const { addItem, cartToggler, theme } = useGlobalContext();

  // take out all image urls from store and push into images[]
  var images = [];
  store.forEach((color) => {
    color["imgUrls"].forEach((url) => images.push(url));
  });

  // Product & Cart State
  const [color, setColor] = useState(store[0]["color"]);
  const [size, setSize] = useState(store[0]["sizeAmnt"][0]["size"]);
  useEffect(() => {
    setColor(store[0]["color"]);
    setSize(store[0]["sizeAmnt"][0]["size"]);
  }, [store]);

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
          <div className="absolute top-0 left-0 sm:z-10">
            <p className="bg-primary pt-3  pl-5 pr-3 text-4xl font-semibold capitalize">
              {name.replace(/_/g, " ")}
            </p>
            <p className="bg-primary pb-2 px-5 text-xl font-thin w-min capitalize">
              {price}$
            </p>
          </div>
          <Image
            src={images[imgIndex]}
            alt={name}
            width={640}
            height={400}
            className="object-contain"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 400)
            )}`}
          />
          {/* left and right arrow buttons */}
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
          className="flex bg-secondary overflow-x-scroll scrollbar-hide"
        >
          {images.map((url, i) => (
            <div
              key={i}
              onClick={() => {
                sideScroll(
                  i - imgIndex > 0 ? "right" : "left",
                  25,
                  Math.abs((i - imgIndex) * 105),
                  10
                );
                setImgIndex(i);
              }}
              className={`${
                i === imgIndex ? "bg-secondarycont" : "bg-third"
              } min-w-[30%] sm:min-w-[25%] md:min-w-[20%] max-w-[200px] m-[1px] `}
            >
              <Image
                width={200}
                height={200}
                src={url}
                className="object-contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(200, 200)
                )}`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* cols 2 */}
      <div className="p-11">
        <div>
          <div>
            <h4 className="mb-1 text-lg">Color</h4>
            <div className="flex flex-row mb-7">
              {store.map((item) => (
                <button
                  onClick={() => setColor(item.color)}
                  className={`${
                    item.color === color ? "border-2 border-primarycont" : null
                  } group hover:scale-110 transition-all relative mr-3 w-10 h-10 rounded-[50%]`}
                  style={{
                    backgroundColor: item.colorCode
                      ? item.colorCode
                      : "transparent",
                  }}
                >
                  {item.color === color ? (
                    <span className="absolute top-0 bottom-0 left-0 right-0 text-primary">
                      <CheckIcon />
                    </span>
                  ) : null}
                  {item.colorCode !== null ? (
                    <span className=" invisible sub-color group-hover:visible transition-all absolute text-xs top-8 left-1/2 -translate-x-1/2  p-2 bg-secondarycont text-secondarycont rounded-md">
                      {item.color}
                    </span>
                  ) : (
                    item.color
                  )}
                </button>
              ))}
            </div>
            {store[0]["sizeAmnt"][0]["size"] != "" ? (
              <>
                {" "}
                <h4 className="mb-1 text-xl">Size</h4>
                <div className="flex flex-row mb-5">
                  {store.map((item) => {
                    if (item.color === color) {
                      return item["sizeAmnt"].map((subItem, i) => {
                        if (subItem.amount > 0) {
                          return (
                            <button
                              key={i}
                              onClick={() => setSize(subItem.size)}
                              className={`${
                                subItem.size === size
                                  ? "border-primarycont border-2 text-primary"
                                  : "border-hovercont border-[1px]"
                              } hover:scale-110 transition-all mr-3 w-10 h-10 rounded-[50%]`}
                            >
                              {subItem.size}
                            </button>
                          );
                        }
                      });
                    }
                  })}
                </div>
              </>
            ) : null}
          </div>
          <p className="mb-4">{description}</p>
          <button
            onClick={() => {
              addItem({
                name,
                price,
                amount: 1,
                color,
                size,
                image: images[0],
              });
              cartToggler();
            }}
            className="bg-primarycont text-primarycont w-full text-lg curier  py-5 mx-auto my-8 hover:opacity-70"
          >
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
        .sub-color::before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid ${
              theme === "dark" ? "#eeeeee" : "#151515"
            };
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
        }
        @media screen and (min-width: 1024px) {
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
