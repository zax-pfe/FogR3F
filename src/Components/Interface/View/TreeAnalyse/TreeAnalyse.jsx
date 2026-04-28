import { useRef, useState } from "react";
import { useGameStore } from "../../../../store/store";
import s from "./TreeAnalyse.module.scss";
import Button from "../../Design/Button/Button";
import HotSpot from "../../Analyse/HotSpot/HotSpot";
import SelectedItems from "../../Analyse/SelectedItems/SelectedItems";

const HotSpots = [
    { x: -450, y: 300 },
    { x: -200, y: 100 },
    { x: 100, y: 200 },
    { x: 300, y: -100 },
    { x: 200, y: -300 },
    { x: -100, y: -200 },
]

const TreeAnalyse = () => {

    const { showAnalyse, setShowAnalyse } = useGameStore();

    const [selectedItems, setSelectedItems] = useState([]);

    const ref__selectedBox = useRef(null);

    const [origin, setOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return showAnalyse && (
        <div className={s.treeAnalyse}>
            <Button className={s.treeAnalyse__closeBtn} onClick={() => setShowAnalyse(false)}>Fermer la machine</Button>
            {/* // Analyse du tronc */}
            {HotSpots.map((spot, index) => (
                <HotSpot key={index} data={spot} coo={{ x: origin.x + spot.x, y: origin.y + spot.y }} refBox={ref__selectedBox} setSelectedItems={setSelectedItems} isSelected={selectedItems.includes(spot)} />
            ))}
            <SelectedItems refBox={ref__selectedBox} selectedItems={selectedItems} />
        </div>
    );

};

export default TreeAnalyse;