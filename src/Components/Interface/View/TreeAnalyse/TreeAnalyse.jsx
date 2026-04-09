import { useGameStore } from "../../../../store/store";
import s from "./TreeAnalyse.module.scss";

const TreeAnalyse = () => {

    const { showAnalyse } = useGameStore();

    return showAnalyse && (
        <div className={s.treeAnalyse}>
            {/* // Analyse du tronc */}
        </div>
    );

};

export default TreeAnalyse;