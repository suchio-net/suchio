// Bathroom corner for the v1 home page, built the way a bathroom is built. Six
// layers, one per trade, sit in the same white "architectural model": shell,
// wiring, plumbing, underfloor heating, tiles and the finished fixtures.
//
// On load the layers drop in one after another until the room is finished.
// Scrolling into the trade steps lifts everything back off down to the bare
// shell, then each step lowers its own trade into place, in site order, so
// every state is a real stage of the job: the new trade lands on top of the
// earlier ones and covers them where it would on site (tiles over pipes).
//
// The whole scene is a pure function of two inputs, the intro clock and the
// scroll position, so scrubbing back and forth always lands on the same frame.
// It renders on demand only: nothing runs while both are at rest.
import {
  ACESFilmicToneMapping, BoxGeometry, CanvasTexture, CurvePath, CylinderGeometry, DirectionalLight, EdgesGeometry,
  Group, HemisphereLight, LatheGeometry, LineBasicMaterial, LineCurve3, LineSegments, Mesh, MeshPhysicalMaterial,
  MeshStandardMaterial, PCFShadowMap, PerspectiveCamera, PlaneGeometry, PMREMGenerator, QuadraticBezierCurve3,
  RepeatWrapping, Scene, ShadowMaterial, SRGBColorSpace, TubeGeometry, Vector2, Vector3, WebGLRenderer,
  type BufferGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";

export const layerCount = 6;

export interface HeroOptions {
  canvas: HTMLCanvasElement;
  labels: HTMLElement[];
  reduceMotion: boolean;
  /** Called while the intro assembles, with the index of the layer that is landing. */
  onIntroStep?: (index: number) => void;
}

export interface Region { top: number; bottom: number; left: number; right: number }

export interface HeroScene {
  /** Scroll position through the trade steps: -1 hero, 0..5 the six steps. */
  setProgress(value: number): void;
  /** Free area of the canvas, in CSS pixels, that the model should fill without touching the copy. */
  setRegion(region: Region | undefined): void;
  /** Pointer position, -1..1 on both axes. */
  setPointer(x: number, y: number): void;
  /** Draws the next frame if anything changed; call once per animation frame. */
  tick(): void;
  dispose(): void;
}

// Room: back wall inner face at z = -S, left wall inner face at x = -S.
const S = 1.6, T = 0.18, H = 2.5, SLAB = 0.16;
const BACK = -S, LEFT = -S;
const SKIN = 0.07, TILE = 0.012, FACE = SKIN + TILE; // wall tiles sit on a 7 cm installation layer
const FLOOR = 0.062;
/** How far above its place a layer starts when it is lowered in. */
const DROP = 1.1;
/** Bounding box of the whole model, which the camera keeps in frame. */
const BOUNDS = { min: new Vector3(LEFT - T, -SLAB, BACK - T), max: new Vector3(S, H, S) };

const ink = "#141416";

type Mat = MeshStandardMaterial | MeshPhysicalMaterial | LineBasicMaterial;

class Layer {
  group = new Group();
  mats: { mat: Mat; base: number }[] = [];
  meshes: Mesh[] = [];
  shown = -1;
  constructor(public index: number, public anchor: Vector3) {}

  // Every material can fade, so all of them are transparent. They still write
  // depth (only the glass does not), and each layer draws in a fixed order
  // after the ones below it, so the order never flips between frames and
  // nothing flickers through a surface while it fades.
  mat<M extends Mat>(mat: M): M {
    mat.transparent = true;
    mat.depthWrite = mat.opacity > 0.5;
    this.mats.push({ mat, base: mat.opacity });
    return mat;
  }

  add(geometry: BufferGeometry, mat: Mat, at: [number, number, number], options: { edges?: boolean; rotate?: [number, number, number]; shadow?: boolean } = {}) {
    const mesh = new Mesh(geometry, mat);
    mesh.position.set(...at);
    if (options.rotate) mesh.rotation.set(...options.rotate);
    mesh.castShadow = options.shadow ?? true;
    mesh.receiveShadow = true;
    mesh.renderOrder = this.index * 10 + (mat.opacity > 0.5 ? 0 : 5);
    if (options.edges) {
      const lines = new LineSegments(new EdgesGeometry(geometry, 30), this.mat(new LineBasicMaterial({ color: ink, opacity: 0.2 })));
      lines.renderOrder = this.index * 10 + 1;
      mesh.add(lines);
    }
    this.meshes.push(mesh);
    this.group.add(mesh);
    return mesh;
  }

  /** Box from min/max corners, which reads more like a plan than centre and size. */
  box(min: [number, number, number], max: [number, number, number], mat: Mat, edges = true) {
    const size: [number, number, number] = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    return this.add(new BoxGeometry(...size), mat, [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2], { edges });
  }

  tube(points: [number, number, number][], radius: number, mat: Mat, corner = 0.06) {
    return this.add(new TubeGeometry(polyline(points, corner), Math.max(24, points.length * 28), radius, 10, false), mat, [0, 0, 0]);
  }

  /** shown: 0 lifted off and invisible, 1 in place. */
  set(shown: number, drop: number) {
    if (shown === this.shown) return;
    this.shown = shown;
    this.group.visible = shown > 0.001;
    this.group.position.y = (1 - shown) * drop;
    // The layer fades in over the first part of its way down, so it is solid
    // well before it reaches the layers below it.
    const fade = smooth(0, 0.6, shown);
    for (const { mat, base } of this.mats) mat.opacity = base * fade;
    const casts = fade > 0.5;
    for (const mesh of this.meshes) if (mesh.castShadow !== casts) mesh.castShadow = casts;
  }
}

/** A polyline with rounded corners, so pipes and cables bend instead of kinking. */
function polyline(points: [number, number, number][], radius: number) {
  const p = points.map(point => new Vector3(...point));
  const path = new CurvePath<Vector3>();
  let from = p[0];
  for (let i = 1; i < p.length - 1; i++) {
    const inDir = p[i].clone().sub(p[i - 1]), outDir = p[i + 1].clone().sub(p[i]);
    const r = Math.min(radius, inDir.length() / 2, outDir.length() / 2);
    const a = p[i].clone().sub(inDir.normalize().multiplyScalar(r));
    const b = p[i].clone().add(outDir.normalize().multiplyScalar(r));
    path.add(new LineCurve3(from, a));
    path.add(new QuadraticBezierCurve3(a, p[i], b));
    from = b;
  }
  path.add(new LineCurve3(from, p[p.length - 1]));
  return path;
}

/** Tile pattern: one tile with grout on two edges, repeated over the surface. */
function tileTexture(tile: string, grout: string, ratio = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = Math.round(256 * ratio);
  const g = canvas.getContext("2d")!;
  g.fillStyle = grout;
  g.fillRect(0, 0, canvas.width, canvas.height);
  g.fillStyle = tile;
  g.fillRect(3, 3, canvas.width - 3, canvas.height - 3);
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function tiled(base: CanvasTexture, width: number, height: number, tileW: number, tileH: number) {
  const texture = base.clone();
  texture.repeat.set(width / tileW, height / tileH);
  texture.needsUpdate = true;
  return texture;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildLayers() {
  const clay = (color = "#f6f6f6") => new MeshStandardMaterial({ color, roughness: 0.82, metalness: 0 });

  // 01 Innenausbau: slab and the two walls, cut like an architectural section.
  const shell = new Layer(0, new Vector3(S, 1.9, BACK - T / 2));
  {
    const wall = shell.mat(clay());
    const cut = shell.mat(new MeshStandardMaterial({ color: "#1b1b1d", roughness: 0.6 }));
    shell.box([LEFT - T, -SLAB, BACK - T], [S, 0, S], wall);
    shell.box([LEFT - T, -SLAB, BACK - T], [S, H, BACK], wall);
    shell.box([LEFT - T, -SLAB, BACK], [LEFT, H, S], wall);
    // Section cuts: wall tops and the two open ends read as solid black.
    shell.box([LEFT - T, H, BACK - T], [S, H + 0.006, BACK], cut, false);
    shell.box([LEFT - T, H, BACK], [LEFT, H + 0.006, S], cut, false);
    shell.box([S, -SLAB, BACK - T], [S + 0.006, H + 0.006, BACK], cut, false);
    shell.box([LEFT - T, -SLAB, S], [LEFT, H + 0.006, S + 0.006], cut, false);
    shell.box([S, -SLAB, BACK - T], [S + 0.006, 0, S + 0.006], cut, false);
    shell.box([LEFT - T, -SLAB, S], [S + 0.006, 0, S + 0.006], cut, false);
  }

  // 02 Elektro: cables in the wall, flush boxes, the junction above the mirror.
  const elektro = new Layer(1, new Vector3(1.45, 1.7, BACK + 0.02));
  {
    const cable = elektro.mat(new MeshStandardMaterial({ color: "#151517", roughness: 0.45 }));
    const box = elektro.mat(new MeshStandardMaterial({ color: "#2a2a2d", roughness: 0.5 }));
    const zb = BACK + 0.02, xl = LEFT + 0.02, top = 2.28;
    elektro.tube([[1.45, 0.02, zb], [1.45, top, zb], [xl, top, zb], [xl, top, 0.35], [xl, 1.1, 0.35]], 0.011, cable);
    elektro.tube([[0.95, top, zb], [0.95, 2.05, zb]], 0.011, cable);
    elektro.tube([[-1.08, top, zb], [-1.08, 2.12, zb]], 0.011, cable);
    elektro.tube([[1.45, 0.3, zb], [1.7, 0.3, zb]], 0.011, cable, 0.02);
    const flush = new CylinderGeometry(0.034, 0.034, 0.04, 24);
    for (const [x, y] of [[1.45, 1.05], [0.95, 2.05], [-1.08, 2.12]] as const) elektro.add(flush, box, [x, y, BACK + 0.02], { rotate: [Math.PI / 2, 0, 0] });
    elektro.add(flush, box, [LEFT + 0.02, 1.1, 0.35], { rotate: [0, 0, Math.PI / 2] });
  }

  // 03 Sanitär: supply lines, drain, the WC frame and the shower channel.
  const sanitaer = new Layer(2, new Vector3(-0.15, 1.05, BACK + 0.04));
  {
    const pipe = sanitaer.mat(new MeshStandardMaterial({ color: "#8f9296", roughness: 0.32, metalness: 0.75 }));
    const drain = sanitaer.mat(new MeshStandardMaterial({ color: "#58595d", roughness: 0.55 }));
    const frame = sanitaer.mat(new MeshStandardMaterial({ color: "#3a3b3e", roughness: 0.5, metalness: 0.4 }));
    const cistern = sanitaer.mat(new MeshStandardMaterial({ color: "#d9d9db", roughness: 0.7 }));
    const zc = BACK + 0.03, zh = BACK + 0.052;
    sanitaer.tube([[1.25, 0, zc], [1.25, 0.3, zc], [-1.18, 0.3, zc], [-1.18, 1.02, zc]], 0.015, pipe);
    sanitaer.tube([[1.36, 0, zh], [1.36, 0.4, zh], [-1.0, 0.4, zh], [-1.0, 1.02, zh]], 0.015, pipe);
    sanitaer.tube([[0.82, 0.3, zc], [0.82, 0.66, zc]], 0.015, pipe, 0.02);
    sanitaer.tube([[1.08, 0.4, zh], [1.08, 0.66, zh]], 0.015, pipe, 0.02);
    sanitaer.tube([[-0.05, 0.3, zc], [-0.05, 0.86, zc]], 0.015, pipe, 0.02);
    sanitaer.tube([[0.95, 0.5, BACK + 0.038], [0.95, 0.08, BACK + 0.038], [-0.15, 0.08, BACK + 0.038], [-0.15, 0.24, BACK + 0.038]], 0.03, drain, 0.1);
    // Pre-wall frame for the wall-hung WC.
    sanitaer.box([-0.42, 0, BACK + 0.01], [-0.38, 1.14, BACK + 0.062], frame);
    sanitaer.box([0.08, 0, BACK + 0.01], [0.12, 1.14, BACK + 0.062], frame);
    sanitaer.box([-0.42, 1.1, BACK + 0.01], [0.12, 1.14, BACK + 0.062], frame);
    sanitaer.box([-0.42, 0.18, BACK + 0.01], [0.12, 0.22, BACK + 0.062], frame);
    sanitaer.box([-0.33, 0.7, BACK + 0.012], [0.03, 1.06, BACK + 0.064], cistern);
    // Shower channel in the floor.
    sanitaer.box([-1.48, 0.012, BACK + 0.13], [-0.68, 0.05, BACK + 0.21], drain);
  }

  // 04 Heizung: underfloor heating loop and its manifold on the left wall.
  const heizung = new Layer(3, new Vector3(1.45, 0.03, 0.9));
  {
    const loop = heizung.mat(new MeshStandardMaterial({ color: "#a9abae", roughness: 0.45 }));
    const metal = heizung.mat(new MeshStandardMaterial({ color: "#2e2f32", roughness: 0.4, metalness: 0.5 }));
    const y = 0.026, x0 = -1.42, x1 = 1.44, z0 = -0.5, z1 = 1.42, runs = 14;
    const points: [number, number, number][] = [[LEFT + 0.06, y, 1.28], [LEFT + 0.06, y, z0], [x0, y, z0]];
    for (let i = 0; i < runs; i++) {
      const z = z0 + ((z1 - z0) * i) / (runs - 1);
      const zn = z0 + ((z1 - z0) * (i + 1)) / (runs - 1);
      const end = i % 2 === 0 ? x1 : x0;
      points.push([end, y, z]);
      if (i < runs - 1) points.push([end, y, zn]);
    }
    points.push([LEFT + 0.12, y, z1], [LEFT + 0.12, y, 1.32]);
    heizung.tube(points, 0.013, loop, 0.065);
    heizung.box([LEFT + 0.004, 0.08, 1.12], [LEFT + 0.06, 0.48, 1.48], metal);
  }

  // 05 Fliesen: large-format tiles, dark in the shower, white elsewhere.
  const fliesen = new Layer(4, new Vector3(0.3, 1.75, BACK + FACE));
  {
    const white = tileTexture("#f3f3f4", "#d6d6d9", 2);
    const dark = tileTexture("#2c2c2f", "#1a1a1c", 2);
    const floor = tileTexture("#e4e4e6", "#c9c9cc", 1);
    const shower = -0.55, showerZ = -0.7;
    const panel = (texture: CanvasTexture, w: number, h: number, tw: number, th: number) =>
      fliesen.mat(new MeshStandardMaterial({ map: tiled(texture, w, h, tw, th), roughness: 0.38, metalness: 0 }));
    const backDarkW = shower - LEFT, backWhiteW = S - shower;
    fliesen.box([LEFT, FLOOR, BACK + SKIN], [shower, H, BACK + FACE], panel(dark, backDarkW, H - FLOOR, 0.3, 0.6));
    fliesen.box([shower, FLOOR, BACK + SKIN], [S, H, BACK + FACE], panel(white, backWhiteW, H - FLOOR, 0.3, 0.6));
    const leftDarkD = showerZ - (BACK + FACE), leftWhiteD = S - showerZ;
    // Left-wall panels are rotated so the texture runs along z.
    const left = (z0: number, z1: number, mat: Mat) => {
      const mesh = fliesen.add(new BoxGeometry(z1 - z0, H - FLOOR, TILE), mat, [LEFT + SKIN + TILE / 2, (FLOOR + H) / 2, (z0 + z1) / 2], { edges: true, rotate: [0, Math.PI / 2, 0] });
      return mesh;
    };
    left(BACK + FACE, showerZ, panel(dark, leftDarkD, H - FLOOR, 0.3, 0.6));
    left(showerZ, S, panel(white, leftWhiteD, H - FLOOR, 0.3, 0.6));
    fliesen.box([LEFT + FACE, 0.05, BACK + FACE], [S, FLOOR, S], panel(floor, S - LEFT - FACE, S - BACK - FACE, 0.6, 0.6));
  }

  // 06 Komplettbad: the finished room.
  const fertig = new Layer(5, new Vector3(0.95, 0.68, BACK + FACE + 0.46));
  {
    const graphite = fertig.mat(new MeshStandardMaterial({ color: "#1d1d20", roughness: 0.42 }));
    const matte = fertig.mat(new MeshStandardMaterial({ color: "#121214", roughness: 0.35, metalness: 0.55 }));
    const ceramic = fertig.mat(new MeshPhysicalMaterial({ color: "#fbfbfb", roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08 }));
    const stone = fertig.mat(new MeshStandardMaterial({ color: "#f1f1f2", roughness: 0.5 }));
    const mirror = fertig.mat(new MeshStandardMaterial({ color: "#e9ecef", roughness: 0.04, metalness: 1 }));
    const glass = fertig.mat(new MeshPhysicalMaterial({ color: "#dfe7eb", roughness: 0.04, metalness: 0, opacity: 0.2, envMapIntensity: 1.4 }));
    const light = fertig.mat(new MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 1.6 }));
    const wall = BACK + FACE, side = LEFT + FACE;

    // Vanity, top, bowl and spout.
    fertig.add(new RoundedBoxGeometry(0.9, 0.3, 0.46, 4, 0.014), graphite, [0.95, 0.68, wall + 0.23], { edges: true });
    fertig.box([0.49, 0.83, wall], [1.41, 0.855, wall + 0.48], stone);
    fertig.box([0.54, 0.525, wall + 0.02], [1.36, 0.53, wall + 0.42], light, false);
    const bowl = [new Vector2(0, 0), new Vector2(0.15, 0), new Vector2(0.19, 0.04), new Vector2(0.2, 0.12), new Vector2(0.185, 0.12), new Vector2(0.17, 0.05), new Vector2(0.12, 0.02), new Vector2(0, 0.02)];
    fertig.add(new LatheGeometry(bowl, 48), ceramic, [0.95, 0.855, wall + 0.25]);
    fertig.add(new CylinderGeometry(0.011, 0.011, 0.18, 16), matte, [0.95, 1.06, wall + 0.09], { rotate: [Math.PI / 2, 0, 0] });
    fertig.add(new RoundedBoxGeometry(0.76, 0.82, 0.03, 4, 0.012), mirror, [0.95, 1.6, wall + 0.016], { edges: true });
    fertig.box([0.7, 2.06, wall], [1.2, 2.085, wall + 0.05], matte, false);
    fertig.box([0.72, 2.058, wall + 0.008], [1.18, 2.06, wall + 0.042], light, false);
    fertig.add(new RoundedBoxGeometry(0.08, 0.08, 0.012, 2, 0.006), stone, [1.45, 1.05, wall + 0.006], { edges: true });
    fertig.add(new RoundedBoxGeometry(0.08, 0.08, 0.012, 2, 0.006), stone, [side + 0.006, 1.1, 0.35], { edges: true, rotate: [0, Math.PI / 2, 0] });

    // Wall-hung WC and its flush plate.
    fertig.add(new RoundedBoxGeometry(0.37, 0.3, 0.55, 6, 0.08), ceramic, [-0.15, 0.43, wall + 0.275], { edges: true });
    fertig.add(new RoundedBoxGeometry(0.22, 0.15, 0.012, 2, 0.006), matte, [-0.15, 1.0, wall + 0.006]);

    // Walk-in shower: glass panel, rain head, mixer and channel cover.
    const glassZ0 = wall, glassZ1 = -0.72;
    fertig.box([-0.555, FLOOR, glassZ0], [-0.545, 2.05, glassZ1], glass);
    fertig.box([-0.565, 2.05, glassZ0], [-0.535, 2.07, glassZ1], matte, false);
    fertig.add(new CylinderGeometry(0.01, 0.01, 0.36, 12), matte, [-1.08, 2.14, wall + 0.18], { rotate: [Math.PI / 2, 0, 0] });
    fertig.add(new CylinderGeometry(0.15, 0.15, 0.012, 48), matte, [-1.08, 2.12, wall + 0.36]);
    fertig.add(new RoundedBoxGeometry(0.06, 0.18, 0.05, 2, 0.01), matte, [-1.09, 1.05, wall + 0.025]);
    fertig.box([-1.45, FLOOR, wall + 0.06], [-0.71, FLOOR + 0.004, wall + 0.12], matte, false);

    // Towel radiator on the left wall.
    for (const z of [-0.3, 0.2]) fertig.add(new CylinderGeometry(0.013, 0.013, 1.1, 12), matte, [side + 0.06, 0.92, z]);
    for (let i = 0; i < 9; i++) fertig.add(new CylinderGeometry(0.009, 0.009, 0.5, 10), matte, [side + 0.06, 0.42 + i * 0.12, -0.05], { rotate: [Math.PI / 2, 0, 0] });

    // A folded towel and a vase, so the room reads as lived in.
    fertig.add(new RoundedBoxGeometry(0.26, 0.06, 0.18, 3, 0.02), stone, [1.24, 0.886, wall + 0.24], { edges: true });
    const vase = [new Vector2(0, 0), new Vector2(0.05, 0), new Vector2(0.06, 0.06), new Vector2(0.035, 0.17), new Vector2(0.03, 0.2), new Vector2(0, 0.2)];
    fertig.add(new LatheGeometry(vase, 32), graphite, [0.62, 0.855, wall + 0.18]);
    fertig.tube([[0.62, 1.05, wall + 0.18], [0.6, 1.25, wall + 0.2], [0.52, 1.42, wall + 0.24]], 0.004, graphite, 0.15);
    fertig.tube([[0.62, 1.05, wall + 0.18], [0.66, 1.22, wall + 0.16], [0.72, 1.36, wall + 0.12]], 0.004, graphite, 0.15);
  }

  return [shell, elektro, sanitaer, heizung, fliesen, fertig];
}

/**
 * How far layer i is in place at scroll position p (-1 hero, 0..5 the steps).
 * Hero to step 1 lifts the trades off, finished fixtures first; from there each
 * step lowers its own trade in on the way to it.
 */
function placed(i: number, p: number) {
  if (i === 0) return 1;
  if (p <= 0) {
    const start = (layerCount - 1 - i) * 0.12;
    return 1 - smooth(start, start + 0.4, p + 1);
  }
  return smooth(i - 0.85, i - 0.15, p);
}

// Camera per state: the hero, then each step framed for its trade. Azimuth
// and elevation in radians, zoom relative to the fitted distance.
const views = [
  { az: 0.74, el: 0.5, zoom: 1 }, // hero: the finished room
  { az: 0.8, el: 0.56, zoom: 1 }, // Innenausbau: the bare shell
  { az: 0.6, el: 0.42, zoom: 1.04 }, // Elektro: squarer on to the back wall
  { az: 0.56, el: 0.38, zoom: 1.06 }, // Sanitär: low, at the pre-wall frame
  { az: 0.84, el: 0.84, zoom: 1 }, // Heizung: from above, onto the floor loop
  { az: 0.7, el: 0.5, zoom: 1 }, // Fliesen
  { az: 0.74, el: 0.5, zoom: 1 }, // Komplettbad: back to the hero view
];

function viewAt(p: number) {
  const s = Math.min(views.length - 1, Math.max(0, p + 1));
  const i = Math.min(views.length - 2, Math.floor(s));
  const t = easeInOut(s - i);
  const a = views[i], b = views[i + 1];
  return { az: lerp(a.az, b.az, t), el: lerp(a.el, b.el, t), zoom: lerp(a.zoom, b.zoom, t) };
}

export function createHero(options: HeroOptions): HeroScene & { ready: Promise<void> } {
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
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  scene.add(new HemisphereLight("#ffffff", "#d8d8dc", 1.1));
  const sun = new DirectionalLight("#ffffff", 2.4);
  sun.position.set(-3.5, 8, 5.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  sun.shadow.camera.left = -6; sun.shadow.camera.right = 6; sun.shadow.camera.top = 7; sun.shadow.camera.bottom = -4;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 6;
  sun.shadow.blurSamples = 16;
  scene.add(sun);

  // The model floats above an invisible floor that only catches its shadow.
  const ground = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.09 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.62;
  ground.receiveShadow = true;
  scene.add(ground);

  const model = new Group();
  const layers = buildLayers();
  for (const layer of layers) model.add(layer.group);
  scene.add(model);

  const camera = new PerspectiveCamera(22, 1, 0.1, 100);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const drop = reduceMotion ? 0 : DROP;
  let progress = -1;
  let dirty = true, visible = true, live = false;

  // Intro: each layer is lowered into place in site order. Its value is how far
  // the layer is in; the scroll can only hold a layer further out, never in.
  const intro = layers.map(() => ({ v: reduceMotion ? 1 : 0 }));
  let timeline: gsap.core.Timeline | undefined;
  const invalidate = () => { dirty = true; };

  let width = 1, height = 1;
  let region: Region | undefined;
  const frameRegion = () => region ?? { top: 0, bottom: height, left: width * 0.34, right: width };
  const layout = () => {
    camera.aspect = width / height;
    // The camera looks at the middle of the free region: right of the copy on
    // wide screens, below it on phones.
    const r = frameRegion();
    camera.setViewOffset(width, height, width / 2 - (r.left + r.right) / 2, height / 2 - (r.top + r.bottom) / 2, width, height);
    camera.updateProjectionMatrix();
  };

  // Frame the model: orbit around it at the current view, at the distance where
  // all eight corners of its box fit the free region, then shift the target so
  // the box sits in the middle of it rather than its centre point.
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map(n => new Vector3(n & 1 ? BOUNDS.max.x : BOUNDS.min.x, n & 2 ? BOUNDS.max.y : BOUNDS.min.y, n & 4 ? BOUNDS.max.z : BOUNDS.min.z));
  const centre = BOUNDS.min.clone().add(BOUNDS.max).multiplyScalar(0.5);
  const target = new Vector3(), axisX = new Vector3(), axisY = new Vector3(), axisZ = new Vector3(), rel = new Vector3();
  const up = new Vector3(0, 1, 0);
  const tan = Math.tan((camera.fov * Math.PI) / 360);
  const fit = (tx: number, ty: number) => {
    let distance = 0;
    for (const corner of corners) {
      rel.subVectors(corner, target);
      const u = rel.dot(axisX), v = rel.dot(axisY), w = rel.dot(axisZ);
      distance = Math.max(distance, w + Math.abs(u) / tx, w + Math.abs(v) / ty);
    }
    return distance;
  };
  const place = () => {
    const view = viewAt(progress);
    const az = view.az + pointer.x * 0.08, el = view.el + pointer.y * 0.04;
    axisZ.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    axisX.crossVectors(up, axisZ).normalize();
    axisY.crossVectors(axisZ, axisX);
    const r = frameRegion();
    const ty = tan * Math.max(0.15, (r.bottom - r.top) / height) * 0.9;
    const tx = tan * camera.aspect * Math.max(0.15, (r.right - r.left) / width) * 0.9;
    target.copy(centre);
    let distance = fit(tx, ty);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const corner of corners) {
      rel.subVectors(corner, target);
      const depth = distance - rel.dot(axisZ);
      const x = rel.dot(axisX) / depth, y = rel.dot(axisY) / depth;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    target.addScaledVector(axisX, ((minX + maxX) / 2) * distance).addScaledVector(axisY, ((minY + maxY) / 2) * distance);
    distance = fit(tx, ty) / view.zoom;
    camera.position.copy(target).addScaledVector(axisZ, distance);
    camera.lookAt(target);
  };

  // One label at a time: the trade of the current step, pointing away from the
  // model into free space, and turned around where it would leave the region.
  const projected = new Vector3();
  const textWidths: number[] = [];
  const positionLabels = (shown: number[]) => {
    const r = frameRegion();
    const mid = (r.left + r.right) / 2;
    const length = width < 600 ? 18 : 32;
    labels.forEach((label, i) => {
      const opacity = progress < -0.5 ? 0 : (1 - smooth(0.2, 0.45, Math.abs(progress - i))) * smooth(0.85, 1, shown[i]);
      label.style.opacity = opacity.toFixed(3);
      label.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      if (opacity < 0.01) return;
      projected.copy(layers[i].anchor).applyMatrix4(layers[i].group.matrixWorld).project(camera);
      const x = (projected.x + 1) / 2 * width, y = (1 - projected.y) / 2 * height;
      textWidths[i] ||= (label.lastElementChild as HTMLElement).offsetWidth;
      const reach = length + 10 + textWidths[i];
      let flip = x < mid;
      if (flip && x - reach < r.left) flip = false;
      else if (!flip && x + reach > r.right) flip = true;
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
    // The pointer tilt eases on its own clock; everything else follows its inputs directly.
    const k = 1 - Math.exp(-dt * 5);
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.0005;
    if (!dirty && !settling) return;
    dirty = false;
    if (!settling) { pointer.x = pointer.tx; pointer.y = pointer.ty; } else dirty = true;

    const shown = layers.map((layer, i) => {
      const value = Math.min(intro[i].v, placed(i, progress));
      layer.set(value, drop);
      return value;
    });
    place();
    model.updateMatrixWorld();
    renderer.render(scene, camera);
    positionLabels(shown);
  };

  const resize = () => {
    width = canvas.clientWidth; height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    layout();
    dirty = true;
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; });
  io.observe(canvas);
  resize();

  // Compile every material up front (all layers visible), so the intro does
  // not stall on its first frames, then start it.
  for (const layer of layers) layer.set(1, 0);
  place();
  const ready = renderer.compileAsync(scene, camera).catch(() => undefined).then(() => {
    live = true;
    dirty = true;
    if (reduceMotion) { options.onIntroStep?.(layers.length - 1); return; }
    timeline = gsap.timeline({ delay: 0.1, onUpdate: invalidate });
    layers.forEach((_, i) => timeline!.to(intro[i], { v: 1, duration: 1.1, ease: "power3.out", onStart: () => options.onIntroStep?.(i) }, i * 0.3));
  });

  return {
    ready,
    tick: render,
    setProgress(value) { if (value !== progress) { progress = value; dirty = true; } },
    setRegion(next) {
      if (next && region && next.top === region.top && next.bottom === region.bottom && next.left === region.left && next.right === region.right) return;
      region = next;
      layout();
      dirty = true;
    },
    setPointer(x, y) { if (reduceMotion) return; pointer.tx = x; pointer.ty = y; },
    dispose() {
      timeline?.kill();
      resizeObserver.disconnect();
      io.disconnect();
      renderer.dispose();
    },
  };
}
