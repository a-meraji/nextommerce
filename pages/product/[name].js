import {server} from "../../config/index";
import GridProducts from "../../components/product_components/GridProducts";
import SingleProduct from "../../components/product_components/SingleProduct";
import Link from "next/link";
import { useGlobalContext } from "../../Contexts/globalContext/context";


export default function id({ product, relateds }) {
const {translate: t} = useGlobalContext();
  return (
    <>
      <article className="bg-secondary text-secondary">
        {/* single product section */}
        <section style={{zIndex:2}}>
       <SingleProduct product={product}/>
        </section>
        {/* related section */}
        <section style={{zIndex:0}} className="border-t-[1px] border-gray-300 mt-10">
          <h4 className="text-3xl text-primary text-center capitalize py-16">
            {t('other_products')}
          </h4>
          <div className="w-[85%] sm:w-[75%] mx-auto">
            <GridProducts products={relateds} limit="10" />
          </div>       
        </section>
        <div className="w-full flex justify-center py-10">
          <button className="py-2 px-5 bg-third text-primary rounded-full hover:scale-105 transition-transform">
            <Link href="/search">
              <a>{t('All_Products')}</a>
            </Link>
          </button>
        </div>
      </article>
    </>
  );
}

export async function getServerSideProps(cnx) {
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
    // revalidate: 900, //every 15 minutes
  }
}

// export async function getStaticPaths() {

//   const allProductRes =  await fetch(`${server}/api/product/crud`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const allProducts = await allProductRes.json();

//   const paths = allProducts.map((item)=>({params:{name: item.name}}))

//   return { paths, fallback: 'blocking' }
// }