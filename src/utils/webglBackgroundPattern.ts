import { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } from 'ogl';

export async function loadShader(url: string) {
    const response = await fetch(url);
    return response.text();
}

export async function createWebGLScene(container: HTMLDivElement) {
    const rect = container.getBoundingClientRect();

    const vertexShader = await loadShader("public/shaders/vertexLens.glsl");
    const fragmentShader = await loadShader('public/shaders/fragmentBackgroundPattern.glsl');

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

    // --- FIX 3: ADD RESIZE HANDLER ---
    const handleResize = () => {
        const newRect = container.getBoundingClientRect();
        renderer.setSize(newRect.width, newRect.height);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        program.uniforms.uResolution.value = [newRect.width, newRect.height];
    };
    window.addEventListener('resize', handleResize, false);


    // --- FIX 1: ADD RENDER LOOP ---
    const update = (time: number) => {
        requestAnimationFrame(update);

        // Update any time-based uniforms
        program.uniforms.uTime.value = time * 0.001;

        // Tell the renderer to draw the scene
        renderer.render({ scene, camera });
    };
    requestAnimationFrame(update);

    // Return an object with a cleanup function
    return {
        renderer,
        program,
        destroy: () => {
            window.removeEventListener('resize', handleResize);
            // You might add more cleanup logic here
        }
    };
}