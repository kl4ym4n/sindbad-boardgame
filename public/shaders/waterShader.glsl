
precision mediump float;


uniform float time;
uniform vec2 resolution;
uniform sampler2D uTexture;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    float waveX = sin(uv.y * 10.0 + time * 2.0) * 0.01 +
                  sin(uv.y * 20.0 + time * 1.0) * 0.005;
    float waveY = cos(uv.x * 15.0 + time * 1.5) * 0.01 +
                  cos(uv.x * 25.0 + time * 0.8) * 0.005;
    uv += vec2(waveX, waveY);

    vec4 texColor = texture2D(uTexture, uv);

    float brightness = 0.85 +
                      0.15 * sin(time + uv.y * 10.0) +
                      0.1 * sin(time * 0.7 + uv.x * 15.0);
    texColor.rgb *= brightness;

    gl_FragColor = texColor;
}
