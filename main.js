import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let scene = undefined;
let camera = undefined;
let loader = undefined;
let renderer = undefined;
let controls = undefined;
let composer = undefined;
var sceneMeshes = [];

init();

let loadedModel;

const glftLoader = new GLTFLoader();
glftLoader.load('./assets/addieroom_v2.glb', (gltfScene) => {
    loadedModel = gltfScene;

    gltfScene.scene.traverse(function (child) {

        if (child.isMesh) {

            var m = child;
            m.name = child.name;
            m.receiveShadow = true;
            m.castShadow = true;
            m.material.flatShading = true;
            var newMesh = new THREE.Mesh(m.geometry, m.material);
            newMesh.name = child.name;

            sceneMeshes.push(newMesh);
        }
    });
    gltfScene.scene.rotation.y = -45;
    gltfScene.scene.rotation.x = 0.2;
    //gltfScene.scene.rotation.y = 2;

    gltfScene.scene.position.y = -2.5;
    gltfScene.scene.position.z = 0;
    //gltfScene.scene.scale.set(10, 10, 10);
    scene.add(gltfScene.scene);

});

//art canvas
const geometry = new THREE.BoxGeometry(0.01, 1, 1.5);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./assets/seulgi1.jpg'); // Replace 'path/to/your/image.jpg' with the actual path to your image file
// Adjust texture mapping
texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(1, 1);
texture.rotation = 4.7; // Rotate the texture 90 degrees

const material = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Rotate the cube
cube.rotation.x = 20.5; // Rotate 45 degrees around the x-axis
cube.rotation.y = -109.9; // Rotate 60 degrees around the y-axis
cube.rotation.z = 87; // Rotate 30 degrees around the z-axis

// Set the cube's position
cube.position.x = -0.9; // Move the cube 1 unit along the x-axis
cube.position.y = 1.45; // Move the cube 0.5 units along the y-axis
cube.position.z = -1.81; // Move the cube -2 units along the z-axis

//art canvas

const textureLoader2 = new THREE.TextureLoader();
const texture2 = textureLoader2.load('./assets/seulgi2.jpg'); // Replace 'path/to/your/image.jpg' with the actual path to your image file
// Adjust texture mapping
texture2.wrapS = THREE.RepeatWrapping;
//texture2.wrapT = THREE.RepeatWrapping;
//texture2.repeat.set(1, 1);
texture2.rotation = 4.7; // Rotate the texture 90 degrees

const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
const cube2 = new THREE.Mesh(geometry, material2);
scene.add(cube2);

// Rotate the cube
cube2.rotation.x = 20.5; // Rotate 45 degrees around the x-axis
cube2.rotation.y = -109.9; // Rotate 60 degrees around the y-axis
cube2.rotation.z = 87; // Rotate 30 degrees around the z-axis

// Set the cube's position
cube2.position.x = 0; // Move the cube 1 unit along the x-axis
cube2.position.y = 1.55; // Move the cube 0.5 units along the y-axis
cube2.position.z = -2.5; // Move the cube -2 units along the z-axis
cube.castShadow = true;
cube2.castShadow = true;
// let gltDesktop;
// const glftDesktopLoader = new GLTFLoader();
//     glftLoader.load('./assets/computer.gltf', (gltfDesktopScene) => {
//     gltfDesktopScene;
//     gltDesktop = gltfDesktopScene;
//     // console.log(loadedModel);
//     gltfDesktopScene.scene.traverse(function(child) {
//         if (child.isMesh) {
//             var m = child;
//             m.receiveShadow = true;
//             m.castShadow = true;
//             m.material.flatShading = true;
//             var newMesh = new THREE.Mesh(m.geometry, m.material);
//             sceneMeshes.push(newMesh);
//         }
//     });
//     gltfDesktopScene.scene.rotation.y = -45;
//     gltfDesktopScene.scene.rotation.x = 0.2;
//     //gltfScene.scene.rotation.y = 2;

//     gltfDesktopScene.scene.position.y = -2.5;
//     gltfDesktopScene.scene.position.z = 0;
//     var scale = 1;
//     gltfDesktopScene.scene.scale.set(scale, scale, scale);
//     scene.add(gltfDesktopScene.scene);

// });


function init() {
    //init
    const canvas = document.getElementById("root");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
    loader = new GLTFLoader();

    //renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Enable shadow rendering in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Adjust the shadow map type as desired

    // Set up a light source that casts shadows
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0); // Set the light's position
    light.castShadow = true; // Enable shadow casting

    // Configure shadow properties
    light.shadow.mapSize.width = 1024; // Adjust the shadow map width as desired
    light.shadow.mapSize.height = 1024; // Adjust the shadow map height as desired
    light.shadow.camera.near = 0.5; // Adjust the near clipping plane of the shadow camera as desired
    light.shadow.camera.far = 50; // Adjust the far clipping plane of the shadow camera as desired
    scene.add(light);
    // Enable shadow casting for relevant objects
    //cube.castShadow = true; // Set the cube to cast shadows
    // Add any other objects that should cast shadows

    //controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 50;
    controls.minDistance = 10;
    controls.maxPolarAngle = 1.5;
    controls.minPolarAngle = 1.5;
    // controls.maxAzimuthAngle = 0.6;
    // controls.minAzimuthAngle = -0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.enablePan = false;
    //lights
    const ambientlight = new THREE.AmbientLight(0x000, 0.9); // soft white light
    scene.add(ambientlight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // directionalLight.castShadow = true;
    // directionalLight.position.set(-1, 5, 5);
    // scene.add(directionalLight);
    // const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
    // scene.add(dlHelper);

    const pointLight = new THREE.PointLight(0xffffff, 3, 8.3, 2);
    pointLight.position.set(0, 1, 2);
    //const plHelper = new THREE.PointLightHelper(pointLight, 0.5);
    scene.add(pointLight);

    // const pointLight2 = new THREE.PointLight(0xffffff, 3, 15, 2);
    // pointLight2.position.set(-8, 5, 0);
    // //const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);
    // scene.add(pointLight2);

    // const pointLight3 = new THREE.PointLight(0xffffff, 3, 10, 2);
    // pointLight3.position.set(7, 3, 0);
    // //const plHelper3 = new THREE.PointLightHelper(pointLight3, 0.5);
    // scene.add(pointLight3);

    // const pointLight4 = new THREE.PointLight(0xffffff, 3, 10, 2);
    // pointLight4.position.set(0, -5, 0);
    // //const plHelper3 = new THREE.PointLightHelper(pointLight3, 0.5);
    // scene.add(pointLight4);

    //background color
    const params = {
        color: '#251F21'
    };

    scene.background = new THREE.Color(params.color);

    //renderer
    document.body.appendChild(renderer.domElement);

    camera.position.z = 48;
    controls.update();
}



function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);

}

animate();

// Define the handleClick function
function handleClick(event) {
    // Calculate normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Set the raycaster's origin and direction
    pointer.set(x, y);
    raycaster.setFromCamera(pointer, camera);

    // Intersect objects with the raycaster
    const intersects = raycaster.intersectObjects(scene.children);
   
    // Check if any objects are intersected
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Perform actions specific to the clicked object
        var objectName = clickedObject.name;
        console.log('Object clicked:', objectName);

        if (objectName == "Monitor_2" || objectName == "Monitor_1") {
         
            // Activate the modal using Bootstrap's JavaScript API
            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();
        }
        // Perform any other actions or operations on the clicked object
    }
}

let originalColor;
let monitorObject;
var title = document.getElementById("instruction");
let hoverColor = 0xFAEC06;

// Define the onMouseMove function
function onMouseMove(event) {
    // Calculate normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Set the raycaster's origin and direction
    pointer.set(x, y);
    raycaster.setFromCamera(pointer, camera);

    // Intersect objects with the raycaster
    const intersects = raycaster.intersectObjects(scene.children);

    // Check if any objects are intersected
    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;

        // Perform actions specific to the hovered object
        var objectName = hoveredObject.name;

        if (objectName == "Monitor_2") {
            monitorObject = hoveredObject;
          
            // Store the original color if it's not already stored
            if (!originalColor) {
                originalColor = hoveredObject.material.color.clone();
            }

            // Set the material color of the hovered object
            hoveredObject.material.color.set(hoverColor);

            title.innerText = "View Social Media";
            // Change cursor to a hand pointing
            renderer.domElement.style.cursor = "pointer";
        }
        else {
            if (originalColor) {
                //console.log(monitorObject);
                title.innerText = "";
                monitorObject.material.color.set(originalColor);
                originalColor = null;
                // Change cursor to default
                renderer.domElement.style.cursor = "default";
            }
        }
    }
}

window.addEventListener('pointermove', onMouseMove);
// Add an event listener to the renderer
window.addEventListener('click', handleClick);
