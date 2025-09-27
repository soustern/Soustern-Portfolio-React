precision mediump float;

// Uniforms - consolidated and cleaned up
uniform sampler2D tMap;
uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform vec2 uResolution;
uniform float uTime;
uniform float uMixAmount; // Control blend between effects

// Varying
varying vec2 vUv;

vec4 lensDistortion(vec2 uv) {
    vec2 fragCoord = vUv * uResolution;
    vec3 result = vec3(1.0);
    
    vec2 sphereCenter = uResolution * 0.5;
    vec2 sphereCenterUv = vec2(0.5, 0.5);
    
    float minDim = min(uResolution.x, uResolution.y);
    // The radius now defines the point of maximum distortion, not a hard edge.
    float sphereRadius = minDim * 0.6; 

    // Reduced focus factor for a more gradual onset from the center.
    float focusFactor = 1.9; 
    float chromaticAberrationFactor = 0.3; 
    
    float zoom = 1.9; 
    vec2 zoomedUv = sphereCenterUv + (vUv - sphereCenterUv) / zoom;
    
    float distanceFromCenter = distance(fragCoord, sphereCenter);
    float normalizedDistance = distanceFromCenter / sphereRadius;

    // --- KEY CHANGE FOR SMOOTH EDGES ---
    // Instead of a hard 'step()', we now create a smooth falloff.
    // The effect will start fading in at 0.0 (center) and be at full strength at a radius of 0.7,
    // then it will start fading out and be completely gone by a radius of 1.0.
    // This creates a very soft vignette-like distortion instead of a hard circle.
    float smoothEdgeFalloff = 1.0 - smoothstep(0.3, 1.0, normalizedDistance);
    
    vec2 direction = normalize(fragCoord - sphereCenter);
    
    // The pow() function now controls the curve within the smooth falloff area.
    float distortionAmount = pow(normalizedDistance, focusFactor);
    
    // We multiply the base distortion by our new 'smoothEdgeFalloff'.
    // This makes both the beginning and the end of the effect gradual.
    vec2 baseDistortion = direction * distortionAmount * 2.0 * smoothEdgeFalloff;
    
    float aberrationOffset = chromaticAberrationFactor * normalizedDistance * smoothEdgeFalloff;
    
    vec2 uv_R = zoomedUv + baseDistortion * (1.0 + aberrationOffset);
    vec2 uv_G = zoomedUv + baseDistortion;
    vec2 uv_B = zoomedUv + baseDistortion * (1.0 - aberrationOffset);
    
    float imageDistorted_R = texture2D(tMap, uv_R).r;
    float imageDistorted_G = texture2D(tMap, uv_G).g;
    float imageDistorted_B = texture2D(tMap, uv_B).b;

    vec3 imageDistorted = vec3(
        imageDistorted_R,
        imageDistorted_G,
        imageDistorted_B
    );

    vec3 image = texture2D(tMap, vUv).rgb;

    // Mix the original and distorted image using the same smooth falloff.
    // This ensures the image itself blends smoothly, not just the distortion vectors.
    image = mix(image, imageDistorted, smoothEdgeFalloff);
    result = image;

    return vec4(result, 1.0);
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

    vec2 mouseDistortion = flowAvg.xy * 0.9; // Increased from 0.1 to 0.4

    float languidFrequency = 6.0;
    float languidSpeed = 0.03;
    // Increased background wave distortion for more fluid movement
    float languidStrength = 0.03; // Increased from 0.01 to 0.03
    vec2 wave1 = vec2(sin(vUv.y * languidFrequency + uTime * languidSpeed), cos(vUv.x * languidFrequency + uTime * languidSpeed));
    vec2 wave2 = vec2(sin(vUv.x * languidFrequency * 0.7 + uTime * languidSpeed * 0.6), cos(vUv.y * languidFrequency * 0.7 + uTime * languidSpeed * 0.6));
    vec2 languidDistortion = (wave1 + wave2) * languidStrength;

    vec2 totalDistortion = mouseDistortion + languidDistortion;
    vec2 distortedUv = vUv + totalDistortion;
    float distortionStrength = length(totalDistortion);

    // More pronounced pixel stretching effect
    float stretchThreshold = 0.005; // Lowered threshold to trigger more easily
    float stretchIntensity = 0.8; // Increased from 0.3 to 0.8 for stronger stretching   

    vec3 finalColor;

    if (distortionStrength > stretchThreshold) {
        // Get the direction of the distortion flow
        vec2 stretchDir = normalize(totalDistortion);

        // Sample the original color at the distorted position to get its brightness
        vec3 sampleColor = texture2D(tWater, distortedUv).rgb;
        float brightness = dot(sampleColor, vec3(0.299, 0.587, 0.114));

        // Enhanced stretch calculation with more dramatic effect
        float stretchAmount = pow(brightness, 1.5) * stretchIntensity * smoothstep(stretchThreshold, 0.2, distortionStrength);
        
        // Add multiple sampling points for more fluid distortion
        vec2 stretchUv1 = distortedUv - stretchDir * stretchAmount;
        vec2 stretchUv2 = distortedUv - stretchDir * stretchAmount * 0.5;
        vec2 stretchUv3 = distortedUv - stretchDir * stretchAmount * 1.5;
        
        // Blend multiple samples for smoother, more pronounced effect
        vec3 color1 = texture2D(tWater, stretchUv1).rgb;
        vec3 color2 = texture2D(tWater, stretchUv2).rgb;
        vec3 color3 = texture2D(tWater, stretchUv3).rgb;
        
        // Weight the colors based on distortion strength
        float weight = smoothstep(0.0, 0.3, distortionStrength);
        finalColor = mix(mix(color2, color1, 0.6), color3, weight * 0.4);
        
        // Add some color enhancement for more dramatic effect
        finalColor = mix(finalColor, finalColor * 1.2, weight * 0.3);
    } else {
        // If there's no stretch, sample normally
        finalColor = texture2D(tWater, distortedUv).rgb;
    }

    return vec4(finalColor, 1.0);
}

vec2 hash( vec2 p ) {
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
float noise( in vec2 p ) {
    const float K1 = 0.366025404; 
    const float K2 = 0.211324865;
	vec2 i = floor( p + (p.x+p.y)*K1 );
	vec2 a = p - i + (i.x+i.y)*K2;
	vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
	vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
	vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
	return dot( n, vec3(70.0) );
}


vec4 causticReflections(float time) {
    vec2 uv = vUv;
    float speed = 0.03;
    float scale = 3.0;
    
    // Animate two layers of noise moving in different directions and speeds
    float noise1 = noise(uv * scale + vec2(time * speed, time * speed * 0.8));
    float noise2 = noise(uv * scale * 0.9 + vec2(10.0, -time * speed * 0.7));
    
    // Combine them. Taking the absolute value and multiplying creates sharp lines.
    float combinedNoise = pow(abs(noise1 + noise2), 2.0) * 0.5 + 0.5;
    
    // Clamp the result to create distinct bright areas
    float caustics = smoothstep(0.5, 0.9, combinedNoise);

    return vec4(vec3(caustics), 0.1);
}


void main() {
    vec4 lensResult = lensDistortion(vUv);
    vec4 painterResult = painterEffect(vUv);
    
    vec4 mixedColor = mix(lensResult, painterResult, uMixAmount);
    
    // Calculate the caustics separately
    vec4 caustics = causticReflections(uTime);
    
    // Add the caustics to the mixed color
    float causticIntensity = 0.2; // A uniform to control strength
    gl_FragColor = mixedColor + caustics * causticIntensity;
}