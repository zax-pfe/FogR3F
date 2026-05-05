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
import { c_AudioUI, c_Click } from "../../../../constant/audio";

const TreeAnalyse = () => {
  //   const { showAnalyse, setShowAnalyse, selectedItems, resetSelectedItems } = useGameStore();
  const showAnalyse = useGameStore((state) => state.showAnalyse);
  const setShowAnalyse = useGameStore((state) => state.setShowAnalyse);
  const selectedItems = useGameStore((state) => state.selectedItems);
  const resetSelectedItems = useGameStore((state) => state.resetSelectedItems);
  // -- debug pour afficher ou non l'analyse du tronc avec la touche "t" --

  const handleKeyDown = (e) => {
    if (e.key === "t") {
      setShowAnalyse(!showAnalyse);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAnalyse]);

  const ref__selectedBox = useRef(null);

  const [origin, setOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const startAnalyse = () => {
    if (selectedItems.length > 0) {
      console.log(selectedItems);
      console.log(`Nombre d'infos à trouver : ${c_Arbre_HotSpots_MustFind}`);
      const foundCount = selectedItems.filter((item) => item.mustBeFound).length;
      console.log(`Nombre d'infos trouvées : ${foundCount}`);

      if (foundCount >= c_Arbre_HotSpots_MustFind) {
        console.log("Cinématique");
      } else {
        alert(
          `Analyse incomplète. Il vous manque ${c_Arbre_HotSpots_MustFind - foundCount} éléments à trouver.`,
        );
        resetSelectedItems();
      }
    } else {
      return alert(
        "Aucun élément sélectionné pour l'analyse. Veuillez sélectionner au moins un élément avant de lancer l'analyse.",
      );
    }
  };

  return (
    showAnalyse && (
      <div className={s.treeAnalyse}>
        <Tronk />
        <Button
          className={s.treeAnalyse__closeBtn}
          onClick={() => {
            c_AudioUI.play("remove");
            setShowAnalyse(false);
          }}
        >
          Fermer la machine
        </Button>
        {/* // Analyse du tronc */}
        {c_Arbre_HotSpots.map((spot, index) => (
          <HotSpot
            key={index}
            data={spot}
            coo={{ x: origin.x + coo_Ratio(spot.x), y: origin.y + coo_Ratio(spot.y) }}
            refBox={ref__selectedBox}
          />
        ))}
        <SelectedItems refBox={ref__selectedBox} analyse={startAnalyse} />
      </div>
    )
  );
};

export default TreeAnalyse;
