varying vec2 vUv;
varying vec3 vWorldPosition;
uniform vec3 uColor;
uniform float uOpacity;
uniform vec3 uPosition;
uniform float uScale;

uniform float uTime;
uniform vec3 uCameraPosition;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 adjustedPos = (vWorldPosition.xz - uPosition.xz) / uScale;
  
  vec2 uv1 = adjustedPos * 0.9;
  uv1.x += uTime * 0.3;

  vec2 uv2 = adjustedPos * 1.0;
  uv2.y -= uTime * 0.7;

  float n1 = noise(uv1);
  float n2 = noise(uv2);

  float n = n1 * 0.7 + n2 * 0.3;

  float strength = smoothstep(0.45, 0.85, n);

  float dist = distance(vWorldPosition, uCameraPosition);
  float fade = smoothstep(10.0, 40.0, dist);

  gl_FragColor = vec4(uColor, strength * uOpacity * (1.0 - fade));
}