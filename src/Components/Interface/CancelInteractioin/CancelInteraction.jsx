import React from 'react';
import { useGameStore } from '../../../store/store.js';
import s from "./CancelInteraction.module.scss";

const CancelInteraction = () => {
    // const isInteractionActive = useGameStore((state) => state.isInteractionActive);


	return ( 
        <div className={s.cancelInteractionContainer}>
            <span>F</span> <p>Passer l'interaction </p>
        </div> 
        );
};

export default CancelInteraction;
