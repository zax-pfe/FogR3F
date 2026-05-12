import React, { useEffect, useRef, useState } from 'react';
import s from "./Credits.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../Design/Button/Button";


export default function Particles() {

    const containerRef = useRef(); 
    const [logoEnded, setLogoEnded] = useState(false);

    setTimeout(() => {
        setLogoEnded(true);
    }, 5000);   

    useGSAP(
        () => {
            if (!logoEnded || !containerRef.current) return;

            const distance = Math.max(
                containerRef.current.scrollHeight - window.innerHeight,
                0
            );

            gsap.to(containerRef.current, {
                y: -distance,
                duration: 36,
                ease: "power1.inOut",
            });
        },
        { dependencies: [logoEnded] }
    ); 

    return (
        <>
            <div className={s.creditsContainer} ref={containerRef}>
                <div className={s.logoContainer}>
                    <img src="/assets/images/credits/logo.svg" alt="" />
                </div>
                <div className={s.textsContaitner}>
                    <img className={s.decor} src="/assets/images/credits/Credit1.svg" alt="" />
                    <img className={s.decor} src="/assets/images/credits/Credit2.svg" alt="" />
                    <img className={s.decor} src="/assets/images/credits/Credit3.svg" alt="" />
                    <img className={s.decor} src="/assets/images/credits/Credit4.svg" alt="" />
                    <img className={s.decor} src="/assets/images/credits/Credit5.svg" alt="" />

                    <div className={s.oneBlockCredit}>
                        <h1>Créé et imaginé par</h1>
                        <p>Camille Cambet, Margot Hortail, Daria Iarovaia, Axel Puech, Lola Vernier, Robin Vigier</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Design UI par</h1>
                        <p>Camille Cambet, Margot Hortail, Lola Vernier</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Design 3D par</h1>
                        <p>Daria Iarovaia, Axel Puech</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Développement par</h1>
                        <p>Daria Iarovaia, Axel Puech, Robin Vigier</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Cinématique par</h1>
                        <p>Lola Vernier</p>
                        <p className={s.pSmall}>avec l’aide de Yan-Nes Ahamout et Simon Corbillon</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Sound Design par</h1>
                        <p>Camille Cambet, Margot Hortail, Lola Vernier, Robin Vigier</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Musique originale par</h1>
                        <p>Robin Vigier</p>
                        <p className={s.pSmall}>avec l’aide de Cyprien Vigier</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Voix de Soren</h1>
                        <p>Tom Thierry</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Voix de Molec</h1>
                        <p>Margot Hortail</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Moteurs de jeu</h1>
                        <p>Three.js et React.js</p>
                    </div>

                    <div className={s.oneBlockCredit}>
                        <h1>Typographies</h1>
                        <p>Syne via Google Fonts</p>
                        <p>Poppins via Google Fonts</p>
                        <p>VCR OSD Mono</p>
                    </div>
                    <img className={s.separator} src="/assets/images/credits/separator.svg" alt="" />
                    <div className={s.oneBlockCredit}>
                        <h1>Remerciements spéciaux</h1>
                        <p>Un grand merci à Mathieu, Rachel, et les intervenants pour ce projet.</p>
                        <img className={s.logo} src="/assets/images/credits/GobelinsLogo.png" alt="" />
                        <Button onClick={() => location.reload()} className={s.credits__btn}>
                            Recommencer
                        </Button>
                    </div>


                </div>

            </div>
        </>

    );

}

