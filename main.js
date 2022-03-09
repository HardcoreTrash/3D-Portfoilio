import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render( scene, camera ); 

const geometry = new THREE.DodecahedronGeometry( 10 );
const material = new THREE.MeshBasicMaterial( { colour: 0xFF6347, wireframe: true } );
const dodecahedron = new THREE.Mesh( geometry, material );

scene.add(dodecahedron)

function animate() {
  requestAnimationFrame( animate );

  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.005;
  dodecahedron.rotation.z += 0.01;


  renderer.render( scene, camera );
}

animate();
