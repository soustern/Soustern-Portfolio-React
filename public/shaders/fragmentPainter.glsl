precision highp float;

uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform vec4 res;
uniform float uTime;

varying vec2 vUv;

void main() {
    // --- 1. BASE DISTORTION CALCULATION ---
    vec3 flow = texture2D(tFlow, vUv).rgb;
    vec2 mouseDistortion = flow.xy * 0.1;

    float languidFrequency = 6.0;
    float languidSpeed = 0.03;
    float languidStrength = 0.01;
    vec2 wave1 = vec2(sin(vUv.y * languidFrequency + uTime * languidSpeed), cos(vUv.x * languidFrequency + uTime * languidSpeed));
    vec2 wave2 = vec2(sin(vUv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6), cos(vUv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6));
    vec2 languidDistortion = (wave1 + wave2) * languidStrength;

    vec2 totalDistortion = mouseDistortion + languidDistortion;
    vec2 uv = vUv + totalDistortion;
    float distortionStrength = length(totalDistortion);

    // --- 2. PIXEL STRETCHING EFFECT ---

    // Tweak these values to control the stretch
    float stretchThreshold = 0.01;  // Distortion needed to start the effect.
    float stretchIntensity = 0.3;   // How far the pixels can be stretched.

    vec3 finalColor;

    if (distortionStrength > stretchThreshold) {
        // Get the direction of the distortion flow
        vec2 stretchDir = normalize(totalDistortion);

        // Sample the original color at the distorted position to get its brightness
        vec3 sampleColor = texture2D(tWater, uv).rgb;
        float brightness = dot(sampleColor, vec3(0.299, 0.587, 0.114));

        // The stretch amount is based on brightness and distortion strength
        float stretchAmount = pow(brightness, 2.0) * stretchIntensity * smoothstep(stretchThreshold, 0.1, distortionStrength);

        // Create the final offset and sample the texture there
        vec2 stretchUv = uv - stretchDir * stretchAmount;
        finalColor = texture2D(tWater, stretchUv).rgb;

    } else {
        // If there's no stretch, sample normally
        finalColor = texture2D(tWater, uv).rgb;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}