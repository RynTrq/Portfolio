import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LIME = '#d8ff44';
const CYAN = '#74e6ff';
const GREEN = '#86fba8';
const AMBER = '#ffd447';

function makeCanvasTexture({ title, eyebrow, lines, accent = LIME, width = 640, height = 420 }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(6, 13, 22, 0.82)';
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `${accent}44`);
  gradient.addColorStop(0.4, 'rgba(116,230,255,0.12)');
  gradient.addColorStop(1, 'rgba(216,255,68,0.03)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `${accent}88`;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.moveTo(0, 64);
  ctx.lineTo(width, 64);
  ctx.stroke();

  ctx.fillStyle = '#f36f7f';
  ctx.beginPath();
  ctx.arc(28, 32, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd447';
  ctx.beginPath();
  ctx.arc(52, 32, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#86fba8';
  ctx.beginPath();
  ctx.arc(76, 32, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '700 20px IBM Plex Mono, monospace';
  ctx.fillStyle = accent;
  ctx.letterSpacing = '2px';
  ctx.fillText(eyebrow, 108, 39);

  ctx.font = '700 34px Space Grotesk, sans-serif';
  ctx.fillStyle = 'rgba(238,244,250,0.94)';
  ctx.fillText(title, 30, 115);

  ctx.font = '500 22px IBM Plex Mono, monospace';
  lines.forEach((line, index) => {
    const y = 168 + index * 38;
    ctx.fillStyle = index % 2 === 0 ? 'rgba(216,255,68,0.9)' : 'rgba(116,230,255,0.9)';
    ctx.fillText(index % 2 === 0 ? '>' : '$', 30, y);
    ctx.fillStyle = 'rgba(221,231,239,0.78)';
    ctx.fillText(line, 64, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makePanel(config) {
  const texture = makeCanvasTexture(config);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: config.opacity ?? 0.88,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(config.w ?? 34, config.h ?? 22), material);
  mesh.userData.texture = texture;
  return mesh;
}

function makeWireBox(w, h, d, color, opacity) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
  );
}

function makeStackBlock(label, color) {
  const group = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const box = makeWireBox(18 - i * 1.2, 2.2, 8, color, 0.28 - i * 0.025);
    box.position.y = i * 3.1;
    box.position.z = -i * 1.2;
    group.add(box);
  }
  const labelTexture = makeCanvasTexture({
    eyebrow: 'STACK_LAYER',
    title: label,
    lines: ['React UI', 'API routes', 'Auth + DB'],
    accent: color,
    width: 420,
    height: 270,
  });
  const labelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 9.5),
    new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, opacity: 0.68, depthWrite: false })
  );
  labelPlane.position.set(0, 20, 0);
  group.add(labelPlane);
  group.userData.texture = labelTexture;
  return group;
}

function makeDatabase(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.56, depthWrite: false });
  for (let i = 0; i < 4; i += 1) {
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 2.2, 48, 1, true), mat.clone());
    cylinder.position.y = i * 2.6;
    group.add(cylinder);
  }
  const pulse = new THREE.Mesh(
    new THREE.TorusGeometry(8.4, 0.08, 8, 72),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.66, depthWrite: false })
  );
  pulse.rotation.x = Math.PI / 2;
  pulse.position.y = 10.4;
  group.add(pulse);
  return group;
}

function makeNeuralGraph() {
  const group = new THREE.Group();
  const nodes = [];
  const positions = [
    [-10, -5, -4],
    [-3, 8, 2],
    [8, 3, -3],
    [2, -10, 5],
    [13, -7, 1],
    [-14, 7, 3],
  ];
  positions.forEach(([x, y, z], index) => {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(index % 2 === 0 ? 1.7 : 1.2, 1),
      new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? LIME : index % 3 === 1 ? CYAN : GREEN,
        wireframe: true,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
      })
    );
    mesh.position.set(x, y, z);
    nodes.push(mesh);
    group.add(mesh);
  });

  const lines = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if ((i + j) % 2 === 0 || Math.abs(i - j) === 1) {
        lines.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
        lines.push(nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lines), 3));
  group.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  })));
  group.userData.nodes = nodes;
  return group;
}

function makeApiRail(color) {
  const group = new THREE.Group();
  const routeMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.34, depthWrite: false });
  const routes = [
    [[-18, -9, 0], [18, -9, -18], [30, -1, -34]],
    [[-20, 0, -12], [10, 0, -30], [26, 8, -48]],
    [[-16, 10, -26], [14, 12, -48], [34, 16, -72]],
  ];
  routes.forEach((points) => {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)), routeMat));
  });
  ['POST /api/ai', 'GET /projects', 'RUN /workflow'].forEach((label, index) => {
    const chip = makePanel({
      eyebrow: 'ROUTE',
      title: label,
      lines: ['validate()', 'persist()', 'stream()'],
      accent: color,
      width: 460,
      height: 260,
      w: 16,
      h: 9,
      opacity: 0.68,
    });
    chip.position.set(20 + index * 7, -12 + index * 12, -18 - index * 23);
    chip.rotation.y = -0.42;
    group.add(chip);
  });
  return group;
}

function makeGlyphTexture(char, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 96, 96);
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.font = '700 48px IBM Plex Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(char, 48, 50);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeFinalWordTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = LIME;
  ctx.shadowBlur = 26;
  ctx.font = '800 88px IBM Plex Mono, monospace';
  ctx.fillStyle = 'rgba(216,255,68,0.88)';
  ctx.fillText('CODE BUILDS', 32, 130);
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = 30;
  ctx.fillStyle = 'rgba(116,230,255,0.84)';
  ctx.fillText('INTELLIGENCE', 32, 236);
  ctx.shadowBlur = 0;
  ctx.font = '600 30px IBM Plex Mono, monospace';
  ctx.fillStyle = 'rgba(226,232,240,0.58)';
  ctx.fillText('{ graphs -> systems -> ai -> shipped software }', 38, 310);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeDataStructureKit() {
  const group = new THREE.Group();
  const nodeMat = new THREE.MeshBasicMaterial({ color: LIME, wireframe: true, transparent: true, opacity: 0.62, depthWrite: false });
  const edgeMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.34, depthWrite: false });

  const tree = new THREE.Group();
  const treePositions = [
    [0, 16, 0],
    [-11, 5, 0],
    [11, 5, 0],
    [-17, -7, 0],
    [-5, -7, 0],
    [5, -7, 0],
    [17, -7, 0],
  ];
  treePositions.forEach(([x, y, z]) => {
    const node = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 8), nodeMat.clone());
    node.position.set(x, y, z);
    tree.add(node);
  });
  const treeEdges = [0, 1, 0, 2, 1, 3, 1, 4, 2, 5, 2, 6];
  const treeLine = [];
  for (let i = 0; i < treeEdges.length; i += 2) {
    const a = treePositions[treeEdges[i]];
    const b = treePositions[treeEdges[i + 1]];
    treeLine.push(...a, ...b);
  }
  const treeGeo = new THREE.BufferGeometry();
  treeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(treeLine), 3));
  tree.add(new THREE.LineSegments(treeGeo, edgeMat));
  tree.position.set(-104, 42, -118);
  tree.userData.kind = 'tree';
  group.add(tree);

  const list = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const box = makeWireBox(7, 4, 2, i % 2 === 0 ? CYAN : LIME, 0.5);
    box.position.x = i * 9;
    list.add(box);
    if (i < 4) {
      const arrowGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 9 + 4, 0, 0),
        new THREE.Vector3(i * 9 + 7, 0, 0),
      ]);
      list.add(new THREE.Line(arrowGeo, edgeMat.clone()));
    }
  }
  list.position.set(72, 44, -18);
  list.rotation.y = -0.35;
  list.userData.kind = 'list';
  group.add(list);

  const stack = new THREE.Group();
  for (let i = 0; i < 7; i += 1) {
    const frame = makeWireBox(12, 2.8, 3, i % 3 === 0 ? GREEN : AMBER, 0.42);
    frame.position.y = i * 3.2;
    stack.add(frame);
  }
  stack.position.set(104, -10, -54);
  stack.rotation.y = -0.48;
  stack.userData.kind = 'stack';
  group.add(stack);

  return group;
}

function makeAlgorithmLab() {
  const group = new THREE.Group();

  const sorter = new THREE.Group();
  const sortHeights = [5, 13, 8, 18, 6, 22, 11, 16, 9];
  sortHeights.forEach((height, index) => {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, height, 3.2),
      new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? LIME : index % 3 === 1 ? CYAN : GREEN,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    );
    bar.position.set(index * 5.2, height / 2, 0);
    bar.userData.baseHeight = height;
    sorter.add(bar);
  });
  sorter.position.set(-116, -6, -146);
  sorter.rotation.y = 0.34;
  sorter.userData.kind = 'sorter';
  group.add(sorter);

  const matrix = new THREE.Group();
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      const active = row === col || (row + col) % 3 === 0;
      const cell = makeWireBox(4, 4, 1.2, active ? LIME : CYAN, active ? 0.48 : 0.18);
      cell.position.set(col * 5, -row * 5, 0);
      cell.userData.active = active;
      matrix.add(cell);
    }
  }
  matrix.position.set(104, 16, -152);
  matrix.rotation.y = -0.52;
  matrix.userData.kind = 'matrix';
  group.add(matrix);

  const heap = new THREE.Group();
  const heapPositions = [
    [0, 18, 0],
    [-12, 7, 0],
    [12, 7, 0],
    [-18, -6, 0],
    [-6, -6, 0],
    [6, -6, 0],
    [18, -6, 0],
    [-22, -18, 0],
    [-14, -18, 0],
  ];
  const heapEdges = [0, 1, 0, 2, 1, 3, 1, 4, 2, 5, 2, 6, 3, 7, 3, 8];
  heapPositions.forEach(([x, y, z], index) => {
    const node = new THREE.Mesh(
      new THREE.OctahedronGeometry(index === 0 ? 2.4 : 1.6, 0),
      new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? AMBER : CYAN,
        wireframe: true,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      })
    );
    node.position.set(x, y, z);
    node.userData.index = index;
    heap.add(node);
  });
  const heapLine = [];
  for (let i = 0; i < heapEdges.length; i += 2) {
    heapLine.push(...heapPositions[heapEdges[i]], ...heapPositions[heapEdges[i + 1]]);
  }
  const heapGeo = new THREE.BufferGeometry();
  heapGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(heapLine), 3));
  heap.add(new THREE.LineSegments(heapGeo, new THREE.LineBasicMaterial({
    color: AMBER,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  })));
  heap.position.set(0, -48, -170);
  heap.userData.kind = 'heap';
  group.add(heap);

  const dpGrid = new THREE.Group();
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const hot = col <= row + 2;
      const cell = makeWireBox(4.5, 3.2, 1.1, hot ? GREEN : CYAN, hot ? 0.42 : 0.15);
      cell.position.set(col * 5, row * 4.4, 0);
      cell.userData.phase = row * 0.4 + col * 0.25;
      dpGrid.add(cell);
    }
  }
  dpGrid.position.set(-28, 62, -166);
  dpGrid.rotation.y = 0.18;
  dpGrid.userData.kind = 'dp';
  group.add(dpGrid);

  return group;
}

function smoothstep(edge0, edge1, value) {
  const x = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return x * x * (3 - 2 * x);
}

export default function ScrollDepthScene() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const scrollRef = useRef({ current: 0, target: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const viewportRef = useRef({ isSmall: false, isMedium: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 900);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const codePanel = makePanel({
      eyebrow: 'CODE_SURFACE',
      title: 'Editor State',
      lines: ['const app = build();', 'await ai.route(task);', 'deploy(workflow);', 'return product;'],
      accent: LIME,
      w: 33,
      h: 21,
    });
    codePanel.position.set(-96, 24, -34);
    codePanel.rotation.set(-0.05, 0.45, -0.08);
    root.add(codePanel);

    const terminalPanel = makePanel({
      eyebrow: 'TERMINAL',
      title: 'Runtime Log',
      lines: ['npm run build', 'tests: passing', 'socket: connected', 'railway: live'],
      accent: CYAN,
      w: 31,
      h: 20,
      opacity: 0.78,
    });
    terminalPanel.position.set(-106, -30, -68);
    terminalPanel.rotation.set(0.06, 0.52, 0.08);
    root.add(terminalPanel);

    const aiGraph = makeNeuralGraph();
    aiGraph.position.set(94, 24, -62);
    aiGraph.scale.setScalar(1.32);
    root.add(aiGraph);

    const apiRail = makeApiRail(LIME);
    apiRail.position.set(76, -18, -78);
    apiRail.scale.setScalar(1.08);
    root.add(apiRail);

    const db = makeDatabase(GREEN);
    db.position.set(106, -48, -22);
    db.scale.setScalar(1.22);
    db.rotation.y = -0.42;
    root.add(db);

    const stack = makeStackBlock('Full Stack', AMBER);
    stack.position.set(-96, -58, -6);
    stack.scale.setScalar(1.12);
    stack.rotation.y = 0.38;
    root.add(stack);

    const deployCube = new THREE.Group();
    ['Frontend', 'API', 'Worker', 'DB'].forEach((label, index) => {
      const cube = makeWireBox(10, 6, 10, index % 2 === 0 ? CYAN : LIME, 0.34);
      cube.position.set(index % 2 === 0 ? -7 : 7, index > 1 ? 8 : -2, -index * 5);
      deployCube.add(cube);
      const tag = makePanel({
        eyebrow: 'SERVICE',
        title: label,
        lines: ['healthz', 'logs', 'scale'],
        accent: index % 2 === 0 ? CYAN : LIME,
        width: 360,
        height: 220,
        w: 10,
        h: 6.2,
        opacity: 0.58,
      });
      tag.position.copy(cube.position);
      tag.position.z += 6;
      deployCube.add(tag);
    });
      deployCube.position.set(92, 58, -130);
    deployCube.rotation.y = -0.4;
    root.add(deployCube);

    const flowGeometry = new THREE.BufferGeometry();
    const flowPoints = [];
    for (let i = 0; i < 140; i += 1) {
      const t = i / 12;
      flowPoints.push([-86 + i * 1.25, Math.sin(t) * 18, -170 + Math.cos(t * 0.7) * 40]);
    }
    flowGeometry.setFromPoints(flowPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const flowLine = new THREE.Line(flowGeometry, new THREE.LineBasicMaterial({
      color: LIME,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    }));
    root.add(flowLine);

    const dataPackets = [];
    for (let i = 0; i < 42; i += 1) {
      const packet = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 1.1, 1.1),
        new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? LIME : i % 3 === 1 ? CYAN : GREEN,
          transparent: true,
          opacity: 0.68,
          wireframe: true,
          depthWrite: false,
        })
      );
      packet.userData.offset = i / 42;
      root.add(packet);
      dataPackets.push(packet);
    }

    const dsaKit = makeDataStructureKit();
    root.add(dsaKit);

    const algorithmLab = makeAlgorithmLab();
    root.add(algorithmLab);

    const glyphGroup = new THREE.Group();
    const glyphs = [];
    const glyphAlphabet = [
      '{', '}', '<', '>', '/', '*', 'A', 'I', 'D', 'B', '0', '1',
      'n', 'O', 'f', 'x', '#', '$', '=>', '[]', '()', 'if', 'for', 'map',
    ];
    const glyphTextures = new Map();
    for (let i = 0; i < 172; i += 1) {
      const char = glyphAlphabet[i % glyphAlphabet.length];
      const color = i % 3 === 0 ? LIME : i % 3 === 1 ? CYAN : GREEN;
      const key = `${char}-${color}`;
      if (!glyphTextures.has(key)) {
        glyphTextures.set(key, makeGlyphTexture(char, color));
      }
      const material = new THREE.SpriteMaterial({
        map: glyphTextures.get(key),
        transparent: true,
        opacity: 0.46,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      const side = i % 2 === 0 ? -1 : 1;
      const scatter = new THREE.Vector3(
        side * (54 + Math.random() * 72),
        -62 + Math.random() * 124,
        -240 + Math.random() * 380
      );
      const t = (i / 172) * Math.PI * 2;
      const codeColumn = new THREE.Vector3(
        side * (46 + (i % 8) * 7.5),
        58 - (i % 19) * 6.5,
        -188 + Math.floor(i / 19) * 20
      );
      const graphTarget = new THREE.Vector3(
        side * 42 + Math.cos(t * 2.4) * (18 + (i % 5) * 3),
        Math.sin(t * 3) * 32,
        -128 + Math.sin(t) * 28
      );
      const algorithmTarget = new THREE.Vector3(
        -86 + (i % 18) * 10,
        -48 + Math.floor((i % 72) / 18) * 18 + Math.sin(t) * 4,
        -112 + Math.floor(i / 72) * 36
      );
      const infinity = new THREE.Vector3(
        Math.sin(t) * 72,
        Math.sin(t * 2) * 24,
        -72 + Math.cos(t) * 18
      );
      const crown = new THREE.Vector3(
        Math.cos(t) * (44 + Math.sin(t * 3) * 10),
        34 + Math.sin(t) * 16,
        -38 + Math.sin(t * 2) * 10
      );
      const target = i % 4 === 0 ? crown : infinity;
      sprite.position.copy(scatter);
      sprite.scale.setScalar(3.4 + (i % 5) * 0.38);
      sprite.userData = { scatter, codeColumn, graphTarget, algorithmTarget, target, spin: i % 2 === 0 ? 1 : -1 };
      glyphGroup.add(sprite);
      glyphs.push(sprite);
    }

    const phraseGlyphs = [];
    const phraseRows = ['CODE_BUILDS', 'INTELLIGENCE'];
    phraseRows.forEach((row, rowIndex) => {
      const startX = 42;
      [...row].forEach((char, charIndex) => {
        const color = rowIndex === 0 ? LIME : CYAN;
        const key = `${char}-${color}`;
        if (!glyphTextures.has(key)) {
          glyphTextures.set(key, makeGlyphTexture(char, color));
        }
        const material = new THREE.SpriteMaterial({
          map: glyphTextures.get(key),
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(material);
        const scatter = new THREE.Vector3(
          (Math.random() > 0.5 ? 1 : -1) * (70 + Math.random() * 70),
          -72 + Math.random() * 144,
          -220 + Math.random() * 320
        );
        const target = new THREE.Vector3(
          startX + charIndex * 7.4,
          58 - rowIndex * 14,
          -56 - rowIndex * 8
        );
        sprite.position.copy(scatter);
        sprite.scale.setScalar(char === '_' ? 2.4 : 5.8);
        sprite.userData = { scatter, target, spin: rowIndex === 0 ? 1 : -1 };
        glyphGroup.add(sprite);
        phraseGlyphs.push(sprite);
      });
    });
    root.add(glyphGroup);

    const finalWordTexture = makeFinalWordTexture();
    const finalWord = new THREE.Mesh(
      new THREE.PlaneGeometry(76, 23),
      new THREE.MeshBasicMaterial({
        map: finalWordTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    finalWord.position.set(68, 56, -42);
    finalWord.rotation.y = -0.28;
    root.add(finalWord);

    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 680;
    const dust = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const side = Math.random() > 0.5 ? 1 : -1;
      dust[i * 3] = side * (45 + Math.random() * 70);
      dust[i * 3 + 1] = (Math.random() - 0.5) * 125;
      dust[i * 3 + 2] = -260 + Math.random() * 430;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
    const dustMesh = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: CYAN,
      size: 0.38,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    }));
    root.add(dustMesh);

    const objects = {
      codePanel,
      terminalPanel,
      aiGraph,
      apiRail,
      db,
      stack,
      deployCube,
      flowLine,
      dustMesh,
      dsaKit,
      algorithmLab,
      glyphGroup,
      finalWord,
    };

    const fitScene = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const isSmall = width < 640;
      const isMedium = width >= 640 && width < 1024;
      viewportRef.current = { isSmall, isMedium };

      camera.aspect = width / height;
      camera.fov = isSmall ? 72 : isMedium ? 60 : 54;
      camera.position.set(0, isSmall ? 2 : 0, isSmall ? 104 : isMedium ? 126 : 112);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      root.scale.setScalar(isSmall ? 0.72 : isMedium ? 0.75 : 1);
      root.position.x = 0;
      container.style.opacity = isSmall ? '0.74' : isMedium ? '0.42' : '0.58';
      container.style.setProperty(
        '--scene-mask',
        isSmall
          ? 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.62) 78%, transparent 100%)'
          : 'radial-gradient(ellipse at center, transparent 0%, transparent 24%, rgba(0,0,0,0.52) 45%, black 74%)'
      );
      codePanel.visible = true;
      terminalPanel.visible = true;
      stack.visible = isSmall || width > 520;
      deployCube.visible = width > 760;
      apiRail.visible = isSmall || width > 520;
      dsaKit.visible = isSmall || width > 520;
      algorithmLab.visible = isSmall || width > 520;
      glyphGroup.scale.setScalar(isSmall ? 0.96 : isMedium ? 0.88 : 1);
    };

    const updateScroll = () => {
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollRef.current.target = Math.min(window.scrollY / pageHeight, 1);
    };

    const updateMouse = (event) => {
      mouseRef.current.x = event.clientX / window.innerWidth - 0.5;
      mouseRef.current.y = event.clientY / window.innerHeight - 0.5;
    };

    fitScene();
    updateScroll();
    window.addEventListener('resize', fitScene);
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', updateMouse);

    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const scroll = scrollRef.current.current + (scrollRef.current.target - scrollRef.current.current) * 0.08;
      scrollRef.current.current = scroll;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const stage = scroll * 5;
      const { isSmall } = viewportRef.current;

      root.rotation.y = (isSmall ? -0.01 : -0.05) + mx * (isSmall ? 0.04 : 0.08) + Math.sin(time * 0.12) * 0.03;
      root.rotation.x = (isSmall ? -0.02 : -0.06) - my * (isSmall ? 0.025 : 0.05);
      root.position.y = -scroll * (isSmall ? 18 : 30);
      root.position.z = scroll * (isSmall ? 36 : 54);

      objects.codePanel.position.y = 22 - stage * 13 + Math.sin(time * 0.4) * 1.4;
      objects.codePanel.rotation.y = 0.42 + scroll * 0.55;
      objects.terminalPanel.position.y = -28 - stage * 9 + Math.cos(time * 0.42) * 1.2;
      objects.terminalPanel.rotation.y = 0.52 + scroll * 0.42;

      objects.aiGraph.rotation.x = time * 0.18 + scroll * 1.6;
      objects.aiGraph.rotation.y = time * 0.24 + scroll * 2.1;
      objects.aiGraph.position.y = 24 - Math.sin(scroll * Math.PI) * 18;
      objects.aiGraph.userData.nodes?.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(time * 1.3 + index) * 0.12);
      });

      objects.apiRail.rotation.y = -0.18 - scroll * 0.48;
      objects.apiRail.position.z = -95 + scroll * 120;
      objects.db.rotation.y = time * 0.16 - scroll * 1.2;
      objects.db.position.y = -48 + Math.sin(scroll * Math.PI * 1.2) * 16;
      objects.stack.rotation.y = 0.38 + scroll * 0.9;
      objects.stack.position.z = -10 + scroll * 80;
      objects.deployCube.rotation.x = time * 0.1 + scroll * 0.9;
      objects.deployCube.rotation.y = -0.4 + scroll * 1.4;
      objects.deployCube.position.z = -160 + scroll * 170;
      objects.dsaKit.rotation.y = Math.sin(time * 0.16) * 0.12 + scroll * 0.9;
      objects.dsaKit.position.z = scroll * 95;
      objects.dsaKit.children.forEach((structure, index) => {
        structure.rotation.z = Math.sin(time * 0.24 + index) * 0.08 + scroll * 0.24 * (index % 2 === 0 ? 1 : -1);
      });
      objects.algorithmLab.rotation.y = Math.sin(time * 0.14) * 0.1 - scroll * 0.72;
      objects.algorithmLab.position.z = -20 + scroll * 118;
      objects.algorithmLab.children.forEach((structure, structureIndex) => {
        structure.rotation.z = Math.sin(time * 0.2 + structureIndex) * 0.05;
        structure.children.forEach((part, partIndex) => {
          if (part.geometry?.type === 'BoxGeometry') {
            const pulse = Math.sin(time * 1.4 + partIndex * 0.65 + scroll * 5) * 0.5 + 0.5;
            part.material.opacity = Math.min(0.58, 0.18 + pulse * 0.32);
          }
          if (part.geometry?.type === 'OctahedronGeometry') {
            part.rotation.y += 0.018 + structureIndex * 0.002;
          }
        });
      });

      dataPackets.forEach((packet) => {
        const p = (packet.userData.offset + scroll * 1.4 + time * 0.035) % 1;
        const idx = Math.floor(p * (flowPoints.length - 1));
        const [x, y, z] = flowPoints[idx];
        packet.position.set(x, y + Math.sin(time * 2 + idx) * 1.5, z + scroll * 75);
        packet.rotation.x += 0.035;
        packet.rotation.y += 0.028;
      });

      objects.flowLine.rotation.z = Math.sin(time * 0.18) * 0.04 + scroll * 0.18;
      objects.dustMesh.rotation.y = time * 0.012 + scroll * 0.7;
      objects.dustMesh.position.z = scroll * 80;
      const assemble = smoothstep(0.68, 0.96, scroll);
      const codePhase = smoothstep(0.02, 0.2, scroll);
      const graphPhase = smoothstep(0.24, 0.44, scroll);
      const algorithmPhase = smoothstep(0.48, 0.68, scroll);
      const tempA = new THREE.Vector3();
      const tempB = new THREE.Vector3();
      const tempC = new THREE.Vector3();
      glyphs.forEach((glyph, index) => {
        const pulse = Math.sin(time * 1.2 + index * 0.33) * 0.5 + 0.5;
        tempA.lerpVectors(glyph.userData.scatter, glyph.userData.codeColumn, codePhase);
        tempB.lerpVectors(tempA, glyph.userData.graphTarget, graphPhase);
        tempC.lerpVectors(tempB, glyph.userData.algorithmTarget, algorithmPhase);
        glyph.position.lerpVectors(tempC, glyph.userData.target, assemble);
        glyph.position.x += Math.sin(time * 0.22 + index) * (1.4 - assemble * 0.7);
        glyph.position.y += Math.sin(time * 0.55 + index) * (1.5 - assemble * 0.8);
        glyph.position.z += scroll * 72;
        glyph.material.opacity = 0.22 + codePhase * 0.14 + graphPhase * 0.08 + algorithmPhase * 0.1 + assemble * 0.26 + pulse * 0.08;
        glyph.material.rotation += 0.0025 * glyph.userData.spin + (codePhase + algorithmPhase + assemble) * 0.0014;
        glyph.scale.setScalar((2.9 + (index % 5) * 0.35) * (1 + codePhase * 0.18 + graphPhase * 0.16 + algorithmPhase * 0.22 + assemble * 0.34));
      });
      phraseGlyphs.forEach((glyph, index) => {
        glyph.position.lerpVectors(glyph.userData.scatter, glyph.userData.target, assemble);
        glyph.position.z += scroll * 70 + Math.sin(time * 0.35 + index) * 1.5;
        glyph.material.opacity = Math.max(0, assemble - 0.14) * 0.95;
        glyph.material.rotation = Math.sin(time * 0.3 + index) * 0.035 * (1 - assemble);
        glyph.scale.setScalar((glyph.userData.target.y > 45 ? 5.4 : 6.2) * (0.65 + assemble * 0.55));
      });
      objects.glyphGroup.rotation.z = Math.sin(time * 0.12) * 0.08 + assemble * 0.18;
      objects.glyphGroup.position.y = -scroll * 18;
      objects.finalWord.material.opacity = smoothstep(0.78, 0.98, scroll) * 0.54;
      objects.finalWord.position.y = 56 + Math.sin(time * 0.22) * 1.4 - scroll * 6;
      objects.finalWord.rotation.z = Math.sin(time * 0.16) * 0.025;

      if (isSmall) {
        objects.codePanel.position.set(-42, 36 - stage * 5 + Math.sin(time * 0.4), -52 + scroll * 22);
        objects.codePanel.rotation.set(-0.03, 0.26 + scroll * 0.2, -0.04);
        objects.codePanel.scale.setScalar(0.68);
        objects.terminalPanel.position.set(40, -34 - stage * 4 + Math.cos(time * 0.42), -58 + scroll * 28);
        objects.terminalPanel.rotation.set(0.04, -0.22 + scroll * 0.18, 0.04);
        objects.terminalPanel.scale.setScalar(0.64);
        objects.aiGraph.position.set(30, 20 - Math.sin(scroll * Math.PI) * 8, -64);
        objects.aiGraph.scale.setScalar(0.82);
        objects.apiRail.position.set(-38, -8, -86 + scroll * 44);
        objects.apiRail.scale.setScalar(0.62);
        objects.db.position.set(42, -48 + Math.sin(scroll * Math.PI * 1.2) * 8, -38);
        objects.db.scale.setScalar(0.72);
        objects.stack.position.set(-46, -48, -26 + scroll * 30);
        objects.stack.scale.setScalar(0.64);
        objects.dsaKit.position.set(0, 34, -118 + scroll * 46);
        objects.dsaKit.scale.setScalar(0.48);
        objects.algorithmLab.position.set(-4, -22, -128 + scroll * 52);
        objects.algorithmLab.scale.setScalar(0.46);
        objects.glyphGroup.position.set(0, -scroll * 10, 12);
        objects.glyphGroup.scale.setScalar(0.96);
        objects.dustMesh.material.opacity = 0.38;
        objects.finalWord.material.opacity = smoothstep(0.78, 0.98, scroll) * 0.34;
      } else {
        objects.codePanel.scale.setScalar(1);
        objects.terminalPanel.scale.setScalar(1);
        objects.aiGraph.scale.setScalar(1.32);
        objects.apiRail.scale.setScalar(1.08);
        objects.db.scale.setScalar(1.22);
        objects.stack.scale.setScalar(1.12);
        objects.dsaKit.scale.setScalar(1);
        objects.algorithmLab.scale.setScalar(1);
        objects.dustMesh.material.opacity = 0.24;
      }

      camera.lookAt(0, -scroll * (isSmall ? 10 : 22), -60 + scroll * (isSmall ? 34 : 58));
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', fitScene);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('mousemove', updateMouse);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      scene.traverse((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) {
          if (item.material.map) item.material.map.dispose();
          item.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        maskImage: 'var(--scene-mask)',
        WebkitMaskImage: 'var(--scene-mask)',
      }}
    />
  );
}
