import { motion } from "framer-motion";


const words = ["live","like","it's", "a",`"DRY"`, "code,"];
const SPAN =(txt,i)=>(<motion.span
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: false }}
transition={{ ease: "easeOut", duration: 2, delay:i }}
>
{txt}{" "}
</motion.span>)

export default function Moto1() {
  return (
    <div className=" px-4  py-20 text-primarycont bg-primarycont -mt-2 curier">
      <p className="text-6xl sm:text-7xl">
          {typeof window !=="undefined"? words.map((value, i)=>SPAN(value,i*3/10)):"" }
      </p>
      <p className="text-8xl sm:text-9xl font-extrabold mt-12 overflow-scroll scrollbar-hide whitespace-nowrap">
        <strong>minimal but functional.</strong>
      </p>
    </div>
  );
}
