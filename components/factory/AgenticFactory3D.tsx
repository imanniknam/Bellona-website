'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * AgenticFactory3D — an interactive procedural machine.
 *
 * Five stations on a metal plate along a conveyor, with a card that travels from the
 * first station to the last. Every part is procedural three.js: no models, no images.
 * Adapted for Bellona: monochrome materials, no demo branding, all visible text
 * (DOM labels and the text painted on the in-scene screens) comes from `copy`, so
 * the machine can be localised, including right-to-left languages.
 *
 * Fills its box: give it a height. Dependencies: react, three.
 * `embed` hides the control panels; the wheel and touch then scroll the page instead
 * of zooming the scene. `layout="contained"` centres the machine in its own box
 * (`"hero"` shifts it to the right 58 % to leave room for a headline).
 * Control it with window.__machine: setMode, setCamera, focusStation, play, pause.
 */

/** One restrained accent per station: it colours the footing glow and the legend, so the flow reads at a glance. */
export const STATION_COLORS: Record<StationId, string> = {
  cabinet: '#c2410c', // deep orange: where a lead arrives
  engine: '#ff5500', // Bellona orange: the working agent
  admin: '#f97316', // light orange: records kept in order
  storefront: '#ffffff', // white: reports
  cashdesk: '#ff7a33', // warm orange: revenue
}

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type MachineCamera = 'overview' | 'side' | 'top' | 'station' | 'flight'
export type StationId = 'engine' | 'admin' | 'storefront' | 'cabinet' | 'cashdesk'

export interface FactoryCopy {
  rtl: boolean
  /** Formats a station number (01..05) in the language's digits. */
  numerals: (n: number) => string
  stepLabel: string
  stations: Record<StationId, { name: string; desc: string; output: string }>
  /** One [title, detail] per step of the travelling card. */
  journey: [string, string][]
  ui: {
    sceneLabel: string
    running: string
    paused: string
    heading: string
    coords: string
    modes: Record<MachineMode, string>
    modeAria: string
    view: string
    cameras: Record<MachineCamera, string>
    cameraAria: string
    pause: string
    resume: string
    hint: string
    loading: string
    errorTitle: string
    errorBody: string
    retry: string
    webglMissing: string
    contextLost: string
  }
  screens: {
    engraveTitle: string
    engraveSub: string
    engraveLine: string
    card: { made: string; by: string; lines: [string, string, string, string] }
    queue: { title: string; items: [string, string, string]; busy: string; waiting: string }
    web: { brand: string; nav: string; h1: string; h2a: string; h2b: string; p1: string; p2: string; cta: string; foot: string; tag1: string; tag2: string }
    flyer: string
    orders: { title: string; sub: string; names: [string, string, string]; statuses: [string, string, string]; initials: [string, string, string] }
    incoming: { initial: string; name: string; note: string }
    cash: { title: string; amount: string }
    receipt: { brand: string; title: string; line: string; qty: string; paid: string; thanks: string; no: string }
    packets: { newTitle: string; newSub: string; newName: string; newFoot: string; scriptTitle: string; scriptSub: string; scriptDone: string }
  }
}

export const FACTORY_COPY_EN: FactoryCopy = {
  rtl: false,
  numerals: (n) => String(n).padStart(2, '0'),
  stepLabel: 'Step',
  stations: {
    cabinet: { name: 'Lead Source', desc: 'Automated prospecting, enrichment, and qualification.', output: 'lead' },
    engine: { name: 'AI Agent', desc: 'A digital worker for repetitive tasks, outreach, and decisions.', output: 'qualified lead' },
    admin: { name: 'CRM', desc: 'Pipelines, follow-ups, and deal tracking, automated.', output: 'record' },
    storefront: { name: 'Analytics', desc: 'Reports generated and delivered.', output: 'report' },
    cashdesk: { name: 'Revenue', desc: 'Your team stays focused on closing.', output: 'payment' },
  },
  journey: [
    ['New lead', 'Lead Source · an inbound lead'],
    ['Qualifying the lead', 'AI Agent · enriched and scored'],
    ['Updating the CRM', 'CRM · record synced automatically'],
    ['Reporting', 'Analytics · reports generated & delivered'],
    ['Payment received', 'Revenue · attributed to the pipeline'],
  ],
  ui: {
    sceneLabel:
      'Interactive 3D machine with five stations: Lead Source, AI Agent, CRM, Analytics and Revenue. Drag to rotate. Hover or tap a station to take a closer look.',
    running: 'Machine running',
    paused: 'Machine paused',
    heading: 'The pipeline, as one machine',
    coords: 'FROM LEAD TO REVENUE',
    modes: { assembled: 'Assembled', cutaway: 'Cutaway', stations: 'Stations', order: 'Follow a lead' },
    modeAria: 'Machine mode',
    view: 'VIEW',
    cameras: { overview: 'Overview', side: 'Side', top: 'Top', station: 'Station', flight: 'Flight' },
    cameraAria: 'Camera',
    pause: 'Pause the animation',
    resume: 'Resume the animation',
    hint: 'Rotate. Explore.',
    loading: 'Assembling the machine',
    errorTitle: 'Could not start the 3D scene',
    errorBody: 'Check that WebGL is turned on in your browser.',
    retry: 'Try again',
    webglMissing: 'WebGL is not available. Turn on hardware acceleration in your browser settings and reload the page.',
    contextLost: 'The graphics context was interrupted. The scene comes back on its own once WebGL is available again.',
  },
  screens: {
    engraveTitle: 'BELLONA',
    engraveSub: '·  build  ·  automate  ·  grow',
    engraveLine: 'WEBSITES  ·  PRODUCTS  ·  AI AUTOMATION  ·  GROWTH    /    LEAD TO REVENUE',
    card: { made: 'AI AGENT', by: 'AT WORK.', lines: ['Lead enriched —', 'scored and routed.', 'Follow-up sent', 'on schedule.'] },
    queue: { title: 'CRM PIPELINE', items: ['Qualified lead', 'Follow-up due', 'Deal in progress'], busy: 'UPDATING', waiting: 'SYNCED' },
    web: {
      brand: 'ANALYTICS',
      nav: 'Overview    Reports    Pipeline',
      h1: 'REPORTS',
      h2a: 'Reports generated',
      h2b: '& delivered.',
      p1: 'Every stage of the pipeline,',
      p2: 'summarised automatically.',
      cta: 'View report  ↗',
      foot: 'BELLONA',
      tag1: 'GENERATED',
      tag2: 'DELIVERED',
    },
    flyer: 'REPORT',
    orders: {
      title: 'NEW LEADS',
      sub: 'Inbound · 3 new',
      names: ['Lead 01', 'Lead 02', 'Lead 03'],
      statuses: ['New lead', 'Qualifying', 'Qualified'],
      initials: ['1', '2', '3'],
    },
    incoming: { initial: 'L', name: 'Lead', note: 'New lead  +' },
    cash: { title: 'PAYMENT RECEIVED', amount: '+ $' },
    receipt: { brand: 'BELLONA', title: 'RECEIPT', line: 'Revenue', qty: 'Attributed', paid: 'PAID', thanks: 'Thank you!', no: 'No. 0001' },
    packets: { newTitle: 'NEW', newSub: 'LEAD', newName: 'Lead', newFoot: 'LEAD / 01', scriptTitle: 'QUALIFIED', scriptSub: '01 / Scored', scriptDone: 'DONE  ✓' },
  },
}

export type AgenticFactory3DProps = {
  /** Height of the scene box, e.g. 720 or '100vh'. Default '100vh'. */
  height?: number | string
  className?: string
  /** Clean mode: no panels, the wheel and the finger scroll the page. */
  embed?: boolean
  /** `hero` (default) shifts the machine right of a headline; `contained` centres it. */
  layout?: 'hero' | 'contained'
  /** All visible text. Defaults to English. */
  copy?: FactoryCopy
  /** A station was clicked. */
  onStation?: (id: StationId) => void
  /** The first real frame is drawn. */
  onReady?: () => void
}

export default function AgenticFactory3D({
  height = '100vh',
  className,
  embed = false,
  layout = 'hero',
  copy = FACTORY_COPY_EN,
  onStation,
  onReady,
}: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStation, onReady })
  const copyRef = useRef(copy)
  useEffect(() => {
    handlers.current = { onStation, onReady }
    copyRef.current = copy
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false
    const family = getComputedStyle(root).fontFamily
    // The in-scene screens are painted on canvases: wait for the real faces first.
    Promise.race([
      Promise.all([document.fonts.load(`500 20px ${family}`), document.fonts.load(`650 20px ${family}`)]),
      new Promise((r) => setTimeout(r, 2500)),
    ])
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return
        dispose = initMachineScene(root, getComputedStyle(root).fontFamily, copyRef.current, {
          embedded: embed,
          contained: layout === 'contained',
          onStation: (id) => handlers.current.onStation?.(id),
          onReady: () => handlers.current.onReady?.(),
        })
      })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [embed, layout])

  const t = copy.ui
  return (
    <div
      ref={rootRef}
      dir={copy.rtl ? 'rtl' : 'ltr'}
      className={['agentic-factory-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div id="scene" role="img" aria-label={t.sceneLabel} />
      <div className="vignette" />
      <header className="topbar debug-ui">
        <div className="status" id="status">
          <i />
          <span id="status-text">{t.running}</span>
        </div>
      </header>
      <div className="scene-heading debug-ui">{t.heading}</div>
      <div className="coordinates debug-ui">{t.coords}</div>
      <div id="journey" className="debug-ui">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">{copy.journey[0][0]}</strong>
          <small id="journey-detail">{copy.journey[0][1]}</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div className="controls debug-ui">
        <nav className="mode-bar" aria-label={t.modeAria}>
          {(['assembled', 'cutaway', 'stations', 'order'] as MachineMode[]).map((m) => (
            <button key={m} data-mode={m} aria-pressed={m === 'assembled'}>
              {t.modes[m]}
            </button>
          ))}
        </nav>
        <nav className="camera-row" aria-label={t.cameraAria}>
          <span className="caption">{t.view}</span>
          {(['overview', 'side', 'top', 'station', 'flight'] as MachineCamera[]).map((c) => (
            <button key={c} data-camera={c} aria-pressed={c === 'overview'}>
              {t.cameras[c]}
            </button>
          ))}
          <span className="divider" />
          <button id="play" aria-label={t.pause} aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx=".5" />
              <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
            </svg>
          </button>
        </nav>
      </div>
      <footer className="footer">
        <span className="hint debug-ui">{t.hint}</span>
      </footer>
      <div id="loading">
        <i />
        <span>{t.loading}</span>
      </div>
      <div id="error" role="alert">
        <strong>{t.errorTitle}</strong>
        <p>{t.errorBody}</p>
        <button onClick={() => location.reload()}>{t.retry}</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The scene.
// ---------------------------------------------------------------------------

export type MachineApi = {
  setMode: (name: string) => boolean
  focusStation: (id: string) => boolean
  setCamera: (name: string) => boolean
  play: () => boolean
  pause: () => boolean
}

declare global {
  interface Window {
    __machine?: MachineApi
    __machineDebug?: { getState: () => Record<string, unknown> }
  }
}

type MachineSceneOptions = {
  embedded: boolean
  contained: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
}

function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  copy: FactoryCopy,
  options: MachineSceneOptions,
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  // Every listener goes through here, so dispose() can take it off again.
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function $<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector<T>(`#${id}`)
    if (!el) throw new Error(`Scene markup is missing #${id}`)
    return el
  }
  function showError(message?: string) {
    $('loading').classList.add('done')
    $('error').style.display = 'block'
    if (message) $('error').querySelector('p')!.textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const embedded = options.embedded
    const heroFrame = embedded && !options.contained
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer:coarse)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / Math.max(1, frameHeight()), 0.1, 150)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      showError(copy.ui.webglMissing)
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    // Bellona: render at full retina density; the adaptive loop below still steps down on slow devices.
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    // Embedded on a light page backdrop: a touch less exposure so whites don't glare.
    renderer.toneMappingExposure = embedded ? 1.02 : 1.16
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    // Embedded in a page: the wheel and the finger scroll the page, not the scene.
    if (embedded) {
      controls.enableZoom = false
      if (coarse) {
        controls.enableRotate = false
        renderer.domElement.style.touchAction = 'pan-y'
      }
    }
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.78
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xffffff, embedded ? 0x8c8a85 : 0x1f1f1f, embedded ? 1.6 : 1.9))
    const key = new THREE.DirectionalLight(0xffffff, 4.4)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(...(frameWidth() <= 900 || coarse ? [2048, 2048] : [4096, 4096]) as [number, number])
    Object.assign(key.shadow.camera, { left: -10, right: 10, top: 9, bottom: -9, near: 0.5, far: 35 })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 3.4)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const warm = new THREE.PointLight(0xff7a33, embedded ? 9 : 30, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (color: number, metalness = 0.1, roughness = 0.4, extra: THREE.MeshStandardMaterialParameters = {}) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    // Palette (Bellona tokens): ink structure, white and brushed silver surfaces, the brand
    // oranges for working parts, white for "done" status. Material contrast does the rest.
    const M = {
      body: mat(0x1f1f1f, 0.78, 0.3),
      base: mat(0x171717, 0.85, 0.34),
      edge: mat(0x858a92, 0.9, 0.3),
      chrome: mat(0xd2d5d8, 1, 0.16),
      silver: mat(0xb9bdc2, 1, 0.36),
      dark: mat(0x0d0d0d, 0.5, 0.4),
      rubber: mat(0x0a0b0c, 0.1, 0.62),
      amber: mat(0xf97316, 0.62, 0.3),
      ivory: mat(0xffffff, 0.35, 0.34),
      copper: mat(0xc2410c, 0.9, 0.28),
      light: mat(0xff5500, 0.2, 0.25, { emissive: 0xff5500, emissiveIntensity: embedded ? 0.55 : 1.3 }),
      sage: mat(0xf4f4f2, 0.3, 0.3, { emissive: 0xd4d4d4, emissiveIntensity: 0.9 }),
      glass: mat(0xa3a3a3, 0.45, 0.16, { transparent: true, opacity: 0.19, depthWrite: false }),
    }
    void M.glass
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(
          k,
          r ? new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d),
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.body,
      r = 0.04,
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome,
      r2: number = r,
      segments = 48,
    ) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(parent: THREE.Object3D, r: number, x: number, y: number, z: number, m: Material = M.chrome) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent: THREE.Object3D, pts: Vec3[], r: number, m: Material = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false), m)
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent: THREE.Object3D, x: number, y: number, z: number) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }
    type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    function canvasTexture(w: number, h: number, draw: Draw) {
      const c = document.createElement('canvas')
      // Supersample the in-scene screens so their text stays sharp up close.
      const k = frameWidth() < 900 ? 1.5 : 2
      c.width = Math.round(w * k)
      c.height = Math.round(h * k)
      const ctx = c.getContext('2d')!
      ctx.scale(k, k)
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      size = 20,
      color = '#f2f2f2',
      weight = 500,
    ) {
      ctx.fillStyle = color
      // Persian glyphs run visually larger and need a little more room than Latin.
      ctx.font = `${weight} ${copy.rtl ? size * 1.04 : size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }
    function screenMaterial(texture: THREE.Texture) {
      return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    }
    type Painted = THREE.Texture | { texture: THREE.Texture }
    function screen(parent: THREE.Object3D, w: number, h: number, x: number, y: number, z: number, tex: Painted) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(map))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.ShadowMaterial({ opacity: 0.23 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,0,0,.8)')
      g.addColorStop(0.55, 'rgba(0,0,0,.45)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({ map: shadow.texture, transparent: true, depthWrite: false, opacity: 0.65 }),
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)
    // A chamfered, layered platform with engraved nomenclature and captive screws.
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.01)
    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.dark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = '#1f1f1f'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#404040'
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      print(c, copy.screens.engraveTitle, 45, 79, 40, '#ffffff', 650)
      print(c, copy.screens.engraveSub, 285, 79, 34, '#b8bbbe', 450)
      print(c, copy.screens.engraveLine, 47, 133, 19, '#777b80', 500)
      print(c, 'No. 001', 1360, 130, 23, '#f97316')
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    for (let i = 0; i < 16; i++) box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.edge, 0)
    // Bellona: the cube-stack emblem (two cubes and the wedge) on the plate's front-right corner,
    // in the brand oranges, turned 45° so it reads like the logo from the default camera.
    {
      const emblem = new THREE.Group()
      emblem.position.set(4.55, 0.235, 3.2)
      emblem.rotation.y = Math.PI / 4
      machine.add(emblem)
      const cubeOrange = mat(0xff5500, 0.15, 0.38)
      const cubeLight = mat(0xf97316, 0.15, 0.38)
      const s = 0.34
      box(emblem, s, s, s, 0, s / 2, 0, cubeOrange, 0.03)
      box(emblem, s, s, s, 0, s * 1.5 + 0.07, 0, cubeLight, 0.03)
      box(emblem, 0.03, 0.07, s * 0.55, -s / 2 + 0.015, s + 0.035, 0, M.dark, 0.008) // wedge in the gap
      box(emblem, 0.62, 0.03, 0.62, 0, -0.005, 0, M.dark, 0.02) // plinth
    }
    // Faint drafting marks stay local to the machine.
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x737373, transparent: true, opacity: 0.12 })
    const draftingPoints: THREE.Vector3[] = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU
      const r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(
          Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)),
          -0.395,
          Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72,
        ),
      )
    }
    drafting.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat))

    // The five stations, left to right along the belt. `step` is the station's place in the flow.
    type StationDef = { id: StationId; name: string; step: number; output: string; pos: Vec3; desc: string }
    type Station = StationDef & {
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }
    const SC = copy.stations
    const definitions: StationDef[] = [
      { id: 'engine', name: SC.engine.name, step: 2, output: SC.engine.output, pos: [-4.15, 0.29, -0.65], desc: SC.engine.desc },
      { id: 'admin', name: SC.admin.name, step: 3, output: SC.admin.output, pos: [-1.65, 0.29, -2.03], desc: SC.admin.desc },
      { id: 'storefront', name: SC.storefront.name, step: 4, output: SC.storefront.output, pos: [1.5, 0.29, -2.08], desc: SC.storefront.desc },
      { id: 'cabinet', name: SC.cabinet.name, step: 1, output: SC.cabinet.output, pos: [4.03, 0.29, 0.12], desc: SC.cabinet.desc },
      { id: 'cashdesk', name: SC.cashdesk.name, step: 5, output: SC.cashdesk.output, pos: [0.93, 0.29, 1.85], desc: SC.cashdesk.desc },
    ]
    const stations: Station[] = []
    const cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10)
    const shellMaterials: THREE.Material[] = []
    function shell<T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      shellMaterials.push(s)
      return s
    }
    const S = { body: shell(M.body), ivory: shell(M.ivory), amber: shell(M.amber) }
    const lamps: THREE.MeshStandardMaterial[][] = []
    const gears: Array<{ g: THREE.Group; vertical: boolean }> = []
    function gear(parent: THREE.Object3D, x: number, y: number, z: number, r = 0.3, vertical = false) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      if (vertical) g.rotation.x = Math.PI / 2
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.copper)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU
        const b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.copper, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push({ g, vertical })
      return g
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const tone = new THREE.Color(STATION_COLORS[d.id])
      const glowMat = new THREE.MeshStandardMaterial({ color: tone, emissive: tone, emissiveIntensity: embedded ? 0.25 : 0.5, metalness: 0.2, roughness: 0.25 })
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)
      for (const x of [-0.85, 0.85]) for (const z of [-0.7, 0.7]) screw(group, x, 0.311, z)
      // Status lamps on the deck lip: amber = working, sage = healthy. Each station owns its pair.
      const lampWork = new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xf97316, emissiveIntensity: 0.4, roughness: 0.3 })
      const lampOk = new THREE.MeshStandardMaterial({ color: 0xf4f4f2, emissive: 0xd4d4d4, emissiveIntensity: 0.6, roughness: 0.3 })
      lamps.push([lampWork, lampOk])
      for (const [k, m] of [lampWork, lampOk].entries()) {
        const lamp = cyl(group, 0.045, 0.03, 0.62 + k * 0.17, 0.318, 0.78, m, undefined, 14)
        lamp.userData.moving = false
      }
      // Internal mechanics become visible when the shell is cut at deck height.
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++) box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(
        group,
        [
          [-0.7, 0.4, -0.4],
          [-0.55, 0.48, 0.4],
          [0.35, 0.45, 0.6],
          [0.7, 0.58, 0.23],
        ],
        0.023,
        M.light,
      )
      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = '#0d0d0d'
        c.fillRect(0, 0, w, h)
        c.fillStyle = STATION_COLORS[d.id]
        c.fillRect(0, h - 5, w, 5)
        print(c, copy.numerals(i + 1), 24, 76, 42, STATION_COLORS[d.id], 550)
        print(c, d.name.toUpperCase(), 111, 73, d.name.length > 12 ? 28 : 35, '#d7d9d7', 550)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${copy.numerals(i + 1)}</span>${d.name}</div><div class="label-meta">${copy.stepLabel} ${copy.numerals(d.step)} · ${d.output}</div></div>`
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())
      stations.push({ ...d, group, base: new THREE.Vector3(...d.pos), glowMat, label, index: i, anchor: new THREE.Vector3(0, 2.5, 0) })
    })
    const engine = stations[0].group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, S.ivory, 0.13)
    box(engine, 1.5, 0.1, 1.16, 0, 0.99, -0.04, S.body, 0.025)
    for (const x of [-0.68, 0.68]) {
      cyl(engine, 0.065, 1.73, x, 1.35, -0.18, M.chrome)
      box(engine, 0.22, 1.8, 0.22, x, 1.37, -0.44, S.ivory, 0.035)
    }
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, S.amber, 0.045)
    box(engine, 1.55, 0.06, 0.06, 0, 2.13, -0.115, M.chrome, 0.01)
    const printhead = new THREE.Group()
    engine.add(printhead)
    printhead.position.set(0, 1.9, -0.08)
    printhead.userData.moving = true
    box(printhead, 0.45, 0.36, 0.44, 0, 0, 0, M.body, 0.05)
    cyl(printhead, 0.11, 0.13, 0, -0.24, 0.03, M.chrome, 0.04)
    box(printhead, 0.24, 0.045, 0.022, 0, 0.09, 0.23, M.light, 0.01)
    tube(
      engine,
      [
        [-0.68, 2.1, -0.35],
        [-0.42, 2.52, -0.4],
        [0.25, 2.5, -0.4],
        [0.35, 2.01, -0.12],
      ],
      0.032,
      M.dark,
    )
    const reels: THREE.Group[] = []
    for (const [x, y] of [
      [-1.03, 1.82],
      [-0.94, 2.78],
    ]) {
      const reel = new THREE.Group()
      reel.position.set(x, y, -0.48)
      engine.add(reel)
      reel.userData.moving = true
      const core = cyl(reel, 0.4, 0.22, 0, 0, 0, M.dark)
      core.rotation.x = Math.PI / 2
      for (const z of [-0.14, 0.14]) {
        const disc = cyl(reel, 0.46, 0.045, 0, 0, z, M.chrome)
        disc.rotation.x = Math.PI / 2
        for (let j = 0; j < 6; j++) {
          const a = (j / 6) * TAU
          const hole = cyl(reel, 0.1, 0.006, Math.cos(a) * 0.29, Math.sin(a) * 0.29, z + (z > 0 ? 0.026 : -0.026), M.dark, undefined, 14)
          hole.rotation.x = Math.PI / 2
        }
      }
      const axle = cyl(reel, 0.095, 0.37, 0, 0, 0, M.amber)
      axle.rotation.x = Math.PI / 2
      reels.push(reel)
    }
    tube(
      engine,
      [
        [-1.36, 2.66, -0.48],
        [-1.5, 2.34, -0.48],
        [-1.34, 1.92, -0.48],
      ],
      0.045,
      M.dark,
    )
    const videoTexture = canvasTexture(384, 640, () => {})
    function drawVideo(t: number) {
      const c = videoTexture.ctx
      const w = 384
      const h = 640
      c.fillStyle = '#ff5500'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#c2410c'
      c.beginPath()
      c.arc(330, 205, 210, 0, TAU)
      c.fill()
      c.strokeStyle = '#0d0d0d'
      c.lineWidth = 13
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.ellipse(194, 270, 90 - i * 21, 111, Math.sin(t * 0.25) * 0.3 + 0.4, 0, TAU)
        c.stroke()
      }
      print(c, copy.screens.card.made, 28, 57, 24, '#202224', 650)
      print(c, copy.screens.card.by, 24, 103, 42, '#202224', 700)
      c.fillStyle = '#0d0d0d'
      c.beginPath()
      c.roundRect(25, 465, 334, 123, 12)
      c.fill()
      const texts = copy.screens.card.lines
      const n = Math.floor(t * 0.7) % 4
      print(c, texts[n], 45, 505, 25, '#ffffff', 550)
      print(c, texts[(n + 1) % 4], 45, 547, 25, '#ffffff', 550)
      c.fillStyle = '#ffffff'
      c.fillRect(27, 615, Math.max(10, ((t * 0.13) % 1) * 330), 5)
      videoTexture.texture.needsUpdate = true
    }
    drawVideo(0)
    const outputVideo = new THREE.Group()
    outputVideo.userData.moving = true
    engine.add(outputVideo)
    box(outputVideo, 0.62, 1.08, 0.055, 0, 1.36, 0.61, M.dark, 0.035)
    screen(outputVideo, 0.56, 0.98, 0, 1.36, 0.641, videoTexture)
    box(engine, 1.14, 0.12, 0.2, 0, 0.83, 0.66, M.dark, 0.025)
    for (const x of [-0.42, 0.42]) {
      const r = cyl(engine, 0.115, 0.18, x, 0.92, 0.6, M.chrome)
      r.rotation.z = Math.PI / 2
    }
    for (let i = 0; i < 5; i++) box(engine, 0.08, 0.03, 0.22, -0.38 + i * 0.19, 1.011, -0.02, M.edge, 0.005)

    const admin = stations[1].group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, S.body, 0.11)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)
    box(consoleTop, 1.76, 0.12, 1.27, 0, 0, 0, S.ivory, 0.04)
    const queue = canvasTexture(640, 340, () => {})
    function drawQueue(t: number) {
      const c = queue.ctx
      c.fillStyle = '#0d0d0d'
      c.fillRect(0, 0, 640, 340)
      print(c, copy.screens.queue.title, 25, 45, 21, '#b4b8bb', 550)
      for (let i = 0; i < 3; i++) {
        const y = 74 + i * 76
        c.fillStyle = '#1f1f1f'
        c.beginPath()
        c.roundRect(21, y, 598, 61, 6)
        c.fill()
        c.fillStyle = i === 0 ? '#ff5500' : '#e5e5e5'
        c.fillRect(34, y + 10, 27, 41)
        print(c, copy.screens.queue.items[i], 77, y + 29, 19, '#d6d8d9')
        print(c, i === 0 ? copy.screens.queue.busy : copy.screens.queue.waiting, 77, y + 49, 11, i === 0 ? '#ff7a33' : '#e5e5e5')
        c.fillStyle = '#262626'
        c.fillRect(377, y + 26, 214, 7)
        c.fillStyle = i === 0 ? '#ff5500' : '#525252'
        c.fillRect(377, y + 26, i === 0 ? ((t * 0.15) % 1) * 214 : 41 + i * 27, 7)
      }
    }
    drawQueue(0)
    const qs = screen(consoleTop, 1.53, 0.79, 0, 0.067, -0.17, queue)
    qs.rotation.x = -Math.PI / 2
    const toggles: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const x = -0.57 + i * 0.38
      cyl(consoleTop, 0.074, 0.035, x, 0.1, 0.45, M.dark)
      const t = cyl(consoleTop, 0.025, 0.15, x, 0.19, 0.45, M.chrome)
      t.rotation.x = -0.4
      t.userData.moving = true
      toggles.push(t)
      ball(consoleTop, 0.04, x, 0.275, 0.421, M.ivory)
    }
    cyl(admin, 0.075, 0.06, 0.77, 1.05, -0.62, M.sage)
    for (let i = 0; i < 7; i++) box(admin, 0.55, 0.027, 0.02, 0, 0.46 + i * 0.05, 0.655, M.dark, 0.003)

    const storefront = stations[2].group
    box(storefront, 1.35, 0.18, 0.88, 0, 0.44, 0, S.ivory, 0.045)
    cyl(storefront, 0.095, 1.04, 0, 0.93, -0.31, M.chrome)
    box(storefront, 0.56, 0.91, 0.14, 0, 0.99, -0.34, S.body, 0.04)
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, S.ivory, 0.08)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)
    const W = copy.screens.web
    const webTexture = canvasTexture(896, 592, (c, w) => {
      c.fillStyle = '#f4f4f2'
      c.fillRect(0, 0, w, 592)
      c.fillStyle = '#e5e5e5'
      c.fillRect(0, 0, w, 56)
      c.fillStyle = '#adadad'
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.arc(26 + i * 19, 27, 4, 0, TAU)
        c.fill()
      }
      print(c, W.brand, 33, 100, 22, '#222628', 650)
      print(c, W.nav, 485, 98, 14, '#6a6f72')
      c.fillStyle = '#171717'
      c.beginPath()
      c.roundRect(32, 131, 287, 401, 10)
      c.fill()
      // bars of a chart, drawn in white on the dark panel
      const bars = [0.35, 0.55, 0.45, 0.8, 0.65, 0.95]
      bars.forEach((v, i) => {
        c.fillStyle = i === bars.length - 1 ? '#ff5500' : i % 2 ? '#e5e5e5' : '#ffffff'
        c.fillRect(56 + i * 40, 500 - v * 270, 24, v * 270)
      })
      print(c, W.h1, 52, 181, 29, '#ffffff', 700)
      print(c, W.h2a, 359, 197, 38, '#22282b', 600)
      print(c, W.h2b, 359, 252, 38, '#22282b', 600)
      print(c, W.p1, 362, 300, 19, '#777b7e')
      print(c, W.p2, 362, 329, 19, '#777b7e')
      for (let i = 0; i < 3; i++) {
        c.fillStyle = '#d1d1d1'
        c.fillRect(362, 363 + i * 16, 400 - i * 43, 5)
      }
      c.fillStyle = '#171717'
      c.beginPath()
      c.roundRect(359, 447, 279, 62, 7)
      c.fill()
      print(c, W.cta, 390, 486, 22, '#ff7a33', 500)
      print(c, W.foot, 33, 571, 12, '#878a8c')
    })
    screen(storefront, 2.16, 1.43, 0, 1.95, 0.011, webTexture)
    ball(storefront, 0.024, 0, 2.747, -0.05, M.dark)
    box(storefront, 0.21, 0.019, 0.008, 0, 1.149, 0.013, M.light, 0.003)
    screen(storefront, 0.685, 0.96, -0.655, 1.86, 0.018, videoTexture)
    const flyPost = new THREE.Group()
    flyPost.userData.moving = true
    storefront.add(flyPost)
    box(flyPost, 0.59, 0.77, 0.045, 0.94, 0.81, 0.55, M.ivory, 0.025)
    const postTex = canvasTexture(220, 290, (c, w, h) => {
      c.fillStyle = '#f4f4f2'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#171717'
      c.fillRect(15, 16, 190, 168)
      ;[0.4, 0.7, 0.55, 0.95].forEach((v, i) => {
        c.fillStyle = i === 3 ? '#ff5500' : '#ffffff'
        c.fillRect(38 + i * 38, 170 - v * 110, 20, v * 110)
      })
      print(c, copy.screens.flyer, 17, 225, 23, '#282b2b', 600)
      c.fillStyle = '#b0b2b3'
      c.fillRect(17, 244, 153, 6)
      c.fillRect(17, 258, 104, 5)
      void w
      void h
    })
    screen(flyPost, 0.55, 0.72, 0.94, 0.81, 0.575, postTex)

    const cabinet = stations[3].group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, S.body, 0.12)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, S.amber, 0.04)
    box(cabinet, 1.47, 1.38, 0.055, 0, 1.31, 0.405, M.dark, 0.025)
    const O = copy.screens.orders
    const orderTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = '#171717'
      c.fillRect(0, 0, w, h)
      print(c, O.title, 30, 51, 27, '#ffffff', 550)
      print(c, O.sub, 30, 81, 16, '#8a9094')
      O.names.forEach((n, i) => {
        const y = 110 + i * 100
        c.fillStyle = '#262626'
        c.beginPath()
        c.roundRect(22, y, 436, 83, 8)
        c.fill()
        c.fillStyle = ['#ff5500', '#ffffff', '#e5e5e5'][i]
        c.beginPath()
        c.arc(58, y + 40, 19, 0, TAU)
        c.fill()
        print(c, O.initials[i], 51, y + 47, 20, '#1b1d1e', 600)
        print(c, n, 93, y + 33, 23, '#e6e7e8', 550)
        print(c, O.statuses[i], 93, y + 58, 15, ['#ff7a33', '#a8aeb2', '#e5e5e5'][i])
        print(c, '↗', 410, y + 49, 25, '#c2410c')
      })
      void h
    })
    screen(cabinet, 1.31, 1.255, 0, 1.37, 0.44, orderTex)
    box(cabinet, 1.27, 0.075, 0.29, 0, 0.57, 0.55, M.chrome, 0.02)
    for (let i = 0; i < 3; i++) box(cabinet, 1.15, 0.021, 0.12, 0, 0.58 + i * 0.15, -0.35, M.copper, 0.006)
    tube(
      cabinet,
      [
        [0.69, 0.43, -0.2],
        [0.89, 0.65, -0.2],
        [0.89, 1.8, -0.2],
        [0.65, 1.99, -0.2],
      ],
      0.033,
      M.chrome,
    )
    const incoming = new THREE.Group()
    incoming.userData.moving = true
    cabinet.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.035)
    const nameTex = canvasTexture(432, 204, (c, w, h) => {
      c.fillStyle = '#c2410c'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#0d0d0d'
      c.beginPath()
      c.arc(58, 98, 32, 0, TAU)
      c.fill()
      print(c, copy.screens.incoming.initial, 46, 112, 34, '#ffffff', 550)
      print(c, copy.screens.incoming.name, 108, 91, 38, '#0d0d0d', 600)
      print(c, copy.screens.incoming.note, 108, 138, 23, '#3f3f3f', 500)
      void h
    })
    screen(incoming, 0.82, 0.39, 0, 0, 0.026, nameTex)

    const cashdesk = stations[4].group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, S.ivory, 0.12)
    box(cashdesk, 1.96, 0.19, 1.38, 0, 0.42, -0.04, S.body, 0.04)
    box(cashdesk, 1.37, 0.09, 0.038, 0, 0.44, 0.66, M.dark, 0.01)
    box(cashdesk, 0.37, 0.042, 0.03, 0, 0.45, 0.687, M.chrome, 0.009)
    box(cashdesk, 1.02, 0.25, 0.91, -0.33, 1.04, -0.03, S.body, 0.045)
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        box(cashdesk, 0.19, 0.085, 0.17, -0.62 + col * 0.27, 1.21, 0.27 - row * 0.24, col === 2 && row === 2 ? M.amber : M.ivory, 0.022)
    box(cashdesk, 0.64, 0.6, 0.52, 0.58, 1.04, -0.15, S.body, 0.045)
    box(cashdesk, 0.48, 0.07, 0.09, 0.59, 1.37, -0.1, M.dark, 0.01)
    cyl(cashdesk, 0.06, 0.65, -0.35, 1.6, -0.56, M.chrome)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, S.body, 0.045)
    const cashTex = canvasTexture(512, 176, () => {})
    function drawCash() {
      const c = cashTex.ctx
      c.fillStyle = '#171717'
      c.fillRect(0, 0, 512, 176)
      print(c, copy.screens.cash.title, 22, 44, 23, '#f4f4f2', 500)
      print(c, copy.screens.cash.amount, 26, 131, 66, '#ff7a33', 500)
    }
    drawCash()
    screen(cashdesk, 1.015, 0.349, -0.35, 1.98, -0.459, cashTex)
    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)
    const R = copy.screens.receipt
    const receiptTex = canvasTexture(280, 540, (c, w, h) => {
      c.fillStyle = '#f4f4f2'
      c.fillRect(0, 0, w, h)
      print(c, R.brand, 25, 52, 24, '#33373a', 650)
      print(c, R.title, 32, 87, 19, '#565a5c')
      c.strokeStyle = '#8a8d8f'
      c.setLineDash([5, 6])
      c.beginPath()
      c.moveTo(22, 115)
      c.lineTo(258, 115)
      c.stroke()
      print(c, R.line, 25, 154, 22, '#33373a')
      print(c, R.qty, 25, 190, 21, '#33373a')
      print(c, R.paid, 25, 263, 31, '#33373a', 650)
      print(c, R.thanks, 25, 317, 24, '#686b6d')
      for (let i = 0; i < 44; i++) {
        c.fillStyle = '#33373a'
        c.fillRect(25 + i * 5, 370, 1 + (i % 3), 83)
      }
      print(c, R.no, 81, 496, 17, '#595c5e')
      void h
    })
    const rp = screen(receipt, 0.41, 0.83, 0, 0.415, 0.01, receiptTex)
    rp.material.side = THREE.DoubleSide
    receipt.rotation.x = -0.16
    const coin = new THREE.Group()
    coin.userData.moving = true
    cashdesk.add(coin)
    const coinDisc = cyl(coin, 0.22, 0.065, 0, 0, 0, M.amber, undefined, 32)
    coinDisc.rotation.x = Math.PI / 2
    const coinRing = new THREE.Mesh(new THREE.TorusGeometry(0.174, 0.014, 6, 32), M.light)
    coinRing.position.z = 0.037
    coin.add(coinRing)
    const coinTex = canvasTexture(128, 128, (c, w, h) => {
      c.clearRect(0, 0, w, h)
      c.textAlign = 'center'
      print(c, '$', 64, 95, 91, '#c2410c', 650)
    })
    const coinFace = screen(coin, 0.28, 0.28, 0, 0, 0.04, coinTex)
    coinFace.material.transparent = true
    cyl(cashdesk, 0.33, 0.09, 1.04, 0.39, 0.55, M.dark)
    cyl(cashdesk, 0.26, 0.025, 1.04, 0.445, 0.55, M.copper)

    // Conveyor: a closed spline, instanced treads, continuous rails and phase-locked cargo.
    const path = new THREE.CatmullRomCurve3(
      [
        [-3.95, 0.84, 0.65],
        [-3.1, 0.84, -0.12],
        [-1.45, 0.84, -0.79],
        [1.32, 0.84, -0.8],
        [3.3, 0.84, 0.19],
        [3.43, 0.84, 1.21],
        [1.35, 0.84, 2.7],
        [-1.4, 0.84, 2.52],
        [-3.54, 0.84, 1.65],
      ].map((p) => new THREE.Vector3(...(p as Vec3))),
      true,
      'catmullrom',
      0.25,
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.35, 8, true), M.dark)
    frameMesh.scale.y = 0.3
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 148
    const beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.012), M.body, beltCount)
    beltSlats.receiveShadow = true
    beltSlats.castShadow = false
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D()
    const pVec = new THREE.Vector3()
    const tVec = new THREE.Vector3()
    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)
    for (const side of [-1, 1]) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 160; i++) {
        path.getPointAt(i / 160, pVec)
        path.getTangentAt(i / 160, tVec)
        pts.push(pVec.clone().add(new THREE.Vector3(-tVec.z * 0.36 * side, 0.09, tVec.x * 0.36 * side)))
      }
      const railPath = new THREE.CatmullRomCurve3(pts)
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(railPath, 160, 0.028, 6, false), M.chrome))
    }
    for (let i = 0; i < 16; i++) {
      const p = path.getPointAt(i / 16)
      cyl(belt, 0.045, 0.43, p.x, 0.53, p.z, M.chrome)
    }
    // Steel pneumatic lines link the station footings independently from the conveyor.
    const pipes = new THREE.Group()
    machine.add(pipes)
    for (let i = 0; i < 4; i++) {
      const a = stations[i].base
      const b = stations[i + 1].base
      const points = [
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a.clone().lerp(b, 0.35).add(new THREE.Vector3(0, 0.1, -0.6)),
        a.clone().lerp(b, 0.65).add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ]
      const curve = new THREE.CatmullRomCurve3(points)
      pipes.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.054, 8, false), M.copper))
    }
    const P = copy.screens.packets
    const scriptTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#f4f4f2'
      c.fillRect(0, 0, w, h)
      print(c, P.scriptTitle, 24, 47, 22, '#3b3e40', 650)
      print(c, P.scriptSub, 24, 85, 15, '#8b8d8e')
      for (let i = 0; i < 9; i++) {
        c.fillStyle = i === 4 ? '#7d8288' : '#aeb0b2'
        c.fillRect(24, 111 + i * 21, 190 - (i % 3) * 24, 6)
      }
      print(c, P.scriptDone, 24, 327, 17, '#55595c', 600)
      void w
      void h
    })
    const orderCardTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#9aa0a6'
      c.fillRect(0, 0, w, h)
      print(c, P.newTitle, 21, 48, 24, '#2c2f31', 650)
      print(c, P.newSub, 21, 79, 24, '#2c2f31', 650)
      c.strokeStyle = '#55595c'
      c.lineWidth = 2
      c.strokeRect(23, 112, 210, 139)
      print(c, P.newName, 42, 190, 37, '#2c2f31', 550)
      print(c, P.newFoot, 23, 320, 17, '#4a4d50')
      void w
      void h
    })
    const packetTextures = [orderCardTex, scriptTex, videoTexture, postTex, receiptTex]
    const packets: Array<{
      group: THREE.Group
      faces: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]
      halo: THREE.Mesh
      stage: number
      phase: number
    }> = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)
      box(g, 0.47, 0.71, 0.04, 0, 0, 0, M.ivory, 0.022)
      const faces = packetTextures.map((tex) => {
        const s = screen(g, 0.43, 0.665, 0, 0, 0.024, tex)
        s.material.side = THREE.DoubleSide
        s.visible = false
        return s
      })
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.414, 40),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }),
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = -0.37
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }
    // Find ports by arc length, so the travelling card arrives at the actual station.
    function nearestPort(x: number, z: number) {
      let best = 0
      let dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300)
        const d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) {
          dist = d
          best = i / 300
        }
      }
      return best
    }
    const adminU = nearestPort(-1.65, -0.7)
    const storeU = nearestPort(1.5, -0.7)
    const cashU = nearestPort(0.93, 2.65)

    // Merge static geometry per parent/material. Moving assemblies remain separate.
    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {
        const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & { isInstancedMesh?: boolean }
        if (!child.isMesh || child.isInstancedMesh || child.userData.moving || Array.isArray(child.material)) continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    // These references are animated individually and must not be merged into their parent.
    ;[incoming, receipt, coin, outputVideo, flyPost, printhead, ...reels].forEach((g) => (g.userData.moving = true))
    compact(machine)
    stations.forEach((s) =>
      s.group.traverse((o) => {
        o.userData.station = s.id
      }),
    )
    const pickables = stations.map((s) => s.group)

    let mode: MachineMode = 'assembled'
    let cameraMode: MachineCamera = 'overview'
    let playing = !reduceMotion
    let simTime = 0
    let spread = 0
    let selected: string = 'engine'
    let hovered: string | null = null

    let width = frameWidth()
    let height = frameHeight()
    let mobile = width <= 900
    let lastInteraction = performance.now()
    let dragging = false
    let wasDragged = false
    let downX = 0
    let downY = 0
    let cameraAnimating = true
    let flightTime = 0
    let lastDraw = -1
    let visible = true
    let contextLost = false
    const desiredPosition = new THREE.Vector3()
    const desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25
    let sized = false
    let readySent = false
    // A zero-size embed (a collapsed panel) must not send the camera to infinity: wait for a real size.
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      // In a hero frame a shifted frustum centres the object in the right 58 %;
      // a contained frame keeps the machine in the middle of its own box.
      camera.setViewOffset(width, height, mobile || !heroFrame ? 0 : -width * 0.21, embedded ? (heroFrame ? 0 : height * 0.05) : mobile ? 0 : height * 0.025, width, height)
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : heroFrame || !embedded ? Math.min(0.55, aspect > 2 ? 0.54 : 0.57) : 0.94
      const horizontalFit = 17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit = 11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.85 : 0.62))
      baseDistance = (Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 1)) / (heroFrame ? (mobile ? 1.15 : 1.45) : embedded ? 1.12 : 1)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side') desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)))
      root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode)))
      $('journey').classList.toggle('visible', mode === 'order')
    }
    const modes: MachineMode[] = ['assembled', 'cutaway', 'stations', 'order']
    const cameras: MachineCamera[] = ['overview', 'side', 'top', 'station', 'flight']
    function setMode(name: string) {
      if (!(modes as string[]).includes(name)) return false
      mode = name as MachineMode
      lastInteraction = performance.now()
      if (mode === 'order') {
        simTime = 0
        lastDraw = -1
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id: string) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function setCamera(name: string) {
      if (!(cameras as string[]).includes(name)) return false
      cameraMode = name as MachineCamera
      if (mode === 'order') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function syncPlayback() {
      const b = $('play')
      b.setAttribute('aria-label', playing ? copy.ui.pause : copy.ui.resume)
      b.setAttribute('aria-pressed', String(!playing))
      b.innerHTML = playing
        ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="2.5" height="10" rx=".5"/><rect x="7.5" y="1" width="2.5" height="10" rx=".5"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1l8 5-8 5z"/></svg>'
      $('status').classList.toggle('paused', !playing)
      $('status-text').textContent = playing ? copy.ui.running : copy.ui.paused
    }
    function play() {
      playing = true
      syncPlayback()
      return true
    }
    function pause() {
      playing = false
      syncPlayback()
      return true
    }
    const api: MachineApi = { setMode, focusStation, setCamera, play, pause }
    window.__machine = api
    cleanups.push(() => {
      if (window.__machine === api) delete window.__machine
    })
    root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => listen(b, 'click', () => setMode(b.dataset.mode ?? '')))
    root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => listen(b, 'click', () => setCamera(b.dataset.camera ?? '')))
    listen($('play'), 'click', () => (playing ? pause() : play()))
    syncPlayback()
    layoutCamera()
    camera.position.copy(desiredPosition)
    controls.target.copy(desiredTarget)
    controls.update()
    cameraAnimating = false
    listen(window, 'resize', layoutCamera)
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('end', () => {
      dragging = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('change', () => {
      if (dragging) lastInteraction = performance.now()
    })
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const tooltip = $('tooltip')
    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top] as const
    }
    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      const [x, y] = local(e)
      if (Math.hypot(x - downX, y - downY) > 5) wasDragged = true
      if (dragging || e.pointerType === 'touch') return
      const s = hitStation(x, y)
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : embedded && !coarse ? 'grab' : 'grab'
      tooltip.classList.toggle('visible', !!s)
      if (s) {
        tooltip.querySelector('strong')!.innerHTML = `<span>${copy.numerals(s.index + 1)}</span>${s.name}`
        tooltip.querySelector('p')!.textContent = s.desc
        tooltip.style.left = Math.min(width - 255, Math.max(10, x + 16)) + 'px'
        tooltip.style.top = Math.max(10, Math.min(height - 95, y - 65)) + 'px'
      }
    })
    listen(renderer.domElement, 'pointerleave', () => {
      hovered = null
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      const [x, y] = local(e)
      downX = x
      downY = y
      wasDragged = false
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const [x, y] = local(e)
      const s = hitStation(x, y)
      if (!s) return
      focusStation(s.id)
      options.onStation?.(s.id)
    })
    let lastFrame = performance.now()
    listen(document, 'visibilitychange', () => {
      visible = !document.hidden
      lastFrame = performance.now()
    })
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting && !document.hidden
        lastFrame = performance.now()
      },
      { threshold: 0.01 },
    )
    observer.observe(renderer.domElement)
    cleanups.push(() => observer.disconnect())
    listen(renderer.domElement, 'webglcontextlost', (e: Event) => {
      e.preventDefault()
      contextLost = true
      showError(copy.ui.contextLost)
    })
    listen(renderer.domElement, 'webglcontextrestored', () => {
      contextLost = false
      $('error').style.display = 'none'
      lastFrame = performance.now()
    })

    const scratch = new THREE.Vector3()
    const anchor = new THREE.Vector3()
    const journeySteps = copy.journey
    let prevJourney = -1
    let frameCount = 0
    let measureTime = 0
    let pixelRatio = renderer.getPixelRatio()
    let rafId = 0
    function animate(now: number) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now
      if (!visible || contextLost) return
      if (playing) {
        simTime += dt
        flightTime += dt
      }
      const t = simTime
      const beat = (t / 4) % 1
      const tact = (t * TAU) / 4
      const smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(cutPlane.constant, mode === 'cutaway' ? 0.99 : 10, smooth)
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id) ? 3.5 : 0.55 + pulse * 0.65,
          smooth,
        )
      })
      lamps.forEach(([work, ok], i) => {
        work.emissiveIntensity = 0.35 + Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 3) * 1.6
        ok.emissiveIntensity = 0.5 + 0.5 * Math.pow(Math.sin(tact * 0.5 - i * 0.9 + 1), 2)
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      gears.forEach(({ g, vertical }, i) => {
        if (vertical) g.rotation.z = t * (i % 2 ? -1 : 1) * 1.1
        else g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1
      })
      reels.forEach((r, i) => (r.rotation.z = -t * (i ? 0.65 : 0.85)))
      printhead.position.x = Math.sin(tact) * 0.42
      printhead.position.y = 1.91 + Math.sin(tact * 2) * 0.055
      outputVideo.position.y = beat * 0.25
      flyPost.position.y = Math.sin(tact) * 0.04
      const orderPhase = (t / 24) % 1
      const cashBeat = mode === 'order' ? THREE.MathUtils.clamp((orderPhase - 0.88) / 0.12, 0, 1) : beat
      receipt.visible = coin.visible = mode !== 'order' || orderPhase > 0.88
      receipt.scale.y = 0.2 + Math.min(1, cashBeat * 1.5) * 0.8
      coin.position.set(1.04, 2.7 - Math.min(1, cashBeat * 1.7) ** 2 * 2.17, 0.55)
      coin.rotation.y = t * 3.5
      coin.scale.setScalar(cashBeat > 0.9 ? 1 - (cashBeat - 0.9) * 8 : 1)
      const incomingBeat = mode === 'order' ? Math.min(1, orderPhase / 0.15) : beat
      incoming.visible = mode !== 'order' || orderPhase < 0.15
      incoming.position.set(Math.sin(incomingBeat * Math.PI) * 0.24, 2.9 - incomingBeat * 1.9, 1.1 - incomingBeat * 0.55)
      incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -0.14
      incoming.scale.setScalar(Math.min(1, incomingBeat * 8 + 0.15, (1 - incomingBeat) * 7 + 0.1))
      toggles.forEach((o, i) => (o.rotation.x = Math.sin(tact + i) > 0 ? -0.4 : 0.4))
      if (t - lastDraw > 1 / 18 || lastDraw < 0) {
        drawVideo(t)
        drawQueue(t)
        queue.texture.needsUpdate = true
        updateBelt(t)
        lastDraw = t
      }
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        let stage
        if (phase < 0.15) {
          stage = 0
          const f = phase / 0.15
          packet.group.position.copy(stations[3].group.position).add(new THREE.Vector3(0, 1.6, 0.6))
          scratch.copy(stations[0].group.position).add(new THREE.Vector3(0, 1.3, 0.65))
          packet.group.position.lerp(scratch, f)
          packet.group.position.y += Math.sin(f * Math.PI) * 2
          packet.group.rotation.set(0, Math.sin(f * Math.PI) * 0.28, Math.sin(f * Math.PI) * -0.1)
        } else {
          const u = ((phase - 0.15) / 0.85) * cashU
          path.getPointAt(u, packet.group.position)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
          packet.group.position.y += 0.43
          packet.group.rotation.set(0, 0.18, 0)
          stage = u < adminU * 0.7 ? 1 : u < storeU * 0.96 ? 2 : u < cashU * 0.83 ? 3 : 4
        }
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        packet.group.visible = mode !== 'order' || i === 0
        packet.halo.visible = mode === 'order' && i === 0
        packet.group.scale.setScalar(mode === 'order' ? 1.35 : 1)
        if (phase > 0.94) packet.group.scale.multiplyScalar(Math.max(0.05, (1 - phase) / 0.06))
      })
      if (mode === 'order') {
        const packet = packets[0]
        const step = packet.stage
        if (step !== prevJourney) {
          $('journey-title').textContent = journeySteps[step][0]
          $('journey-detail').textContent = journeySteps[step][1]
          prevJourney = step
        }
        $('journey-progress').style.width = packet.phase * 100 + '%'
        if (!dragging && playing) {
          desiredTarget.copy(packet.group.position)
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15)
          cameraAnimating = true
        }
      } else if (cameraMode === 'flight' && playing && !dragging) {
        const a = flightTime * 0.12
        const d = baseDistance * (mode === 'stations' ? 1.2 : 1)
        desiredTarget.set(0, 1, 0)
        desiredPosition
          .set(Math.sin(a + 0.55) * d * 0.83, d * (0.5 + Math.sin(a * 0.7) * 0.09), Math.cos(a + 0.55) * d * 0.83)
          .add(desiredTarget)
        cameraAnimating = true
      } else if (cameraMode === 'station' && cameraAnimating) setCameraGoal()
      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * (mode === 'order' ? 2.2 : 3))
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (
          cameraMode !== 'flight' &&
          mode !== 'order' &&
          camera.position.distanceTo(desiredPosition) < 0.015 &&
          controls.target.distanceTo(desiredTarget) < 0.015
        )
          cameraAnimating = false
      }
      controls.autoRotate =
        playing && !reduceMotion && !dragging && !cameraAnimating && mode !== 'order' && cameraMode === 'overview' && now - lastInteraction > 6500
      controls.autoRotateSpeed = 0.24
      controls.update(dt)
      // Project station callouts after the camera update, clamping them inside the frame.
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [
              [-30, 25],
              [-27, -50],
              [15, -65],
              [16, -1],
              [-5, 52],
            ]
          : [
              [-48, -14],
              [-8, -64],
              [30, -12],
              [30, 20],
              [-12, 40],
            ]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i][0]
        let y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i][1]
        x = THREE.MathUtils.clamp(x, mobile || !heroFrame ? 9 : width * 0.425, width - (mobile ? 123 : 165))
        y = THREE.MathUtils.clamp(y, 130, height - 200)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      if (!readySent && sized) {
        readySent = true
        options.onReady?.()
      }
      // Reduce only raster resolution on sustained slow devices; geometry and timing stay identical.
      if (playing) {
        frameCount++
        measureTime += dt
        if (measureTime > 4) {
          if (frameCount / measureTime < 43 && pixelRatio > 1) {
            pixelRatio = Math.max(1, pixelRatio - 0.25)
            renderer.setPixelRatio(pixelRatio)
          }
          frameCount = 0
          measureTime = 0
        }
      }
    }
    rafId = requestAnimationFrame(animate)
    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      // Free every GPU resource the scene created, then the context itself.
      const textures = new Set<THREE.Texture>()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const list = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : []
        for (const material of list) {
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value)
          material.dispose()
        }
      })
      geometries.forEach((g) => g.dispose())
      textures.forEach((t) => t.dispose())
      env.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)

    $('loading').classList.add('done')
    $('error').style.display = 'none'
    // Lightweight inspection for integration and automated browser checks; no production UI.
    Object.defineProperty(window, '__machineDebug', {
      value: {
        getState: () => ({
          mode,
          camera: cameraMode,
          playing,
          time: simTime,
          spread,
          width,
          height,
          embedded,
          drawCalls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          pixelRatio: renderer.getPixelRatio(),
        }),
      },
      configurable: true,
    })
    cleanups.push(() => {
      delete window.__machineDebug
    })
  } catch (error) {
    console.error('Machine: failed to start', error)
    showError()
  }
  return dispose
}

// ---------------------------------------------------------------------------
// Styles, scoped to .agentic-factory-3d. Monochrome, logical (RTL-safe) properties.
// ---------------------------------------------------------------------------

const STYLES = String.raw`
.agentic-factory-3d {
  color-scheme: dark;
  --bg: #0d0d0d;
  --white: #f2f2f2;
  --amber: #f2f2f2;
  --muted: #81848b;
  --line: rgba(255, 255, 255, 0.11);
  position: relative;
  width: 100%;
  contain: layout;
  overflow: hidden;
  background: var(--bg);
  color: var(--white);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.agentic-factory-3d, .agentic-factory-3d * {
  box-sizing: border-box;
}
.agentic-factory-3d button,
.agentic-factory-3d a {
  -webkit-tap-highlight-color: transparent;
}
.agentic-factory-3d button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.agentic-factory-3d button:focus-visible {
  outline: 1px solid #fff;
  outline-offset: 4px;
}
.agentic-factory-3d #scene {
  position: absolute;
  inset: 0;
  touch-action: none;
  outline: none;
}
.agentic-factory-3d.embed #scene {
  touch-action: pan-y;
}
.agentic-factory-3d #scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.agentic-factory-3d .vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 48%, transparent 38%, rgba(0, 0, 0, 0.12) 68%, rgba(0, 0, 0, 0.6) 100%);
}
.agentic-factory-3d .topbar {
  position: absolute;
  inset: 28px 32px auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
}
.agentic-factory-3d .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: #a6a79f;
}
.agentic-factory-3d .status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px #ffffff40;
}
.agentic-factory-3d .status.paused i {
  background: #777;
  box-shadow: none;
}
.agentic-factory-3d .scene-heading {
  position: absolute;
  top: 110px;
  inset-inline: 24%;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 9px;
  letter-spacing: 1.8px;
  color: #959790;
  text-transform: uppercase;
}
.agentic-factory-3d[dir='rtl'] .scene-heading {
  letter-spacing: 0;
  text-transform: none;
}
.agentic-factory-3d .scene-heading:before {
  content: '';
  width: 22px;
  height: 1px;
  background: #fff;
}
.agentic-factory-3d .coordinates {
  position: absolute;
  top: 150px;
  inset-inline-end: 33px;
  color: #52575f;
  writing-mode: vertical-rl;
  font: 9px ui-monospace, Menlo, SFMono-Regular, monospace;
  letter-spacing: 1.5px;
  pointer-events: none;
}
.agentic-factory-3d .controls {
  position: absolute;
  bottom: 79px;
  inset-inline: 26px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  z-index: 5;
}
.agentic-factory-3d .mode-bar {
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 5px;
  border: 1px solid #ffffff13;
  border-radius: 12px;
  background: rgba(20, 22, 24, 0.87);
  backdrop-filter: blur(16px);
}
.agentic-factory-3d .mode-bar button {
  border: 0;
  background: none;
  color: #a2a4a8;
  white-space: nowrap;
  padding: 11px 15px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}
.agentic-factory-3d .mode-bar button:hover {
  background: #ffffff08;
  color: var(--white);
}
.agentic-factory-3d .mode-bar button[aria-pressed='true'] {
  background: #f2f2f2;
  color: #0a0a0a;
}
.agentic-factory-3d svg {
  flex-shrink: 0;
  display: block;
}
.agentic-factory-3d .camera-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.agentic-factory-3d .camera-row .caption {
  font-size: 9px;
  letter-spacing: 1.4px;
  color: #555b65;
  margin-inline-end: 9px;
}
.agentic-factory-3d .camera-row button {
  border: 0;
  background: transparent;
  color: #6e747e;
  padding: 5px 9px;
  font-size: 10px;
  transition: color 0.2s;
}
.agentic-factory-3d .camera-row button:hover,
.agentic-factory-3d .camera-row button[aria-pressed='true'] {
  color: var(--white);
}
.agentic-factory-3d .camera-row button[aria-pressed='true']:after {
  content: '';
  display: block;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  margin: 5px auto -8px;
}
.agentic-factory-3d .camera-row .divider {
  width: 1px;
  height: 13px;
  background: var(--line);
  margin: 0 8px;
}
.agentic-factory-3d .camera-row #play {
  padding: 5px;
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
}
.agentic-factory-3d .footer {
  position: absolute;
  bottom: 25px;
  inset-inline: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
}
.agentic-factory-3d .hint {
  color: #636972;
  font-size: 10px;
}
.agentic-factory-3d #labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  direction: ltr;
}
.agentic-factory-3d .station-label {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
  will-change: transform;
  pointer-events: none;
  min-width: 138px;
  direction: inherit;
}
.agentic-factory-3d[dir='rtl'] .station-label {
  direction: rtl;
}
.agentic-factory-3d .station-label.visible {
  opacity: 1;
}
.agentic-factory-3d .station-label .stem {
  height: 26px;
  width: 1px;
  background: linear-gradient(#ffffff00, #ffffff70);
  margin-inline-start: 10px;
}
.agentic-factory-3d .station-label .label-card {
  background: #121416ee;
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff30;
  border-radius: 6px;
  padding: 10px 13px;
}
.agentic-factory-3d .station-label .label-title {
  font-weight: 550;
  font-size: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
}
.agentic-factory-3d .station-label .label-title span {
  color: #fff;
  font: 9px ui-monospace, Menlo, monospace;
}
.agentic-factory-3d .station-label .label-meta {
  font-size: 9px;
  color: #8e939c;
  margin-block-start: 6px;
  margin-inline-start: 24px;
  white-space: nowrap;
}
.agentic-factory-3d #tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 11px 14px;
  border: 1px solid #ffffff1a;
  background: #171717ed;
  backdrop-filter: blur(12px);
  border-radius: 7px;
  max-width: 240px;
}
.agentic-factory-3d #tooltip.visible {
  opacity: 1;
}
.agentic-factory-3d #tooltip strong {
  font-size: 12px;
  font-weight: 550;
}
.agentic-factory-3d #tooltip strong span {
  font-size: 10px;
  color: #fff;
  margin-inline-end: 8px;
}
.agentic-factory-3d #tooltip p {
  font-size: 11px;
  color: #9b9fa7;
  margin: 6px 0 0;
  line-height: 1.6;
}
.agentic-factory-3d #journey {
  position: absolute;
  inset-inline: 24%;
  top: 148px;
  opacity: 0;
  transform: translateY(-5px);
  transition: 0.4s;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 13px;
}
.agentic-factory-3d #journey.visible {
  opacity: 1;
  transform: none;
}
.agentic-factory-3d .journey-icon {
  width: 28px;
  height: 28px;
  border: 1px solid #ffffff40;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
.agentic-factory-3d #journey strong {
  font-size: 11px;
  font-weight: 500;
}
.agentic-factory-3d #journey small {
  display: block;
  font-size: 9px;
  margin-top: 4px;
  color: #7e858d;
}
.agentic-factory-3d #journey .track {
  height: 2px;
  background: #ffffff0b;
  flex: 1;
  margin-inline-start: 8px;
}
.agentic-factory-3d #journey .track i {
  display: block;
  height: 100%;
  background: #fff;
  width: 0;
}
.agentic-factory-3d #loading {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8c8f95;
  font-size: 11px;
  transition: opacity 0.4s;
  z-index: 20;
}
.agentic-factory-3d #loading i {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid #ffffff22;
  border-top-color: #fff;
  animation: agentic-factory-3d-spin 1s linear infinite;
}
@keyframes agentic-factory-3d-spin {
  to {
    transform: rotate(360deg);
  }
}
.agentic-factory-3d #loading.done {
  opacity: 0;
  pointer-events: none;
}
.agentic-factory-3d #error {
  position: absolute;
  inset-inline: 12%;
  top: 38%;
  border: 1px solid #ffffff30;
  background: #171717;
  padding: 24px;
  border-radius: 12px;
  display: none;
  font-size: 13px;
  line-height: 1.7;
}
.agentic-factory-3d #error strong {
  color: #fff;
  font-weight: 500;
}
.agentic-factory-3d #error p {
  color: #9da1a8;
  margin: 8px 0 0;
}
.agentic-factory-3d #error button {
  border: 1px solid #ffffff22;
  background: #1f1f1f;
  padding: 8px 14px;
  border-radius: 5px;
  margin-top: 14px;
}
.agentic-factory-3d.embed .debug-ui {
  display: none !important;
}
.agentic-factory-3d.embed {
  color-scheme: light;
  background: radial-gradient(ellipse at 50% 42%, #fbfbfa 0%, #f2f1ee 55%, #e4e3df 100%);
}
.agentic-factory-3d.embed .vignette {
  background: radial-gradient(ellipse at 50% 48%, transparent 55%, rgba(13, 13, 13, 0.06) 100%);
}
@media (max-width: 900px) {
  .agentic-factory-3d .topbar {
    inset: 24px 22px auto;
  }
  .agentic-factory-3d .scene-heading {
    inset-inline: 22px;
    top: 105px;
  }
  .agentic-factory-3d .coordinates {
    display: none;
  }
  .agentic-factory-3d .controls {
    inset-inline: 12px;
    bottom: 84px;
    gap: 18px;
  }
  .agentic-factory-3d .mode-bar button {
    padding: 11px 10px;
    font-size: 10px;
  }
  .agentic-factory-3d .footer {
    inset-inline: 22px;
  }
  .agentic-factory-3d #journey {
    inset-inline: 24px;
    top: 143px;
  }
  .agentic-factory-3d .station-label {
    min-width: 100px;
  }
  .agentic-factory-3d .station-label .label-card {
    padding: 7px 9px;
  }
  .agentic-factory-3d .station-label .label-title {
    font-size: 10px;
    gap: 7px;
  }
  .agentic-factory-3d .station-label .label-meta {
    font-size: 8px;
    margin-inline-start: 0;
  }
  .agentic-factory-3d .station-label .stem {
    height: 17px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .agentic-factory-3d, .agentic-factory-3d * {
    transition: none !important;
  }
  .agentic-factory-3d #loading i {
    animation: none;
  }
}
`
