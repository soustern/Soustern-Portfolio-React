import {Renderer, Vec2, Geometry, Texture, Program, Mesh, Flowmap, Transform} from 'ogl'

export async function loadShader(url: string) {
    const response = await fetch(url);
    return response.text();
}

export async function createWebGLScene(container: HTMLDivElement, video: HTMLVideoElement)
{
    const rect = container.getBoundingClientRect();
    const vertexShader = await loadShader("public/shaders/vertexLens.glsl");
    const fragmentShader = await loadShader("public/shaders/fragmentPainterLens.glsl");

    const _size = [2000, 2500];

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

    function resize() {
        const rect = videoElement.getBoundingClientRect();
        gl.canvas.width = rect.width * 2.0;
        gl.canvas.height = rect.height * 2.0;
        gl.canvas.style.width = `${rect.width}px`;
        gl.canvas.style.height = `${rect.height}px`;

        const videoAspect = _size[0] / _size[1];
        const canvasAspect = rect.width / rect.height;
        let a1, a2;

        if (canvasAspect > videoAspect) {
            a1 = videoAspect / canvasAspect;
            a2 = 1.0;
        }
        else {
            a1 = 1.0;
            a2 = canvasAspect / videoAspect;
        };

        // Update resolution uniform for the shader
        program.uniforms.uResolution.value = new Float32Array([rect.width, rect.height]);
        
        renderer.setSize(rect.width, rect.height);
    };

    const flowmap = new Flowmap(gl, {
        falloff: 0.25,     // Even smaller falloff for wider spread
        dissipation: 0.95, // Lower dissipation for longer lasting
        alpha: 1.0,       // Maximum alpha for strongest effect
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
            // Time uniform for animations
            uTime: {
                value: 0,
            },
            // Main texture (used for both lens distortion tMap and painter effect tWater)
            tMap: { 
                value: texture 
            },
            tWater: {
                value: texture,
            },
            // Flow texture for painter effect
            tFlow: flowmap.uniform,
            // Screen resolution for lens distortion calculations
            uResolution: { 
                value: resolution 
            },
            // Control blend between lens distortion and painter effect
            // 0.0 = full lens distortion, 1.0 = full painter effect
            uMixAmount: {
                value: 0.5  // Start with 50/50 blend
            }
        }
    });

    const mesh = new Mesh(gl, {
        geometry,
        program,
    });

    const scene = new Transform();
    mesh.setParent(scene);

    window.addEventListener("resize", resize, false);
    resize();

    const isTouchCapable = "ontouchstart" in window;
    if (isTouchCapable) {
        videoElement.addEventListener("touchstart", updateMouse, false);
        videoElement.addEventListener("touchmove", updateMouse, {
            passive: false,
        });
    }
    else {
        videoElement.addEventListener("mousemove", updateMouse, false);
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
    };

    function update(t: number) {
        requestAnimationFrame(update);

        if (!velocity.needsUpdate) {
            mouse.set(-1);
            velocity.set(0);
        };
        velocity.needsUpdate = false;

        flowmap.mouse.copy(mouse);
        // Much more aggressive velocity tracking for stronger effect
        flowmap.velocity.lerp(velocity, velocity.len() ? 0.4 : 0.2); // Much higher values
        flowmap.update();

        texture.needsUpdate = true;

        program.uniforms.uTime.value = t * 0.01;
        
        // Optional: You can animate the mix amount or control it based on user interaction
        // For example, to animate between effects:
        // program.uniforms.uMixAmount.value = (Math.sin(t * 0.001) + 1.0) * 0.5;
        
        renderer.render({
            scene: scene,
        });
    };

    requestAnimationFrame(update);

    // Return an object with controls so you can adjust the mix from outside
    return {
        setMixAmount: (amount: number) => {
            program.uniforms.uMixAmount.value = Math.max(0, Math.min(1, amount));
        },
        getMixAmount: () => program.uniforms.uMixAmount.value
    };
}