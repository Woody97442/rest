import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative text-white py-40 px-6 text-center">
      {/* Image de fond */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center z-0" />

      {/* Overlay en dégradé semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 z-10" />

      {/* Contenu au-dessus */}
      <div className="relative z-20">
        <motion.h1
          className="text-4xl md:text-6xl font-bold font-sans tracking-tight mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Découvrez des offres exceptionnelles
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}>
          Profitez des meilleurs prix sur des milliers de produits. Livraison
          rapide, retours faciles et service client de qualité.
        </motion.p>
      </div>
    </section>
  );
};
