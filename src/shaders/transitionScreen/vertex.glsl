// varying vec3 vPosition;
varying vec2 vUv;



void main()
{
  // FINAL POSITION
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // VARYINGS
  vUv = uv;
}