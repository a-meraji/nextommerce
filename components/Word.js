import { motion } from "framer-motion";
function Word({ txt, delay, i }) {
  return (
    <motion.p
      key={i}
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: -50 }}
      viewport={{ once: true }}
      transition={{ ease: "easeOut", duration: 2, delay: delay }}
    >
      {txt}
    </motion.p>
  );
}

export default Word;
