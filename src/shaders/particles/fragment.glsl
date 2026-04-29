// Fragment shader for particles: beginner-friendly comments.

// The texture used to color particles. We sample this per particle using UV.
uniform sampler2D uPictureTexture; // image texture for particle color
// Mouse position in UV space (0..1). This lets the shader know where the cursor is.
uniform vec2 uMouse; // mouse UV position sent from JS

// UV coordinates from the vertex shader.
varying vec2 vUv; // UV for this fragment

void main() {
    // Sample the base color from the image using the particle's UV.
    vec4 pictureColor = texture2D(uPictureTexture, vUv);

    // Distance from this particle's UV to the mouse UV (0 = at cursor, larger = farther).
    float mouseDistance = distance(vUv, uMouse);

    // Compute a soft glow value: 1 near the mouse, 0 far away.
    float glow = 1.0 - smoothstep(0.0, 0.22, mouseDistance);
    // Square the glow to make the center brighter and the falloff smoother.
    glow = glow * glow;

    // Blend texture color with a slight gray for subtlety (mostly texture, slight desaturation).
    vec3 baseColor = mix(pictureColor.rgb, vec3(0.62), 0.2);

    // Compute alpha (transparency) so particles are more visible near the cursor.
    // Alpha ranges from 0.85 (far) to 1.0 (near) based on glow, for brighter bloom.
    float alpha = mix(0.85, 1.0, glow);

    // Keep the particle shape round: discard fragments outside the point circle.
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) {
        discard; // stop drawing pixels outside the circular point
    }

    // Final color: base color, much brighter near the cursor for strong bloom effect.
    gl_FragColor = vec4(
        baseColor * (1.0 + glow * 2.2), // strong bloom multiplier
        pictureColor.a * alpha // use texture alpha multiplied by our alpha
    );
}