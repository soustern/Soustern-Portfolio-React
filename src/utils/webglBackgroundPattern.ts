import { Renderer, Camera, Transform, Program, Mesh, Plane } from 'ogl';
import vertexShaderUrl from '/public/shaders/vertexLens.glsl?url';
import fragmentShaderUrl from '/public/shaders/fragmentBackgroundPattern.glsl?url';

export async function createWebGLScene(container: HTMLDivElement) {
    const rect = container.getBoundingClientRect();

    const vertexShader = await (await fetch(vertexShaderUrl)).text();
    const fragmentShader = await (await fetch(fragmentShaderUrl)).text();

    const renderer = new Renderer({
        dpr: 2,
        alpha: true,
        width: rect.width,
        height: rect.height,
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // OGL requires a camera, even for a 2D plane setup.
    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 1; // Position it to see the plane

    const scene = new Transform();

    const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: [rect.width, rect.height] },
            uOpacity: { value: 1.0 },
        }
    });

    // A Plane in OGL for a fullscreen shader needs width/height of 2x2. Correct.
    const geometry = new Plane(gl, { width: 2, height: 2 });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    // Track animation frame ID for cleanup
    let animationId: number;

    // Create named resize handler for proper cleanup
    const handleResize = () => {
        const newRect = container.getBoundingClientRect();
        renderer.setSize(newRect.width, newRect.height);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        program.uniforms.uResolution.value = [newRect.width, newRect.height];
    };
    
    window.addEventListener('resize', handleResize, false);

    // Render loop with proper animation tracking
    const update = (time: number) => {
        // Store animation ID for cleanup
        animationId = requestAnimationFrame(update);

        // Update any time-based uniforms
        program.uniforms.uTime.value = time * 0.001;

        // Tell the renderer to draw the scene
        renderer.render({ scene, camera });
    };
    
    // Start the render loop
    animationId = requestAnimationFrame(update);

    // Return an object with cleanup function and program access
    return {
        renderer,
        program,
        
        // CRITICAL: Cleanup function to prevent memory leaks
        cleanup: () => {
            // Cancel the animation loop
            if (animationId) {
                cancelAnimationFrame(animationId);
            }

            // Remove resize event listener
            window.removeEventListener('resize', handleResize);

            // Clean up WebGL resources
            if (gl) {
                // Delete geometry buffers
                if (geometry) {
                    Object.values(geometry.attributes).forEach(attr => {
                        if (attr.buffer) {
                            gl.deleteBuffer(attr.buffer);
                        }
                    });
                    
                    // Delete index buffer if it exists
                    // if (geometry.index && geometry.index.buffer) {
                    //     gl.deleteBuffer(geometry.index.buffer);
                    // }
                }

                // Delete shader program
                if (program && program.program) {
                    gl.deleteProgram(program.program);
                }

                // Force context loss to free GPU memory
                const loseContextExt = gl.getExtension('WEBGL_lose_context');
                if (loseContextExt) {
                    loseContextExt.loseContext();
                }
            }

            // Remove canvas from DOM
            if (gl.canvas && gl.canvas.parentNode) {
                gl.canvas.parentNode.removeChild(gl.canvas);
            }
        },
        
        // Keep the destroy method for backwards compatibility
        destroy() {
            this.cleanup();
        }
    };
}