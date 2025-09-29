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

// ===== COLOR CORRECTION =====

vec3 colorCorrection(vec3 color, float saturation, float contrast, float brightness) {
    // Brightness adjustment
    color *= brightness;
    
    // Contrast adjustment (around midpoint 0.5)
    color = (color - 0.5) * contrast + 0.5;
    
    // Saturation adjustment
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, saturation);
    
    // Clamp to valid range
    return clamp(color, 0.0, 1.0);
}

vec3 vibrance(vec3 color, float amount) {
    float max_color = max(color.r, max(color.g, color.b));
    float min_color = min(color.r, min(color.g, color.b));
    float sat = max_color - min_color;
    
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 saturated = mix(vec3(luminance), color, 1.0 + amount);
    
    // Vibrance affects less saturated colors more
    return mix(color, saturated, (1.0 - sat));
}

// ===== CALCULATE FLOW DISTORTION =====

vec2 calculateFlowDistortion(vec2 uv) {
    vec3 flow = texture2D(tFlow, uv).rgb;
    
    // Sample neighboring flow values for smoother distortion
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
    
    // Mouse-based distortion
    vec2 mouseDistortion = flowAvg.xy * 0.9;
    
    // Languid waves
    float languidFrequency = 6.0;
    float languidSpeed = 0.03;
    float languidStrength = 0.03;
    vec2 wave1 = vec2(sin(uv.y * languidFrequency + uTime * languidSpeed), cos(uv.x * languidFrequency + uTime * languidSpeed));
    vec2 wave2 = vec2(sin(uv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6), cos(uv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6));
    vec2 languidDistortion = (wave1 + wave2) * languidStrength;
    
    return mouseDistortion + languidDistortion;
}

// ===== EFFECTS =====

vec3 iridescence(vec2 uv, float distortion, float time) {
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float hue = fract(angle / 6.28318 + distortion * 3.0 + time * 0.08);
    float hue2 = fract(length(uv - 0.5) * 2.0 - time * 0.05);
    hue = mix(hue, hue2, 0.3);
    vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = mix(vec3(dot(rgb, vec3(0.299, 0.587, 0.114))), rgb, 0.2);
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
    
    float combinedNoise = pow(abs(noise1 + noise2), 2.0) * 0.5 + 0.5;
    float caustics = smoothstep(0.5, 0.9, combinedNoise);
    
    return vec4(vec3(caustics), caustics * 0.3);
}

// ===== MAIN COMPOSITION =====

void main() {
    // Calculate flow distortion ONCE at the beginning
    vec2 flowDistortion = calculateFlowDistortion(vUv);
    vec2 distortedUv = vUv + flowDistortion;
    float distortionStrength = length(flowDistortion);
    
    // Apply distorted UVs to ALL effects
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
    
    // ===== COLOR CORRECTION =====
    // Boost saturation, contrast, and brightness for vibrant colors
    mixedColor.rgb = colorCorrection(mixedColor.rgb, 1.35, 1.12, 1.05);
    
    // Add vibrance for extra pop on less saturated areas
    mixedColor.rgb = vibrance(mixedColor.rgb, 0.25);
    
    gl_FragColor = vec4(mixedColor.rgb, 1.0);
}