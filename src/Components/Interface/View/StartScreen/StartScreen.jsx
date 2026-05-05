import s from "./StartScreen.module.scss";
import { useGameStore } from "../../../../store/store";

const StartScreen = () => {
        const { setCurrentScreen } = useGameStore();

    return (
        <>
            <div className={s.screen}>
                <button onClick={() => setCurrentScreen("game")} className={s.startButton}>
                Commencer
                </button>
            </div>
        </>
    );
};

export default StartScreen;