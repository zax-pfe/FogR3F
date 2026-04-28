import { useEffect, useRef, useState } from "react";
import s from "./HotSpot.module.scss";
import CloseBtn from "../../Design/CloseBtn/CloseBtn";
import Text from "../../Design/Text/Text";
import Button from "../../Design/Button/Button";
import gsap from "gsap";

const HotSpot = ({ data, coo, refBox, setSelectedItems, isSelected }) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    const safeArea = 24; // Zone de sécurité pour éviter que le pop-up ne sorte de l'écran
    const popUpWidth = 676; // Largeur estimée du pop-up
    const popUpHeight = 295; // Hauteur estimée du pop-up

    const popUpX = useRef(coo.x - popUpWidth - safeArea); // Position par défaut à gauche du point
    const popUpY = useRef(coo.y - popUpHeight - safeArea); // Position par défaut au-dessus du point

    const ref_pointMove = useRef(null);

    const handleClickPoint = () => {
        setOpen(!open);
        console.log("HotSpot clicked at:", { x: coo.x, y: coo.y });
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChosse = () => {
        console.log("Element récolté at:", { x: coo.x, y: coo.y });
        setSelected(true);
        handleClose();
    }

    useEffect(() => {
        if (selected) {
            let boxRect = refBox.current.getBoundingClientRect();
            let centerX = boxRect.left + boxRect.width / 2;
            let centerY = boxRect.top + boxRect.height / 2;
            console.log("Déplacement de l'élément vers la sélection finale:", { centerX, centerY });

            gsap.to(ref_pointMove.current, {
                left: centerX,
                top: centerY,
                opacity: 0.2,
                scale: 0.5,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    setSelectedItems(prev => [...prev, data]);
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
                <div className={`${s.point} ${open || isSelected ? s.active : ''}`} onClick={handleClickPoint}></div>
            </div>
            {open && (
                <>
                    <div className={s.overlay} onClick={handleClose}></div>
                    <div className={s.popUp} style={{ left: popUpX.current, top: popUpY.current }}>
                        <CloseBtn onClick={handleClose} className={s.popUp__closeBtn} />
                        <div className={s.popUp__img} ></div>
                        <div className={s.popUp__content}>
                            <Text className={s.popUp__title} variant="b2">
                                HotSpot at ({coo.x}, {coo.y})
                            </Text>
                            <Text variant="b3" className={s.popUp__text}>
                                Le climat influence la variation annuelle dans la croissance du bois. Les cernes sont très étroits en raison d’une sécheresse qui frappe la région. Si la sécheresse perdure plusieurs années, on retrouvera une série de cernes qui seront consécutivement très étroits. Cela nous renseigne sur la durée et la gravité de l’évènement climatique.
                            </Text>
                            {!isSelected && (
                                <Button variant="xs" onClick={handleChosse}>
                                    Récolter cet élément
                                </Button>
                            )}
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