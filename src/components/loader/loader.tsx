import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Loader = () => {
  const text = "Loading...".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { duration: 1.5 } }}
      exit={{ opacity: 1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        style={{
          width: "60px",
          height: "60px",
          border: "5px solid rgba(255,255,255,0.3)",
          borderTop: "5px solid #F38D07",
          borderRadius: "50%",
          marginBottom: "15px",
        }}
      />

      {/* Harflar bo‘lib chiqadigan animatsiya */}
      <motion.div
        style={{
          display: "flex",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#F38D07",
          letterSpacing: "2px",
        }}
      >
        {text.map((letter, i) => (
          <motion.span
            key={i}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loader;
