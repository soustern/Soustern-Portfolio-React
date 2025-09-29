precision mediump float;

// Uniforms
uniform sampler2D tMap;
uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform vec2 uResolution;
uniform float uTime;
uniform float uMixAmount;
uniform float uIridescenceStrength; // 0.0 to 1.0, recommended: 0.4
uniform float uFresnelPower; // 2.0 to 5.0, recommended: 3.0
uniform float uDispersionStrength; // 0.0 to 0.02, recommended: 0.008

// Varying
varying vec2 vUv;

// ===== UTILITY FUNCTIONS =====

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(in vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}

// ===== NEW CUTTING-EDGE EFFECTS =====

// Iridescent/Holographic color shifting (desaturated version)
vec3 iridescence(vec2 uv, float distortion, float time) {
    // Calculate angle from center
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    
    // Create shifting hue based on angle, distortion, and time
    float hue = fract(angle / 6.28318 + distortion * 3.0 + time * 0.08);
    
    // Add secondary layer for more complexity
    float hue2 = fract(length(uv - 0.5) * 2.0 - time * 0.05);
    hue = mix(hue, hue2, 0.3);
    
    // HSV to RGB conversion for rainbow effect
    vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    
    // Heavily desaturate for subtle color hints
    rgb = mix(vec3(dot(rgb, vec3(0.299, 0.587, 0.114))), rgb, 0.2);
    
    return rgb;
}

// Fresnel rim lighting effect
float fresnel(vec2 uv, float power) {
    // Calculate distance from center as a proxy for viewing angle
    vec2 center = vec2(0.5);
    float dist = length(uv - center);
    
    // Normalize to 0-1 range
    dist = clamp(dist * 2.0, 0.0, 1.0);
    
    // Apply Fresnel formula
    return pow(dist, power);
}

// Enhanced spectral dispersion with physics-based separation
vec3 spectralDispersion(sampler2D tex, vec2 uv, vec2 direction, float strength) {
    // Red light bends least
    float r = texture2D(tex, uv + direction * strength * 1.2).r;
    // Green in the middle
    float g = texture2D(tex, uv + direction * strength * 0.6).g;
    // Blue bends most
    float b = texture2D(tex, uv).b;
    
    return vec3(r, g, b);
}

// ===== ORIGINAL EFFECTS (ENHANCED) =====

vec4 lensDistortion(vec2 uv) {
    vec2 fragCoord = vUv * uResolution;
    vec3 result = vec3(1.0);
    
    vec2 sphereCenter = uResolution * 0.5;
    vec2 sphereCenterUv = vec2(0.5, 0.5);
    
    float minDim = min(uResolution.x, uResolution.y);
    float sphereRadius = minDim * 0.6;
    
    float focusFactor = 1.9;
    float chromaticAberrationFactor = 0.3;
    
    float zoom = 1.9;
    vec2 zoomedUv = sphereCenterUv + (vUv - sphereCenterUv) / zoom;
    
    float distanceFromCenter = distance(fragCoord, sphereCenter);
    float normalizedDistance = distanceFromCenter / sphereRadius;
    
    float smoothEdgeFalloff = 1.0 - smoothstep(0.3, 1.0, normalizedDistance);
    
    vec2 direction = normalize(fragCoord - sphereCenter);
    float distortionAmount = pow(normalizedDistance, focusFactor);
    vec2 baseDistortion = direction * distortionAmount * 2.0 * smoothEdgeFalloff;
    
    float aberrationOffset = chromaticAberrationFactor * normalizedDistance * smoothEdgeFalloff;
    
    // Apply spectral dispersion instead of simple chromatic aberration
    vec2 dispersionDir = direction * smoothEdgeFalloff;
    result = spectralDispersion(tMap, zoomedUv + baseDistortion, dispersionDir, uDispersionStrength);
    
    vec3 image = texture2D(tMap, vUv).rgb;
    result = mix(image, result, smoothEdgeFalloff);
    
    return vec4(result, smoothEdgeFalloff);
}

vec4 painterEffect(vec2 inputUv) {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    
    float radius = 0.03;
    vec2 offset1 = vec2(radius, 0.0);
    vec2 offset2 = vec2(0.0, radius);
    vec2 offset3 = vec2(-radius, 0.0);
    vec2 offset4 = vec2(0.0, -radius);
    
    vec3 flowAvg = (
        texture2D(tFlow, vUv + offset1).rgb +
        texture2D(tFlow, vUv + offset2).rgb +
        texture2D(tFlow, vUv + offset3).rgb +
        texture2D(tFlow, vUv + offset4).rgb +
        flow
    ) / 5.0;
    
    vec2 mouseDistortion = flowAvg.xy * 0.9;
    
    float languidFrequency = 6.0;
    float languidSpeed = 0.03;
    float languidStrength = 0.03;
    vec2 wave1 = vec2(sin(vUv.y * languidFrequency + uTime * languidSpeed), cos(vUv.x * languidFrequency + uTime * languidSpeed));
    vec2 wave2 = vec2(sin(vUv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6), cos(vUv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6));
    vec2 languidDistortion = (wave1 + wave2) * languidStrength;
    
    vec2 totalDistortion = mouseDistortion + languidDistortion;
    vec2 distortedUv = vUv + totalDistortion;
    float distortionStrength = length(totalDistortion);
    
    float stretchThreshold = 0.005;
    float stretchIntensity = 0.8;
    
    vec3 finalColor;
    
    if (distortionStrength > stretchThreshold) {
        vec2 stretchDir = normalize(totalDistortion);
        vec3 sampleColor = texture2D(tWater, distortedUv).rgb;
        float brightness = dot(sampleColor, vec3(0.299, 0.587, 0.114));
        
        float stretchAmount = pow(brightness, 1.5) * stretchIntensity * smoothstep(stretchThreshold, 0.2, distortionStrength);
        
        vec2 stretchUv1 = distortedUv - stretchDir * stretchAmount;
        vec2 stretchUv2 = distortedUv - stretchDir * stretchAmount * 0.5;
        vec2 stretchUv3 = distortedUv - stretchDir * stretchAmount * 1.5;
        
        // Apply spectral dispersion to stretched samples
        vec3 color1 = spectralDispersion(tWater, stretchUv1, stretchDir, uDispersionStrength * 0.5);
        vec3 color2 = spectralDispersion(tWater, stretchUv2, stretchDir, uDispersionStrength * 0.3);
        vec3 color3 = texture2D(tWater, stretchUv3).rgb;
        
        float weight = smoothstep(0.0, 0.3, distortionStrength);
        finalColor = mix(mix(color2, color1, 0.6), color3, weight * 0.4);
        finalColor = mix(finalColor, finalColor * 1.2, weight * 0.3);
    } else {
        finalColor = texture2D(tWater, distortedUv).rgb;
    }
    
    return vec4(finalColor, distortionStrength);
}

vec4 causticReflections(float time) {
    vec2 uv = vUv;
    float speed = 0.03;
    float scale = 3.0;
    
    float noise1 = noise(uv * scale + vec2(time * speed, time * speed * 0.8));
    float noise2 = noise(uv * scale * 0.9 + vec2(10.0, -time * speed * 0.7));
    
    float combinedNoise = pow(abs(noise1 + noise2), 2.0) * 0.5 + 0.5;
    float caustics = smoothstep(0.5, 0.9, combinedNoise);
    
    return vec4(vec3(caustics), caustics * 0.3);
}

// ===== MAIN COMPOSITION =====

void main() {
    // Get base effects
    vec4 lensResult = lensDistortion(vUv);
    vec4 painterResult = painterEffect(vUv);
    
    // Mix the two base effects
    vec4 mixedColor = mix(lensResult, painterResult, uMixAmount);
    float distortionMask = mix(lensResult.a, painterResult.a, uMixAmount);
    
    // Layer 1: Add iridescence based on distortion (heavily reduced)
    vec3 iriColor = iridescence(vUv, distortionMask, uTime);
    mixedColor.rgb += iriColor * uIridescenceStrength * distortionMask * 0.15;
    
    // Layer 2: Add caustics with blending (reduced intensity)
    vec4 caustics = causticReflections(uTime);
    mixedColor.rgb = mixedColor.rgb * (1.0 - caustics.a) + caustics.rgb * caustics.a * 0.25;
    
    // Layer 3: Apply Fresnel rim lighting (reduced intensity)
    float fresnelTerm = fresnel(vUv, uFresnelPower);
    vec3 rimColor = vec3(0.6, 0.7, 0.85); // Softer blue rim
    mixedColor.rgb += rimColor * fresnelTerm * 0.08 * (1.0 + distortionMask * 0.3);
    
    // Layer 4: Add subtle iridescent rim on edges (heavily reduced)
    vec3 rimIridescence = iridescence(vUv, fresnelTerm, uTime * 0.5);
    mixedColor.rgb += rimIridescence * fresnelTerm * uIridescenceStrength * 0.04;
    
    // Final color output
    gl_FragColor = vec4(mixedColor.rgb, 1.0);
}