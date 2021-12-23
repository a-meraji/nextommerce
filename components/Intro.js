import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Intro() {
  let moto1, viewHight, topPer, dist;
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 2500,
    });
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 text-secondary curier">
        <div className="w-screen h-[100vh] bg-secondary">
          <div className="relative h-screen left-0 right-0">
            <img
              data-aos="fade"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
              className="w-full h-screen object-contain bg-transparent"
            />
            <p
              data-aos="fade-up"
              className="absolute  left-0 right-0 text-center top-[65%] sm:top-[75%] text-lg"
            >
              _a minimal store.
            </p>
          </div>
        </div>
        <div className="w-screen h-[50vh] bg-secondary">
          <div className="relative h-[50vh] left-0 right-0">
            <p
              data-aos="fade"
              className="absolute  left-0 right-0 text-center top-1/2 text-4xl"
            >
              but diverce.
            </p>
          </div>
        </div>
        <div className="bg-secondary">
          <div className="relative  left-0 right-0 min-h-screen">
          <img
              data-aos="zoom-out-up"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
              className="w-screen sm:w-[30%] object-contain sm:absolute sm:top-1/4 sm:left-0 bg-transparent"
            />
            <img
              data-aos='zoom-out-up'
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F507%2FSurgical_Mask_black.G01__86690.1602592629.png&w=640&q=85"
              className="w-screen sm:w-[30%] object-contain sm:absolute  sm:top-[12%] sm:left-[35%] bg-transparent"
            />
            <img
              data-aos='zoom-out-up'
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F534%2FMen-TShirt-Black-Front__70046.1603748348.png&w=640&q=85"
              className="w-screen sm:w-[30%]  object-contai sm:absolute  sm:top-1/4 sm:right-0  bg-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
}
