import { useRef, useState } from "react";
import { useGameStore } from "../../../../store/store";
import s from "./TreeAnalyse.module.scss";
import Button from "../../Design/Button/Button";
import HotSpot from "../../Analyse/HotSpot/HotSpot";
import SelectedItems from "../../Analyse/SelectedItems/SelectedItems";
import { c_Arbre_HotSpots } from "../../../../constant/arbre_hotSpots";

const TreeAnalyse = () => {

    const { showAnalyse, setShowAnalyse, selectedItems } = useGameStore();

    const ref__selectedBox = useRef(null);

    const [origin, setOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return showAnalyse && (
        <div className={s.treeAnalyse}>
            <Button className={s.treeAnalyse__closeBtn} onClick={() => setShowAnalyse(false)}>Fermer la machine</Button>
            {/* // Analyse du tronc */}
            {c_Arbre_HotSpots.map((spot, index) => (
                <HotSpot key={index} data={spot} coo={{ x: origin.x + spot.x, y: origin.y + spot.y }} refBox={ref__selectedBox} isSelected={selectedItems.includes(spot)} />
            ))}
            <SelectedItems refBox={ref__selectedBox} />
        </div>
    );

};

export default TreeAnalyse;