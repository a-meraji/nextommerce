import { server } from "../../../config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminProduts from "../../../components/admin/AdminProduts";
import authHandler from "../../../shared/utils/authHandler";

export default function cats({ allProducts, allCategories, query }) {
  const [products, setProducts] = useState(allProducts);
  //pushing query whene category change
  useEffect(async () => {
    setProducts(allProducts);
  }, [query]);

  const router = useRouter();
  const queryHandler = (cat) => {
    const params = new URLSearchParams();
    params.append("cat", cat);
    router.push({ search: params.toString() });
  };

  return (
    <div className="bg-secondary py-1 text-secondary">
      <div className="mx-10 my-8">
        <label className="text-xl">category: </label>
        <select
          className="bg-third rounded-full px-2"
          name="categories"
          onChange={(e) => {
            queryHandler(e.target.value);
          }}
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat} selected={cat === query ? true : false}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {products.map((product, i) => {
        return (
          <div className="pb-6" key={i}>
            <AdminProduts
              product={product}
              index={i}
              setProducts={setProducts}
              products={products}
            />
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { authorized } = await authHandler(
    context.req,
    context.res
  );

  if (authorized) {
    const query = context.params.cat;
    const productsData = await fetch(
      `${server}/api/product/crud?cat=${query}`,
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

    const allProducts = await productsData.json();
    const allCategories = await catsData.json();

    return {
      props: { allProducts, allCategories, query },
    };
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
