import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

function id() {
  const [drop1, setDropDrop1] = useState(false);
  const [drop2, setDropDrop2] = useState(false);

  return (
    <>
      <div className="bg-secondary text-secondary">
        {/* single product section */}
        <section className="grid gridy">
          {/* col 1 */}
          <div className="">
            <div className="relative text-primary">
              <img
                className="h-[70vh] object-contain mx-auto"
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F415%2Fmockup-c2bbbaf4__00019.1601229493.png&w=640&q=85"
              />
              <div className="absolute top-0 left-0">
                <p className="bg-primary bg-opacity-70 pt-3 pb-1 px-6 text-4xl font-semibold capitalize">
                  name
                </p>
                <p className="bg-primary bg-opacity-70 pb-3 px-6 text-xl font-thin w-min capitalize">
                  65$
                </p>
              </div>

              <div className="absolute bottom-3 right-5 rounded-[50%] bg-primary bg-opacity-70 w-12  h-12 p-1 text-xs flex flex-row">
                <ArrowLeftIcon className="pr-0.5 border-r-[0.5px] border-r-gray-500 hover:opacity-50" />
                <ArrowRightIcon className="pl-0.5 hover:opacity-50" />
              </div>
            </div>
            <div className="flex  flex-cols bg-primary overflow-scroll scrollbar-hide">
              <img
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F415%2Fmockup-c2bbbaf4__00019.1601229493.png&w=640&q=85"
                className="w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain"
              />
              <img
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F416%2Fmockup-9b9894f1__67347.1601229494.png&w=640&q=85"
                className="w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain"
              />
              <img
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F417%2Fmockup-2b4bcb4e__84929.1601229495.png&w=640&q=85"
                className="w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain"
              />
              <img
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F415%2Fmockup-c2bbbaf4__00019.1601229493.png&w=640&q=85"
                className="w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain"
              />
              <img
                src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F416%2Fmockup-9b9894f1__67347.1601229494.png&w=640&q=85"
                className="w-[33%] max-w-[200px] m-[1px] bg-secondary object-contain"
              />
            </div>
          </div>
          {/* cols 2 */}
          <div className="p-11">
            <div>
              <p className="mb-4">
                The Next.js beanie has arrived! This embroidered beauty has a
                snug fit that ensures you're going to feel cozy and warm
                whatever you're doing. <br/>
                • 60% cotton, 40% acrylic <br/>
                • Breathable cotton blend <br/>
                • Form-fitting shape <br/>
                • One size fits most
              </p>
              <button className="bg-primarycont text-primarycont w-full text-lg curier  py-5 mx-auto my-8 hover:opacity-70">
                ADD TO CART
              </button>
              {/* dropdowns */}
              <div>
                <button
                  className="m-1 flex text-xl"
                  onClick={() => setDropDrop1(!drop1)}
                >
                  <ChevronRightIcon
                    width="20px"
                    className={`${drop1 ? "rotate-90" : "rotate-0"} chevron`}
                  />{" "}
                  <p className="ml-1">Care</p>
                </button>
                <p
                  className={`${
                    drop1 ? "h-[105%] opacity-100" : "h-0 opacity-0"
                  } ml-5 dropdown p-2 shadow bg-base-100 rounded-box w-52`}
                >
                  This is a limited edition production run. Printing starts when
                  the drop ends.
                </p>
              </div>
              <div className="border-t-[0.5px] border-t-gray-300 py-3"></div>
              {/* dropdown 2 */}
              <div>
                <button
                  className="m-1 flex text-xl"
                  onClick={() => setDropDrop2(!drop2)}
                >
                  <ChevronRightIcon
                    width="20px"
                    className={`${drop2 ? "rotate-90" : "rotate-0"} chevron`}
                  />
                  <p className="ml-1">Details</p>
                </button>
                <p
                  className={`${
                    drop2 ? "h-[105%] opacity-100" : "h-0 opacity-0"
                  } ml-5 dropdown p-2 shadow bg-base-100 rounded-box w-52`}
                >
                  This is a limited edition production run. Printing starts when
                  the drop ends. Reminder: Bad Boys For Life.
                </p>
              </div>
              <div className="border-t-[0.5px] border-t-gray-300 py-3"></div>
            </div>
          </div>
        </section>
        {/* related section */}
        <section className="border-t-[1px] border-b-[1px] border-gray-300">
          <h4 className="text-2xl curier text-primary text-center capitalize">
            Related Products
          </h4>
        </section>
        <style svg>{`
        .gridy{
          
        }
        @media screen and (min-width: 640px) {
          .gridy{
            grid-template-columns: 65vw 35vw;
          }
        }
        .chevron{
          -webkit-transition: -webkit-transform .3s ease-in-out;
          -ms-transition: -ms-transform .3s ease-in-out;
          transition: transform .3s ease-in-out;  
        }
        .dropdown{
          transition: all .3s ease-in-out;  
        }
        `}</style>
      </div>
    </>
  );
}

export default id;
