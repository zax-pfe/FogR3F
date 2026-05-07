import { useEffect, useState } from "react";
import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
import s from "./Result.module.scss";
import { useGameStore } from "../../../../store/store";
import { c_Arbre_HotSpots_MustFind } from "../../../../constant/arbre_hotSpots";
import { c_AudioUI } from "../../../../constant/audio";

const Result = ({ type, closeResult }) => {
    
    const [foundCount, setFoundCount] = useState(0);
    const selectedItems = useGameStore((state) => state.selectedItems);
    const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);

    const startMemory = () => {
        setCurrentScreen("memory");
        c_AudioUI.play('click');
    }

    useEffect(() => {
        setFoundCount(selectedItems.filter((item) => item.mustBeFound).length);
    }, [selectedItems]);

    return foundCount === c_Arbre_HotSpots_MustFind ? (
        <>
            <div className={s.background} onClick={closeResult}></div>
            <div className={s.result}>
                <Text variant="h1" className={s.result__title}>Succès</Text>
                <div className={s.result__content}>
                    <Text className={s.result__content__text}>Vous avez sélectionné tous les éléments nécessaires pour analyser la souche.</Text>
                    <Text className={`${s.result__content__secondTxt} ${s.success}`}>Eléments OK (( {foundCount} / {c_Arbre_HotSpots_MustFind} ))</Text>
                </div>
                <Button onClick={startMemory}>Lancer le souvenir</Button>
            </div>
        </>
    ) :(
        <>
            <div className={s.background} onClick={closeResult}></div>
            <div className={s.result}>
                <Text variant="h1" className={s.result__title}>Erreur</Text>
                <div className={s.result__content}>
                    <Text className={s.result__content__text}>Vous n’avez pas sélectionner d’assez bon éléments pour pouvoir analyser la souche.</Text>
                    <Text className={s.result__content__secondTxt}>Eléments OK (( {foundCount} / {c_Arbre_HotSpots_MustFind} ))</Text>
                </div>
                <Button onClick={closeResult}>Recommencer</Button>
            </div>
        </>
    );
};

export default Result;