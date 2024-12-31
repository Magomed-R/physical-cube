import * as t from 'three'

const scene = new t.Scene()
const camera = new t.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.add(camera)

const renderer = new t.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const material = new t.LineBasicMaterial({ color: 0xff0000 })

const points = []
points.push(new t.Vector3(0, 0, 0))
points.push(new t.Vector3(10, 0, 0))
points.push(new t.Vector3(10, 10, 0))
points.push(new t.Vector3(0, 10, 0))
points.push(new t.Vector3(0, 0, 0))
points.push(new t.Vector3(0, 0, 10))
points.push(new t.Vector3(0, 10, 10))
points.push(new t.Vector3(10, 10, 10))
points.push(new t.Vector3(10, 0, 10))
points.push(new t.Vector3(0, 0, 10))
points.push(new t.Vector3(0, 10, 10))
points.push(new t.Vector3(0, 10, 0))
points.push(new t.Vector3(0, 10, 0))
points.push(new t.Vector3(10, 10, 0))
points.push(new t.Vector3(10, 10, 10))
points.push(new t.Vector3(10, 0, 10))
points.push(new t.Vector3(10, 0, 0))
const cubeGeometry = new t.BufferGeometry().setFromPoints(points)

const cube = new t.Line(cubeGeometry, material)
const group = new t.Group()

cube.position.set(-5, -5, -5)

group.position.z -= 20
group.rotation.x += 0.5

group.add(cube)
scene.add(group)

let rDelta = 0
let mouseDowned = false

function animate() {
  renderer.render(scene, camera)

  group.rotation.y += Number(rDelta)

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
