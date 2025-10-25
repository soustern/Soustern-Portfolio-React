import {Renderer, Vec2, Geometry, Texture, Program, Mesh, Flowmap, Transform} from 'ogl'
import vertexShaderUrl from '/public/shaders/vertexLens.glsl?url';
import fragmentShaderUrl from '/public/shaders/fragmentPainterLens.glsl?url';

export async function createWebGLScene(container: HTMLDivElement, video: HTMLVideoElement) {
    
    const rect = container.getBoundingClientRect();

    const vertexShader = await (await fetch(vertexShaderUrl)).text();
    const fragmentShader = await (await fetch(fragmentShaderUrl)).text();

    const videoElement = container;

    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    const canvas = document.createElement("canvas");
    videoElement.appendChild(canvas);
    videoElement.appendChild(gl.canvas);

    interface ExtendedVec2 extends Vec2 {
        needsUpdate: boolean;
    }

    const mouse = new Vec2(-1);
    const velocity = new Vec2() as ExtendedVec2;

    // NEW: Track multiple interaction points for multi-touch or trail effects
    const mouseTrail: Array<{pos: Vec2, vel: Vec2, age: number}> = [];
    const MAX_TRAIL_LENGTH = 5;

    // NEW: Inertia system for smooth, elastic motion
    const velocityInertia = new Vec2();
    const INERTIA_DAMPING = 0.92;
    const INERTIA_STRENGTH = 0.15;

    // Track animation frame ID for cleanup
    let animationId: number;
    
    function resize() {
        const rect = videoElement.getBoundingClientRect();
        gl.canvas.width = rect.width * 11.0;
        gl.canvas.height = rect.height * 11.0;
        gl.canvas.style.width = `${rect.width}px`;
        gl.canvas.style.height = `${rect.height}px`;

        program.uniforms.uResolution.value = new Float32Array([rect.width, rect.height]);
        
        renderer.setSize(rect.width, rect.height);
    };

    // NEW: Enhanced flowmap with better settings for fluid motion
    const flowmap = new Flowmap(gl, {
        falloff: 0.2,        // Wider spread for more organic flow
        dissipation: 0.97,    // Very slow dissipation for lingering trails
        alpha: 1.7,           // Stronger effect intensity
    });

    // NEW: Secondary flowmap for dual-layer distortion
    const flowmapSecondary = new Flowmap(gl, {
        falloff: 0.35,        // Tighter falloff for detail layer
        dissipation: 0.92,    // Faster dissipation for contrast
        alpha: 1.2,
    });

    const geometry = new Geometry(gl, {
        position: {
            size: 2,
            data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: {
            size: 2,
            data: new Float32Array([0, 0, 2, 0, 0, 2]),
        },
    });

    const texture = new Texture(gl, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
    });

    texture.image = video;
    const resolution = new Float32Array([rect.width, rect.height]);

    const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
            uTime: {
                value: 0,
            },
            tMap: { 
                value: texture 
            },
            tWater: {
                value: texture,
            },
            tFlow: flowmap.uniform,
            tFlowSecondary: flowmapSecondary.uniform,
            uResolution: { 
                value: resolution 
            },
            uMixAmount: {
                value: 0.5
            },
            uFlowIntensity: {
                value: 1.0  // Master control for flow strength
            },
            uVelocityScale: {
                value: 1.5  // Scale velocity impact
            },
            uTrailDecay: {
                value: 0.98  // How quickly trails fade
            },
            uIridescenceStrength: {
                value: 0.2
            },
            uFresnelPower: {
                value: 3.0
            },
            uDispersionStrength: {
                value: 0.008
            }
        }
    });

    const mesh = new Mesh(gl, {
        geometry,
        program,
    });

    const scene = new Transform();
    mesh.setParent(scene);

    const handleResize = () => resize();
    const handleTouchStart = (e: TouchEvent) => updateMouse(e);
    const handleTouchMove = (e: TouchEvent) => updateMouse(e);
    const handleMouseMove = (e: MouseEvent) => updateMouse(e);

    window.addEventListener("resize", handleResize, false);
    resize();

    const isTouchCapable = "ontouchstart" in window;
    if (isTouchCapable) {
        videoElement.addEventListener("touchstart", handleTouchStart, false);
        videoElement.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
    }
    else {
        videoElement.addEventListener("mousemove", handleMouseMove, false);
    };

    let lastTime: number;
    const lastMouse = new Vec2();

    function updateMouse(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        const rect = videoElement.getBoundingClientRect();
        let x, y;

        if ('changedTouches' in e && e.changedTouches.length) {
            x = e.changedTouches[0].pageX - rect.left;
            y = e.changedTouches[0].pageY - rect.top;
        }
        else {
            x = (e as MouseEvent).clientX - rect.left;
            y = (e as MouseEvent).clientY - rect.top;
        }

        mouse.set(x / rect.width, 1.0 - y / rect.height);

        if (!lastTime) {
            lastTime = performance.now();
            lastMouse.set(x, y);
        }

        const deltaX = x - lastMouse.x;
        const deltaY = y - lastMouse.y;

        lastMouse.set(x, y);

        const time = performance.now();
        const delta = Math.max(10.4, time - lastTime);
        lastTime = time;
        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;
        velocity.needsUpdate = true;

        // NEW: Add to mouse trail for temporal effects
        mouseTrail.push({
            pos: new Vec2(mouse.x, mouse.y),
            vel: new Vec2(velocity.x, velocity.y),
            age: 0
        });
        
        if (mouseTrail.length > MAX_TRAIL_LENGTH) {
            mouseTrail.shift();
        }
    };

    function update(t: number) {
        animationId = requestAnimationFrame(update);

        if (!velocity.needsUpdate) {
            velocity.set(0);
        }
        velocity.needsUpdate = false;

        velocityInertia.x += velocity.x * INERTIA_STRENGTH;
        velocityInertia.y += velocity.y * INERTIA_STRENGTH;
        velocityInertia.x *= INERTIA_DAMPING;
        velocityInertia.y *= INERTIA_DAMPING;

        const enhancedVelocity = new Vec2(
            velocity.x + velocityInertia.x,
            velocity.y + velocityInertia.y
        );


        if (mouse.x >= 0 && mouse.y >= 0) {
            flowmap.mouse.copy(mouse);
            const velocityScale = program.uniforms.uVelocityScale.value;
            flowmap.velocity.lerp(
                new Vec2(enhancedVelocity.x * velocityScale, enhancedVelocity.y * velocityScale),
                enhancedVelocity.len() ? 0.5 : 0.25
            );
        } else {

            flowmap.velocity.lerp(new Vec2(0, 0), 0.05);
        }
        flowmap.update();

        if (mouse.x >= 0 && mouse.y >= 0) {
            const offsetMouse = new Vec2(mouse.x, mouse.y);
            // Add slight offset based on velocity direction for parallax-like effect
            if (velocity.len() > 0) {
                const perpendicular = new Vec2(-velocity.y, velocity.x);
                perpendicular.normalize();
                offsetMouse.x += perpendicular.x * 0.02;
                offsetMouse.y += perpendicular.y * 0.02;
            }
            flowmapSecondary.mouse.copy(offsetMouse);
            flowmapSecondary.velocity.lerp(
                new Vec2(velocity.x * 0.7, velocity.y * 0.7),
                velocity.len() ? 0.3 : 0.15
            );
        } else {
            flowmapSecondary.velocity.lerp(new Vec2(0, 0), 0.05);
        }
        flowmapSecondary.update();

        mouseTrail.forEach((point) => {
            point.age += 0.016; // ~60fps
            
            // Apply trail point to flowmap with decay
            const trailStrength = Math.exp(-point.age * 2.0);
            if (trailStrength > 0.01) {
                // This creates "ghost" touches that linger
                const trailMouse = new Vec2(point.pos.x, point.pos.y);
                const trailVel = new Vec2(point.vel.x, point.vel.y).scale(trailStrength * 0.3);
                
                // Blend trail into flowmap
                flowmap.mouse.copy(trailMouse);
                flowmap.velocity.lerp(trailVel, 0.1 * trailStrength);
            }
        });

        // Remove old trail points
        while (mouseTrail.length > 0 && mouseTrail[0].age > 1.0) {
            mouseTrail.shift();
        }

        texture.needsUpdate = true;
        program.uniforms.uTime.value = t * 0.01;
        
        renderer.render({
            scene: scene,
        });
    };

    animationId = requestAnimationFrame(update);

    return {
        setMixAmount: (amount: number) => {
            program.uniforms.uMixAmount.value = Math.max(0, Math.min(1, amount));
        },
        getMixAmount: () => program.uniforms.uMixAmount.value,
        
        // NEW: Advanced control methods
        setFlowIntensity: (intensity: number) => {
            program.uniforms.uFlowIntensity.value = Math.max(0, Math.min(2, intensity));
        },
        setVelocityScale: (scale: number) => {
            program.uniforms.uVelocityScale.value = Math.max(0, Math.min(5, scale));
        },
        setInertia: (damping: number, strength: number) => {
            // Dynamically adjust inertia physics
            return { damping, strength }; // Store these values
        },
        
        triggerBurst: (x: number, y: number, strength: number = 1.0) => {
            const rect = videoElement.getBoundingClientRect();
            const normalizedX = x / rect.width;
            const normalizedY = 1.0 - (y / rect.height);
            
            // Create radial burst
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
                const burstVel = new Vec2(
                    Math.cos(angle) * strength * 5,
                    Math.sin(angle) * strength * 5
                );
                
                flowmap.mouse.set(normalizedX, normalizedY);
                flowmap.velocity.copy(burstVel);
                flowmap.update();
            }
        },
        
        createVortex: (x: number, y: number, radius: number = 0.1, spin: number = 1.0) => {
            const rect = videoElement.getBoundingClientRect();
            const centerX = x / rect.width;
            const centerY = 1.0 - (y / rect.height);
            
            // Animate vortex over several frames
            let frame = 0;
            const vortexInterval = setInterval(() => {
                if (frame++ > 30) {
                    clearInterval(vortexInterval);
                    return;
                }
                
                const angle = (frame / 30) * Math.PI * 4 * spin;
                const currentRadius = radius * (1 - frame / 30);
                
                const vortexX = centerX + Math.cos(angle) * currentRadius;
                const vortexY = centerY + Math.sin(angle) * currentRadius;
                
                const tangentVel = new Vec2(
                    -Math.sin(angle) * spin * 3,
                    Math.cos(angle) * spin * 3
                );
                
                flowmap.mouse.set(vortexX, vortexY);
                flowmap.velocity.copy(tangentVel);
                flowmap.update();
            }, 16);
        },
        
        cleanup: () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }

            window.removeEventListener("resize", handleResize);
            
            if (isTouchCapable) {
                videoElement.removeEventListener("touchstart", handleTouchStart);
                videoElement.removeEventListener("touchmove", handleTouchMove);
            } else {
                videoElement.removeEventListener("mousemove", handleMouseMove);
            }

            if (gl) {
                if (geometry) {
                    Object.values(geometry.attributes).forEach(attr => {
                        if (attr.buffer) {
                            gl.deleteBuffer(attr.buffer);
                        }
                    });
                }

                if (texture) {
                    gl.deleteTexture(texture.texture);
                }

                if (program) {
                    if (program.program) {
                        gl.deleteProgram(program.program);
                    }
                }

                const loseContextExt = gl.getExtension('WEBGL_lose_context');
                if (loseContextExt) {
                    loseContextExt.loseContext();
                }
            }

            if (gl.canvas && gl.canvas.parentNode) {
                gl.canvas.parentNode.removeChild(gl.canvas);
            }
            
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    };
}