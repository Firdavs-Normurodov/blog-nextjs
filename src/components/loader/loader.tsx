import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "Loading...".split(""); // Harflarni alohida animatsiya qilish uchun

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return oldProgress + 8;
      });
    }, 100);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { duration: 0.5, delay: 1.5 } }}
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
      {/* **Harflar bo‘lib chiqadigan animatsiya** */}
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

      {/* **Loading progress bar** */}
      <div
        style={{
          width: `${text.length * 14}px`, // **Matn uzunligiga mos**
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #F38D07, #ffcc00)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
