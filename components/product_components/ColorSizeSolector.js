import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
//icons
import {
    CheckIcon,
  } from "@heroicons/react/outline";
export  default function ColorSizeSelector({store, description, name,price,img}){

  const { translate: t, addItem, cartToggler, theme } = useGlobalContext();

     // Product & Cart State
  const [color, setColor] = useState(store[0]["color"]);
  const [colorCode, setColorCode] = useState(store[0]["colorCode"]);
  const [size, setSize] = useState(store[0]["sizeAmnt"][0]["size"]);
  useEffect(() => {
    setColor(store[0]["color"]);
    setSize(store[0]["sizeAmnt"][0]["size"]);
  }, [store]);
  
  // UI States
  const [readMore, setReadMore] = useState(false);

    return(
        <div className="py-11 px-5 lg:px-11 lg:pt-2">
        <div>
          <div>
              {/* selcting color */}
            <h4 className="mb-3 text-md text-primary uppercase font-bold">{t('color')}</h4>
            <div className="flex flex-row mb-10 flex-wrap">
              {store.map((item) => (
                <button
                  onClick={() => {
                    setColor(item.color);
                    setColorCode(item.colorCode);
                  }}
                  className={` group hover:scale-110 transition-all relative mr-3 w-12 h-12 rounded-[50%]`}
                  style={{
                    backgroundColor: item.colorCode
                      ? item.colorCode
                      : "transparent",
                  }}
                >
                  {item.color === color ? (
                    <span className={`absolute top-0 bottom-0 left-0 right-0 ${item.color=="white"?"text-black":"text-white"}`}>
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
            {/* selecting size */}
            {store[0]["sizeAmnt"][0]["size"] != "" ? (
              <>
                {" "}
                <h4 className="mb-3 text-md text-primary uppercase font-bold">{t('size')}</h4>
                <div className="flex flex-row mb-10 flex-wrap">
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
                                  : "border-hovercont text-third border-[1px]"
                              } hover:scale-110 transition-all mr-3 w-12 h-12 rounded-[50%] font-bold`}
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
          {/* description */}
          <div
            className={`relative overflow-hidden  mb-16 ${
              readMore ? "max-h-full" : "max-h-24"
            }`}
          >
            <p className="text-third">{description}</p>
            <p
              className={`${
                readMore ? "block" : "absolute pl-2"
              } bg-secondary text-xl text-secondary read-more bottom-0 right-0 w-3/4`}
            >
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? t("read_less") : `...${t("read_more")}`}
              </button>
            </p>
          </div>
          {/* add to cart button */}
          <button
            onClick={() => {
              addItem({
                name,
                price,
                amount: 1,
                color,
                colorCode,
                size,
                image: img,
              });
              cartToggler();
            }}
            className="uppercase bg-primarycont text-primarycont w-full text-lg  py-5 mx-auto mb-10 hover:opacity-70"
          >
            {t('ADD_TO_CART')}
          </button>
        </div>
        <style jsx>{`
        .sub-color::before {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid ${theme === "dark" ? "#eeeeee" : "#151515"};
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
      </div>
    )
}