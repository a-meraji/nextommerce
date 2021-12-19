import { useEffect, useState } from "react";
import { XIcon, CheckIcon, PencilAltIcon, TrashIcon , MenuIcon} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import AcceptModal from "./AcceptModal";
const elm = (
  <div className={`min-w-[115px] border-b-[1px] flex flex-row justify-between -mb-3 pb-0.5`}>
    <p className="pl-2">size</p>
    <p className="pr-2">amount</p>
  </div>
);

export default function AdminProduts({ product, index, setProducts, products }) {
  const { name, price, store, description, sale, available, _id } = product;
const router = useRouter();
// confirm delete State
const [confDelete, setConfDelete] = useState(false);
const [showModal, setShowModal] = useState(false);
useEffect(async () => {
  if (confDelete) {
    const res = await fetch("/api/product/crud", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:_id}),
    });
    const data = await res.json();
    if (data.message=="deleted") {
      let newPros = products;
      newPros.splice(index,1);
      setProducts(newPros);      
      alert("product deleted successfuly");
      window.location.reload(false);
     } else {
      alert("something went wrong try again later");
    }
    setConfDelete(false);
  }
}, [confDelete])
  //for a smart responsive
  const [innerW, setInnerW] = useState(typeof window!=='undefined'?window.innerWidth:0);
  useEffect(() => {
    if(typeof window === "undefined")return
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });
  const updateWidth = () => {
    setInnerW(window.innerWidth);
  };

  return (
    <div className="border-[1px] relative rounded-3xl my-6 mx-8 py-9 px-10 text-white">
      <AcceptModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSave={setConfDelete}
        />
      <div className="absolute right-10 flex flex-row">
        <TrashIcon width="20px" className="mr-4 cursor-pointer" onClick={()=>setShowModal(true)}/>
        <PencilAltIcon width="20px" className="cursor-pointer" onClick={()=>router.push(`/admin/product/edit/${_id}`)}/>

      </div>
      <p className="text-lg mb-4 w-max pb-1 border-gray-300 border-b-[2px]">
        <strong>name:</strong> {name.replace("_", " ")}
      </p>
      <p>
        <strong>price: </strong> <span className="w-max bg-gray-300 bg-opacity-20 rounded-lg text-gray-200 px-2 pb-0.5">{price}$</span>
      </p>
      {store.map((miniStore, i) => {
        const { color, imgUrls, sizeAmnt } = miniStore;
        return (
          <div key={i} className="border-t-[1px]  mt-10 mb-14 pt-10">
            <p>
              <strong>color: {' '}</strong>
              <span className="w-max bg-gray-300 bg-opacity-20 rounded-lg text-gray-200 px-2 pb-0.5">
                {color}
              </span>
            </p>

            {/* when indow resize a column with amount and size title will add or remove */}
            {typeof window !== 'undefined' ?
             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 justify-items-center max-w-[550px] mt-4 mb-6">
             {window.innerWidth >= 768 && sizeAmnt.length > 2 ? elm : ""}
             {window.innerWidth >= 768 ? elm : elm}
             {window.innerWidth >= 648 && sizeAmnt.length > 1 ? elm : ""}
           </div>:''}
           

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 justify-items-center max-w-[550px] mt-4 mb-6">
              {sizeAmnt.map((val, i) => {
                const col = i % 2 === 0 ? 2 : 1;
                return (
                  <div
                    className={`min-w-[110px] rounded-full flex flex-row justify-between bg-gray-300 bg-opacity-20 text-gray-200 pl-4 pr-6 pb-0.5`}
                  >
                    <div>
                      <p
                      >{val.size}</p>
                    </div>
                    <div>
                      <p                     
                      >{val.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 justify-items-center max-w-[550px]">
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
    </div>
  );
}
