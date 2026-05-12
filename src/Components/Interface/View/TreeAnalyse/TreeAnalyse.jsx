import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../../store/store";
import s from "./TreeAnalyse.module.scss";
import Button from "../../Design/Button/Button";
import HotSpot from "../../Analyse/HotSpot/HotSpot";
import SelectedItems from "../../Analyse/SelectedItems/SelectedItems";
import {
  c_Arbre_HotSpots,
  c_Arbre_HotSpots_MustFind,
  coo_Ratio,
} from "../../../../constant/arbre_hotSpots";
import Tronk from "../../Tronk/Tronk";
import { c_AudioUI } from "../../../../constant/audio";
import CustomText from "../../Design/Text/Text";
import Popup from "../../Popup/Popup";
import Result from "../../Analyse/Result/Result";

const TreeAnalyse = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const selectedItems = useGameStore((state) => state.selectedItems);
  const resetSelectedItems = useGameStore((state) => state.resetSelectedItems);
  const setTransitionView = useGameStore((state) => state.setTransitionView);

  // -- debug pour afficher ou non l'analyse du tronc avec la touche "t" --

  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [infoVisible, setInfoVisible] = useState(true);
  const [result, setResult] = useState(false);
  const [hoverHotSpot, setHoverHotSpot] = useState(false);

  const infoOpen = () => {
    setInfoVisible(true);
    c_AudioUI.play("open");
  };

  const infoClose = () => {
    setInfoVisible(false);
    c_AudioUI.play("close");
  };

  const handleKeyDown = (e) => {
    if (e.key === "t" || e.key === "escape") {
      setTransitionView(currentScreen != "analyse" ? "analyse" : "game");
    }
  };

  const handleMouseMove = (e) => {
    setPointer({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    if (currentScreen === "analyse") {
      resetSelectedItems();
      setOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentScreen]);

  const ref__selectedBox = useRef(null);

  const [origin, setOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const startAnalyse = () => {
    if (selectedItems.length > 0) {
      // console.log(selectedItems);
      // console.log(`Nombre d'infos à trouver : ${c_Arbre_HotSpots_MustFind}`);
      const foundCount = selectedItems.filter((item) => item.mustBeFound).length;
      // console.log(`Nombre d'infos trouvées : ${foundCount}`);

      if (foundCount >= c_Arbre_HotSpots_MustFind) {
        setResult("success");
        c_AudioUI.play("open");
      } else {
        setResult("error");
        c_AudioUI.play("open");
        // resetSelectedItems();
      }
    } else {
      return alert(
        "Aucun élément sélectionné pour l'analyse. Veuillez sélectionner au moins un élément avant de lancer l'analyse.",
      );
    }
  };

  const closeResult = () => {
    setResult(false);
    c_AudioUI.play("close");
  };

  return (
    currentScreen === "analyse" && (
      <div className={s.treeAnalyse}>
        <Tronk />
        {/* // Analyse du tronc */}
        {c_Arbre_HotSpots.map((spot, index) => (
          <HotSpot
            key={index}
            data={spot}
            coo={{ x: origin.x + coo_Ratio(spot.x), y: origin.y + coo_Ratio(spot.y) }}
            refBox={ref__selectedBox}
            setHover={setHoverHotSpot}
          />
        ))}
        {/* Interface d'analyse */}
        <div className={s.treeAnalyse__topWrapper}>
          <CustomText variant="h2" className={s.treeAnalyse__title}>
            Analyse / souche
          </CustomText>
          <div className={s.treeAnalyse__divider}></div>
          <button className={s.treeAnalyse__infoBtn} onClick={infoOpen}>
            <span className={s.treeAnalyse__infoBtnIcon}></span>
            Informations
          </button>
        </div>
        <div className={s.treeAnalyse__closeBtnWrapper}>
          <button
            className={s.treeAnalyse__closeBtn}
            onClick={() => {
              c_AudioUI.play("remove");
              setTransitionView("game");
            }}
          >
            <img
              className={s.treeAnalyse__closeBtn__icon}
              src="/assets/icons/MIL_power.svg"
              alt="éteindre la machine"
            />
          </button>
          <span>On / Off</span>
        </div>
        <SelectedItems refBox={ref__selectedBox} analyse={startAnalyse} />
        {infoVisible && (
          <Popup
            title="Consignes de recherche"
            closePopup={infoClose}
            className={s.popUp}
            classNameBg={s.popUpBg}
          >
            <div className={s.popUp__Wrapper}>
              <ul className={s.popUp__content}>
                <li className={s.popUp__contentItem}>
                  <span className={s.popUp__contentItemNumber}>01</span>
                  <CustomText className={s.popUp__contentItemTexte}>
                    Analyser la souche pour y trouver des informations pertinentes.
                  </CustomText>
                </li>
                <li className={s.popUp__contentItem}>
                  <span className={s.popUp__contentItemNumber}>02</span>
                  <CustomText className={s.popUp__contentItemTexte}>
                    Sélectionner{" "}
                    <span className={s.popUp__contentItemTexteHighlight}>4 indices</span> qui
                    paraissent essentiels pour compléter l’histoire du lieu.
                  </CustomText>
                </li>
                <li className={s.popUp__contentItem}>
                  <span className={s.popUp__contentItemNumber}>03</span>
                  <CustomText className={s.popUp__contentItemTexte}>
                    Lancer l’analyse. Si les les indices sélectionnés ne sont pas les bons,
                    recommencer.
                  </CustomText>
                </li>
              </ul>
              <Button className={s.popUp__button} onClick={infoClose}>
                Commencer
              </Button>
            </div>
          </Popup>
        )}
        {result && <Result type={result} closeResult={closeResult} />}
        <div
          className={`${s.pointer} ${hoverHotSpot ? s.hover : ""}`}
          style={{ top: pointer.y, left: pointer.x }}
        ></div>
      </div>
    )
  );
};

export default TreeAnalyse;
