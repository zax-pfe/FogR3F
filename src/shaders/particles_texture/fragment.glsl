uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uOpacity;



void main()
{

    vec2 uv = gl_PointCoord;
  vec4 textureColor = texture2D(uTexture, uv);
  // if (tex.a < 0.1) discard; // coupe les bords

  // gl_FragColor = textureColor;
  vec3 finalColor = textureColor.rgb * uColor;
    gl_FragColor = vec4(finalColor, textureColor.a * uOpacity);


    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
    #include <colorspace_fragment>
}