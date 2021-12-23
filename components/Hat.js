import { useEffect } from "react";

function Hat() {
  var moto, motoDiv;
  useEffect(() => {
    if (typeof window !== "undefined") {
      moto = document.getElementById("moto");
      motoDiv = document.getElementById("moto-div");
      motoAdjuster();
      window.addEventListener("scroll", motoAnim);

      window.addEventListener("resize", motoAdjuster);
    }
  }, []);
  function motoAdjuster() {
    let wP = 0;
    if (typeof document !== "undefined") {
      wP = window.innerWidth;
      wP -= 150;
      if (wP > 896) {
        wP = 866;
      }
      motoDiv.style.height = `${wP}px`;
    }
  }
  let lastScroll = 0;
  //   let opacit = 0;
  function motoAnim() {
    //   moto animations
    let y = window.scrollY;
    if (y < 150 && y > 40 && y > lastScroll) {
      //DownSide
      moto.classList.remove("opacity-0");
      moto.classList.remove("moto-anim0");
      moto.classList.add("moto-anim1");
    } else if (y < 150 && y < lastScroll) {
      //Upside
      moto.classList.remove("moto-anim1");
      moto.classList.add("moto-anim0");
    }
    // moto position
    // if(y>)
    if (y > 500) {
      motoDiv.classList.remove("fixed");
    } else {
      motoDiv.classList.add("fixed");
    }
    lastScroll = y;
  }
  return (
    <div className=" bg-secondary -mt-20  w-full">
      <img
        src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
        className="hat absolute bg-transparent z-20  w-[100%] max-w-4xl block left-0 right-0 mx-auto"
      />
      <div
        id="moto-div"
        className="text-primary fixed left-0 right-0 text-center flex justify-center"
      >
        <p
          id="moto"
          className="opacity-0 capitalize text-xl sm:text-4xl self-center"
        >
          just a minimal store
        </p>
      </div>
    </div>
  );
}

export default Hat;
