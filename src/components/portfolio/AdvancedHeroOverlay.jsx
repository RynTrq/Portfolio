import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AdvancedHeroOverlay() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Advanced shader material for background
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scroll: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        resolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float scroll;
        uniform vec2 mouse;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 center = mouse;
          
          // Flowing distortion effect
          float dist = distance(uv, center);
          vec2 distorted = uv + 0.1 * sin(time + scroll * 4.0 + dist * 10.0);
          
          // Multi-layer gradient
          vec3 color1 = vec3(0.85, 1.0, 0.27); // Acid lime
          vec3 color2 = vec3(0.46, 0.90, 1.0); // Cyan
          vec3 color3 = vec3(1.0, 0.84, 0.35); // Amber
          
          // Noise function simulation
          float n1 = sin(distorted.x * 5.0 + time + scroll * 3.0) * sin(distorted.y * 5.0 + time * 0.7);
          float n2 = cos(distorted.x * 3.0 - time) * cos(distorted.y * 3.0 - time * 0.5 - scroll * 2.0);
          
          vec3 color = mix(color1, color2, sin(n1 * 2.0 + time) * 0.5 + 0.5);
          color = mix(color, color3, cos(n2 * 2.0) * 0.5 + 0.5);
          
          // Add radial glow toward mouse
          float glow = 0.1 / (dist + 0.1);
          color += vec3(0.85, 1.0, 0.27) * glow * 0.22;
          color += vec3(0.46, 0.90, 1.0) * glow * 0.12;
          
          // Final output with smooth alpha
          float alpha = (0.45 + 0.35 * sin(time + scroll * 4.0 + dist * 5.0)) * 0.12;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    // Create fullscreen plane
    const geometry = new THREE.PlaneGeometry(60, 40);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Mouse tracking
    const mousePos = { x: 0.5, y: 0.5 };
    const onMouseMove = (e) => {
      mousePos.x = e.clientX / window.innerWidth;
      mousePos.y = 1 - e.clientY / window.innerHeight;
      shaderMaterial.uniforms.mouse.value.set(mousePos.x, mousePos.y);
    };

    window.addEventListener('mousemove', onMouseMove);

    const onScroll = () => {
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      shaderMaterial.uniforms.scroll.value = Math.min(window.scrollY / pageHeight, 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      shaderMaterial.uniforms.time.value = time;
      mesh.rotation.z = Math.sin(time * 0.08) * 0.04 + shaderMaterial.uniforms.scroll.value * 0.32;
      mesh.position.z = -shaderMaterial.uniforms.scroll.value * 7;
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onWindowResize = () => {
      const nextWidth = container.clientWidth || window.innerWidth;
      const nextHeight = container.clientHeight || window.innerHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      shaderMaterial.uniforms.resolution.value.set(nextWidth, nextHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
}
