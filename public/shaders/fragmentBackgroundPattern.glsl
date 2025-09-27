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

// === ENHANCEMENT FUNCTIONS ===

// 1. ANIMATED WAVES & DISTORTION
vec2 addWaveDistortion(vec2 uv, float time) {
    float waveSpeed = 0.5;
    float waveAmplitude = 0.02;
    float waveFrequency = 8.0;
    
    vec2 wave = vec2(
        sin(uv.y * waveFrequency + time * waveSpeed) * waveAmplitude,
        cos(uv.x * waveFrequency + time * waveSpeed) * waveAmplitude
    );
    return uv + wave;
}

// 2. PULSING ENERGY NODES
float addEnergyNodes(vec2 uv, float time) {
    float energy = 0.0;
    
    // Create multiple pulsing nodes
    vec2 nodes[3];
    nodes[0] = vec2(0.3, 0.4);
    nodes[1] = vec2(0.7, 0.6);
    nodes[2] = vec2(0.5, 0.2);
    
    for(int i = 0; i < 3; i++) {
        float dist = length(uv - nodes[i]);
        float pulse = sin(time * 3.0 + float(i) * 2.0) * 0.5 + 0.5;
        energy += exp(-dist * 15.0) * pulse * 0.8;
    }
    
    return energy;
}

// 3. HEXAGONAL GRID VARIATION
vec4 createHexGrid(vec2 uv) {
    // Convert to hexagonal coordinates
    vec2 s = vec2(1.0, 1.732);
    vec2 h = uv * 20.0;
    vec2 a = mod(h, s) - s * 0.5;
    vec2 b = mod(h - s * 0.5, s) - s * 0.5;
    
    float d1 = dot(a, a);
    float d2 = dot(b, b);
    
    float hexDist = min(d1, d2);
    float hexLine = 1.0 - smoothstep(0.0, 0.1, hexDist);
    
    vec3 hexColor = vec3(0.4, 0.8, 1.0);
    return vec4(hexColor * hexLine, hexLine);
}

// 4. MOUSE INTERACTION RIPPLES
float addMouseRipples(vec2 uv, vec2 mouse, float time) {
    float dist = length(uv - mouse);
    float ripple = sin(dist * 30.0 - time * 8.0) * exp(-dist * 3.0);
    return max(ripple * 0.5, 0.0);
}

// 5. CHROMATIC ABERRATION EFFECT
vec3 addChromaticAberration(vec2 uv, vec3 baseColor) {
    float aberrationStrength = 0.003;
    vec2 offset = (uv - 0.5) * aberrationStrength;
    
    float r = baseColor.r;
    float g = baseColor.g * 0.95; // Slightly shift green
    float b = baseColor.b * 0.9;  // More shift for blue
    
    return vec3(r, g, b);
}

// 6. SCANLINE EFFECT
float addScanlines(vec2 uv, float time) {
    float scanlineFreq = 200.0;
    float scanlineSpeed = 2.0;
    float scanlines = sin(uv.y * scanlineFreq + time * scanlineSpeed) * 0.04 + 0.96;
    return scanlines;
}

// 7. PARALLAX LAYERS (now createFadingGrid is already defined)
vec4 createParallaxGrid(vec2 uv, float time) {
    vec4 layer1 = createFadingGrid(uv + vec2(time * 0.01, 0.0));
    vec4 layer2 = createFadingGrid(uv * 1.5 + vec2(time * -0.005, time * 0.008));
    vec4 layer3 = createFadingGrid(uv * 0.7 + vec2(time * 0.002, time * -0.003));
    
    // Properly blend layers
    layer2 *= 0.5;
    layer3 *= 0.3;
    
    return layer1 + layer2 + layer3;
}

// 8. GLITCH EFFECT
vec2 addGlitch(vec2 uv, float time) {
    float glitchStrength = 0.01;
    float glitchFreq = sin(time * 15.0) > 0.95 ? 1.0 : 0.0;
    
    if(glitchFreq > 0.5) {
        float randomShift = fract(sin(floor(uv.y * 100.0) * 12.9898) * 43758.5453);
        uv.x += (randomShift - 0.5) * glitchStrength;
    }
    
    return uv;
}

// 9. HOLOGRAPHIC INTERFERENCE
float addHolographicEffect(vec2 uv, float time) {
    float interference = 0.0;
    
    // Multiple interference patterns
    interference += sin(uv.x * 50.0 + time * 2.0) * 0.02;
    interference += cos(uv.y * 30.0 - time * 1.5) * 0.015;
    interference += sin((uv.x + uv.y) * 40.0 + time * 3.0) * 0.01;
    
    return interference;
}

// 10. ENHANCED MAIN FUNCTION WITH ALL EFFECTS
vec4 createEnhancedGrid(vec2 uv, float time, vec2 mouse) {
    // Apply distortions first
    uv = addWaveDistortion(uv, time);
    uv = addGlitch(uv, time);
    
    // Get base grid
    vec4 baseGrid = createFadingGrid(uv);
    
    // Add energy nodes
    float energy = addEnergyNodes(uv, time);
    baseGrid.rgb += energy * vec3(0.3, 0.6, 1.0);
    baseGrid.a += energy * 0.2; // Also boost alpha
    
    // Add mouse ripples
    float ripples = addMouseRipples(uv, mouse, time);
    baseGrid.rgb += ripples * vec3(1.0, 0.8, 0.4);
    baseGrid.a += ripples * 0.1;
    
    // Add holographic interference
    float hologram = addHolographicEffect(uv, time);
    baseGrid.rgb += hologram * vec3(0.5, 1.0, 0.8);
    
    // Apply scanlines
    float scanlines = addScanlines(uv, time);
    baseGrid.rgb *= scanlines;
    
    // Apply chromatic aberration
    baseGrid.rgb = addChromaticAberration(uv, baseGrid.rgb);
    
    // Clamp alpha to prevent overflow
    baseGrid.a = min(baseGrid.a, uOpacity);
    
    return baseGrid;
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