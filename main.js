import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Mesh } from 'three';


// Set-up
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render( scene, camera ); 

// Creating the geometry
const geometry = new THREE.DodecahedronGeometry( 10 );
// const material = new THREE.MeshBasicMaterial( { colour: 0xFF6347, wireframe: true} );
const material = new THREE.MeshStandardMaterial( { colour: 0xFF6347} );
const dodecahedron = new THREE.Mesh( geometry, material );

scene.add(dodecahedron)

// Light up the shape
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// Helps with dimensions of the light
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// Listen to dom events on mouse
const controls = new OrbitControls(camera, renderer.domElement)

// randomly populate the screen with the shapes
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff })
  const star = new THREE.Mesh( geometry, material )

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) )

  star.position.set(x, y, z);
  scene.add(star)
}

// Add 200 stars
Array(200).fill().forEach(addStar)

// Load a background image
const spaceTexture = new THREE.TextureLoader().load('snow.jpeg');
scene.background = spaceTexture;


// Continuously update the website using recursion
function animate() {
  requestAnimationFrame( animate );

  // Spins the shape
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.005;
  dodecahedron.rotation.z += 0.01;

  // Reflect change
  controls.update();

  renderer.render( scene, camera );
}

animate();
