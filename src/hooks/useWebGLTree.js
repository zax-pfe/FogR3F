import { useEffect, useRef, useCallback } from "react";
import { WebGLTreeRenderer } from "../utils/WebGL/WebGLTreeRenderer";

/**
 * Hook personnalisé pour gérer l'instance WebGLTreeRenderer
 * @param {HTMLCanvasElement} canvasRef - Référence du canvas
 * @param {Object} config - Config optionnelle pour WebGLTreeRenderer
 * @param {Function} onHotspotClick - Callback quand on clique sur un hotspot
 * @returns {Object} Instance du renderer + helper methods
 */
export function useWebGLTree(canvasRef, config = {}, onHotspotClick = null) {
	const rendererRef = useRef(null);

	useEffect(() => {
		if (!canvasRef?.current) return;

		try {
			// Crée et initialise le renderer
			rendererRef.current = new WebGLTreeRenderer(
				canvasRef.current,
				config
			);

			// Ajoute le callback si fourni
			if (onHotspotClick) {
				rendererRef.current.onHotspotClick = onHotspotClick;
			}

			rendererRef.current.init();
			// console.log("✅ useWebGLTree initialized");
		} catch (error) {
			console.error("❌ useWebGLTree error:", error);
		}

		// Cleanup
		return () => {
			if (rendererRef.current) {
				rendererRef.current.destroy();
			}
		};
	}, [config, onHotspotClick]);

	// Helper methods
	const getMousePosition = useCallback(() => {
		return rendererRef.current?.getMousePosition() || { x: 0, y: 0 };
	}, []);

	const getZoom = useCallback(() => {
		return rendererRef.current?.getZoom() || 1;
	}, []);

	const getPan = useCallback(() => {
		return rendererRef.current?.getPan() || { x: 0, y: 0 };
	}, []);

	const worldToScreen = useCallback((wx, wy) => {
		return rendererRef.current?.worldToScreen(wx, wy) || { sx: 0, sy: 0 };
	}, []);

	return {
		renderer: rendererRef.current,
		getMousePosition,
		getZoom,
		getPan,
		worldToScreen,
	};
}
