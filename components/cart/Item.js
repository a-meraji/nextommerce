import { useGlobalContext } from "../../Contexts/globalContext/context"
import { INCREASE, DECREASE } from "../../Contexts/Reducer/types"
// icons
import { XIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline"
export default function Item({item, key}) {
    const {image, name, color, size, price, amount} = item
    const {remove, cartChange} = useGlobalContext()
    return (
        <div className="my-2">
      <h4 className="my-4 text-2xl font-semibold"> My Cart </h4>
            <div className="flex flex-row">
                <img src={image} className="w-[12%] bg-purple-700 object-cover mr-3"/>
                <div className="w-[60%] flex flex-col justify-start">
                    <p className="font-semibold">{name.replace(/_/g, " ")}</p>
                    <div className="flex flex-row mt-1 font-medium">
                        <p>color: {color}</p>
                        <p className="ml-4">size: <span className="ml-0.5 p-0.5 border-2 bg-primarycont text-primarycont rounded-[50%]">{size}</span></p>
                    </div>
                </div>
                <p className="font-semibold text-right">{price}$</p>
            </div>
            <div className="flex flex-row mt-4">
                <button onClick={()=>remove(key)} className="p-1 border-[1px] border-hover"><XIcon width="15px"/></button>
                <div className="flex flex-row ml-2">
                    <div className="border-[1px] border-hover pl-4">{amount}</div>
                    <div className="border-[1px] border-hover"><MinusIcon className="text-hover inline-block" width="15px"/></div>
                    <div className="border-[1px] border-hover"><PlusIcon className="text-hover inli" width="15px"/></div>
                </div>

            </div>
            <div className="min-w-full min-h-[1px] bg-hover mt-4"></div>
        </div>
    )
}
