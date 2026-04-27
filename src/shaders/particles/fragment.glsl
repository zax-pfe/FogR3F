// our image texture, which will be used to color the particles.
uniform sampler2D uPictureTexture;
uniform vec2 uMouse;

// uv coordinates of the current vertex, passed from the geometry shader.
varying vec2 vUv;

void main() {
    // we take the color from the texture using the uv coordinates of the current vertex.
    vec4 pictureColor = texture2D(uPictureTexture, vUv);

    // distance from the exact vertex to the center of the point, which is used to create a circular shape for the particles.
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    // distance from the particle to the cursor in UV space.
    float d = distance(vUv, uMouse);
    // transparency: the closer the cursor, the stronger the particle is visible.
    float alpha = 1.3 - smoothstep(0.0, 0.2, d);

    // make every particle rounded cutting all after radius of 05.5
    if(distanceToCenter > 0.5) {
        discard;
    }
    //we color the vertex with the color from the texture and apply transparency based on the distance to the cursor. The closer to the cursor, the more visible the particle is.
    gl_FragColor = vec4(pictureColor.rgb, alpha);
}