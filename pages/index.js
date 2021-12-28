import Center from "../components/Center";
import { server } from "../config";
import Intro from "../components/Intro";
import { motion } from "framer-motion";
import GridProducts from "../components/GridProducts";
import Moto1 from "../components/Moto1";
export default function Home({ newArivals, sales }) {
  return (
    <>
      <div className="bg-secondary">
        <Intro />
        {newArivals.length > 0 ? (
          <div className="w-[66%] mx-auto mt-36 mb-20">
            <motion.h4
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: -40, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="capitalize text-3xl text-secondary text-center"
            >
              latest arivals
            </motion.h4>
            <GridProducts products={newArivals} limit={6} />
          </div>
        ) : null}
        <Moto1 />
        {sales.length > 0 ? (
          <div className="w-[66%] mx-auto mt-36 mb-10">
            <motion.h4
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: -40, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="capitalize text-3xl text-secondary text-center"
            >
              on sales
            </motion.h4>
            <GridProducts products={sales} limit={6} />
          </div>
        ) : null}
        <div className="w-full flex justify-center pb-24">
          <button className="py-2 px-5 bg-hover text-secondary rounded-full text-xl hover:bg-secondarycont hover:text-secondarycont">View Products</button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const newArivals = await getProductsFromDB("newArival", true);
  const sales = await getProductsFromDB("sale", true);
  return {
    props: {
      newArivals,
      sales,
    },
    revalidate: 900, //every 15 minutes
  };
}

async function getProductsFromDB(prop, value) {
  const data = await fetch(
    `${server}/api/product/crud?filter=${prop}&value=${value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await data.json();
}
