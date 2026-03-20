import { useEffect, useMemo, useRef, useState } from "react";
import s from "./ToolsWheel.module.scss";
import { AnimatePresence, motion, stagger } from "motion/react";

const ToolVariants = {
    initial: { opacity: 0, scale: 0.1, x: '50%', y: '50%', right: '82px', bottom: '82px' },
    exit: { opacity: 0, scale: 0.1, x: '50%', y: '50%', right: '82px', bottom: '82px', transition: { duration: 0.2 } },
};


const ToolsWheel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const toolsRadius = 140;
    const center = 82;
    const [currentTool, setCurrentTool] = useState(0);
    const [, forceUpdate] = useState(0);
    const isArrived = useRef(0);
    const animationRef = useRef();

    const generateCirclePoints = (number, baseAngle = 0) => {

        let table = [];
        let a = (Math.PI * 2) / (number + 2);

        let step = (Math.PI * 2) / (number + 2);

        for (let i = 0; i < number; i++) {

            if (i === 3) {
                a += step * 2;
            }

            const dx = center + Math.cos(a) * toolsRadius;
            const dy = center + Math.sin(a) * toolsRadius;

            let slot = {
                x: dx,
                y: dy
            }
            table.push(slot);

            a += step;
        }

        console.log(table);
        return table;
    }

    const slot = useMemo(() => generateCirclePoints(6), []);

    const tools = useRef([
        { name: "Tool 0", icon: "blue", selectable: "true", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 1", icon: "red", selectable: "false", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 2", icon: "green", selectable: "false", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 3", icon: "orange", selectable: "false", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 4", icon: "purple", selectable: "false", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 5", icon: "yellow", selectable: "false", x: 0, y: 0, dx: 0, dy: 0 }
    ]);

    const changeTool = (index) => {
        console.log("Changing tool to index:", index);
        isArrived.current = 0;
        setCurrentTool(index);
        // isArrived.current = tools.current.length; // Simulate instant arrival for testing

        for (let i = 0; i < tools.current.length; i++) {
            const idx = (i - index + tools.current.length) % tools.current.length;
            if (i === index) {
                console.log(`Tool ${i} will move to slot ${idx} (active)`);
            }
            tools.current[i].dx = slot[idx].x;
            tools.current[i].dy = slot[idx].y;
        }

        animationRef.current = requestAnimationFrame(mouveTools);
    };

    const mouveTools = () => {
        for (let i = 0; i < tools.current.length; i++) {
            const tool = tools.current[i];

            // tool.x += (tool.dx - tool.x) * 0.2;
            // tool.y += (tool.dy - tool.y) * 0.2;

            const lx = tool.dx - tool.x;
            const ly = tool.dy - tool.y;
            const distance = Math.sqrt(lx * lx + ly * ly);

            // Angle courant et angle cible
            const currentAngle = Math.atan2(tool.y - center, tool.x - center);
            const targetAngle = Math.atan2(tool.dy - center, tool.dx - center);

            // Interpoler l'angle (avec gestion de la direction la plus courte)
            let angleDiff = targetAngle - currentAngle;
            if (angleDiff > Math.PI) angleDiff -= Math.PI * 2; // Si la différence d'angle est supérieure à 180°, on prend le chemin inverse
            if (angleDiff < -Math.PI) angleDiff += Math.PI * 2; // Si la différence d'angle est inférieure à -180°, on prend le chemin inverse

            const interpolatedAngle = currentAngle + angleDiff * 0.3;

            tool.x = center + Math.cos(interpolatedAngle) * toolsRadius;
            tool.y = center + Math.sin(interpolatedAngle) * toolsRadius;


            // tool.x = dx;
            // tool.y = dy;

            if (distance < 0.5) {
                tool.x = tool.dx;
                tool.y = tool.dy;
                isArrived.current += 1;
            }
        }

        forceUpdate(n => n + 1);

        if (isArrived.current >= tools.current.length) {
            setIsTransitioning(false);
            cancelAnimationFrame(animationRef.current);
        } else {
            animationRef.current = requestAnimationFrame(mouveTools);
        }
    }

    const handleScroll = (e) => {

        if (!isOpen || isTransitioning) return;

        const delta = e.deltaY;
        let newTool = currentTool;

        if (delta > 0) {
            console.log("Scroll down");
            newTool = (currentTool - 1) < 0 ? tools.current.length - 1 : currentTool - 1;
            console.log("New tool index:", newTool);
            changeTool(newTool);
        } else if (delta < 0) {
            console.log("Scroll up");
            newTool = (currentTool + 1) >= tools.current.length ? 0 : currentTool + 1;
            console.log("New tool index:", newTool);
            changeTool(newTool);
        }

        setIsTransitioning(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === "e") {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", handleScroll);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, isTransitioning, currentTool]);

    useEffect(() => {
        for (let i = 0; i < tools.current.length; i++) {
            tools.current[i].x = slot[i].x;
            tools.current[i].y = slot[i].y;
        }
    }, []);

    return (
        <div className={s.toolsWheel} >
            {/* ToolsWheel content */}
            <button className={`${s.btn} ${isOpen ? s.open : ""}`} onClick={() => setIsOpen(!isOpen)}>
                {/* <span className="sr-only">Open tool</span> */}
                <span className="sr-only" > {isOpen ? "Close" : "Open"} tool</span>
            </button >
            <AnimatePresence>
                {
                    isOpen && tools.current.map((tool, index) => (
                        <motion.div
                            key={index}
                            className={`${s.tool} ${index === currentTool ? s.active : ""}`}
                            onClick={() => changeTool(index)}
                            style={{
                                backgroundColor: tool.icon,
                                right: `${tool.x}px`,
                                bottom: `${tool.y}px`
                            }}
                            initial="initial"
                            animate={{ opacity: 1, scale: 1, x: '50%', y: '50%', right: `${tool.x}px`, bottom: `${tool.y}px`, transition: { duration: 0.2 } }}
                            exit="exit"
                            variants={ToolVariants}
                        >
                            <span>{tool.name}</span>
                            {
                                tool.selectable === "false" && <span className={s.lock}>X</span>
                            }
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div >
    );
};

export default ToolsWheel;