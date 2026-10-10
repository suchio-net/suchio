// Interactive bathroom diorama for the "3D-Badplanung" section. Loaded lazily
// when the planner approaches the viewport; renders on demand only.
import {
  ACESFilmicToneMapping, BoxGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  Mesh, MeshPhysicalMaterial, MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator,
  PointLight, RepeatWrapping, Scene, ShadowMaterial, SphereGeometry, SRGBColorSpace, Vector3, WebGLRenderer,
  type Material, type Object3D,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type StyleId = "hell" | "anthrazit" | "salbei";
export type Layout = "wanne" | "dusche";
export type Mood = "tag" | "abend";
export interface PlannerState { style: StyleId; layout: Layout; mood: Mood }

interface StyleSpec {
  floor: string; floorTile: [number, number]; floorVeins: boolean;
  wall: string; wallTile: [number, number];
  accent: string; accentTile: [number, number]; accentVeins: boolean;
  wood: string; woodRough: number; metal: string; metalRough: number;
  counter: string; towel: string; mat: string; radiator: string;
  __applied?: boolean;
}

const styles: Record<StyleId, StyleSpec> = {
  hell: {
    floor: "#b5aa99", floorTile: [0.6, 0.6], floorVeins: true,
    wall: "#e9e4dc", wallTile: [0.6, 1.2],
    accent: "#cdb795", accentTile: [0.3, 0.6], accentVeins: true,
    wood: "#b9895a", woodRough: 0.62, metal: "#e2e5e8", metalRough: 0.16,
    counter: "#f5f3ef", towel: "#c9875a", mat: "#e6ded2", radiator: "#f3f2ef",
  },
  anthrazit: {
    floor: "#4a4d50", floorTile: [1.2, 0.6], floorVeins: false,
    wall: "#bdb7ae", wallTile: [0.6, 1.2],
    accent: "#3b3f42", accentTile: [0.6, 1.2], accentVeins: true,
    wood: "#5b3a27", woodRough: 0.55, metal: "#c9a35f", metalRough: 0.32,
    counter: "#2d3033", towel: "#dccdb4", mat: "#6a6e72", radiator: "#2a2c2e",
  },
  salbei: {
    floor: "#e2ddd3", floorTile: [0.3, 0.3], floorVeins: false,
    wall: "#f2f0eb", wallTile: [0.3, 0.6],
    accent: "#97ab93", accentTile: [0.075, 0.3], accentVeins: false,
    wood: "#efede8", woodRough: 0.4, metal: "#1f2123", metalRough: 0.5,
    counter: "#f7f5f1", towel: "#b4c4ae", mat: "#d6cfc2", radiator: "#1f2123",
  },
};

// Grayscale tile sheet (4×4 tiles) that the material colour tints.
function tileTexture(veins: boolean, seed: number) {
  const size = 512, n = 4, cell = size / n, grout = 3;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  ctx.fillStyle = "rgb(168,168,168)";
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const v = Math.round(226 + rand() * 26);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x * cell + grout / 2, y * cell + grout / 2, cell - grout, cell - grout);
      ctx.save();
      ctx.beginPath();
      ctx.rect(x * cell + grout / 2, y * cell + grout / 2, cell - grout, cell - grout);
      ctx.clip();
      for (let i = 0; i < 260; i++) {
        const g = Math.round(205 + rand() * 50);
        ctx.fillStyle = `rgba(${g},${g},${g},0.35)`;
        ctx.fillRect(x * cell + rand() * cell, y * cell + rand() * cell, 1.6, 1.6);
      }
      if (veins) {
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(150,150,150,${0.12 + rand() * 0.14})`;
          ctx.lineWidth = 0.8 + rand() * 1.4;
          ctx.beginPath();
          const y0 = y * cell + rand() * cell;
          ctx.moveTo(x * cell - 10, y0);
          ctx.bezierCurveTo(x * cell + cell * 0.3, y0 + (rand() - 0.5) * 60, x * cell + cell * 0.7, y0 + (rand() - 0.5) * 60, x * cell + cell + 10, y0 + (rand() - 0.5) * 40);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function woodTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(226,226,226)";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 140; i++) {
    const g = Math.round(185 + Math.random() * 65);
    ctx.strokeStyle = `rgba(${g},${g},${g},0.55)`;
    ctx.lineWidth = 0.6 + Math.random() * 2.4;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 64) ctx.lineTo(x, y + Math.sin(x / 90 + i) * 4);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  return texture;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function createPlanner(canvas: HTMLCanvasElement, initial: PlannerState, options: { interactive: boolean; reduceMotion: boolean; lowPower?: boolean }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, options.lowPower ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const camera = new PerspectiveCamera(26, 1, 0.1, 60);
  const target = new Vector3(-0.05, 0.85, -0.05);

  // Lights
  const hemi = new HemisphereLight("#fff4e6", "#b9ad9c", 0.45);
  scene.add(hemi);
  const sun = new DirectionalLight("#ffe9cf", 3.1);
  sun.position.set(4.2, 4.6, 2.6);
  sun.castShadow = true;
  const shadowSize = options.lowPower ? 1024 : 2048;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.left = -3; sun.shadow.camera.right = 3; sun.shadow.camera.top = 3; sun.shadow.camera.bottom = -3;
  sun.shadow.radius = 5; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const glow = new PointLight("#ffc98f", 0, 3.2, 1.6);
  glow.position.set(0.95, 1.55, -0.85);
  scene.add(glow);
  const underGlow = new PointLight("#ffbf80", 0, 1.4, 2);
  underGlow.position.set(0.95, 0.3, -0.95);
  scene.add(underGlow);

  // Materials (colours tween between styles)
  const tex = {
    floor: tileTexture(true, 11), wall: tileTexture(false, 23), wallLeft: tileTexture(false, 29), accent: tileTexture(true, 37),
    apron: tileTexture(false, 41), wood: woodTexture(),
  };
  const mat = {
    floor: new MeshStandardMaterial({ map: tex.floor, roughness: 0.42 }),
    wall: new MeshStandardMaterial({ map: tex.wall, roughness: 0.32 }),
    wallLeft: new MeshStandardMaterial({ map: tex.wallLeft, roughness: 0.32 }),
    accent: new MeshStandardMaterial({ map: tex.accent, roughness: 0.3 }),
    apron: new MeshStandardMaterial({ map: tex.apron, roughness: 0.32 }),
    cut: new MeshStandardMaterial({ color: "#cfc6b8", roughness: 0.92 }),
    slabSide: new MeshStandardMaterial({ color: "#a89f92", roughness: 0.95 }),
    ceramic: new MeshStandardMaterial({ color: "#fbfbfa", roughness: 0.12, metalness: 0 }),
    basin: new MeshStandardMaterial({ color: "#e4e7e8", roughness: 0.2 }),
    wood: new MeshStandardMaterial({ map: tex.wood, roughness: 0.6 }),
    counter: new MeshStandardMaterial({ roughness: 0.3 }),
    metal: new MeshStandardMaterial({ metalness: 1, roughness: 0.2 }),
    radiator: new MeshStandardMaterial({ roughness: 0.45, metalness: 0.2 }),
    towel: new MeshStandardMaterial({ roughness: 0.95 }),
    mat: new MeshStandardMaterial({ roughness: 1 }),
    mirror: new MeshStandardMaterial({ color: "#d3dcdf", metalness: 0.75, roughness: 0.1, envMapIntensity: 2.4, emissive: "#8f9a9f", emissiveIntensity: 0.18 }),
    led: new MeshStandardMaterial({ color: "#2a2620", emissive: "#ffd9a8", emissiveIntensity: 0 }),
    glass: new MeshPhysicalMaterial({ color: "#d6e7ea", transparent: true, opacity: 0.2, roughness: 0.04, metalness: 0, clearcoat: 1 }),
    drain: new MeshStandardMaterial({ color: "#2b2d2f", metalness: 0.8, roughness: 0.4 }),
    pot: new MeshStandardMaterial({ color: "#d9cfc0", roughness: 0.85 }),
    leaf: new MeshStandardMaterial({ color: "#6d8a5a", roughness: 0.7 }),
    niche: new MeshStandardMaterial({ color: "#8e8a84", roughness: 0.6, emissive: "#ffd9a8", emissiveIntensity: 0 }),
  };

  const add = (geometry: BoxGeometry | RoundedBoxGeometry | CylinderGeometry | SphereGeometry | PlaneGeometry, material: Material | Material[], position: [number, number, number], parent: Object3D = scene, shadow = true) => {
    const mesh = new Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const rbox = (w: number, h: number, d: number, r = 0.02) => new RoundedBoxGeometry(w, h, d, 3, r);

  // Shell: slab, back wall, left wall (architectural cut-away model).
  const catcher = new Mesh(new PlaneGeometry(14, 14), new ShadowMaterial({ opacity: 0.2 }));
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = -0.161;
  catcher.receiveShadow = true;
  scene.add(catcher);
  add(new BoxGeometry(3.12, 0.16, 2.52), [mat.slabSide, mat.slabSide, mat.floor, mat.slabSide, mat.slabSide, mat.slabSide], [-0.06, -0.08, -0.06]);
  add(new BoxGeometry(3.12, 2.66, 0.12), [mat.cut, mat.cut, mat.cut, mat.cut, mat.wall, mat.cut], [-0.06, 1.17, -1.26]);
  add(new BoxGeometry(0.12, 2.66, 2.4), [mat.wallLeft, mat.cut, mat.cut, mat.cut, mat.cut, mat.cut], [-1.56, 1.17, 0]);
  const accent = add(new PlaneGeometry(1.7, 2.5), mat.accent, [-0.65, 1.25, -1.198], scene, false);

  // Vanity, basin, tap, mirror with back light.
  add(rbox(1.0, 0.42, 0.48, 0.015), mat.wood, [0.95, 0.66, -0.96]);
  add(new BoxGeometry(0.96, 0.006, 0.004), mat.drain, [0.95, 0.66, -0.718], scene, false);
  add(rbox(1.02, 0.035, 0.5, 0.008), mat.counter, [0.95, 0.89, -0.95]);
  add(rbox(0.52, 0.12, 0.38, 0.05), mat.ceramic, [0.95, 0.965, -0.96]);
  add(rbox(0.42, 0.012, 0.27, 0.005), mat.basin, [0.95, 1.022, -0.96], scene, false);
  add(new CylinderGeometry(0.016, 0.016, 0.2, 20), mat.metal, [0.95, 1.12, -1.14]);
  const spout = add(new CylinderGeometry(0.012, 0.012, 0.14, 16), mat.metal, [0.95, 1.21, -1.08]);
  spout.rotation.x = Math.PI / 2;
  add(rbox(0.96, 0.78, 0.01, 0.004), mat.led, [0.95, 1.68, -1.196], scene, false);
  add(rbox(0.9, 0.72, 0.02, 0.006), mat.mirror, [0.95, 1.68, -1.185]);
  add(new BoxGeometry(0.9, 0.012, 0.02), mat.led, [0.95, 0.445, -0.96], scene, false);

  // Plant between bath and vanity.
  add(new CylinderGeometry(0.085, 0.07, 0.22, 24), mat.pot, [0.3, 0.11, -0.98]);
  for (let i = 0; i < 7; i++) {
    const leaf = add(new SphereGeometry(1, 12, 8), mat.leaf, [0.3, 0.32, -0.98]);
    leaf.scale.set(0.035, 0.2, 0.07);
    leaf.rotation.set((Math.random() - 0.5) * 0.9, (i / 7) * Math.PI * 2, (Math.random() - 0.5) * 0.9);
    leaf.position.x += Math.sin(i) * 0.03;
    leaf.position.z += Math.cos(i) * 0.03;
  }

  // Wall-hung WC with flush plate on the left wall.
  add(rbox(0.54, 0.32, 0.36, 0.1), mat.ceramic, [-1.23, 0.34, 0.6]);
  add(rbox(0.5, 0.03, 0.37, 0.012), mat.ceramic, [-1.24, 0.515, 0.6]);
  add(rbox(0.012, 0.15, 0.24, 0.004), mat.metal, [-1.494, 1.05, 0.6], scene, false);

  // Towel radiator and towel.
  const radiator = new Group();
  for (const z of [-0.29, 0.19]) add(new CylinderGeometry(0.014, 0.014, 1.22, 12), mat.radiator, [-1.44, 0.95, z], radiator);
  for (let i = 0; i < 11; i++) add(new BoxGeometry(0.022, 0.024, 0.48), mat.radiator, [-1.44, 0.42 + i * 0.105, -0.05], radiator);
  scene.add(radiator);
  add(rbox(0.07, 0.62, 0.4, 0.03), mat.towel, [-1.4, 1.12, -0.05]);
  add(rbox(0.72, 0.014, 0.46, 0.006), mat.mat, [-0.55, 0.007, -0.15], scene, false);

  // Layout A: built-in bath.
  const bath = new Group();
  add(new BoxGeometry(1.7, 0.56, 0.75), mat.apron, [-0.65, 0.28, -0.825], bath);
  add(rbox(1.7, 0.045, 0.76, 0.012), mat.ceramic, [-0.65, 0.58, -0.825], bath);
  add(rbox(1.42, 0.01, 0.5, 0.004), mat.basin, [-0.65, 0.603, -0.83], bath, false);
  const bathSpout = add(new CylinderGeometry(0.014, 0.014, 0.14, 14), mat.metal, [-0.65, 0.78, -1.13], bath);
  bathSpout.rotation.x = Math.PI / 2;
  scene.add(bath);

  // Layout B: level-access shower with glass, rain head, niche and linear drain.
  const shower = new Group();
  add(new BoxGeometry(0.8, 0.006, 0.06), mat.drain, [-0.9, 0.003, -1.12], shower, false);
  add(new BoxGeometry(0.01, 2.0, 0.78), mat.glass, [-0.3, 1.0, -0.81], shower, false);
  add(new BoxGeometry(0.02, 0.02, 0.78), mat.metal, [-0.3, 2.0, -0.81], shower, false);
  add(rbox(0.32, 0.014, 0.32, 0.006), mat.metal, [-0.95, 2.18, -0.86], shower);
  const arm = add(new CylinderGeometry(0.012, 0.012, 0.36, 12), mat.metal, [-0.95, 2.2, -1.03], shower);
  arm.rotation.x = Math.PI / 2;
  add(rbox(0.2, 0.12, 0.03, 0.01), mat.metal, [-0.95, 1.12, -1.185], shower);
  add(new BoxGeometry(0.42, 0.32, 0.01), mat.niche, [-1.18, 1.32, -1.195], shower, false);
  scene.add(shower);

  // Camera orbit
  let theta = 0.62, phi = 1.07, radius = 9.4;
  let interacted = false;
  const placeCamera = () => {
    camera.position.set(target.x + radius * Math.sin(phi) * Math.sin(theta), target.y + radius * Math.cos(phi), target.z + radius * Math.sin(phi) * Math.cos(theta));
    camera.lookAt(target);
  };
  placeCamera();

  let controls: OrbitControls | undefined;
  if (options.interactive) {
    controls = new OrbitControls(camera, canvas);
    controls.target.copy(target);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.6;
    controls.minAzimuthAngle = 0.08; controls.maxAzimuthAngle = 1.42;
    controls.minPolarAngle = 0.82; controls.maxPolarAngle = 1.28;
    controls.addEventListener("start", () => { interacted = true; wake(); });
    controls.addEventListener("change", () => { const s = new Vector3().subVectors(camera.position, target); theta = Math.atan2(s.x, s.z); phi = Math.acos(s.y / s.length()); onAngle?.(theta); wake(); });
  }

  // Style / layout / mood transitions
  const colorOf = (hex: string) => new Color(hex);
  const repeat = (texture: CanvasTexture, width: number, height: number, tile: [number, number]) => texture.repeat.set(width / (tile[0] * 4), height / (tile[1] * 4));
  let state = { ...initial };
  let tween: { from: Map<MeshStandardMaterial, Color>; to: Map<MeshStandardMaterial, Color>; start: number; spec: StyleSpec } | undefined;
  let layoutTween: { start: number; to: Layout } | undefined;
  let moodValue = initial.mood === "abend" ? 1 : 0, moodTarget = moodValue;

  const targets = (spec: StyleSpec) => new Map<MeshStandardMaterial, Color>([
    [mat.floor, colorOf(spec.floor)], [mat.wall, colorOf(spec.wall)], [mat.wallLeft, colorOf(spec.wall)], [mat.accent, colorOf(spec.accent)],
    [mat.apron, colorOf(spec.wall)], [mat.wood, colorOf(spec.wood)], [mat.counter, colorOf(spec.counter)], [mat.metal, colorOf(spec.metal)],
    [mat.radiator, colorOf(spec.radiator)], [mat.towel, colorOf(spec.towel)], [mat.mat, colorOf(spec.mat)],
  ]);
  const applyTextures = (spec: StyleSpec) => {
    repeat(tex.floor, 3.12, 2.52, spec.floorTile);
    repeat(tex.wall, 3.12, 2.66, spec.wallTile);
    repeat(tex.wallLeft, 2.4, 2.66, spec.wallTile);
    repeat(tex.accent, 1.7, 2.5, spec.accentTile);
    repeat(tex.apron, 1.7, 0.56, spec.wallTile);
    tex.wood.repeat.set(1, 1);
    mat.wood.roughness = spec.woodRough;
    mat.metal.roughness = spec.metalRough;
  };
  const setStyleImmediate = (spec: StyleSpec) => { for (const [m, c] of targets(spec)) m.color.copy(c); applyTextures(spec); };
  setStyleImmediate(styles[initial.style]);
  bath.visible = initial.layout === "wanne";
  shower.visible = initial.layout === "dusche";
  accent.visible = true;

  const applyMood = (v: number) => {
    sun.intensity = 3.1 - 2.75 * v;
    sun.color.set(v > 0.5 ? "#c9d4ff" : "#ffe9cf");
    hemi.intensity = 0.45 - 0.33 * v;
    scene.environmentIntensity = 0.55 - 0.42 * v;
    glow.intensity = 1.8 * v;
    underGlow.intensity = 0.9 * v;
    mat.led.emissiveIntensity = 2.6 * v;
    mat.niche.emissiveIntensity = 0.8 * v;
    renderer.toneMappingExposure = 0.92 + 0.2 * v;
  };
  applyMood(moodValue);

  // Render loop: runs only while something changes and the canvas is visible.
  let running = false, visible = true, raf = 0;
  const startTime = performance.now();
  let onAngle: ((value: number) => void) | undefined;
  const frame = (now: number) => {
    raf = 0;
    let active = false;
    if (tween) {
      const t = Math.min(1, (now - tween.start) / 650), k = easeOut(t);
      for (const [m, c] of tween.to) m.color.lerpColors(tween.from.get(m)!, c, k);
      if (t >= 0.5 && !tween.spec.__applied) { applyTextures(tween.spec); tween.spec.__applied = true; }
      if (t >= 1) tween = undefined; else active = true;
    }
    if (layoutTween) {
      const t = Math.min(1, (now - layoutTween.start) / 500);
      const outgoing = layoutTween.to === "wanne" ? shower : bath, incoming = layoutTween.to === "wanne" ? bath : shower;
      if (t < 0.5) { outgoing.visible = true; outgoing.position.y = -easeOut(t * 2) * 0.12; outgoing.scale.setScalar(1 - t * 0.3); }
      else { outgoing.visible = false; incoming.visible = true; const u = easeOut((t - 0.5) * 2); incoming.position.y = (1 - u) * 0.12; incoming.scale.setScalar(0.85 + u * 0.15); }
      if (t >= 1) { incoming.position.y = 0; incoming.scale.setScalar(1); outgoing.position.y = 0; outgoing.scale.setScalar(1); layoutTween = undefined; } else active = true;
    }
    if (Math.abs(moodValue - moodTarget) > 0.001) {
      moodValue += (moodTarget - moodValue) * 0.12;
      if (Math.abs(moodValue - moodTarget) < 0.002) moodValue = moodTarget;
      applyMood(moodValue);
      active = true;
    }
    const swing = now - startTime;
    if (!interacted && !options.reduceMotion && swing < 4800) {
      theta = 0.62 + Math.sin((swing / 4800) * Math.PI * 2) * 0.16;
      placeCamera();
      controls?.target.copy(target);
      active = true;
    }
    if (controls) { if (controls.update()) active = true; }
    renderer.render(scene, camera);
    if (active && visible) raf = requestAnimationFrame(frame);
    else running = false;
  };
  const wake = () => { if (!running && visible) { running = true; raf = requestAnimationFrame(frame); } };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    radius = camera.aspect < 1 ? 9.4 / Math.max(camera.aspect, 0.62) : 9.4;
    camera.updateProjectionMatrix();
    placeCamera();
    wake();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else if (raf) { cancelAnimationFrame(raf); raf = 0; running = false; } });
  io.observe(canvas);
  resize();

  return {
    set(next: Partial<PlannerState>) {
      if (options.reduceMotion) {
        if (next.style) setStyleImmediate(styles[next.style]);
        if (next.layout) { bath.visible = next.layout === "wanne"; shower.visible = next.layout === "dusche"; }
        if (next.mood) { moodValue = moodTarget = next.mood === "abend" ? 1 : 0; applyMood(moodValue); }
        state = { ...state, ...next };
        wake();
        return;
      }
      if (next.style && next.style !== state.style) {
        const spec: StyleSpec = { ...styles[next.style] };
        const to = targets(spec);
        const from = new Map([...to.keys()].map(m => [m, m.color.clone()] as const));
        tween = { from, to, start: performance.now(), spec };
      }
      if (next.layout && next.layout !== state.layout) layoutTween = { start: performance.now(), to: next.layout };
      if (next.mood) moodTarget = next.mood === "abend" ? 1 : 0;
      state = { ...state, ...next };
      wake();
    },
    setAngle(value: number) { interacted = true; theta = value; placeCamera(); if (controls) { controls.target.copy(target); controls.update(); } wake(); },
    onAngleChange(callback: (value: number) => void) { onAngle = callback; },
    dispose() { resizeObserver.disconnect(); io.disconnect(); controls?.dispose(); renderer.dispose(); },
  };
}
