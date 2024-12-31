import * as t from 'three'

const renderer = new t.WebGLRenderer()
const scene = new t.Scene()
const camera = new t.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const cubeGeometry = new t.BoxGeometry(10, 10, 10)
const edgesGeometry = new t.EdgesGeometry(cubeGeometry)
const lineMaterial = new t.MeshBasicMaterial({ color: 0xff0000 })
const cube = new t.LineSegments(edgesGeometry, lineMaterial)

cube.position.z -= 20
cube.rotation.x += 0.5

let rDelta = 0
let mouseDowned = false

scene.add(camera)
scene.add(cube)

function animate() {
  renderer.render(scene, camera)

  cube.rotation.y += Number(rDelta)

  if (rDelta > 0.001) rDelta -= 0.001
  if (rDelta < -0.001) rDelta += 0.001
  if (rDelta > 0.00001) rDelta -= 0.00001
  if (rDelta < -0.00001) rDelta += 0.00001
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') rDelta += 0.01
  if (event.key === 'ArrowLeft') rDelta -= 0.01
})

document.addEventListener('mousedown', () => (mouseDowned = true))
document.addEventListener('mouseup', () => (mouseDowned = false))

document.addEventListener('mousemove', (event) => {
  if (mouseDowned) rDelta += event.movementX / 10000
})

renderer.setAnimationLoop(animate)
