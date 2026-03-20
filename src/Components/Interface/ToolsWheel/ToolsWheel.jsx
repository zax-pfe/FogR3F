import { use, useEffect, useMemo, useRef, useState } from "react";
import s from "./ToolsWheel.module.scss";

const ToolsWheel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const toolsRadius = 132;
    const center = 82;
    const [currentTool, setCurrentTool] = useState(0);
    const [, forceUpdate] = useState(0);
    const isArrived = useRef(0);
    const animationRef = useRef();

    const generateCirclePoints = (number, baseAngle = 0) => {

        let table = [];
        let a = baseAngle;

        let step = (Math.PI * 2) / (number + 2);

        for (let i = 0; i < number; i++) {

            if (i === 4) {
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
        { name: "Tool 0", icon: "blue", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 1", icon: "red", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 2", icon: "green", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 3", icon: "orange", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 4", icon: "purple", x: 0, y: 0, dx: 0, dy: 0 },
        { name: "Tool 5", icon: "yellow", x: 0, y: 0, dx: 0, dy: 0 }
    ]);

    const changeTool = (index) => {
        console.log("Changing tool to index:", index);
        isArrived.current = 0;
        setCurrentTool(index);
        // isArrived.current = tools.current.length; // Simulate instant arrival for testing

        for (let i = 0; i < tools.current.length; i++) {
            const idx = (i - index) < 0 ? tools.current.length + (i - index) : (i - index);
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
            
            const dx = tool.x + lx * 0.2;
            const dy = tool.y + ly * 0.2;

            const angle = Math.atan2(dy - center, dx - center);

            // tool.x = center + Math.cos(angle) * toolsRadius;
            // tool.y = center + Math.sin(angle) * toolsRadius;

            tool.x = dx;
            tool.y = dy;

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
        <div className={s.toolsWheel}>
            {/* ToolsWheel content */}
            <button className={`${s.btn} ${isOpen ? s.open : ""}`} onClick={() => setIsOpen(!isOpen)}>
                {/* <span className="sr-only">Open tool</span> */}
                <span className="sr-only">{isOpen ? "Close" : "Open"} tool</span>
            </button>
            {
                isOpen && tools.current.map((tool, index) => (
                    <div
                        key={index}
                        className={s.tool}
                        onClick={() => changeTool(index)}
                        style={{
                            backgroundColor: tool.icon,
                            right: `${tool.x}px`,
                            bottom: `${tool.y}px`
                        }}
                    >
                        <span>{tool.name}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default ToolsWheel;