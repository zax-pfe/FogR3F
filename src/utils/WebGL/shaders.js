// Vertex Shader
export const vertexShaderSource = `
    attribute vec2 aBase;
    attribute float aRingIndex;
    attribute float aOffset;
    attribute vec3 aColor;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uViewport;
    uniform float uZoom;
    uniform vec2 uPan;
    varying float vAlpha;
    varying float vRing;
    varying vec4 vColor;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  float noise3(float x, float y, float z) {
    float ix = floor(x), iy = floor(y), iz = floor(z);
    float fx = fract(x), fy = fract(y), fz = fract(z);
    fx = fx * fx * (3.0 - 2.0 * fx);
    fy = fy * fy * (3.0 - 2.0 * fy);
    fz = fz * fz * (3.0 - 2.0 * fz);
    float n000 = hash(ix + iy * 57.0 + iz * 113.0);
    float n100 = hash(ix + 1.0 + iy * 57.0 + iz * 113.0);
    float n010 = hash(ix + (iy + 1.0) * 57.0 + iz * 113.0);
    float n110 = hash(ix + 1.0 + (iy + 1.0) * 57.0 + iz * 113.0);
    float n001 = hash(ix + iy * 57.0 + (iz + 1.0) * 113.0);
    float n101 = hash(ix + 1.0 + iy * 57.0 + (iz + 1.0) * 113.0);
    float n011 = hash(ix + (iy + 1.0) * 57.0 + (iz + 1.0) * 113.0);
    float n111 = hash(ix + 1.0 + (iy + 1.0) * 57.0 + (iz + 1.0) * 113.0);
    float x00 = mix(n000, n100, fx);
    float x10 = mix(n010, n110, fx);
    float x01 = mix(n001, n101, fx);
    float x11 = mix(n011, n111, fx);
    float y0 = mix(x00, x10, fy);
    float y1 = mix(x01, x11, fy);
    return mix(y0, y1, fz);
  }

  void main() {
    float angle = atan(aBase.y, aBase.x);
    float t = uTime * 0.01;
    float n = noise3(cos(angle) + aOffset, sin(angle) + aOffset, t);
    float fissure = noise3(angle * 2.0 + aOffset, aRingIndex * 0.5, 0.0) * 10.0 - 5.0;
    float baseR = length(aBase);
    float r = baseR + (n * 2.0 - 1.0) * 5.0 + fissure;
    float targetX = r * cos(angle);
    float targetY = r * sin(angle);
    vec2 pos = (vec2(targetX, targetY) + uPan) * uZoom;
    vec2 ndc = pos / (uViewport * 0.5);
    float mx = uMouse.x;
    float my = uMouse.y;
    float d = distance(vec2(targetX, targetY), vec2(mx, my));
    
    if (d < 120.0) {
      float force = (1.0 - d / 120.0) * 1.8;
      vec2 dir = normalize(vec2(targetX, targetY) - vec2(mx, my));
      float af = 0.03 / (d + 1.0);
      vec2 displaced = dir * force * 15.0;
      float cs = cos(af), sn = sin(af);
      vec2 vortex = vec2(cs * displaced.x - sn * displaced.y, sn * displaced.x + cs * displaced.y);
      vec2 finalPos = (vec2(targetX, targetY) + vortex + uPan) * uZoom;
      ndc = finalPos / (uViewport * 0.5);
    }
    
    float pulse = sin(uTime * 0.05 + aOffset);
    vAlpha = 0.59 + pulse * 0.2;
    vRing = aRingIndex;
    vColor = vec4(aColor, vAlpha);
    float ptSize = mix(1.0, 2.5, aRingIndex / 35.0) * uZoom;
    gl_PointSize = ptSize;
    gl_Position = vec4(ndc, 0.0, 1.0);
  }
`;

// Fragment Shader
export const fragmentShaderSource = `
  precision mediump float;
//   varying float vAlpha;
//   varying float vRing;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;
