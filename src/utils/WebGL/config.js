// Configuration WebGL Tree Renderer
export const WEBGL_CONFIG = {
	RINGS: 50, // Nombre de cernes
	MAX_RADIUS: 550, // Rayon maximal
	STRIES: 200, // Points par cerne

	// Colors (rgb)
	POINT_COLOR: [1.0, 1.0, 1.0],

	// Camera
	INITIAL_ZOOM: 1.0,
	MIN_ZOOM: 0.2,
	MAX_ZOOM: 8,

	// Mouse interaction
	MOUSE_INFLUENCE_RADIUS: 120.0,
	MOUSE_FORCE: 1.8,
	VORTEX_ANGLE: 0.03,
	DISPLACEMENT_FORCE: 15.0,

	// Animation
	TIME_SCALE: 0.01,
	PULSE_SPEED: 0.05,
	PULSE_AMPLITUDE: 0.2,
	BASE_ALPHA: 0.59,

	// Smoothing
	MOUSE_SMOOTH: 0.8,
	ZOOM_SMOOTH: 0.1,

	// Reveal
	HOTSPOT_REVEAL_DISTANCE: 80,
};

export const TOTAL_POINTS = WEBGL_CONFIG.RINGS * WEBGL_CONFIG.STRIES;
