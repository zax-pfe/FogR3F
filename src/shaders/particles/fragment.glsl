uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uOpacity;

varying vec3 vColor;



void main()
{
  // small circle
  float strength = distance(gl_PointCoord, vec2(0.5)); 
  strength = 1.0 - strength * 2.0 ; 

  //   float strength = distance(gl_PointCoord, vec2(0.5)); 
  // strength = 1.0 - strength ;
  // strength = pow(strength, 10.0); // adoucir les bords 


  vec3 color = mix(vec3(0.0), uColor, strength); // mélange la couleur uniforme avec la couleur variable
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}