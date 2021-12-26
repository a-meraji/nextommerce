import { server } from "../../config";
import { useRouter } from "next/router";
import GridProducts from "../../components/GridProducts"
export default function index({products}) {
    const router = useRouter();
  return <GridProducts products={products} limit={100}/>;
}

export async function getServerSideProps(cnx) {

  const query = cnx.query?.q;
  const data = await fetch(`${server}/api/product/crud?filter=name&value=${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const products = await data.json();

  return {
    props: { products },
  };
}
