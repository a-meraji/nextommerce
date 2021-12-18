import { useState, useEffect } from "react";
import AdminProduts from "../../../components/admin/AdminProduts";

function index({ allProducts, allCategories }) {
  //setting categorised products

  const [categorised, setCategorised] = useState({});
  const [category, setCategory] = useState(`${allCategories[0]}`);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let tempPros = categorised;
    allProducts.forEach((product) => {
      const cat = product.category;
      if (!tempPros[`${cat}`]) tempPros[`${cat}`] = [];
      tempPros[`${cat}`].push(product);
    });
    setCategorised(tempPros);
    setReady(true);
  }, []);

  return (
    <div className="bg-black py-1 text-gray-100">
      <div className="mx-10 my-8">
        <label className="text-xl">category: </label>
        <select
          className="bg-gray-600 opacity-60 rounded-full px-2"
          name="categories"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {ready
        ? categorised[category].map((product, i) => {
            const { name, price, store, description, sale, available } =
              product;
            return (
              <div className="pb-6" key={i}>
                <AdminProduts
                  product={product}
                />
              </div>
            );
          })
        : "loading..."}
    </div>
  );
}

import { server } from "../../../config";
export async function getStaticProps(context) {
  const productsData = await fetch(`${server}/api/product/crud`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const catsData = await fetch(`${server}/api/product/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const allProducts = await productsData.json();
  const allCategories = await catsData.json();
  return {
    props: { allProducts, allCategories },
  };
}

export default index;
