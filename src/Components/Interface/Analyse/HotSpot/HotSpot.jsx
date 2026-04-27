import { useRef, useState } from "react";
import s from "./HotSpot.module.scss";
import CloseBtn from "../../Design/CloseBtn/CloseBtn";
import Text from "../../Design/Text/Text";
import Button from "../../Design/Button/Button";

const HotSpot = ({ data, coo }) => {

    const [open, setOpen] = useState(false);

    const safeArea = 24; // Zone de sécurité pour éviter que le pop-up ne sorte de l'écran
    const popUpWidth = 676; // Largeur estimée du pop-up
    const popUpHeight = 295; // Hauteur estimée du pop-up

    const popUpX = useRef(coo.x - popUpWidth - safeArea); // Position par défaut à gauche du point
    const popUpY = useRef(coo.y - popUpHeight - safeArea); // Position par défaut au-dessus du point

    const ref_point = useRef(null);
    const ref_popUp = useRef(null);

    const handleClickPoint = () => {
        setOpen(!open);
        console.log("HotSpot clicked at:", { x: coo.x, y: coo.y });
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChosse = () => {
        console.log("Element récolté at:", { x: coo.x, y: coo.y });
        handleClose();
    }

    useState(() => {
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
                <div ref={ref_point} className={`${s.point} ${open ? s.active : ''}`} onClick={handleClickPoint}></div>
            </div>
            {open && (
                <>
                    <div className={s.overlay} onClick={handleClose}></div>
                    <div ref={ref_popUp} className={s.popUp} style={{ left: popUpX.current, top: popUpY.current }}>
                        <CloseBtn onClick={handleClose} className={s.popUp__closeBtn} />
                        <div className={s.popUp__img} ></div>
                        <div className={s.popUp__content}>
                            <Text variant="b2">
                                HotSpot at ({coo.x}, {coo.y})
                            </Text>
                            <Text variant="b3" className={s.popUp__text}>
                                Le climat influence la variation annuelle dans la croissance du bois. Les cernes sont très étroits en raison d’une sécheresse qui frappe la région. Si la sécheresse perdure plusieurs années, on retrouvera une série de cernes qui seront consécutivement très étroits. Cela nous renseigne sur la durée et la gravité de l’évènement climatique.
                            </Text>
                            <Button onClick={handleChosse}>Récolter cet élément</Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default HotSpot;