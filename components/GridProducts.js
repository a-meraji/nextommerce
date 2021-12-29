import { motion } from "framer-motion";
export default function GridProducts({ products, limit }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-28">
      {products?.map((product, i) => {
        if (i >= limit) return;
        return (
          <motion.div
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
            key={i}
            className={`group relative w-full bg-third rounded-sm transition-colors`}
          >
            <img
              className="w-full object-contain"
              src={product.store[0]["imgUrls"][0]}
            />
            <div className="group-hover:bg-hover absolute bottom-0 right-0 left-0  text-secondary rounded-sm">
              <div className="flex justify-between px-2 text-lg">
                <p className="max-w-[90%]">{product.name.replace(/_/g, " ")}</p>
                <p>{product.price}$</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
