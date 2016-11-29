uniform float u_time;
uniform vec2 u_resolution;

void main() {

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // mountain range wave
  float y = (sin(uv.x * 7. + u_time) * 0.1) +
    0.5;

  vec3 color = vec3(0.);
  // mountain grass
  if (uv.y < y) {
    color = vec3(0., uv.y, 0.);
    float height = uv.y;
    // snow
    if (height > (0.5 + sin(y * 20.) * 0.05)) {
      color = vec3(1.);
    }
  }

  gl_FragColor = vec4(color, 1.);
}
