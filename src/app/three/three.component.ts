import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'
import {
  BackSide,
  Color,
  EquirectangularReflectionMapping,
  HemisphereLight,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearToneMapping,
  LoadingManager,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  ShaderLib,
  ShaderMaterial,
  SphereBufferGeometry,
  sRGBEncoding,
  TextureLoader,
  WebGLRenderer,
  Texture,
  Material,
  MeshStandardMaterial,
  Vector3,
  BoxBufferGeometry,
  Raycaster,
  Vector2,
  MeshBasicMaterial,
  Box3,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { WEBGL } from 'three/examples/jsm/WebGL'

@Component({
  selector: 'wec-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasElement: ElementRef
  canvas: HTMLCanvasElement

  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  controls: OrbitControls
  envMap: Texture

  constructor() {
    this.animationLoop = this.animationLoop.bind(this)
    this.resizeRenderer = this.resizeRenderer.bind(this)
  }

  ngOnInit() {
    this.canvas = this.canvasElement.nativeElement
    this.initRenderer()
    this.initCamera()
    this.initControls()
    // this.initEnvironment()
  }

  ngAfterViewInit(): void {
    this.start()
    console.log('start')
  }

  ngOnDestroy(): void {
    this.stop()
    this.renderer.dispose()
  }

  initRenderer() {
    const webglVersion = WEBGL.isWebGL2Available() ? 'webgl2' : 'webgl'
    const context = this.canvas.getContext(webglVersion, { alpha: false }) as WebGL2RenderingContext
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      context,
      alpha: false,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.physicallyCorrectLights = true
    renderer.toneMapping = LinearToneMapping
    renderer.outputEncoding = sRGBEncoding
    this.renderer = renderer
    this.scene = new Scene()
  }

  initCamera() {
    // Create a Camera
    const fov = 65 // AKA Field of View
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight

    const near = 0.1 // the near clipping plane
    const far = 1000 // the far clipping plane

    const camera = new PerspectiveCamera(fov, aspect, near, far)

    // every object is initially created at ( 0, 0, 0 )
    // we'll move the camera back a bit so that we can view the scene
    camera.position.set(0, 10, 20)
    camera.lookAt(0, 2, 0)
    this.camera = camera
  }

  initControls() {
    const controls = new OrbitControls(this.camera, this.canvas)
    controls.enableDamping = true // controls.update() is needed in animationLoop for this to work
    controls.dampingFactor = 0.1 // less damping means more glide
    controls.screenSpacePanning = false
    controls.minDistance = 5 // how many meters in can you zoom
    controls.maxDistance = 500 // how far out can you zoom
    controls.minPolarAngle = 0.5 // how far up can you orbit
    controls.maxPolarAngle = Math.PI / 2.2 // how far down can you orbit
    controls.rotateSpeed = 0.4
    controls.zoomSpeed = 0.2
    controls.enablePan = false
    // controls.panSpeed = 0.4
    this.controls = controls
  }

  initEnvironment() {
    // Lights
    const hemiLight = new HemisphereLight(0xffffbb, 0x080820, 5)
    this.scene.add(hemiLight)

    const textureLoader = new TextureLoader()
    this.envMap = textureLoader.load('/assets/environment_equi.jpg')
    this.envMap.mapping = EquirectangularReflectionMapping
    this.envMap.magFilter = LinearFilter
    this.envMap.minFilter = LinearMipMapLinearFilter
    this.envMap.encoding = sRGBEncoding

    const skySphereGeometry = new SphereBufferGeometry(1000, 48, 24)
    const skySphereMaterial = new MeshLambertMaterial({ envMap: this.envMap })
    const skySphere = new Mesh(skySphereGeometry, skySphereMaterial)
    this.scene.add(skySphere)
  }

  start() {
    this.renderer.setAnimationLoop(this.animationLoop)
    window.addEventListener('resize', this.resizeRenderer)
    // document.addEventListener('mousemove', this.onMouseMove)
  }

  stop() {
    this.renderer.setAnimationLoop(null as any)
    window.removeEventListener('resize', this.resizeRenderer)
    // document.removeEventListener('mousemove', this.onMouseMove)
  }

  private animationLoop() {
    // this.testMesh.rotation.x += 0.01
    // this.testMesh.rotation.y += 0.01
    // this.testMesh.rotation.z += 0.01

    // enable damping for controls
    this.controls.update()

    // render current frame
    this.renderer.render(this.scene, this.camera)
  }

  private resizeRenderer() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
