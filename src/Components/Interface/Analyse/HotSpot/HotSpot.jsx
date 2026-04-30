import { useEffect, useRef, useState } from "react";
import s from "./HotSpot.module.scss";
import CloseBtn from "../../Design/CloseBtn/CloseBtn";
import Text from "../../Design/Text/Text";
import Button from "../../Design/Button/Button";
import gsap from "gsap";
import { addScaleCorrector } from "motion";
import { useGameStore } from "../../../../store/store";

const HotSpot = ({ data, coo, refBox }) => {

    const { selectedItems, addSelectedItems, maxSelectedItems, removeSelectedItem, setHotspotCurrent, hotspotCurrent } = useGameStore();

    // const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    const safeArea = 24; // Zone de sécurité pour éviter que le pop-up ne sorte de l'écran
    const popUpWidth = 676; // Largeur estimée du pop-up
    const popUpHeight = 295; // Hauteur estimée du pop-up

    const popUpX = useRef(coo.x - popUpWidth - safeArea); // Position par défaut à gauche du point
    const popUpY = useRef(coo.y - popUpHeight - safeArea); // Position par défaut au-dessus du point

    const ref_pointMove = useRef(null);

    const iAmSelected = () => {return selectedItems.includes(data);};
    const iAmCurrentHotspot = () => {return hotspotCurrent === data;};

    const handleClickPoint = () => {
        // setOpen(!open);
        setHotspotCurrent(data);
        // console.log("HotSpot clicked at:", { x: coo.x, y: coo.y });
    };

    const handleClose = () => {
        // setOpen(false);
        setHotspotCurrent(null);
    }

    const handleChoose = () => {
        if (selectedItems.length >= maxSelectedItems) {
            return;
        }
        console.log(`Element récolté : ${data.title}`);
        setSelected(true);
        handleClose();
    }
    
    const handleRemove = () => {
        console.log(`Element retiré : ${data.title}`);
        removeSelectedItem(data);
        setSelected(false);
        handleClose();
    }

    useEffect(() => {
        if (selected) {
            let boxRect = refBox.current.getBoundingClientRect();
            let centerX = boxRect.left + boxRect.width / 2;
            let centerY = boxRect.top + boxRect.height / 2;

            gsap.to(ref_pointMove.current, {
                left: centerX,
                top: centerY,
                opacity: 0.2,
                scale: 0.5,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    addSelectedItems(data);
                    setSelected(false);
                }
            });
        }
    }, [selected]);

    useEffect(() => {
        // Ajustement de la position du pop-up pour qu'il reste dans la fenêtre
        if (coo.x - popUpWidth - safeArea < 0) {
            popUpX.current = coo.x + safeArea; // Positionner à droite du point
        }
        if (coo.y - popUpHeight - safeArea < 0) {
            popUpY.current = coo.y + safeArea; // Positionner en dessous du point
        }

    }, []);

    return (
        <>
            <div className={s.hotSpot} style={{ left: coo.x, top: coo.y }}>
                <div className={`${s.point} ${iAmCurrentHotspot() ? s.open : ''} ${iAmSelected() ? s.active : ''}`} onClick={handleClickPoint}></div>
            </div>
            {iAmCurrentHotspot() && (
                <>
                    <div className={s.overlay} onClick={handleClose}></div>
                    <div className={s.popUp} style={{ left: popUpX.current, top: popUpY.current }}>
                        <CloseBtn onClick={handleClose} className={s.popUp__closeBtn} />
                        <div className={s.popUp__img} style={{ backgroundImage: `url(${data.image})` }} ></div>
                        <div className={s.popUp__content}>
                            <Text className={s.popUp__title} variant="b2">
                                {data.title}
                            </Text>
                            <Text variant="b3" className={s.popUp__text}>
                                {data.text}
                            </Text>
                            <div className={s.popUp__buttonContainer}>
                                {!iAmSelected() ? (
                                    <Button className={s.popUp__button} variant="xs" onClick={handleChoose} disabled={selectedItems.length >= maxSelectedItems}>
                                        Récolter cet élément
                                    </Button>
                                ) : (
                                    <Button className={s.popUp__button} variant="xs" onClick={handleRemove} active={true}>
                                        Retirer cet élément
                                    </Button>
                                )}
                                {!iAmSelected() && selectedItems.length >= maxSelectedItems && (
                                    <Text variant="c3" className={s.warning}>
                                        Nombre maximum d'éléments sélectionnés atteint.
                                    </Text>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {selected && (
                <div ref={ref_pointMove} className={`${s.pointMove}`} style={{ left: coo.x, top: coo.y }}></div>
            )}
        </>
    );
};

export default HotSpot;