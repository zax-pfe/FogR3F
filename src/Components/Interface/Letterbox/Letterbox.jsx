import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";
import s from "./Letterbox.module.scss";
import { AnimatePresence, motion } from "motion/react";

const LetterBoxVariants = {
    hiddenTop: { y: "-100%", transition: { duration: 1 } },
    hiddenBottom: { y: "100%", transition: { duration: 1 } },
    visible: { y: "0%", transition: { duration: 1 } },
}

const Letterbox = ({ show }) => {

    return (
        <AnimatePresence>
            {show && (
                <div className={s.letterbox} exit={{ opacity: 0, transition: { duration: 1 } }}>
                    <motion.div key="top" className={s.top} initial="hiddenTop" animate="visible" exit="hiddenTop" variants={LetterBoxVariants}>
                    </motion.div>
                    <motion.div key="bottom" className={s.bottom} initial="hiddenBottom" animate="visible" exit="hiddenBottom" variants={LetterBoxVariants}>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Letterbox;