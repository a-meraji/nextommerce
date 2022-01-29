import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import {shimmer, toBase64} from "../../shared/utils/imgPlaceholder";
import { useEffect } from "react";
import Link from "next/link";
import { bannerImages } from "../../shared/json";
import { useGlobalContext } from "../../Contexts/globalContext/context";

export default function Intro() {
  const {translate: t} = useGlobalContext();

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 2500,
    });
  }, []);

  return (
    <div className="text-secondary curier">
      <div className="h-[100vh]">
        <div className="relative h-screen -top-10 left-0 right-0">
          <div className="relative w-screen h-screen">
            <Image
              data-aos="fade"
              layout="fill"
              priority
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
              className="object-contain bg-transparent"
            />
          </div>
          <p
            data-aos="fade-up"
            className="absolute left-0 right-0 text-center top-[65%] sm:top-[75%] text-lg"
          >
            {t('moto1')}
          </p>
        </div>
      </div>
      <div className="h-[50vh]">
        <div className="relative h-[50vh] left-0 right-0">
          <p
            data-aos="fade"
            className="absolute  left-0 right-0 text-center top-1/2 text-4xl"
          >
            {t("moto2")}
          </p>
        </div>
      </div>
      {/* banner */}

      <div className="bg-third animation w-full whitespace-nowrap overflow-scroll scrollbar-hide">
        {bannerImages.map((item, i) => (
          <Link key={i} href={`/product/${item.name.replace(/\s/g, "_")}`}>
          <a>
            <div  className={`${i===0?"first":null}`}>
            <Image width={300} height={300} src={item.url} alt={item.name} className="object-contain" 
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
            />
            </div>
          </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .animation div {
          width: 300px;
          display: inline-block;
          white-space: nowrap;
        }
        /*keyframe animations*/
        .first {
          -webkit-animation: bannermove 25s linear infinite;
          -moz-animation: bannermove 25s linear infinite;
          -ms-animation: bannermove 25s linear infinite;
          animation: bannermove 25s linear infinite;
        }
        @keyframes "bannermove" {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: -2100px;
          }
        }

        @-moz-keyframes bannermove {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: -2100px;
          }
        }

        @-webkit-keyframes "bannermove" {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: -2100px;
          }
        }

        @-ms-keyframes "bannermove" {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: -2100px;
          }
        }
      `}</style>
    </div>
  );
}