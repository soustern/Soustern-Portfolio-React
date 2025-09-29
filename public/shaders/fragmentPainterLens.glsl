precision mediump float;

// Uniforms
uniform sampler2D tMap;
uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform vec2 uResolution;
uniform float uTime;
uniform float uMixAmount;
uniform float uIridescenceStrength;
uniform float uFresnelPower;
uniform float uDispersionStrength;

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

// Fractal Brownian Motion for organic detail
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 4; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

// ===== COLOR CORRECTION =====

vec3 colorCorrection(vec3 color, float saturation, float contrast, float brightness) {
    color *= brightness;
    color = (color - 0.5) * contrast + 0.5;
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, saturation);
    return clamp(color, 0.0, 1.0);
}

vec3 vibrance(vec3 color, float amount) {
    float max_color = max(color.r, max(color.g, color.b));
    float min_color = min(color.r, min(color.g, color.b));
    float sat = max_color - min_color;
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 saturated = mix(vec3(luminance), color, 1.0 + amount);
    return mix(color, saturated, (1.0 - sat));
}

// ===== CALCULATE FLOW DISTORTION =====

vec2 calculateFlowDistortion(vec2 uv) {
    vec3 flow = texture2D(tFlow, uv).rgb;
    
    float radius = 0.03;
    vec2 offset1 = vec2(radius, 0.0);
    vec2 offset2 = vec2(0.0, radius);
    vec2 offset3 = vec2(-radius, 0.0);
    vec2 offset4 = vec2(0.0, -radius);
    
    vec3 flowAvg = (
        texture2D(tFlow, uv + offset1).rgb +
        texture2D(tFlow, uv + offset2).rgb +
        texture2D(tFlow, uv + offset3).rgb +
        texture2D(tFlow, uv + offset4).rgb +
        flow
    ) / 5.0;
    
    vec2 mouseDistortion = flowAvg.xy * 0.9;
    
    // Enhanced waves with FBM
    float languidFrequency = 6.0;
    float languidSpeed = 0.03;
    float languidStrength = 0.03;
    
    float fbmValue = fbm(uv * 3.0 + uTime * 0.02);
    
    vec2 wave1 = vec2(sin(uv.y * languidFrequency + uTime * languidSpeed), cos(uv.x * languidFrequency + uTime * languidSpeed));
    vec2 wave2 = vec2(sin(uv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6), cos(uv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6));
    vec2 languidDistortion = (wave1 + wave2) * languidStrength * (0.8 + fbmValue * 0.4);
    
    return mouseDistortion + languidDistortion;
}

// ===== NEW MASTERPIECE EFFECTS (NOW WITH FLOW DISTORTION) =====

// Film grain for organic texture (uses distorted UV)
float filmGrain(vec2 uv, float time) {
    float grain = fract(sin(dot(uv + time * 0.001, vec2(12.9898, 78.233))) * 43758.5453);
    return grain;
}

// Advanced color grading with film-like tones
vec3 cinematicGrade(vec3 color) {
    vec3 lift = vec3(0.02, 0.01, 0.03);
    color = color + lift * (1.0 - color);
    color = pow(color, vec3(0.95, 0.98, 1.02));
    color = color * vec3(0.98, 0.99, 1.02);
    return color;
}

// Ethereal light rays / god rays (uses distorted UV)
float godRays(vec2 uv, vec2 center, float time) {
    vec2 dir = uv - center;
    float dist = length(dir);
    dir = normalize(dir);
    
    float rays = 0.0;
    float rayIntensity = 0.3;
    
    for(int i = 0; i < 8; i++) {
        float t = float(i) / 8.0;
        vec2 samplePos = center + dir * dist * t;
        rays += noise(samplePos * 3.0 + time * 0.02) * rayIntensity;
        rayIntensity *= 0.8;
    }
    
    return rays * (1.0 - smoothstep(0.0, 0.7, dist));
}

// Subsurface scattering approximation (uses distorted UV)
vec3 subsurfaceScattering(vec3 color, float distortion, vec2 uv) {
    float scatter = pow(distortion, 0.5) * 0.3;
    vec3 scatterColor = vec3(0.9, 0.7, 0.5);
    float thickness = fbm(uv * 5.0) * 0.5 + 0.5;
    return color + scatterColor * scatter * thickness * 0.15;
}

// Vignette with custom shape (uses distorted UV)
float vignette(vec2 uv, float intensity, float smoothness) {
    vec2 center = vec2(0.5);
    float dist = distance(uv, center);
    return smoothstep(0.8, 0.8 - smoothness, dist) * (1.0 - intensity) + intensity;
}

// Color temperature adjustment
vec3 colorTemperature(vec3 color, float temperature) {
    vec3 warm = color * vec3(1.0, 0.95, 0.85);
    vec3 cool = color * vec3(0.85, 0.95, 1.0);
    return mix(cool, warm, temperature * 0.5 + 0.5);
}

float ambientOcclusion(vec2 uv, float distortion) {
    float ao = 1.0;
    float radius = 0.02;
    
    for(int i = 0; i < 4; i++) {
        float angle = float(i) * 6.28318 / 4.0;
        vec2 offset = vec2(cos(angle), sin(angle)) * radius;
        float sample = length(calculateFlowDistortion(uv + offset));
        ao -= (distortion - sample) * 0.05; // Reduced from 0.1 to 0.05
    }
    
    return clamp(ao, 0.7, 1.0); // Changed min from 0.0 to 0.7 to prevent blackness
}

// ===== EFFECTS =====

vec3 iridescence(vec2 uv, float distortion, float time) {
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float fbmMod = fbm(uv * 4.0 + time * 0.01) * 0.3;
    float hue = fract(angle / 6.28318 + distortion * 3.0 + time * 0.08 + fbmMod);
    float hue2 = fract(length(uv - 0.5) * 2.0 - time * 0.05);
    hue = mix(hue, hue2, 0.3);
    vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = mix(vec3(dot(rgb, vec3(0.299, 0.587, 0.114))), rgb, 0.3);
    return rgb;
}

float fresnel(vec2 uv, float power) {
    vec2 center = vec2(0.5);
    float dist = length(uv - center);
    dist = clamp(dist * 2.0, 0.0, 1.0);
    return pow(dist, power);
}

vec3 spectralDispersion(sampler2D tex, vec2 uv, vec2 direction, float strength) {
    float r = texture2D(tex, uv + direction * strength * 1.2).r;
    float g = texture2D(tex, uv + direction * strength * 0.6).g;
    float b = texture2D(tex, uv).b;
    return vec3(r, g, b);
}

vec4 lensDistortion(vec2 uv, vec2 baseUv) {
    vec2 fragCoord = uv * uResolution;
    vec3 result = vec3(1.0);
    
    vec2 sphereCenter = uResolution * 0.5;
    vec2 sphereCenterUv = vec2(0.5, 0.5);
    
    float minDim = min(uResolution.x, uResolution.y);
    float sphereRadius = minDim * 0.6;
    
    float focusFactor = 1.9;
    float zoom = 1.9;
    vec2 zoomedUv = sphereCenterUv + (uv - sphereCenterUv) / zoom;
    
    float distanceFromCenter = distance(fragCoord, sphereCenter);
    float normalizedDistance = distanceFromCenter / sphereRadius;
    
    float smoothEdgeFalloff = 1.0 - smoothstep(0.3, 1.0, normalizedDistance);
    
    vec2 direction = normalize(fragCoord - sphereCenter);
    float distortionAmount = pow(normalizedDistance, focusFactor);
    vec2 baseDistortion = direction * distortionAmount * 2.0 * smoothEdgeFalloff;
    
    vec2 dispersionDir = direction * smoothEdgeFalloff;
    result = spectralDispersion(tMap, zoomedUv + baseDistortion, dispersionDir, uDispersionStrength);
    
    vec3 image = texture2D(tMap, baseUv).rgb;
    result = mix(image, result, smoothEdgeFalloff);
    
    return vec4(result, smoothEdgeFalloff);
}

vec4 painterEffect(vec2 distortedUv, vec2 totalDistortion) {
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

vec4 causticReflections(vec2 uv, float time) {
    float speed = 0.03;
    float scale = 3.0;
    
    float noise1 = noise(uv * scale + vec2(time * speed, time * speed * 0.8));
    float noise2 = noise(uv * scale * 0.9 + vec2(10.0, -time * speed * 0.7));
    float fbmLayer = fbm(uv * scale * 1.5 + time * speed * 0.5) * 0.3;
    
    float combinedNoise = pow(abs(noise1 + noise2 + fbmLayer), 2.0) * 0.5 + 0.5;
    float caustics = smoothstep(0.5, 0.9, combinedNoise);
    
    vec3 causticColor = vec3(0.9, 0.95, 1.0) * caustics;
    
    return vec4(causticColor, caustics * 0.3);
}

// ===== MAIN COMPOSITION =====

void main() {
    // Calculate flow distortion ONCE
    vec2 flowDistortion = calculateFlowDistortion(vUv);
    vec2 distortedUv = vUv + flowDistortion;
    float distortionStrength = length(flowDistortion);
    
    // Clamp distortion to prevent extreme values
    distortedUv = clamp(distortedUv, 0.0, 1.0);
    distortionStrength = min(distortionStrength, 1.0);
    
    // Apply distorted UVs to base effects
    vec4 lensResult = lensDistortion(distortedUv, vUv);
    vec4 painterResult = painterEffect(distortedUv, flowDistortion);
    
    // Mix the two base effects
    vec4 mixedColor = mix(lensResult, painterResult, uMixAmount);
    float distortionMask = mix(lensResult.a, painterResult.a, uMixAmount);
    
    // Use distorted UVs for iridescence
    vec3 iriColor = iridescence(distortedUv, distortionMask, uTime);
    mixedColor.rgb += iriColor * uIridescenceStrength * distortionMask * 0.3;
    
    // Use distorted UVs for caustics
    vec4 caustics = causticReflections(distortedUv, uTime);
    mixedColor.rgb = mixedColor.rgb * (1.0 - caustics.a) + caustics.rgb * caustics.a * 0.55;
    
    // Use distorted UVs for Fresnel
    float fresnelTerm = fresnel(distortedUv, uFresnelPower);
    vec3 rimColor = vec3(0.6, 0.7, 0.85);
    mixedColor.rgb += rimColor * fresnelTerm * 0.08 * (1.0 + distortionMask * 0.3);
    
    // Use distorted UVs for rim iridescence
    vec3 rimIridescence = iridescence(distortedUv, fresnelTerm, uTime * 0.2);
    mixedColor.rgb += rimIridescence * fresnelTerm * uIridescenceStrength * 0.6;
    
    // ===== MASTERPIECE LAYERS (ALL WITH DISTORTED UVs) =====
    
    // 1. Subsurface scattering for depth (uses distorted UV)
    mixedColor.rgb = subsurfaceScattering(mixedColor.rgb, distortionMask, distortedUv);
    
    // 2. God rays for ethereal quality (uses distorted UV)
    float rays = godRays(distortedUv, vec2(0.5), uTime);
    mixedColor.rgb += vec3(0.9, 0.95, 1.0) * rays * 0.15;
    
    // 3. Ambient occlusion - DISABLED TO DEBUG
    float ao = ambientOcclusion(distortedUv, distortionStrength);
    mixedColor.rgb *= ao;
    
    // 4. Cinematic color grading
    mixedColor.rgb = cinematicGrade(mixedColor.rgb);
    
    // 5. Color correction and vibrance
    mixedColor.rgb = colorCorrection(mixedColor.rgb, 1.35, 1.12, 1.05);
    mixedColor.rgb = vibrance(mixedColor.rgb, 0.35);
    
    // 6. Subtle color temperature adjustment
    mixedColor.rgb = colorTemperature(mixedColor.rgb, 0.1);
    
    // 7. Vignette - USE ORIGINAL UV INSTEAD OF DISTORTED
    float vig = vignette(vUv, 0.15, 0.5);
    mixedColor.rgb *= vig;
    
    // 8. Film grain for organic texture (uses distorted UV)
    float grain = filmGrain(distortedUv, uTime);
    mixedColor.rgb += (grain - 0.5) * 0.015;
    
    // Final safety clamp
    mixedColor.rgb = clamp(mixedColor.rgb, 0.1, 10.0);
    
    gl_FragColor = vec4(mixedColor.rgb, 1.0);
}