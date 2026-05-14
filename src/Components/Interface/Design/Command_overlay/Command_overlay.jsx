import s from "./Command_overlay.module.scss";
import { useEffect, useState } from "react";
import command_overlay_img from "../../../../../public/assets/images/command_overlay/command_overlay.png";
import { motion } from "framer-motion";

export default function Command_overlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 12000); // 12 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={s.commandOverlay}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7 }}
    >
      <img src={command_overlay_img} alt="Command Overlay" />
    </motion.div>
  );
}
