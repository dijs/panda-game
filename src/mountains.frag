uniform float u_time; // could use character position instead
uniform vec2 u_resolution;
uniform sampler2D tDiffuse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // mountain range wave
  float y = (sin(uv.x * 7. + u_time) * 0.1) + 0.5;
  float y2 = (sin(uv.x * 13. + u_time * 0.3) * 0.2) + 0.5;
  vec3 color = vec3(0.);
  // far away mountains
  if (uv.y < y2) {
    color = mix(vec3(0., uv.y, 0.), vec3(1.), 0.5);
  }
  // mountain grass
  if (uv.y < y) {
    color = vec3(0., uv.y, 0.);
    float height = uv.y;
    // snow
    if (height > (0.5 + sin(y * 20.) * 0.05)) {
      color = vec3(1.);
    }
  }
  // Show texture over mountains
  vec4 bgColor = texture2D(tDiffuse, uv);
  if (length(bgColor.rgb) == 0.) {
    gl_FragColor = vec4(color, 1.);
  } else {
    gl_FragColor = bgColor;
  }
}
