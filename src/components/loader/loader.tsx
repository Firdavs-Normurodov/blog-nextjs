import { motion } from "framer-motion";

const Loader = () => {
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
        color: "#F38D07",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid rgba(255,255,255,0.3)",
          borderTop: "4px solid #F38D07",
          borderRadius: "50%",
        }}
      />
    </motion.div>
  );
};

export default Loader;
