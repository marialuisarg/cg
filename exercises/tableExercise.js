import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create cube
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
let cube = new THREE.Mesh(cubeGeometry, material);
// position the cube
cube.position.set(0.0, 0.5, 0.0);
// add the cube to the scene
scene.add(cube);

cube.scale.set(11, 0.3, 6);
cube.translateY(2.5);

// create 4 cylinders

let x = 10;
let z = 5;

for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    let cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 64);
    let cylinder = new THREE.Mesh(cylinderGeometry, material);
    cylinder.position.set(0.0, 0.0, 0.0);
    scene.add(cylinder);
    
    cylinder.scale.set(0.2,3,0.2);
    cylinder.translateY(1.5);
    cylinder.translateX(-5 + (x*i*j));
    cylinder.translateZ(-2.5 + (z*i*j)); 
  }
}


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}