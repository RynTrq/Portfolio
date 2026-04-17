import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const scrollRef = useRef(0);
  const frameRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // === NEURAL NETWORK NODES ===
    const NODE_COUNT = 180;
    const nodePositions = [];
    const nodeGeo = new THREE.BufferGeometry();
    const nPos = new Float32Array(NODE_COUNT * 3);
    const nColors = new Float32Array(NODE_COUNT * 3);
    const nSizes = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 25 + Math.random() * 30;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      nodePositions.push(new THREE.Vector3(x, y, z));
      nPos[i * 3] = x; nPos[i * 3 + 1] = y; nPos[i * 3 + 2] = z;
      const isLime = Math.random() > 0.5;
      nColors[i * 3] = isLime ? 0.80 : 0.88;
      nColors[i * 3 + 1] = isLime ? 1.0 : 0.91;
      nColors[i * 3 + 2] = isLime ? 0.0 : 0.94;
      nSizes[i] = Math.random() * 3 + 1;
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nColors, 3));
    nodeGeo.setAttribute('size', new THREE.BufferAttribute(nSizes, 1));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.6, vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false,
    });
    const nodesMesh = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodesMesh);

    // === NEURAL CONNECTIONS ===
    const CONN_THRESHOLD = 22;
    const connectionPairs = [];
    const connVertices = [];
    const connColors = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < CONN_THRESHOLD) {
          connectionPairs.push([i, j]);
          const fade = 1 - dist / CONN_THRESHOLD;
          connVertices.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          connVertices.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
          connColors.push(0.80 * fade, 1.0 * fade, 0.0 * fade);
          connColors.push(0.80 * fade, 1.0 * fade, 0.0 * fade);
        }
      }
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connVertices), 3));
    connGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(connColors), 3));
    const connMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.15,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const connLines = new THREE.LineSegments(connGeo, connMat);
    scene.add(connLines);

    // === ORBITING RINGS ===
    const rings = [];
    const ringData = [
      { radius: 42, tube: 0.08, color: 0xCDFF00, tilt: 0.4, speed: 0.003 },
      { radius: 55, tube: 0.05, color: 0x88FFAA, tilt: 1.1, speed: -0.002 },
      { radius: 68, tube: 0.04, color: 0xCDFF00, tilt: 0.8, speed: 0.0015 },
    ];
    ringData.forEach(({ radius, tube, color, tilt, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, wireframe: false });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = tilt;
      ring.rotation.z = Math.random() * Math.PI;
      ring.userData.speed = speed;
      scene.add(ring);
      rings.push(ring);
    });

    // === AMBIENT DUST PARTICLES ===
    const DUST = 6000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(DUST * 3);
    const dustColors = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 300;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 300;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;
      const brightness = Math.random() * 0.4 + 0.1;
      dustColors[i * 3] = brightness * 0.8;
      dustColors[i * 3 + 1] = brightness * 1.0;
      dustColors[i * 3 + 2] = brightness * 0.3;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.25, vertexColors: true, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    scene.add(dustMesh);

    // === PULSE SPHERE ===
    const pulseGeo = new THREE.SphereGeometry(18, 32, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xCDFF00, transparent: true, opacity: 0.03, wireframe: true,
    });
    const pulseSphere = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseSphere);

    // === INNER ICOSAHEDRON ===
    const icoGeo = new THREE.IcosahedronGeometry(10, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xCDFF00, transparent: true, opacity: 0.08, wireframe: true,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // === MOUSE ===
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.vx = nx - mouseRef.current.x;
      mouseRef.current.vy = ny - mouseRef.current.y;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollRef.current = Math.min(window.scrollY / pageHeight, 1);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // === ANIMATE ===
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clockRef.current.getElapsedTime();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;
      const sectionDepth = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 4);

      // Rotate neural network
      nodesMesh.rotation.y += (mx * 0.4 + sectionDepth * 0.16 - nodesMesh.rotation.y) * 0.025;
      nodesMesh.rotation.x += (-my * 0.3 + scroll * 0.55 - nodesMesh.rotation.x) * 0.025;
      nodesMesh.rotation.z += (scroll * 0.5 - nodesMesh.rotation.z) * 0.018;
      connLines.rotation.copy(nodesMesh.rotation);
      camera.position.z += (80 - scroll * 24 - camera.position.z) * 0.035;
      camera.position.x += (mx * 4 - camera.position.x) * 0.03;
      camera.position.y += (my * 3 + scroll * 8 - camera.position.y) * 0.03;
      camera.lookAt(0, scroll * 8, 0);

      // Breathe nodes
      const pa = nodeGeo.attributes.position.array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const base = nodePositions[i];
        const wave = Math.sin(t * 0.8 + i * 0.3) * 0.6;
        pa[i3] = base.x + wave;
        pa[i3 + 1] = base.y + Math.cos(t * 0.6 + i * 0.25) * 0.6;
        pa[i3 + 2] = base.z + Math.sin(t * 0.4 + i * 0.2) * 0.4;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      const connArray = connGeo.attributes.position.array;
      let connIndex = 0;
      connectionPairs.forEach(([fromIdx, toIdx]) => {
        const from = fromIdx * 3;
        const to = toIdx * 3;

        connArray[connIndex++] = pa[from];
        connArray[connIndex++] = pa[from + 1];
        connArray[connIndex++] = pa[from + 2];
        connArray[connIndex++] = pa[to];
        connArray[connIndex++] = pa[to + 1];
        connArray[connIndex++] = pa[to + 2];
      });
      connGeo.attributes.position.needsUpdate = true;

      // Pulse sphere
      const pulse = Math.sin(t * 1.5) * 0.5 + 0.5;
      pulseMat.opacity = 0.02 + pulse * 0.04;
      pulseSphere.scale.setScalar(1 + pulse * 0.08);

      // Rotate ico
      ico.rotation.x = t * 0.3;
      ico.rotation.y = t * 0.5;

      // Rings
      rings.forEach(ring => {
        ring.rotation.z += ring.userData.speed;
        ring.rotation.y += ring.userData.speed * 0.3;
        ring.scale.setScalar(1 + scroll * 0.22);
      });

      dustMesh.rotation.y = t * 0.015 + scroll * 0.9;
      dustMesh.rotation.x = scroll * 0.28;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const W2 = container.clientWidth;
      const H2 = container.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      nodeGeo.dispose();
      nodeMat.dispose();
      connGeo.dispose();
      connMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
