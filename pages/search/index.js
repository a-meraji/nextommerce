import { server } from "../../config";
import { useRouter } from "next/router";
import GridProducts from "../../components/GridProducts";
import { FilterIcon, TemplateIcon } from "@heroicons/react/outline";
import SideCategories from "../../components/SideCategories";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
// import { SALE, LATEST, PRICE_INC, PRICE_DEC } from "../../Contexts/redux/types";
export const SALE = "SALE";
export const LATEST = "LATEST";
export const PRICE_INC = "PRICE_INC";
export const PRICE_DEC = "PRICE_DEC";
export default function index({ products, categories }) {
  const router = useRouter();
  const { filter, setFilter, sorter } = useGlobalContext();
  const [proSt, setProSt] = useState([...products]);
  useEffect(() => {
    setProSt([...products]);
  }, [products]);
  useEffect(() => {
    const resObj = sorter(products);
    if (resObj.message === "ok") {
      const { sortedProducts } = resObj;
      setProSt([...sortedProducts]);
    }
  }, [filter]);

  return (
    <>
      <div className="bg-secondary text-secondary glob-trans">
        <div className="flex flex-row pt-10">
          <div className="hidden sm:block w-[17%] pl-3">
            <h4 className="text-md capitalize mb-0.5 text-primary">
              Categories
            </h4>
            <SideCategories categories={categories} />
          </div>
          <div className="w-[60%] sm:w-[56%] mx-auto">
            <h4 className="mb-4">
              {products?.length > 0
                ? `Found ${products.length} items to show`
                : "no result to show"}
            </h4>
            <GridProducts
              key={proSt[0] !== "undefined" ? ["name"] : "clothes"}
              products={proSt}
              limit={100}
            />
            ;
          </div>
          <div className="hidden sm:block w-[17%] pr-3">
            <h4 className="text-md capitalize mb-0.5 text-primary">
              Categories
            </h4>
            <div className="flex flex-col gap-y-2 mt-3 ml-0.5">
              <button
                className={`hover:text-primary capitalize ${
                  filter === SALE ? "text-accent underline" : ""
                }`}
                onClick={() => setFilter(SALE)}
              >
                on sales
              </button>
              <button
                className={`hover:text-primary capitalize ${
                  filter === LATEST ? "text-accent underline" : ""
                }`}
                onClick={() => setFilter(LATEST)}
              >
                latest arivals
              </button>
              <button
                className={`hover:text-primary capitalize ${
                  filter === PRICE_INC ? "text-accent underline" : ""
                }`}
                onClick={() => setFilter(PRICE_INC)}
              >
                price: low to high
              </button>
              <button
                className={`hover:text-primary capitalize ${
                  filter === PRICE_DEC ? "text-accent underline" : ""
                }`}
                onClick={() => setFilter(PRICE_DEC)}
              >
                price: high to low
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(cnx) {
  const query = cnx.query?.q;
  const data = await fetch(
    `${server}/api/product/crud?filter=name&value=${query}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  // const cat = cnx.query?.cat;
  const rewCats = await fetch(`${server}/api/product/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await data.json();
  const categories = await rewCats.json();

  return {
    props: { products, categories },
  };
}
