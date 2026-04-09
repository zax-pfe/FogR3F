import { vertexShaderSource, fragmentShaderSource } from "./shaders";
import { WEBGL_CONFIG, TOTAL_POINTS } from "./config";

/**
 * WebGLTreeRenderer
 * Encapsule toute la logique WebGL pour visualiser une souche
 * Aucune dépendance à React ou manipulation directe du DOM
 */
export class WebGLTreeRenderer {
	constructor(canvas, config = {}, dataImg) {
		this.canvas = canvas;
		this.config = { ...WEBGL_CONFIG, ...config };
		this.dataImg = dataImg;

		// WebGL context
		this.gl = null;
		this.program = null;

		// Buffers
		this.basesBuffer = null;
		this.ringsBuffer = null;
		this.offsetsBuffer = null;

		// Uniforms
		this.uniforms = {};

		// State
		this.mouseX = 0;
		this.mouseY = 0;
		this.targetMouseX = 0;
		this.targetMouseY = 0;
		this.zoom = this.config.INITIAL_ZOOM;
		this.targetZoom = this.config.INITIAL_ZOOM;
		this.panX = 0;
		this.panY = 0;
		this.frame = 0;
		this.isDragging = false;
		this.lastX = 0;
		this.lastY = 0;

		// Callbacks
		this.onHotspotClick = null;
		this.onZoom = null;

		// RAF ID
		this.rafId = null;
	}

	/**
	 * Initialise le contexte WebGL et les buffers
	 */
	init() {
		// Récupère le contexte
		this.gl =
			this.canvas.getContext("webgl2", { alpha: true }) ||
			this.canvas.getContext("webgl", { alpha: true });

		if (!this.gl) {
			throw new Error("WebGL not supported");
		}

		// Compile les shaders
		this._compileShaders();

		// Initialise les buffers
		this._initBuffers();

		// Setup viewport
		this._resize();

		// Setup listeners
		this._setupListeners();

		// Déparre l'animation
		this._render();
	}

	/**
	 * Compile et lie les shaders
	 */
	_compileShaders() {
		const vShader = this._createShader(
			this.gl.VERTEX_SHADER,
			vertexShaderSource
		);
		const fShader = this._createShader(
			this.gl.FRAGMENT_SHADER,
			fragmentShaderSource
		);

		this.program = this.gl.createProgram();
		this.gl.attachShader(this.program, vShader);
		this.gl.attachShader(this.program, fShader);
		this.gl.linkProgram(this.program);

		if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
			throw new Error("Shader linking failed");
		}

		this.gl.useProgram(this.program);

		// Récupère les locations uniforms
		this.uniforms = {
			uTime: this.gl.getUniformLocation(this.program, "uTime"),
			uMouse: this.gl.getUniformLocation(this.program, "uMouse"),
			uViewport: this.gl.getUniformLocation(this.program, "uViewport"),
			uZoom: this.gl.getUniformLocation(this.program, "uZoom"),
			uPan: this.gl.getUniformLocation(this.program, "uPan"),
		};
	}

	/**
	 * Crée un shader compilé
	 */
	_createShader(type, source) {
		const shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			console.error(this.gl.getShaderInfoLog(shader));
			throw new Error("Shader compilation failed");
		}

		return shader;
	}

	/**
	 * Initialise les buffers de points
	 */
	_initBuffers() {
		// Génère les données des points
		const { bases, rings, offsets, colors, alpha } =
			this._generatePointData();

		// Crée les buffers
		this._createBuffer(bases, "aBase", 2);
		this._createBuffer(rings, "aRingIndex", 1);
		this._createBuffer(offsets, "aOffset", 1);
		this._createBuffer(colors, "aColor", 3);
		this._createBuffer(alpha, "aAlpha", 1);
	}

	/**
	 * Génère les données des points (cernes)
	 */
	_generatePointData() {
		const { RINGS, MAX_RADIUS, STRIES, POINT_COLOR } = this.config;
		const total = RINGS * STRIES;

		const bases = new Float32Array(total * 2);
		const rings = new Float32Array(total);
		const offsets = new Float32Array(total);
		const colors = new Float32Array(total * 3); // Couleur du point
		const alpha = new Float32Array(total); // Alpha du point

		console.log(this.dataImg);

		let idx = 0;
		for (let i = 0; i < RINGS; i++) {
			const longCycle = Math.sin(i * 0.15) * 0.4;
			const shortCycle = Math.sin(i * 0.8) * 0.15;
			// const ageFactor = Math.pow(i / RINGS, 0.8);
			const growthVariation = 1.0 + longCycle + shortCycle;
			// const radius = ageFactor * MAX_RADIUS * growthVariation;
			// const radius = ageFactor * MAX_RADIUS;
			const step = MAX_RADIUS / RINGS;
			const radius = i * step + step * 0.5;
			const driftX = Math.sin(i * 0.05) * 15.0;
			const driftY = Math.cos(i * 0.03) * 10.0;

			for (let j = 0; j < STRIES; j++) {
				const angle = (j / STRIES) * Math.PI * 2;
				const x = radius * Math.cos(angle) + driftY;
				const y = radius * Math.sin(angle) + driftX;

				bases[idx * 2] = x; // définition de la position X du point
				bases[idx * 2 + 1] = y; // définition de la position Y du point
				rings[idx] = i; // index du cerne (1 à RINGS-1)
				offsets[idx] = Math.random() * 1000; // offset aléatoire pour l'animation

				let sXY = this.worldToScreen(x, y, true);
				colors[idx * 3] = POINT_COLOR[0]; // composante rouge
				colors[idx * 3 + 1] = POINT_COLOR[1]; // composante verte
				colors[idx * 3 + 2] = POINT_COLOR[2]; // composante bleue

                let alphaValue = this.dataImg[sXY.sy]?.[sXY.sx]?.a || 0;
                if (alphaValue > 0) {
                    alpha[idx] = 1.0; // point visible
                } else {
                    alpha[idx] = 0.0; // point transparent
                }
                
				// console.log(alpha[idx]);
				idx++;
			}
		}

		return { bases, rings, offsets, colors, alpha };
	}

	/**
	 * Crée et lie un buffer à un attribut
	 */
	_createBuffer(data, attribName, size) {
		const buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

		const loc = this.gl.getAttribLocation(this.program, attribName);
		this.gl.enableVertexAttribArray(loc);
		this.gl.vertexAttribPointer(loc, size, this.gl.FLOAT, false, 0, 0);
	}

	/**
	 * Setup des listeners souris et clavier
	 */
	_setupListeners() {
		this.canvas.addEventListener("mousemove", (e) => this._onMouseMove(e));
		this.canvas.addEventListener("mousedown", (e) => this._onMouseDown(e));
		this.canvas.addEventListener("mouseup", (e) => this._onMouseUp(e));
		this.canvas.addEventListener("wheel", (e) => this._onWheel(e), {
			passive: false,
		});

		window.addEventListener("resize", () => this._resize());
	}

	/**
	 * Gestion du mouvement souris
	 */
	_onMouseMove(e) {
		this.targetMouseX =
			(e.clientX - this.canvas.width / 2) / this.zoom - this.panX;
		this.targetMouseY =
			-(e.clientY - this.canvas.height / 2) / this.zoom - this.panY;

		if (this.isDragging) {
			this.panX += (e.clientX - this.lastX) / this.zoom;
			this.panY -= (e.clientY - this.lastY) / this.zoom;
			this.lastX = e.clientX;
			this.lastY = e.clientY;
		}
	}

	/**
	 * Gestion du clic souris
	 */
	_onMouseDown(e) {
		this.isDragging = true;
		this.lastX = e.clientX;
		this.lastY = e.clientY;
	}

	/**
	 * Relâche du clic souris
	 */
	_onMouseUp() {
		this.isDragging = false;
	}

	/**
	 * Gestion du zoom molette
	 */
	_onWheel(e) {
		e.preventDefault();
		this.targetZoom *= e.deltaY > 0 ? 0.95 : 1.05;
		this.targetZoom = Math.max(
			this.config.MIN_ZOOM,
			Math.min(this.config.MAX_ZOOM, this.targetZoom)
		);
		if (this.onZoom) this.onZoom(this.targetZoom);
	}

	/**
	 * Redimensionne le canvas
	 */
	_resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Boucle d'animation
	 */
	_render = () => {
		// Lissage du zoom
		this.zoom += (this.targetZoom - this.zoom) * this.config.ZOOM_SMOOTH;

		// Lissage de la souris
		this.mouseX +=
			(this.targetMouseX - this.mouseX) * this.config.MOUSE_SMOOTH;
		this.mouseY +=
			(this.targetMouseY - this.mouseY) * this.config.MOUSE_SMOOTH;

		// Incrémente le temps
		this.frame++;

		// Clear canvas
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Update uniforms
		this.gl.uniform1f(this.uniforms.uTime, this.frame);
		this.gl.uniform2f(this.uniforms.uMouse, this.mouseX, this.mouseY);
		this.gl.uniform2f(
			this.uniforms.uViewport,
			this.canvas.width,
			this.canvas.height
		);
		this.gl.uniform1f(this.uniforms.uZoom, this.zoom);
		this.gl.uniform2f(this.uniforms.uPan, this.panX, this.panY);

		// Dessine
		this.gl.drawArrays(this.gl.POINTS, 0, TOTAL_POINTS);

		// Prochaine frame
		this.rafId = requestAnimationFrame(this._render);
	};

	/**
	 * Convertit des coordonnées monde en écran
	 */
	worldToScreen(wx, wy, floor) {
		let sx = (wx + this.panX) * this.zoom + this.canvas.width / 2;
		let sy = (-wy - this.panY) * this.zoom + this.canvas.height / 2;

		if (floor) {
			sx = Math.floor(sx);
			sy = Math.floor(sy);
		}

		return { sx, sy };
	}

	/**
	 * Détruit le renderer et nettoie les ressources
	 */
	destroy() {
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
		}
		this.canvas.removeEventListener("mousemove", this._onMouseMove);
		this.canvas.removeEventListener("mousedown", this._onMouseDown);
		this.canvas.removeEventListener("mouseup", this._onMouseUp);
		this.canvas.removeEventListener("wheel", this._onWheel);
	}

	/**
	 * Retourne la position actuelle de la souris (monde)
	 */
	getMousePosition() {
		return { x: this.mouseX, y: this.mouseY };
	}

	/**
	 * Retourne le zoom courant
	 */
	getZoom() {
		return this.zoom;
	}

	/**
	 * Retourne le pan courant
	 */
	getPan() {
		return { x: this.panX, y: this.panY };
	}
}
