import { useEffect, useState } from "react";
import { XIcon, CheckIcon } from "@heroicons/react/outline";

const elm = (
  <div className={`flex flex-row justify-between -mb-3`}>
    <p className="max-w-[55px] pl-2">size</p>

    <p className="max-w-[55px] pl-4">amount</p>
  </div>
);

export default function AdminProduts({ product }) {
  const { store, description, sale, available } = product;
  const [productSt, setProductSt] = useState(product);
  
  //for a smart responsive
  const[innerW, setInnerW] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
});
const updateWidth = () => {
    setInnerW(window.innerWidth);
}

  const changeHandler = (e, val) => {
    var tmp = product;
    tmp[val] = e.target.value;
    setProductSt(tmp);
    console.log(productSt);
  };
  
  return (
    <form className="border-[1px] rounded-3xl my-6 mx-8 py-9 px-10 text-white">
      <label className="text-xl">name: </label>
      <input
        type="text"
        className="mb-4 pl-3 pb-0.5 bg-gray-300 bg-opacity-20 rounded-full text-gray-200"
        defaultValue={productSt.name.replace("_", " ")}
        onChange={(e) => {
          changeHandler(e, "name");
        }}
      />
      <br />
      <label className="text-lg">price: </label>
      <input
        type="number"
        className="mb-1 pl-3 pb-0.5 bg-gray-300 bg-opacity-20 rounded-full text-gray-200"
        defaultValue={productSt.price}
        onChange={(e) => {
          changeHandler(e, "price");
        }}
      />

      {store.map((miniStore, i) => {
        const { color, imgUrls, sizeAmnt } = miniStore;
        return (
          <div key={i} className="border-t-[1px]  my-6 pt-6">
            <label className="mb-2">color: </label>
            <input
              className="mb-1 pl-3 pb-0.5 bg-gray-300 bg-opacity-20 rounded-full text-gray-200"
              type="text"
              defaultValue={color}
              onChange={(e) => changeHandler(e, "color")}
            />

            {/* when indow resize a column with amount and size title will add or remove */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 justify-items-start max-w-[500px] mt-4 mb-6">  
              {window.innerWidth >= 768 && sizeAmnt.length > 2 ? elm : ""}
              {window.innerWidth >= 768 ? elm : elm}
              {window.innerWidth >= 648 && sizeAmnt.length > 1 ? elm : ""}
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 justify-items-start max-w-[500px] mt-4 mb-6">
              {sizeAmnt.map((val, i) => {
                const col = i % 2 === 0 ? 2 : 1;
                return (
                  <div
                    className={`border-[1px] rounded-full flex flex-row justify-between`}
                  >
                    <div>
                      <input
                        className="max-w-[55px] pl-4 bg-gray-300 bg-opacity-20 rounded-l-full text-gray-200"
                        defaultValue={val.size}
                        onChange={(e)=>changeHandler(e,sizeAmnt[i]['size'])}
                      />
                    </div>
                    <div>
                      <input
                        className="max-w-[55px] pl-4 bg-gray-300 bg-opacity-20 rounded-r-full text-gray-200"
                        defaultValue={val.amount}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-y-4 justify-items-center max-w-[550px]">
              {imgUrls.map((url) => (
                <img src={url} width="150px" />
              ))}
            </div>
          </div>
        );
      })}
      <h4 className="text-xl my-2">description:</h4>
      <p className="mb-6">{description}</p>
      <div className="flex flex- row my-3">
        {sale ? <CheckIcon width="20px" /> : <XIcon width="20px" />}
        <p className={`${sale ? "" : "line-through"}`}> on sale</p>
      </div>
      <div className="flex flex- row my-3">
        {available ? <CheckIcon width="20px" /> : <XIcon width="20px" />}
        <p className={`${available ? "" : "line-through"}`}> is available</p>
      </div>
    </form>
  );
}
