import { useEffect, useRef, useCallback, useState } from "react";
import { WebGLTreeRenderer } from "../utils/WebGL/WebGLTreeRenderer";

export function useWebGLTree(
	canvasRef,
	canvas2DRef,
	config = {},
	onHotspotClick = null
) {
	const rendererRef = useRef(null);
	const dataImgRef = useRef(null);
	const [isImageReady, setIsImageReady] = useState(false); // 🆕 Track si l'image est prête

	const setupImage = (imageSrc) => {
		canvas2DRef.current.width = window.innerWidth;
		canvas2DRef.current.height = window.innerHeight;

		const ctx = canvas2DRef.current.getContext("2d");
		const image = new Image();

		image.onload = () => {
			const size =
				Math.min(
					canvas2DRef.current.width,
					canvas2DRef.current.height
				) * 0.9;
			const x = (canvas2DRef.current.width - size) / 2;
			const y = (canvas2DRef.current.height - size) / 2;
			ctx.drawImage(image, x, y, size, size);

			const dataImg = getImageData();
			dataImgRef.current = dataImg;

			setIsImageReady(true); // 🆕 Signal que l'image est prête
		};

		image.onerror = () => {
			console.error("❌ Image load error:", imageSrc);
			setIsImageReady(true); // Continue même si erreur
		};

		image.src = imageSrc;
	};

	const getImageData = () => {
		const ctx = canvas2DRef.current.getContext("2d");
		const dataBrut = ctx.getImageData(
			0,
			0,
			canvas2DRef.current.width,
			canvas2DRef.current.height
		).data;
		const data = [];
		for (let row = 0; row < canvas2DRef.current.height; row++) {
			const rowData = [];
			for (let pix = 0; pix < canvas2DRef.current.width; pix++) {
				const idx = (row * canvas2DRef.current.width + pix) * 4;
				rowData.push({
					r: dataBrut[idx],
					g: dataBrut[idx + 1],
					b: dataBrut[idx + 2],
					a: dataBrut[idx + 3],
				});
			}
			data.push(rowData);
		}
		return data;
	};

	// 🆕 Charge l'image au montage
	useEffect(() => {
		if (!canvas2DRef?.current) return;
		setupImage("/assets/images/MIL_Souge.svg");
	}, []);

	// 🆕 Initialise le renderer UNE FOIS que l'image est prête
	useEffect(() => {
		if (!canvasRef?.current || !isImageReady) return;

		try {
			rendererRef.current = new WebGLTreeRenderer(
				canvasRef.current,
				config,
				dataImgRef.current // Maintenant défini et prêt !
			);

			if (onHotspotClick) {
				rendererRef.current.onHotspotClick = onHotspotClick;
			}

			rendererRef.current.init();
			console.log("✅ useWebGLTree initialized with image data");
		} catch (error) {
			console.error("❌ useWebGLTree error:", error);
		}

		return () => {
			if (rendererRef.current) {
				rendererRef.current.destroy();
			}
		};
	}, [isImageReady, config, onHotspotClick]); // 🆕 Dépend de isImageReady

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
		isImageReady, // 🆕 Optionnel : expose l'état de chargement
	};
}
