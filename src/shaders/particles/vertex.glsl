uniform vec2 uMouse; 
uniform float uStrength; 
uniform float uTime;

attribute float aIntensity; 
attribute float aAngle;

varying vec2 vUv;

void main() {
    // uv coorinates of the current exact vertex, passed from the geometry shader.
    vUv = uv;

    // its position
    vec3 newPosition = position;

    float time = uTime;

    // distance from the current vertex to the mouse position in UV space - counted as full geometry, not per vertex.
    float distanceToMouse = distance(uv, uMouse);

    // Influence is strictly in [0..1], so particles far from cursor get zero mouse effect.
    float influence = 1.0 - smoothstep(0.0, 0.090, distanceToMouse);

    // speed bost for vertexs which are closer to the mouse
    float speedBoost = 1.0 + influence * uStrength * 2.5;

    float floatX = sin(time * 0.8 * speedBoost + aAngle * 2.0) * 0.05 * aIntensity;
    float floatY = cos(time * 0.6 * speedBoost + aAngle * 1.5) * 0.055 * aIntensity;

    newPosition.x += floatX;
    newPosition.y += floatY;

    // Safe normalized direction; avoids undefined behavior when vertex is exactly under cursor.
    vec2 dir = uv - uMouse;
    vec2 direction = dir / max(length(dir), 0.0001);

    // add pushing by choosen normalised direction with personal intensity, global strength and influence of the mouse.
    newPosition.x += direction.x * influence * aIntensity * uStrength * 0.42 + direction.x * 0.02;
    newPosition.y += direction.y * influence * aIntensity * uStrength * 0.20 + direction.y * 0.02; 
    newPosition.z += influence * aIntensity * uStrength * 0.10;

    // model position of the vertex in world space
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    // position of the vertex in view space
    vec4 viewPosition = viewMatrix * modelPosition;
    // position of the vertex in clip space
    vec4 projectedPosition = projectionMatrix * viewPosition;

    // final position of the vertex
    gl_Position = projectedPosition;

    float baseSize = 2.5; 
    float hoverSize = 5.0;
 
    // size of the point, which is the base size plus the hover size multiplied by the influence of the mouse and personal intensity of the particle.
    gl_PointSize = baseSize + hoverSize * influence * aIntensity;
}