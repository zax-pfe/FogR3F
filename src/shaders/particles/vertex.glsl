// Vertex shader for particle field.
// Beginner-friendly comments: read left-to-right, top-to-bottom.

// Uniforms (values set from JavaScript):
uniform sampler2D uDisplacementTexture; // Canvas texture used to add extra displacement per UV
uniform vec2 uMouse;                     // Mouse position in UV space (0..1)
uniform float uMouseStrength;            // How strong the mouse effect is (0..1)
uniform float uTime;                     // Global time, used for animation

// Attributes (per-vertex data):
attribute float aIntensity; // Per-vertex intensity (0..1) - how strong each particle reacts
attribute float aAngle;     // Per-vertex angle used to create varied motion

// Varyings (sent to fragment shader):
varying vec2 vUv;   // UV coordinates for this vertex
varying vec2 vMouse; // Pass mouse to fragment shader if needed

void main() {
    // Store UV for the fragment shader to use for color/opacity.
    vUv = uv;

    // Start from the original vertex position supplied by the geometry.
    vec3 newPosition = position;

    // Local copy of time for readable math below.
    float time = uTime;

    // Small floating motion so particles never sit perfectly still.
    // Uses sin/cos with a per-particle phase (aAngle) and intensity.
    float floatX = sin(time * 0.8 + aAngle * 2.0) * 0.015 * aIntensity;
    float floatY = cos(time * 0.6 + aAngle * 1.5) * 0.015 * aIntensity;

    // Apply the floating motion to the particle position.
    newPosition.x += floatX;
    newPosition.y += floatY;

    // Read displacement map (drawn on a canvas) at this vertex UV.
    // The R channel is used as a strength value (0..1).
    vec4 displacementColor = texture2D(uDisplacementTexture, uv);
    float displacementStrength = displacementColor.r;

    // Compute vector from mouse to this particle in UV space.
    vec2 toParticle = uv - uMouse;
    float distanceToMouse = length(toParticle);
    // Normalize direction safely (avoid division by zero).
    vec2 direction = toParticle / max(distanceToMouse, 0.0001);

    // Create a circular falloff based on distance to mouse (1 near mouse, 0 outside range).
    float circleStrength = 1.0 - smoothstep(0.0, 0.035, distanceToMouse);
    circleStrength = max(circleStrength, 0.0) * uMouseStrength; // scale by mouse strength

    // THERMAL SHIMMER: high-frequency jitter near cursor creates heat distortion effect.
    // Define thermal zone range and intensity based on distance to cursor.
    float thermalRadius = 0.15; // area around cursor affected by thermal shimmer
    float thermalZone = 1.0 - smoothstep(0.0, thermalRadius, distanceToMouse);
    
    // Multiple high-frequency sine waves at different speeds for chaotic shimmer.
    float shimmer1 = sin(time * 5.2 + aAngle * 15.0 + aIntensity * 3.0) * 0.5 + 0.5;
    float shimmer2 = cos(time * 7.8 + aAngle * 22.0 + aIntensity * 2.5) * 0.5 + 0.5;
    float shimmer3 = sin(time * 3.5 + aAngle * 18.0) * 0.5 + 0.5;
    
    // Combine shimmers for organic, turbulent motion.
    float combinedShimmer = mix(shimmer1, shimmer2, shimmer3);
    
    // Apply thermal shimmer displacement: stronger closer to cursor.
    float shimmerIntensity = thermalZone * uMouseStrength * 0.012; // amplitude of shimmer
    float shimmerX = sin(combinedShimmer * 6.28) * shimmerIntensity;
    float shimmerY = cos(combinedShimmer * 6.28) * shimmerIntensity;
    
    newPosition.x += shimmerX;
    newPosition.y += shimmerY;

    // Choose the stronger effect between displacement texture and mouse circle.
    float softStrength = max(displacementStrength * 0.65, circleStrength);

    // Add small noise/irregularity so motion looks organic.
    float noise = sin(aAngle * 12.0 + uTime * 0.7) * 0.5 + 0.5;
    float irregularity = mix(0.82, 1.08, noise);

    // Push the particle away from the mouse (or according to displacement) with irregularity.
    newPosition.x += direction.x * softStrength * irregularity * 0.42;
    newPosition.y += direction.y * softStrength * irregularity * 0.42;
    newPosition.z += softStrength * 0.12; // small Z offset for depth

    // Standard transforms: model -> view -> projection to get final position.
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition; // final clip-space position

    // Point size calculation: base size plus extra when mouse/displacement is active.
    float baseSize = 2.9;
    float hoverSize = 4.0;
    // Thermal pulse: particles grow larger in the hot zone around cursor.
    float thermalPulse = mix(1.0, 1.6, thermalZone);

    vMouse = uMouse; // forward mouse to fragment shader if needed

    gl_PointSize = (baseSize + hoverSize * softStrength * aIntensity) * thermalPulse;
}