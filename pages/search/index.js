//hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
// components
import GridProducts from "../../components/product_components/GridProducts";
import SideCategories from "../../components/category_components/SideCategories";
import SortItems from "../../components/category_components/SortItems";
// values, icons, etc...
import { server } from "../../config";

export default function index({ products, allCategories }) {
  const router = useRouter();
  const { sorter, sort } = useGlobalContext();
  // to update page when search query change
  const [currentQ, setCurrentQ] = useState(router.query.q);
  // contains products to show
  const [proSt, setProSt] = useState([...products]);

  // trigger when search query change
  useEffect(() => {
    if (currentQ !== router.query.q) {
      setCurrentQ(router.query.q);
      const resArr = sorter(products);
      setProSt([...resArr]);
    }
  }, [router.query.q]);

  // trigger when sort view change
  useEffect(() => {
    const resArr = sorter(products);
    setProSt([...resArr]);
  }, [sort]);

  return (
    <>
      {/* as a cover behind navbar */}
      <div className="fixed w-full py-10 top-0 bg-secondary glob-trans  z-30"></div>
      {/* search page */}
      <div className="bg-secondary text-secondary glob-trans">
        <div className="flex flex-row pt-36 sm:pt-5 relative">
          {/* selecting categories */}
          <SideCategories categories={allCategories} />
          {/* showing result for search */}
          <div className="w-[85%] sm:w-[66%] mx-auto sm:-mt-5">
            <h4 className="mb-4">
              {products?.length > 0
                ? null
                : "no result to show"}
            </h4>
            <GridProducts
              key={proSt[0] != undefined ? proSt[0]["name"] : "nothing"}
              products={proSt}
              limit={100}
            />
          </div>
          {/* set sort view of search results */}
          <SortItems />
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

  const rewCats = await fetch(`${server}/api/product/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await data.json();
  const allCategories = await rewCats.json();

  return {
    props: { products, allCategories },
  };
}
