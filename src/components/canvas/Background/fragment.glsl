uniform float time;
uniform float progress;
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main() {
    //vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec(0.5);
    //  gl_FragColor = vec4(vUv, .0., 1.0);
    vec4 displacement = texture2D(uDisplacement, vUv);
    float theta = displacement.r*2.0*PI;

    vec2 dir = vec2(sin(theta), cos(theta));


    vec2 uv = vUv + dir*displacement.r;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
}