precision mediump float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uOpacity;

vec4 createFadingGrid(vec2 uv) {
    // --- 1. Grid & Glow Parameters ---
    float gridDensity = 25.0;
    
    // --- CHANGE: Softer, cooler color ---
    // Pure white can be harsh. A slightly cool white blends better with dark backgrounds.
    vec3 gridColor = vec3(0.8, 0.9, 1.0); 

    // --- CHANGE: We now define a sharp core and a soft glow ---
    float coreSharpness = 25.0; // Makes the central line thin and defined
    float glowFalloff = 6.0;    // Makes the glow wide and soft
    float glowIntensity = 0.3;  // The glow should be much dimmer than the core

    vec2 gridFract = fract(uv * gridDensity);
    vec2 distanceFromCenter = abs(gridFract - 0.5);

    float coreLineX = pow(1.0 - distanceFromCenter.x * 2.0, coreSharpness);
    float coreLineY = pow(1.0 - distanceFromCenter.y * 2.0, coreSharpness);
    float coreStrength = coreLineX + coreLineY;

    float glowLineX = pow(1.0 - distanceFromCenter.x * 2.0, glowFalloff);
    float glowLineY = pow(1.0 - distanceFromCenter.y * 2.0, glowFalloff);
    float glowStrength = (glowLineX + glowLineY) * glowIntensity;
    
    // Combine them. The glow acts as a soft bed for the sharp core line.
    float gridStrength = coreStrength + glowStrength;
    
    // --- 3. APPLY ASPECT-CORRECTED RADIAL FADE (Essential Fix) ---
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 centeredUv = uv - 0.5;
    centeredUv.x *= aspectRatio;
    
    float dist = length(centeredUv);
    float fadeEndRadius = 0.70;
    float fadeStartRadius = 0.5;

    float radialFade = 1.0 - smoothstep(fadeStartRadius, fadeEndRadius, dist);
    
    // --- 4. Calculate Final Color and Alpha (No change in logic) ---
    float finalBrightness = gridStrength * radialFade;
    vec3 finalRGB = gridColor * finalBrightness;
    float finalAlpha = finalBrightness * uOpacity;

    // We clamp the alpha to the master opacity to prevent overly bright intersections
    // from becoming more opaque than intended.
    finalAlpha = min(finalAlpha, uOpacity);

    return vec4(finalRGB, finalAlpha);
}

void main() {
    gl_FragColor = createFadingGrid(vUv);
}