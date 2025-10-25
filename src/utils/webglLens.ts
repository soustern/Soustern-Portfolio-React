import { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } from 'ogl';
import vertexShaderUrl from '/public/shaders/vertexLens.glsl?url';
import fragmentShaderUrl from '/public/shaders/fragmentLens.glsl?url';

// Function that sets up everything
export async function createWebGLScene(container: HTMLDivElement, video: HTMLVideoElement) {
    const rect = container.getBoundingClientRect();
    
    // Load shaders
    const vertexShader = await (await fetch(vertexShaderUrl)).text();
    const fragmentShader = await (await fetch(fragmentShaderUrl)).text();
    
    // Setup WebGL
    const renderer = new Renderer({ 
        dpr: 2,
        alpha: true,
        width: rect.width,
        height: rect.height,
    });
    
    const gl = renderer.gl;
    const camera = new Camera(gl, { fov: 35 });
    const scene = new Transform();
    
    const texture = new Texture(gl, {
        generateMipmaps: false,
        width: 512,
        height: 512,
    });
    
    container.appendChild(gl.canvas);
    
    // Update texture from video
    function updateTexture() {
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            texture.image = video;
            texture.needsUpdate = true;
        }
        requestAnimationFrame(updateTexture);
    }
    
    // Create shader program
    const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
            tMap: { value: texture },
            uResolution: { value: [rect.width, rect.height] },
            uTime: { value: 0 }
        }
    });
    
    const geometry = new Plane(gl, { width: 2, height: 2 });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    
    // Animation loop
    function animate(t: number) {
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene, camera });
        requestAnimationFrame(animate);
    }
    
    // Start when video is ready
    video.addEventListener('canplay', () => {
        updateTexture();
        animate(0);
    });
    
    return { renderer, program };
}