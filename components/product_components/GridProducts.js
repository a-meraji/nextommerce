import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { shimmer, toBase64 } from "../../shared/utils/imgPlaceholder";

export default function GridProducts({ products, limit }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-28">
      {products?.map((product, i) => {
        if (i >= limit) return;
        return (
          <Link key={i}  href={`/product/${product.name}`} passHref>
            <motion.a
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: -100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              transition={{
                opacity: { ease: "easeOut", duration: 1 },
                y: { ease: "easeOut", duration: 1 },
                scale: { ease: "easeIn", duration: 0.3 },
              }}
              className={`group  bg-third  rounded-sm transition-colors`}
              style={{boxShadow: "0px 0px 10px -6px rgba(0, 0, 0, 1)"}}
            >
              <Image
                alt={product.name}
                src={product.store[0]["imgUrls"][0]}
                width={300}
                height={300}
                className="object-contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
              />

              <div className="text-secondary group-hover:bg-primarycont group-hover:text-secondarycont absolute bottom-0 right-0 left-0 rounded-sm">
                <div className="flex justify-between px-2 text-lg">
                  <p className="-ml-1 whitespace-nowrap  overflow-hidden">
                    {product.name.replace(/_/g, " ")}
                  </p>
                  <p className="-mr-1 ml-1">{product.price}$</p>
                </div>
              </div>
            </motion.a>
          </Link>
        );
      })}
    </div>
  );
}
