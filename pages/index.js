import Center from "../components/Center";
import { server } from "../config";
import Intro from "../components/Intro";
import GridProducts from "../components/GridProducts";
export default function Home({newArivals, sales}) {
  return (
    <>
      <div className="bg-secondary">
        {/* <Hat /> */}
        <Intro />
        <div className="w-[66%] mx-auto my-16">
        <h4 className="capitalize text-3xl text-secondary mb-8 text-center">latest arivals</h4>
        <GridProducts products={newArivals}/>
        </div>
        <Center />
      </div>
    </>
  );
}

export async function getStaticProps() {

  const newArivals = await getProductsFromDB('newArival',true)
  const sales = await getProductsFromDB('sale', true)
  return {
    props: { 
      newArivals,
      sales,
    }, revalidate: 900,//every 15 minutes
  };
}

async function getProductsFromDB(prop, value){
  var filter = new Object();
  filter.prop = value;
  const data = await fetch(`${server}/api/product/crud?${+encodeURIComponent(JSON.stringify(filter))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await data.json();
}