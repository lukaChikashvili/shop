export const glassFragment = `

precision highp float;

uniform sampler2D uTexture;
uniform float uTime;

uniform float uStrength;
uniform float uSpeed;
uniform float uNoise;
uniform float uMouseInfluence;
uniform float uChromaticAberration;

uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;


// --------------------------------------------------
// Random
// --------------------------------------------------

float random(vec2 st) {
    return fract(
        sin(dot(st.xy, vec2(12.9898, 78.233)))
        * 43758.5453123
    );
}


// --------------------------------------------------
// Noise
// --------------------------------------------------

float noise(vec2 st) {

    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        a,
        b,
        u.x
    )
    +
    (c - a) * u.y * (1.0 - u.x)
    +
    (d - b) * u.x * u.y;
}


// --------------------------------------------------
// Fractal noise
// --------------------------------------------------

float fbm(vec2 st) {

    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {

        value += amplitude * noise(st);

        st *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}


// --------------------------------------------------
// Main
// --------------------------------------------------

void main() {

    vec2 uv = vUv;

    // ----------------------------------------------
    // Animated noise
    // ----------------------------------------------

    float time = uTime * uSpeed;

    vec2 noiseUv = uv * 3.0;

    noiseUv.x += time * 0.15;
    noiseUv.y += sin(time * 0.4) * 0.2;

    float n = fbm(noiseUv);

    // ----------------------------------------------
    // Liquid movement
    // ----------------------------------------------

    float distortionX =
        sin(uv.y * 10.0 + time * 1.5)
        * 0.015;

    float distortionY =
        sin(uv.x * 12.0 + time * 1.2)
        * 0.015;

    vec2 distortion = vec2(
        distortionX,
        distortionY
    );

    distortion +=
        (n - 0.5)
        * 0.08
        * uNoise;

    distortion *= uStrength;

    // ----------------------------------------------
    // Mouse interaction
    // ----------------------------------------------

    vec2 mouseDirection = uv - uMouse;

    float mouseDistance =
        length(mouseDirection);

    float mouseEffect =
        smoothstep(
            0.6,
            0.0,
            mouseDistance
        );

    vec2 mouseDistortion =
        normalize(mouseDirection + 0.0001)
        * mouseEffect
        * 0.05
        * uMouseInfluence;

    distortion += mouseDistortion;

    // ----------------------------------------------
    // Final UV
    // ----------------------------------------------

    vec2 finalUv =
        uv + distortion;

    // ----------------------------------------------
    // Chromatic aberration
    // ----------------------------------------------

    float aberration =
        uChromaticAberration;

    vec2 direction =
        normalize(
            finalUv - vec2(0.5)
            + 0.0001
        );

    float redOffset =
        aberration * 1.2;

    float blueOffset =
        aberration * 0.8;

    float r = texture2D(
        uTexture,
        finalUv + direction * redOffset
    ).r;

    float g = texture2D(
        uTexture,
        finalUv
    ).g;

    float b = texture2D(
        uTexture,
        finalUv - direction * blueOffset
    ).b;

    vec3 color = vec3(r, g, b);

    // ----------------------------------------------
    // Glass highlight
    // ----------------------------------------------

    float highlight =
        smoothstep(
            0.8,
            0.2,
            length(uv - vec2(0.35, 0.25))
        );

    color +=
        highlight
        * vec3(0.08)
        * uStrength;

    // ----------------------------------------------
    // Vignette
    // ----------------------------------------------

    float vignette =
        uv.x * uv.y *
        (1.0 - uv.x) *
        (1.0 - uv.y);

    vignette =
        pow(vignette * 16.0, 0.15);

    color *= vignette;

    gl_FragColor =
        vec4(color, 1.0);
}


`