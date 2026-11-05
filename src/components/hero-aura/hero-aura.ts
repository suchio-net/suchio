// Light on the home hero: the same ramp of blue and the same dome of yellow light come in from the top and bottom edges.
// White stays in a band behind the text. Without WebGL, or before the first frame, the host shows a still image.
const fragmentShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uTextCenter;
uniform float uTextHalfHeight;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1. + 2. * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6. - 15.) + 10.);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
    mix(dot(hash(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash(i + vec2(1, 1)), f - vec2(1, 1)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  return noise(p) * .6 + noise(p * 2.03 + 3.1) * .28 + noise(p * 4.1 + 7.7) * .12;
}
vec3 linear(vec3 c) {
  return pow(c, vec3(2.2));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2((uv.x - .5) * aspect, uv.y);
  float t = uTime * .04;
  vec2 w = vec2(fbm(p * .7 + vec2(t, -t * .6)), fbm(p * .7 + vec2(-t * .7, t) + 5.2));

  // Each half runs the ramp from its own edge towards the text.
  // The second limit keeps sky blue and darker colours out from behind the text on a short screen.
  float isTop = step(uTextCenter, uv.y);
  float side = isTop * 2. - 1.;
  float edge = mix(uv.y, 1. - uv.y, isTop);
  float room = mix(uTextCenter, 1. - uTextCenter, isTop);
  float clearance = room - uTextHalfHeight;
  float ramp = .62 / max(min(room - uTextHalfHeight * .5, clearance * 1.41), .08);
  float v = (edge + w.x * .09 + .012 * uPointer.y) * ramp;

  // A wide page keeps the domes centred. On a narrow page they move to opposite corners and the ramp tilts,
  // because two centred domes on a phone read as stacked stripes. The tilt ends before it reaches the text.
  float narrow = smoothstep(1.2, .62, aspect);
  float tiltFade = 1. - smoothstep(0., 1., edge / max(clearance, .01));
  v += side * p.x * narrow * 1.1 * tiltFade;

  vec3 white = linear(vec3(.985, .985, .975));
  vec3 pale = linear(vec3(.78, .89, 1.));
  vec3 sky = linear(vec3(.33, .66, 1.));
  vec3 blue = linear(vec3(.02, .33, 1.));
  vec3 deep = linear(vec3(.0, .14, .72));
  vec3 yellow = linear(vec3(1., .90, .16));
  vec3 color = white;
  color = mix(color, pale, smoothstep(.62, .42, v));
  color = mix(color, sky, smoothstep(.47, .28, v));
  color = mix(color, blue, smoothstep(.32, .13, v));
  color = mix(color, deep, smoothstep(.15, -.03, v));

  // The two domes drift in opposite directions, so they are not exact copies.
  float size = clamp(aspect / 1.67, .62, 1.);
  float x = p.x - side * narrow * .17 - .12 * uPointer.x - .1 * w.y + side * .03 * sin(uTime * .05);
  float distance = length(vec2(x * .7 / size, edge * 1.3 / size + .13 + w.y * .05));
  float dome = exp(-pow(distance / .36, 2.));
  color = mix(color, white, smoothstep(.16, .62, dome));
  color = mix(color, yellow, smoothstep(.52, .98, dome) * .92);
  gl_FragColor = vec4(pow(max(color, 0.), vec3(1. / 2.2)), 1.);
}`;
const vertexShader = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

// The light has no edges, so a low resolution looks the same as a full one and costs far less.
const RENDER_SCALE = 0.6;
const SLOW_RENDER_SCALE = 0.35;
const SLOW_FRAME_MS = 45;
const SLOW_FRAME_SAMPLES = 20;

const host = document.querySelector<HTMLElement>(".hero-aura");
const canvas = host?.querySelector("canvas");
const hero = host?.parentElement;
const text = hero?.querySelector<HTMLElement>("[data-hero-text]");

if (host && canvas && hero && text) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });

  if (gl) {
    let uniforms: Record<string, WebGLUniformLocation | null> | null = null;
    let renderScale = RENDER_SCALE;
    let time = 20;
    let lastFrame = 0;
    let frameHandle = 0;
    let visible = true;
    let frozen = false;
    let slowTotal = 0;
    let slowCount = 0;
    const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };

    const setup = () => {
      const program = gl.createProgram();
      if (!program) return;
      for (const [type, source] of [
        [gl.VERTEX_SHADER, vertexShader],
        [gl.FRAGMENT_SHADER, fragmentShader],
      ] as const) {
        const shader = gl.createShader(type);
        if (!shader) return;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(
        ["uResolution", "uTime", "uPointer", "uTextCenter", "uTextHalfHeight"].map((name) => [
          name,
          gl.getUniformLocation(program, name),
        ]),
      );
    };

    const draw = () => {
      if (!uniforms) return;
      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uPointer, pointer.smoothX, pointer.smoothY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // The still image stays in place until the first real frame is on screen.
      host.dataset.ready = "";
    };

    const measure = () => {
      if (!uniforms) return;
      canvas.width = Math.max(1, Math.round(host.clientWidth * renderScale));
      canvas.height = Math.max(1, Math.round(host.clientHeight * renderScale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      const heroBox = hero.getBoundingClientRect();
      const textBox = text.getBoundingClientRect();
      gl.uniform1f(uniforms.uTextCenter, 1 - (textBox.top + textBox.height / 2 - heroBox.top) / heroBox.height);
      gl.uniform1f(uniforms.uTextHalfHeight, textBox.height / 2 / heroBox.height);
      // Changing the canvas size clears it, so draw again before the browser paints.
      draw();
    };

    const watchSpeed = (delta: number) => {
      slowTotal += delta;
      slowCount += 1;
      if (slowCount < SLOW_FRAME_SAMPLES) return;
      if (slowTotal / slowCount > SLOW_FRAME_MS) {
        if (renderScale === RENDER_SCALE) {
          renderScale = SLOW_RENDER_SCALE;
          measure();
        } else {
          frozen = true;
        }
      }
      slowTotal = 0;
      slowCount = 0;
    };

    const frame = (now: number) => {
      frameHandle = 0;
      if (lastFrame) {
        const delta = now - lastFrame;
        // A pause in the browser must not make the light jump.
        time += Math.min(delta, 100) / 1000;
        if (delta < 500) watchSpeed(delta);
      }
      lastFrame = now;
      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.03;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.03;
      draw();
      schedule();
    };

    function schedule() {
      const running = visible && !document.hidden && !frozen && !reducedMotion.matches && uniforms;
      if (running && !frameHandle) {
        frameHandle = requestAnimationFrame(frame);
      } else if (!running && frameHandle) {
        cancelAnimationFrame(frameHandle);
        frameHandle = 0;
        lastFrame = 0;
      }
    }

    setup();
    measure();
    new ResizeObserver(measure).observe(hero);
    new ResizeObserver(measure).observe(text);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }).observe(hero);
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    addEventListener(
      "pointermove",
      (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        pointer.x = (event.clientX / innerWidth) * 2 - 1;
        pointer.y = 1 - (event.clientY / innerHeight) * 2;
      },
      { passive: true },
    );
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      uniforms = null;
      delete host.dataset.ready;
      schedule();
    });
    canvas.addEventListener("webglcontextrestored", () => {
      setup();
      measure();
      schedule();
    });
    schedule();
  }
}
