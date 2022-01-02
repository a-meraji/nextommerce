import React, { useState } from "react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { set } from "mongoose";

function SingleProduct({ product }) {
  const { name, category, price, store, description, sale, available } =
    product;
  var images = [];
  store.forEach((color) => {
    color["imgUrls"].forEach((url) => images.push(url));
  });

  const [imgIndex, setImgIndex] = useState(0);
  const [drop1, setDropDrop1] = useState(false);
  const [drop2, setDropDrop2] = useState(false);

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
              {product.name.replace(/_/g, " ")}
            </p>
            <p className="bg-primary bg-opacity-70 pb-3 px-6 text-xl font-thin w-min capitalize">
              {price}$
            </p>
          </div>

          <div className="absolute bottom-3 right-5 rounded-[50%] bg-primary bg-opacity-70 w-12  h-12 p-1 text-xs flex flex-row">
            <ArrowLeftIcon
              onClick={() => {
                if (imgIndex > 0) setImgIndex(imgIndex - 1);
                else {
                  setImgIndex(images.length - 1);
                }
              }}
              className="pr-0.5 border-r-[0.5px] border-r-gray-500 hover:opacity-50"
            />
            <ArrowRightIcon
              onClick={() => {
                if (imgIndex < images.length - 1) setImgIndex(imgIndex + 1);
                else {
                  setImgIndex(0);
                }
              }}
              className="pl-0.5 hover:opacity-50"
            />
          </div>
        </div>
        {/*  */}
        <div className="flex  flex-cols bg-primary overflow-scroll scrollbar-hide">
          {images.map((url, i) => (
            <img
              onClick={() => setImgIndex(i)}
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
          <p className="mb-4">{description}</p>
          <button className="bg-primarycont text-primarycont w-full text-lg curier  py-5 mx-auto my-8 hover:opacity-70">
            ADD TO CART
          </button>
          {/* dropdowns */}
          <div>
            <button
              className="m-1 flex text-xl"
              onClick={() => setDropDrop1(!drop1)}
            >
              <ChevronRightIcon
                width="20px"
                className={`${drop1 ? "rotate-90" : "rotate-0"} chevron`}
              />{" "}
              <p className="ml-1">Care</p>
            </button>
            <p
              className={`${
                drop1 ? "h-[105%] opacity-100" : "h-0 opacity-0"
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
              onClick={() => setDropDrop2(!drop2)}
            >
              <ChevronRightIcon
                width="20px"
                className={`${drop2 ? "rotate-90" : "rotate-0"} chevron`}
              />
              <p className="ml-1">Details</p>
            </button>
            <p
              className={`${
                drop2 ? "h-[105%] opacity-100" : "h-0 opacity-0"
              } ml-5 dropdown p-2 shadow bg-base-100 rounded-box w-52`}
            >
              This is a limited edition production run. Printing starts when the
              drop ends. Reminder: Bad Boys For Life.
            </p>
          </div>
          <div className="border-t-[0.5px] border-t-gray-300 py-3"></div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
