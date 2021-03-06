precision mediump float;

uniform float time;
uniform float width;
uniform float height;
uniform float position;

varying vec2 vTextureCoord; //The coordinates of the current pixel
uniform sampler2D uSampler; //The image data

float backgroundMovementSpeed = 0.005;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(width, height);
  // mountain range wave
  float y = (sin(uv.x * 7. + position * backgroundMovementSpeed) * 0.1) + 0.5;
  float y2 = (sin(uv.x * 13. + position * backgroundMovementSpeed * 0.3) * 0.2) + 0.5;
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
  vec4 bgColor = texture2D(uSampler, vTextureCoord);
  if (bgColor.r == 0. && bgColor.g == 0. && bgColor.b == 0.) {
  // if (length(bgColor) == 0.) {
    gl_FragColor = vec4(color, 1.);
  } else {
    gl_FragColor = bgColor;
  }
}
