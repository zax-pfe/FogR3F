import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import styles from './TreeCanvas.module.scss';
import { useWebGLTree } from '../../../hooks/useWebGLTree';

// Données des hotspots
const DEFAULT_HOTSPOTS = [
    { id: 0, x: 120, y: 30, title: 'Titre 1', text: 'Votre texte ici.' },
    { id: 1, x: -220, y: -80, title: 'Titre 2', text: 'Votre texte ici.' },
    { id: 2, x: 300, y: 180, title: 'Titre 3', text: 'Votre texte ici.' },
    { id: 3, x: -350, y: 120, title: 'Titre 4', text: 'Votre texte ici.' },
    { id: 4, x: 180, y: -300, title: 'Titre 5', text: 'Votre texte ici.' },
];

/**
 * Composant principal : Canvas WebGL + Hotspots interactifs
 */
export function TreeCanvas({
    hotspots = DEFAULT_HOTSPOTS,
    onHotspotClick = null,
    webglConfig = {},
}) {
    const canvasRef = useRef(null);
    const canvas2DRef = useRef(null);
    const [revealedHotspots, setRevealedHotspots] = useState(new Set());
    const hotspotsRef = useRef({});

    // Utilise le hook WebGL
    const { worldToScreen, getMousePosition } = useWebGLTree(
        canvasRef,
        canvas2DRef,
        webglConfig,
        onHotspotClick
    );

    // Constante pour la distance de révélation
    const REVEAL_DISTANCE = 80;

    // Anime les positions des hotspots à chaque frame
    const updateHotspotPositions = useCallback(() => {
        const mousePos = getMousePosition();

        hotspots.forEach((hotspot) => {
            const element = hotspotsRef.current[hotspot.id];
            if (!element) return;

            // Convertit monde → écran
            const { sx, sy } = worldToScreen(hotspot.x, hotspot.y);

            // Met à jour la position
            element.style.left = `${sx}px`;
            element.style.top = `${sy}px`;

            // Vérifie si le hotspot doit être révélé
            const dx = hotspot.x - mousePos.x;
            const dy = hotspot.y - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const shouldReveal = distance < REVEAL_DISTANCE;

            setRevealedHotspots((prev) => {
                const next = new Set(prev);
                if (shouldReveal) {
                    next.add(hotspot.id);
                } else {
                    next.delete(hotspot.id);
                }
                return next;
            });
        });

        // Continue l'animation
        requestAnimationFrame(updateHotspotPositions);
    }, [hotspots, worldToScreen, getMousePosition]);

    // Démarre l'animation au montage
    useEffect(() => {
        const rafId = requestAnimationFrame(updateHotspotPositions);
        return () => cancelAnimationFrame(rafId);
    }, [updateHotspotPositions]);

    // Gère le clic sur un hotspot
    const handleHotspotClick = useCallback((hotspot) => {
        if (onHotspotClick) {
            onHotspotClick(hotspot);
        }
    }, [onHotspotClick]);

    return (
        <div className={styles.treeCanvasContainer}>

            {/* Canvas 2D */}
            <canvas
                ref={canvas2DRef}
                className={styles.canvas}
            />

            {/* Canvas WebGL */}
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            />

            {/* Hotspots overlays */}
            <div className={styles.hotspotsLayer}>
                {hotspots.map((hotspot) => (
                    <div
                        key={hotspot.id}
                        ref={(el) => {
                            if (el) hotspotsRef.current[hotspot.id] = el;
                        }}
                        className={`${styles.hotspot} ${revealedHotspots.has(hotspot.id) ? styles.revealed : ''
                            }`}
                        onClick={() => handleHotspotClick(hotspot)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Hotspot: ${hotspot.title}`}
                    />
                ))}
            </div>
        </div>
    );
}