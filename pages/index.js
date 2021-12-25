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
        {/* <Hat /> */}
        <Intro />
        <div className="w-[66%] mx-auto my-36">
          <motion.h4
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: -40, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="capitalize text-3xl text-secondary mb-10 text-center"
          >
            latest arivals
          </motion.h4>
          <GridProducts products={newArivals} limit={6} />
        </div>
        <Moto1 />
        <Center />
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
  var filter = new Object();
  filter.prop = value;
  const data = await fetch(
    `${server}/api/product/crud?${+encodeURIComponent(JSON.stringify(filter))}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await data.json();
}
