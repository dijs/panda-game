varying vec4 v_position;

void main() {
  v_position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = v_position;
}
