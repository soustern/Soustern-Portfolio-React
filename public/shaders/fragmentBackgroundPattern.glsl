precision mediump float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uOpacity;
uniform float uTime; // Add time for animations
uniform vec2 uMouse; // Mouse position for interactivity

// === ORIGINAL FUNCTION FIRST (must be declared before use) ===
vec4 createFadingGrid(vec2 uv) {
    float gridDensity = 25.0;
    vec3 gridColor = vec3(0.8, 0.9, 1.0);
    float coreSharpness = 25.0;
    float glowFalloff = 6.0;
    float glowIntensity = 0.3;

    vec2 gridFract = fract(uv * gridDensity);
    vec2 distanceFromCenter = abs(gridFract - 0.5);

    float coreLineX = pow(1.0 - distanceFromCenter.x * 2.0, coreSharpness);
    float coreLineY = pow(1.0 - distanceFromCenter.y * 2.0, coreSharpness);
    float coreStrength = coreLineX + coreLineY;

    float glowLineX = pow(1.0 - distanceFromCenter.x * 2.0, glowFalloff);
    float glowLineY = pow(1.0 - distanceFromCenter.y * 2.0, glowFalloff);
    float glowStrength = (glowLineX + glowLineY) * glowIntensity;
    
    float gridStrength = coreStrength + glowStrength;
    
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 centeredUv = uv - 0.5;
    centeredUv.x *= aspectRatio;
    
    float dist = length(centeredUv);
    float fadeEndRadius = 0.70;
    float fadeStartRadius = 0.5;

    float radialFade = 1.0 - smoothstep(fadeStartRadius, fadeEndRadius, dist);
    
    float finalBrightness = gridStrength * radialFade;
    vec3 finalRGB = gridColor * finalBrightness;
    float finalAlpha = finalBrightness * uOpacity;

    finalAlpha = min(finalAlpha, uOpacity);

    return vec4(finalRGB, finalAlpha);
}


void main() {
    // Choose your enhancement:
    
    // Simple version (your original):
    gl_FragColor = createFadingGrid(vUv);
    
    // Enhanced version with all effects:
    // gl_FragColor = createEnhancedGrid(vUv, uTime, uMouse);
    
    // Or mix specific effects:
    // vec2 distortedUv = addWaveDistortion(vUv, uTime);
    // vec4 grid = createFadingGrid(distortedUv);
    // float energy = addEnergyNodes(vUv, uTime);
    // grid.rgb += energy * vec3(0.3, 0.6, 1.0);
    // gl_FragColor = grid;
}