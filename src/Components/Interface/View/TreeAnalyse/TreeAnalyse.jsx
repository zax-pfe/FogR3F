import { useGameStore } from "../../../../store/store";
import { TestWebGL } from "../../../WebGL/TestWebGL";
import { TreeCanvas } from "../../../WebGL/TreeCanvas/TreeCanvas";
import s from "./TreeAnalyse.module.scss";

const TreeAnalyse = () => {

    const { showAnalyse } = useGameStore();

    const handleHotspotClick = (hotspot) => {
        console.log('🎯 Hotspot cliqué:', hotspot);
        // À la prochaine phase, ce callback ouvrira une popup
    };

    return showAnalyse && (
        <div className={s.treeAnalyse}>
            <TreeCanvas onHotspotClick={handleHotspotClick}
                webglConfig={{
                    RINGS: 50,
                    STRIES: 200,
                }}
            />
        </div>
    );

};

export default TreeAnalyse;