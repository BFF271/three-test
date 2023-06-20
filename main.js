import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

const light = new THREE.PointLight(0xffffff)
light.position.set(2, 2, 2)
scene.add(light)
const loader = new GLTFLoader()
const renderer = new THREE.WebGLRenderer({ alpha: false })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
let mixer
loader.load('logo.gltf', function (gltf) {
  gltf.scene.position.set(0, 0, 0) // Set the position of the model
  gltf.scene.scale.set(1, 1, 1)
  scene.add(gltf.scene)
  console.log(gltf)

  const animation = gltf.animations[0]
  mixer = new THREE.AnimationMixer(gltf.scene)
  mixer.clipAction(animation).play()
  camera.position.z = 1
})
function animate() {
  requestAnimationFrame(animate)
  if (mixer) {
    mixer.update(0.01) // you can adjust the delta time here to control the speed of the animation
  }
  renderer.render(scene, camera)
}

animate()

// const loader = new GLTFLoader()

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/examples/jsm/libs/draco/')
// loader.setDRACOLoader(dracoLoader)

// // Load a glTF resource
// loader.load(
//   // resource URL
//   'models/logo.gltf',
//   // called when the resource is loaded
//   function (gltf) {
//     scene.add(gltf.scene)

//     gltf.animations // Array<THREE.AnimationClip>
//     gltf.scene // THREE.Group
//     gltf.scenes // Array<THREE.Group>
//     gltf.cameras // Array<THREE.Camera>
//     gltf.asset // Object
//   },
//   // called while loading is progressing
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//   },
//   // called when loading has errors
//   function (error) {
//     console.log('An error happened')
//   },
// )
