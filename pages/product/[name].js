import {server} from "../../config/index";
import GridProducts from "../../components/GridProducts";
import SingleProduct from "../../components/SingleProduct";

export default function id({ product, relateds }) {

  return (
    <>
      <div className="bg-secondary text-secondary">
        {/* single product section */}
       <SingleProduct product={product}/>
        {/* related section */}
        <section className="border-t-[1px] border-b-[1px] border-gray-300">
          <h4 className="text-3xl text-primary text-center capitalize py-16">
            Related Products
          </h4>
          <div className="w-[85%] sm:w-[75%] mx-auto">
            <GridProducts products={relateds} limit="10" />
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps(cnx) {
  const name = cnx.params.name;

  const productRes =  await fetch(`${server}/api/product/crud?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const relatedsRes = await fetch(`${server}/api/product/crud?cat=t-shirt`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const product = await productRes.json();
  const relateds = await relatedsRes.json();

  return {
    props: {
      product,
      relateds,
    },
  }
}

export async function getStaticPaths() {

  const allProductRes =  await fetch(`${server}/api/product/crud`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const allProducts = await allProductRes.json();

  const paths = allProducts.map((item)=>({params:{name: item.name}}))

  return { paths, fallback: 'blocking' }
}