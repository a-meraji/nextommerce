import { useState, useEffect } from "react";
import Image from "next/image";
// image placeholder functions
import { shimmer, toBase64 } from "../../shared/utils/imgPlaceholder";
//icons
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";

export default function ImageSelectore({ name, price, images }) {
// indicate what index of images array is currently selected to show as big image
  const [imgIndex, setImgIndex] = useState(0);
  //set image index to 0 every time product change
  useEffect(() => {
    setImgIndex(0);
  }, [name]);

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
    <div className="bg-primarycont">
      <div className="relative text-primary">
        <div className="sm:absolute top-0 left-0 sm:z-10">
          <p className="bg-secondary pt-3  pl-5 pr-3 text-4xl font-semibold capitalize">
            {name.replace(/_/g, " ")}
          </p>
          <p className="absolute sm:block bg-secondary pb-2 px-5 text-xl font-thin w-min capitalize">
            {price}$
          </p>
        </div>
        {/*  big image */}
        <Image
          src={images[imgIndex]}
          alt={name}
          width={800}
          height={500}
          className="object-contain"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(600, 400)
          )}`}
        />
        {/*  left and right slider buttons */}
        <div className="absolute bottom-3 right-5 rounded-[50%] bg-primary bg-opacity-70 w-12  h-12 p-1 text-xs flex flex-row">
          <ArrowLeftIcon
            onClick={() => {
              if (imgIndex > 0) setImgIndex(imgIndex - 1);
              sideScroll("left", 25, 105, 10);
            }}
            width={20}
            className="pr-0.5 border-r-[0.5px] border-r-gray-500 hover:opacity-50"
          />
          <ArrowRightIcon
            width={20}
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
        className="flex bg-secondarycont overflow-x-scroll scrollbar-hide"
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
              i === imgIndex ? "bg-primary" : null
            } min-w-[30%] sm:min-w-[25%] md:min-w-[20%] max-w-[200px] m-[1px]`}
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
  );
}
