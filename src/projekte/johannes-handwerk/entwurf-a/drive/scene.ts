// Driveway for the Entwurf A hero, built the way a driveway is built. A piece of garden is cut
// out like a section model: lawn with a hedge, shrubs, a tree and flowers behind, the street on
// the right and the driveway between them. The front cut shows its six layers in real material
// colours: subsoil, frost protection, base course, grit bedding, pavers and sanded joints.
//
// The hero shows the finished drive. Scrolling into the layer steps lifts the layers off, joints
// first, down to the subsoil; then each step lowers its own layer in again, in site order, with a
// note at its edge. The scene is a pure function of the scroll position, so scrubbing back and
// forth always lands on the same frame. It renders on demand only.
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CanvasTexture,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  EdgesGeometry,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const layerCount = 6;

export interface DriveOptions {
  canvas: HTMLCanvasElement;
  labels: HTMLElement[];
  reduceMotion: boolean;
}

export interface Region {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface DriveScene {
  ready: Promise<void>;
  /** Scroll position through the layer steps: -1 hero, 0..5 the six steps. */
  setProgress(value: number): void;
  /** Free area of the canvas, in CSS pixels, that the model should fill without touching the copy. */
  setRegion(region: Region | undefined): void;
  /** Pointer position, -1..1 on both axes. */
  setPointer(x: number, y: number): void;
  /** Draws the next frame if anything changed; call once per animation frame. */
  tick(): void;
  dispose(): void;
}

// Plan, in metres: the driveway runs from the street (x = X1) to the back left edge (x = X0).
// Its front edge (z = Z1) is the section cut. The lawn lies behind it, the street right of it.
const X0 = -2.1,
  X1 = 1.25,
  Z0 = -0.35,
  Z1 = 1.05,
  BACKZ = -1.9,
  STREET = 2.45;
// Heights of the layer boundaries, from the bottom of the model to the paving surface.
const BOTTOM = -0.95,
  FROST = -0.62,
  BASE = -0.34,
  GRIT = -0.13,
  PAVE = -0.07,
  TOP = 0.02;
const LAWN = 0.03;
/** How far above its place a layer starts when it is lowered in. */
const DROP = 1.3;
const BOUNDS = { min: new Vector3(X0, BOTTOM, BACKZ), max: new Vector3(STREET, 1.5, Z1) };

const ink = "#141416";

class Layer {
  group = new Group();
  mats: { mat: Material; base: number }[] = [];
  meshes: Mesh[] = [];
  shown = -1;
  constructor(
    public index: number,
    /** The point its note marks: on the front cut, at the layer's middle height. */
    public anchor: Vector3,
  ) {}

  mat<M extends Material>(mat: M): M {
    mat.transparent = true;
    this.mats.push({ mat, base: mat.opacity });
    return mat;
  }

  add(geometry: BufferGeometry, mat: Material | Material[], at: [number, number, number], edges = false) {
    const mesh = new Mesh(geometry, mat);
    mesh.position.set(...at);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.renderOrder = this.index * 10;
    if (edges) {
      const lines = new LineSegments(
        new EdgesGeometry(geometry),
        this.mat(new LineBasicMaterial({ color: ink, opacity: 0.18 })),
      );
      lines.renderOrder = this.index * 10 + 1;
      mesh.add(lines);
    }
    this.meshes.push(mesh);
    this.group.add(mesh);
    return mesh;
  }

  /** Box from min/max corners. */
  box(min: [number, number, number], max: [number, number, number], mat: Material | Material[], edges = true) {
    const geometry = new BoxGeometry(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
    const mesh = this.add(geometry, mat, [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2], edges);
    return mesh;
  }

  /** shown: 0 lifted off and invisible, 1 in place. */
  set(shown: number, drop: number) {
    if (shown === this.shown) return;
    this.shown = shown;
    this.group.visible = shown > 0.001;
    this.group.position.y = (1 - shown) * drop;
    // The layer fades in over the first part of its way down, so it is solid before it lands.
    const fade = smooth(0, 0.6, shown);
    for (const { mat, base } of this.mats) {
      mat.opacity = base * fade;
      mat.depthWrite = fade > 0.5;
    }
    const casts = fade > 0.5;
    for (const mesh of this.meshes) mesh.castShadow = casts;
  }
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** A small deterministic random generator, so the planting is the same on every load. */
function random(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/** A canvas texture repeated over a surface of the given size. */
function texture(
  draw: (g: CanvasRenderingContext2D, size: number) => void,
  repeatX: number,
  repeatY: number,
  size = 256,
) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d")!, size);
  const map = new CanvasTexture(canvas);
  map.wrapS = map.wrapT = RepeatWrapping;
  map.colorSpace = SRGBColorSpace;
  map.anisotropy = 8;
  map.repeat.set(repeatX, repeatY);
  return map;
}

/** Speckled granular material: earth, gravel, grit. */
function grains(base: string, colors: string[], count: number, size: [number, number], seed: number) {
  return (g: CanvasRenderingContext2D, s: number) => {
    const rnd = random(seed);
    g.fillStyle = base;
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < count; i++) {
      g.fillStyle = colors[Math.floor(rnd() * colors.length)];
      const r = size[0] + rnd() * (size[1] - size[0]);
      g.beginPath();
      g.ellipse(rnd() * s, rnd() * s, r, r * (0.6 + rnd() * 0.4), rnd() * Math.PI, 0, Math.PI * 2);
      g.fill();
    }
  };
}

/** Concrete pavers in running bond, 20 by 10 cm. One tile is 2 by 2 pavers. */
function pavers(joint: string) {
  return (g: CanvasRenderingContext2D, s: number) => {
    const rnd = random(7);
    g.fillStyle = joint;
    g.fillRect(0, 0, s, s);
    const shades = ["#a9a196", "#9f978c", "#b1a99e", "#a39b90", "#978f85"];
    const w = s / 2,
      h = s / 4,
      j = 3;
    for (let row = 0; row < 4; row++)
      for (let col = -1; col < 3; col++) {
        const x = col * w + (row % 2) * (w / 2);
        g.fillStyle = shades[Math.floor(rnd() * shades.length)];
        g.fillRect(x + j, row * h + j, w - 2 * j, h - 2 * j);
      }
  };
}

function buildLayers() {
  const midZ = Z1;
  const len = X1 - X0,
    wide = Z1 - Z0;
  const anchor = (y0: number, y1: number) => new Vector3(X1 - 0.55, (y0 + y1) / 2, midZ);

  const standard = (map: CanvasTexture, color = "#ffffff", roughness = 0.95) =>
    new MeshStandardMaterial({ map, color, roughness });

  // 01 Untergrund: the compacted subsoil of the trench.
  const subsoil = new Layer(0, anchor(BOTTOM, FROST));
  subsoil.box(
    [X0, BOTTOM, Z0],
    [X1, FROST, Z1],
    subsoil.mat(standard(texture(grains("#7a5a3f", ["#5f442f", "#8f6c4e", "#6b4e37"], 900, [1, 3], 3), 6, 2))),
  );

  // 02 Frostschutzschicht: coarse light gravel.
  const frost = new Layer(1, anchor(FROST, BASE));
  frost.box(
    [X0, FROST, Z0],
    [X1, BASE, Z1],
    frost.mat(standard(texture(grains("#b2ada4", ["#8c877e", "#cdc8bf", "#9d978d", "#e0dbd2"], 700, [3, 7], 5), 6, 2))),
  );

  // 03 Tragschicht: crushed stone, darker and finer.
  const base = new Layer(2, anchor(BASE, GRIT));
  base.box(
    [X0, BASE, Z0],
    [X1, GRIT, Z1],
    base.mat(standard(texture(grains("#8a8781", ["#64615c", "#a9a59f", "#76736d"], 1100, [2, 4], 9), 6, 2))),
  );

  // 04 Bettung aus Splitt: a thin bed of fine grit.
  const grit = new Layer(3, anchor(GRIT, PAVE));
  grit.box(
    [X0, GRIT, Z0],
    [X1, PAVE, Z1],
    grit.mat(standard(texture(grains("#d4ccbe", ["#bfb6a6", "#e3dccf", "#c9c0b0"], 1400, [1, 2], 11), 8, 2))),
  );

  // 05 Pflaster: the pavers, joints still open. The front cut shows the stone edges.
  const pave = new Layer(4, anchor(PAVE, TOP));
  const tileSize = 0.4;
  const topMap = texture(pavers("#4f4a44"), len / tileSize, wide / tileSize);
  const side = texture(
    (g, s) => {
      g.fillStyle = "#4f4a44";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "#a39b90";
      g.fillRect(3, 0, s / 2 - 6, s);
      g.fillRect(s / 2 + 3, 0, s / 2 - 6, s);
    },
    len / tileSize,
    1,
  );
  const paveSide = pave.mat(new MeshStandardMaterial({ map: side, roughness: 0.85 }));
  const paveTop = pave.mat(new MeshStandardMaterial({ map: topMap, roughness: 0.8 }));
  pave.box([X0, PAVE, Z0], [X1, TOP, Z1], [paveSide, paveSide, paveTop, paveSide, paveSide, paveSide]);

  // 06 Fugen: joint sand swept in, a thin skin over the pavers that turns the joints light.
  const joints = new Layer(5, new Vector3(X1 - 1.3, TOP, Z1 - 0.35));
  const sanded = joints.mat(
    new MeshStandardMaterial({ map: texture(pavers("#d8c79c"), len / tileSize, wide / tileSize), roughness: 0.85 }),
  );
  const skin = joints.add(new PlaneGeometry(len, wide), sanded, [(X0 + X1) / 2, TOP + 0.002, (Z0 + Z1) / 2]);
  skin.rotation.x = -Math.PI / 2;
  skin.castShadow = false;

  return [subsoil, frost, base, grit, pave, joints];
}

/** The garden and the street around the drive. They stay in place the whole time. */
function buildSurroundings() {
  const group = new Group();
  const rnd = random(42);
  const add = (geometry: BufferGeometry, mat: Material | Material[], at: [number, number, number], shadow = true) => {
    const mesh = new Mesh(geometry, mat);
    mesh.position.set(...at);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };
  const box = (min: [number, number, number], max: [number, number, number], mat: Material | Material[]) => {
    const mesh = add(new BoxGeometry(max[0] - min[0], max[1] - min[1], max[2] - min[2]), mat, [
      (min[0] + max[0]) / 2,
      (min[1] + max[1]) / 2,
      (min[2] + max[2]) / 2,
    ]);
    return mesh;
  };

  // Lawn on topsoil behind the drive, cut on its sides like the rest of the model.
  const soil = new MeshStandardMaterial({
    map: texture(grains("#6e5139", ["#56402c", "#86654a", "#5f472f"], 900, [1, 3], 13), 4, 2),
    roughness: 1,
  });
  const turf = new MeshStandardMaterial({
    map: texture(grains("#5f8f3e", ["#4f7d33", "#6fa04a", "#578a38", "#7aac52"], 2600, [1, 2.5], 17), 4, 4),
    roughness: 1,
  });
  const turfSide = new MeshStandardMaterial({ color: "#4c7a31", roughness: 1 });
  box([X0, BOTTOM, BACKZ], [X1, LAWN - 0.06, Z0], soil);
  box([X0, LAWN - 0.06, BACKZ], [X1, LAWN, Z0], [turfSide, turfSide, turf, turfSide, turfSide, turfSide]);

  // Street: kerb, a strip of asphalt with its base, and the lane marking.
  const kerb = new MeshStandardMaterial({ color: "#c9c5bd", roughness: 0.8 });
  const asphalt = new MeshStandardMaterial({
    map: texture(grains("#3b3c3f", ["#2c2d30", "#4a4b4f", "#35363a"], 2200, [0.6, 1.6], 19), 3, 4),
    roughness: 0.9,
  });
  const roadBase = new MeshStandardMaterial({ color: "#77736c", roughness: 1 });
  box([X1, BOTTOM, BACKZ], [X1 + 0.14, TOP + 0.08, Z1], kerb);
  box([X1 + 0.14, BOTTOM, BACKZ], [STREET, -0.1, Z1], roadBase);
  box([X1 + 0.14, -0.1, BACKZ], [STREET, -0.02, Z1], asphalt);
  const paint = new MeshStandardMaterial({ color: "#f2f0ea", roughness: 0.6 });
  for (let z = BACKZ + 0.15; z < Z1 - 0.3; z += 0.7)
    box([STREET - 0.42, -0.02, z], [STREET - 0.36, -0.012, z + 0.4], paint);

  // Hedge along the back, a tree, shrubs and flowers on the lawn.
  const leaf = (color: string) => new MeshStandardMaterial({ color, roughness: 0.9, flatShading: true });
  const hedge = leaf("#3f6b2e");
  add(new RoundedBoxGeometry(X1 - X0 - 0.2, 0.55, 0.38, 3, 0.12), hedge, [(X0 + X1) / 2, LAWN + 0.27, BACKZ + 0.24]);

  const bark = new MeshStandardMaterial({ color: "#6a4a33", roughness: 0.9 });
  const tree = (x: number, z: number, scale: number, color: string) => {
    add(new CylinderGeometry(0.035 * scale, 0.05 * scale, 0.75 * scale, 8), bark, [x, LAWN + 0.37 * scale, z]);
    const crown = leaf(color);
    for (const [dx, dy, dz, r] of [
      [0, 0.95, 0, 0.36],
      [0.2, 0.82, 0.12, 0.26],
      [-0.18, 0.86, -0.08, 0.27],
      [0.04, 1.15, 0.05, 0.24],
    ])
      add(new IcosahedronGeometry(r * scale, 1), crown, [x + dx * scale, LAWN + dy * scale, z + dz * scale]);
  };
  tree(X0 + 0.45, BACKZ + 0.75, 1, "#4f8236");
  tree(X1 - 0.3, BACKZ + 0.55, 0.72, "#5e9440");

  // Boxwood balls along the edge of the lawn.
  const boxwood = leaf("#456f30");
  for (let x = X0 + 0.35; x < X1 - 0.2; x += 0.62)
    add(new IcosahedronGeometry(0.085, 1), boxwood, [x, LAWN + 0.07, Z0 - 0.12]);

  const shrubColors = ["#4a7a33", "#5b8c3c", "#3f6f2c"];
  for (const [x, z, r] of [
    [X1 - 0.75, BACKZ + 0.95, 0.18],
    [-0.55, BACKZ + 0.8, 0.2],
    [-0.25, BACKZ + 1.15, 0.13],
  ])
    add(new IcosahedronGeometry(r, 1), leaf(shrubColors[Math.floor(rnd() * 3)]), [x, LAWN + r * 0.7, z]);

  // Flower beds: stems with blossoms in a few colours, scattered in two patches.
  const stem = new MeshStandardMaterial({ color: "#4d7c33", roughness: 0.9 });
  const blossoms = ["#f2c43d", "#e86a8a", "#ffffff", "#b27ad6", "#f08a3c"].map(
    (color) => new MeshStandardMaterial({ color, roughness: 0.7 }),
  );
  const stemGeometry = new CylinderGeometry(0.006, 0.006, 1, 4);
  const blossomGeometry = new SphereGeometry(0.035, 8, 6);
  for (const [cx, cz, count] of [
    [0.35, Z0 - 0.35, 26],
    [-1.35, Z0 - 0.4, 22],
  ]) {
    for (let i = 0; i < count; i++) {
      const x = cx + (rnd() - 0.5) * 0.75,
        z = cz + (rnd() - 0.5) * 0.4;
      const h = 0.1 + rnd() * 0.14;
      const s = add(stemGeometry, stem, [x, LAWN + h / 2, z], false);
      s.scale.y = h;
      add(blossomGeometry, blossoms[Math.floor(rnd() * blossoms.length)], [x, LAWN + h, z], false);
    }
  }

  // Grass tufts along the edge of the drive and the kerb.
  const tuft = leaf("#6a9b45");
  const tuftGeometry = new ConeGeometry(0.03, 0.12, 5);
  for (let i = 0; i < 40; i++) {
    const x = X0 + 0.1 + rnd() * (X1 - X0 - 0.2),
      z = Z0 - 0.03 - rnd() * 0.06;
    add(tuftGeometry, tuft, [x, LAWN + 0.05, z], false).rotation.z = (rnd() - 0.5) * 0.5;
  }
  return group;
}

/**
 * How far layer i is in place at scroll position p (-1 hero, 0..5 the steps). Hero to step 1
 * lifts the layers off, joints first, down to the subsoil; from there each step lowers its own
 * layer in on the way to it.
 */
function placed(i: number, p: number) {
  if (i === 0) return 1;
  if (p <= 0) {
    const start = (layerCount - 1 - i) * 0.1;
    return 1 - smooth(start, start + 0.45, p + 1);
  }
  return smooth(i - 0.85, i - 0.15, p);
}

// Camera per state: the hero, then each step framed for its layer. Azimuth and elevation in
// radians, zoom relative to the fitted distance.
const views = [
  { az: 0.62, el: 0.5, zoom: 1 }, // hero: the finished drive in its garden
  { az: 0.5, el: 0.36, zoom: 1.08 }, // Untergrund: low, at the cut
  { az: 0.48, el: 0.34, zoom: 1.1 },
  { az: 0.5, el: 0.36, zoom: 1.1 },
  { az: 0.54, el: 0.4, zoom: 1.08 },
  { az: 0.6, el: 0.56, zoom: 1.04 }, // Pflaster: higher, onto the surface
  { az: 0.64, el: 0.62, zoom: 1 }, // Fugen: from above, then the hero view again
];
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function viewAt(p: number) {
  const s = Math.min(views.length - 1, Math.max(0, p + 1));
  const i = Math.min(views.length - 2, Math.floor(s));
  const t = easeInOut(s - i);
  const a = views[i],
    b = views[i + 1];
  return { az: lerp(a.az, b.az, t), el: lerp(a.el, b.el, t), zoom: lerp(a.zoom, b.zoom, t) };
}

export function createDrive(options: DriveOptions): DriveScene {
  const { canvas, labels, reduceMotion } = options;
  const small = innerWidth < 760;
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  scene.add(new HemisphereLight("#eef4ff", "#c9c2b4", 1.5));
  const sun = new DirectionalLight("#fff6e8", 2.6);
  sun.position.set(-3, 7, 4.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, far: 25 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // The model floats above an invisible floor that only catches its shadow.
  const ground = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = BOTTOM - 0.35;
  ground.receiveShadow = true;
  scene.add(ground);

  const model = new Group();
  const layers = buildLayers();
  for (const layer of layers) model.add(layer.group);
  model.add(buildSurroundings());
  scene.add(model);

  const camera = new PerspectiveCamera(24, 1, 0.1, 100);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  // Without motion the layers swap in place instead of travelling.
  const drop = reduceMotion ? 0 : DROP;
  let progress = -1;
  let dirty = true,
    visible = true,
    live = false;

  let width = 1,
    height = 1;
  let region: Region | undefined;
  const frameRegion = () => region ?? { top: 0, bottom: height, left: 0, right: width };
  // The camera looks at the middle of the free region, beside or below the copy.
  const layout = () => {
    camera.aspect = width / height;
    const r = frameRegion();
    camera.setViewOffset(
      width,
      height,
      width / 2 - (r.left + r.right) / 2,
      height / 2 - (r.top + r.bottom) / 2,
      width,
      height,
    );
    camera.updateProjectionMatrix();
  };

  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map(
    (n) =>
      new Vector3(
        n & 1 ? BOUNDS.max.x : BOUNDS.min.x,
        n & 2 ? BOUNDS.max.y : BOUNDS.min.y,
        n & 4 ? BOUNDS.max.z : BOUNDS.min.z,
      ),
  );
  const centre = BOUNDS.min.clone().add(BOUNDS.max).multiplyScalar(0.5);
  const target = new Vector3(),
    axisX = new Vector3(),
    axisY = new Vector3(),
    axisZ = new Vector3(),
    rel = new Vector3();
  const up = new Vector3(0, 1, 0);
  const tan = Math.tan((camera.fov * Math.PI) / 360);
  const fit = (tx: number, ty: number) => {
    let distance = 0;
    for (const corner of corners) {
      rel.subVectors(corner, target);
      distance = Math.max(
        distance,
        rel.dot(axisZ) + Math.abs(rel.dot(axisX)) / tx,
        rel.dot(axisZ) + Math.abs(rel.dot(axisY)) / ty,
      );
    }
    return distance;
  };
  // Orbit at the view angle, at the distance where the whole box fits the region, then centre the box in it.
  const place = () => {
    const view = viewAt(progress);
    const az = view.az + pointer.x * 0.08,
      el = view.el + pointer.y * 0.04;
    axisZ.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    axisX.crossVectors(up, axisZ).normalize();
    axisY.crossVectors(axisZ, axisX);
    const r = frameRegion();
    const ty = tan * Math.max(0.15, (r.bottom - r.top) / height) * 0.9;
    const tx = tan * camera.aspect * Math.max(0.15, (r.right - r.left) / width) * 0.9;
    target.copy(centre);
    let distance = fit(tx, ty);
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const corner of corners) {
      rel.subVectors(corner, target);
      const depth = distance - rel.dot(axisZ);
      const x = rel.dot(axisX) / depth,
        y = rel.dot(axisY) / depth;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    target
      .addScaledVector(axisX, ((minX + maxX) / 2) * distance)
      .addScaledVector(axisY, ((minY + maxY) / 2) * distance);
    distance = fit(tx, ty) / view.zoom;
    camera.position.copy(target).addScaledVector(axisZ, distance);
    camera.lookAt(target);
  };

  // One note at a time: the layer of the current step. It points right and turns round where it
  // would leave the region.
  const projected = new Vector3();
  const textWidths: number[] = [];
  const positionLabels = (shown: number[]) => {
    const r = frameRegion();
    const length = width < 600 ? 18 : 34;
    labels.forEach((label, i) => {
      const opacity = progress < -0.5 ? 0 : (1 - smooth(0.2, 0.45, Math.abs(progress - i))) * smooth(0.85, 1, shown[i]);
      label.style.opacity = opacity.toFixed(3);
      label.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      if (opacity < 0.01) return;
      projected.copy(layers[i].anchor).applyMatrix4(layers[i].group.matrixWorld).project(camera);
      const x = ((projected.x + 1) / 2) * width,
        y = ((1 - projected.y) / 2) * height;
      textWidths[i] ||= (label.lastElementChild as HTMLElement).offsetWidth;
      const flip = x + length + 10 + textWidths[i] > r.right;
      label.classList.toggle("flip", flip);
      label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)${flip ? " translateX(-100%)" : ""}`;
      label.style.setProperty("--len", `${length}px`);
    });
  };

  let last = performance.now();
  const render = () => {
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!live || !visible) return;
    // The pointer tilt eases on its own clock; everything else follows the scroll directly.
    const k = 1 - Math.exp(-dt * 5);
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.0005;
    if (!dirty && !settling) return;
    dirty = settling;
    const shown = layers.map((layer, i) => {
      const value = placed(i, progress);
      layer.set(value, drop);
      return value;
    });
    place();
    model.updateMatrixWorld();
    renderer.render(scene, camera);
    positionLabels(shown);
  };

  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    layout();
    dirty = true;
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    dirty = true;
  });
  io.observe(canvas);
  resize();

  // Compile every material up front (all layers visible), so the first scroll does not stall.
  for (const layer of layers) layer.set(1, 0);
  const ready = renderer
    .compileAsync(scene, camera)
    .catch(() => undefined)
    .then(() => {
      live = true;
      dirty = true;
    });

  return {
    ready,
    tick: render,
    setProgress(value) {
      if (value !== progress) {
        progress = value;
        dirty = true;
      }
    },
    setRegion(next) {
      if (
        next &&
        region &&
        next.top === region.top &&
        next.bottom === region.bottom &&
        next.left === region.left &&
        next.right === region.right
      )
        return;
      region = next;
      layout();
      dirty = true;
    },
    setPointer(x, y) {
      if (reduceMotion) return;
      pointer.tx = x;
      pointer.ty = y;
    },
    dispose() {
      resizeObserver.disconnect();
      io.disconnect();
      renderer.dispose();
    },
  };
}
