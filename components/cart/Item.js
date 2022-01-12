import { useGlobalContext } from "../../Contexts/globalContext/context";
import { INCREASE, DECREASE } from "../../Contexts/Reducer/types";
// icons
import { XIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline";
export default function Item({ item, index }) {
  const { image, name, color, colorCode, size, price, amount } = item;
  const { remove, cartChange } = useGlobalContext();
  return (
    <div className="mt-6">
      <div className="flex flex-row">
        <img
          src={image}
          className="w-[20%] h-[20%] max-w-[65px] max-h-[65px] bg-purple-700 object-cover mr-3"
        />
        <div className="w-full flex flex-col justify-start">
          <p className="text-lg">{name.replace(/_/g, " ")}</p>
          <div className="flex flex-row mt-0.5">
            <p>
              color:
              <span
                style={{
                  backgroundColor: colorCode!==null ? colorCode : "transparent",
                }}
                className="ml-0.5 border-[1px] border-primarycont rounded-[50%] text-xs px-3 py-1"
              >
                {colorCode !== null ? null : color}
              </span>
            </p>
            {size ? (
              <p className="ml-3">
                size:{" "}
                <span className="ml-0.5 p-1 border-[1px] border-primarycont rounded-[50%] text-xs">
                  {size}
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <p>{price}$</p>
      </div>
      <div className="flex flex-row mt-4">
        <button
          onClick={() => remove(index)}
          className="p-2 border-[1px] border-hover"
        >
          <XIcon width="16px" />
        </button>
        <div className="flex flex-row ml-2 w-full">
          <div className="border-[1px] border-hover p-1 pl-2 w-full">
            {amount}
          </div>
          <button
            className="border-[1px] border-hover p-2"
            onClick={() => cartChange(index, DECREASE)}
          >
            <MinusIcon className="text-hover" width="16px" />
          </button>
          <button
            className="border-[1px] border-hover p-2"
            onClick={() => cartChange(index, INCREASE)}
          >
            <PlusIcon className="text-hover" width="16px" />
          </button>
        </div>
      </div>
    </div>
  );
}
