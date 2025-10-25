precision mediump float;
uniform sampler2D tMap;        
uniform vec2 uResolution;      
uniform float uTime;           
varying vec2 vUv;

struct DistortedLens {
    vec2 uv_R;
    vec2 uv_G;
    vec2 uv_B;
    float inside;
};

vec2 zoomUV(vec2 uv, vec2 center, float zoom) {
    return center + (uv - center) / zoom;
}

DistortedLens getLensDistortion(vec2 fragCoord, vec2 zoomedUv, vec2 sphereCenter, float sphereRadius, float focusFactor, float chromaticAberrationFactor) {
    DistortedLens result;
    
    float distanceFromCenter = distance(fragCoord, sphereCenter);
    float normalizedDistance = distanceFromCenter / sphereRadius;
    
    // Check if we're inside the sphere
    result.inside = step(distanceFromCenter, sphereRadius);
    
    // Lens distortion calculation
    vec2 direction = normalize(fragCoord - sphereCenter);
    // Use exponential falloff for stronger edge distortion
    float edgeFalloff = smoothstep(0.0, 2.0, normalizedDistance);
    float distortionAmount = pow(normalizedDistance, focusFactor) * edgeFalloff * result.inside;
    vec2 baseDistortion = direction * distortionAmount * 0.2; // Increased multiplier
    
    // Chromatic aberration offsets
    float aberrationOffset = chromaticAberrationFactor * normalizedDistance * result.inside;
    
    result.uv_R = zoomedUv + baseDistortion * (1.0 + aberrationOffset);
    result.uv_G = zoomedUv + baseDistortion;
    result.uv_B = zoomedUv + baseDistortion * (1.0 - aberrationOffset);
    
    return result;
}

void main() {
    vec2 fragCoord = vUv * uResolution;
    vec3 result = vec3(1.0);
    
    // Fixed sphere center (center of canvas)
    vec2 sphereCenter = uResolution * 0.5;
    vec2 sphereCenterUv = vec2(0.5, 0.5);
    
    float minDim = min(uResolution.x, uResolution.y);
    float sphereRadius = minDim * 0.51;
    float focusFactor = 0.3;
    float chromaticAberrationFactor = 0.5;
    
    float zoom = 1.8;
    vec2 zoomedUv = zoomUV(vUv, sphereCenterUv, zoom);
    
    DistortedLens distortion = getLensDistortion(
        fragCoord, zoomedUv, sphereCenter, sphereRadius, focusFactor, chromaticAberrationFactor
    );
    
    // Sample the texture with chromatic aberration
    float imageDistorted_R = texture2D(tMap, distortion.uv_R).r;
    float imageDistorted_G = texture2D(tMap, distortion.uv_G).g;
    float imageDistorted_B = texture2D(tMap, distortion.uv_B).b;

    vec3 imageDistorted = vec3(
        imageDistorted_R,
        imageDistorted_G,
        imageDistorted_B
    );

    vec3 image = texture2D(tMap, vUv).rgb;

    // Mix original and distorted based on whether we're inside the lens
    image = mix(image, imageDistorted, distortion.inside);
    result = image;

    gl_FragColor = vec4(result, 1.0);
}