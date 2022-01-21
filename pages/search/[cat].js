//hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Contexts/globalContext/context";
// components
import GridProducts from "../../components/GridProducts";
import SideCategories from "../../components/SideCategories";
import SortItems from "../../components/SortItems";
// values, icons, etc...
import { server } from "../../config";
import { FilterIcon, TemplateIcon } from "@heroicons/react/outline";

export default function cats({ products, allCategories, category }) {
  const router = useRouter();
  const { sorter, sort } = useGlobalContext();
  // to update when category change
  const [currentCat, setCurrentCat] = useState(category);
  // contains products to show
  const [proSt, setProSt] = useState([...products]);

  //trigger when cat param change
  useEffect(() => {
    if (currentCat !== router.query.cat) {
      setCurrentCat(router.query.cat);
      const resArr = sorter(products);
      setProSt([...resArr]);
    }
  }, [router.query.cat]);

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
                : "No result"}
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

export async function getStaticProps(cnx) {
  const category = cnx.params.cat;
  const productsData = await fetch(
    `${server}/api/product/crud?cat=${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const catsData = await fetch(`${server}/api/product/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await productsData.json();
  const allCategories = await catsData.json();

  return {
    props: {
      products,
      allCategories,
      category,
    },
    revalidate: 900, //every 15 minutes
  };
}
export async function getStaticPaths() {
  const catsData = await fetch(`${server}/api/product/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const cats = await catsData.json();

  // Get the paths we want to pre-render based on posts
  const paths = cats.map((cat) => ({
    params: { cat },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
