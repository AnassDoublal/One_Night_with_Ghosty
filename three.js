// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/FBXLoader.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { THREEx } from './threex.domevents.js';
// import { FontLoader } from 'https://threejs.org/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from 'https://threejs.org/examples/jsm/geometries/TextGeometry.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.137.5/examples/jsm/controls/OrbitControls'
// import { FBXLoader } from 'https://cdn.skypack.dev/three@0.137.5/examples/jsm/loaders/FBXLoader'
// import Stats from 'https://cdn.skypack.dev/three@0.137.5/examples/jsm/libs/stats.module'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.set(0.1, 2, 21.5);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.target.set(0, 1, 0);

let ghosty = undefined;
let ghostyGameOver = undefined;
let revealGhosty = undefined;

const fbxLoader1 = new FBXLoader();
fbxLoader1.load(
    'Models/ghost.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object);
        object.name = "ghosty";
        object.scale.set(.005, .005, .005);
        object.rotation.y = Math.PI*3/2;
        object.position.z = -20.5;
        object.position.x = 22.1;
        object.position.y = 1;
        object.rotation.y += Math.PI/2;
        ghosty = scene.getObjectByName("ghosty");

        // const anim = new FBXLoader();
        // anim.load("Animations/walk.fbx", (anim) => 
        // {
        //     let mixer = new THREE.AnimationMixer(object);
        //     let idle = mixer.clipAction(anim.animations[0]);
        //     idle.play(); 
        // });
        // scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader2 = new FBXLoader()
fbxLoader2.load(
    'Models/bathroom_all_assets.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.005, .005, .005);
        object.rotation.y = Math.PI*3/2;
        object.position.z = -21.5;
        object.position.x = -22;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader3 = new FBXLoader()
fbxLoader3.load(
    'Models/bedroom1.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.02, .02, .02);
        object.rotation.y = -Math.PI/2;
        object.position.z = 21.2;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader4 = new FBXLoader()
fbxLoader4.load(
    'Models/kitchen.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.015, .015, .015);
        // object.rotation.y = Math.PI/2;
        object.position.z = -21.5;
        object.position.x = 21;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader5 = new FBXLoader()
fbxLoader5.load(
    'Models/living_room.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.005, .005, .005);
        object.rotation.y = -Math.PI/2;
        // object.position.z = -11.8;
        object.position.x = -22.7;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader6 = new FBXLoader()
fbxLoader6.load(
    'Models/dining_room.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.01, .01, .01);
        object.rotation.y = -Math.PI/2;
        // object.position.z = -11.8;
        object.position.x = 25;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader7 = new FBXLoader()
fbxLoader7.load(
    'Models/chandelier.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        scene.add(object)
        object.scale.set(.025, .025, .025);
        // object.rotation.y = -Math.PI/2;
        // object.position.z = -11.8;
        object.position.y = 5.4;
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const fbxLoader8 = new FBXLoader()
fbxLoader8.load(
    'Models/ghost.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        camera.add(object);
        object.name = "ghostyGameOver";
        object.scale.set(0, 0, 0);
        // object.rotation.y = -Math.PI/2;
        // object.position.z = -11.8;
        object.position.set(0, -1, -2);
        object.rotation.y += Math.PI/2;
        ghostyGameOver = scene.getObjectByName("ghostyGameOver");
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const geometry = new THREE.PlaneGeometry( 50, 50 );
const texture = new THREE.TextureLoader().load( 'Textures/floor.jpg' );
const material = new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI / 2;
scene.add( plane );

const boxGeometry = new THREE.BoxGeometry( 50, 15, 50 );
const wallTexture = new THREE.TextureLoader().load( 'Textures/wall.png' );
const boxMaterial = new THREE.MeshPhongMaterial( {map: wallTexture, side: THREE.DoubleSide} );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( cube );

const roofGeometry = new THREE.BoxGeometry( 50, 1, 50 );
const roofTexture = new THREE.TextureLoader().load( 'Textures/roof.png' );
const roofMaterial = new THREE.MeshPhongMaterial( {map: roofTexture, side: THREE.DoubleSide} );
const roof = new THREE.Mesh( roofGeometry, roofMaterial );
scene.add( roof );

roof.position.y = 7.8;

const tileGeometry = new THREE.BoxGeometry( 5, 1, 5 );
const tileTexture = new THREE.TextureLoader().load( 'Textures/tile.png' );
const tileMaterial = new THREE.MeshPhongMaterial( {map: tileTexture, side: THREE.DoubleSide} );
const tile = new THREE.Mesh( tileGeometry, tileMaterial );
scene.add( tile );

const codeGeometry = new THREE.BoxGeometry( .1, .1, .1 );
const codeMaterial = new THREE.MeshPhongMaterial( {color:"#0000ff", side: THREE.DoubleSide} );
const code = new THREE.Mesh( codeGeometry, codeMaterial );

code.position.set(-22.5, 2.38, -2);

const formulaGeometry = new THREE.BoxGeometry( .1, .1, .1 );
const formulaMaterial = new THREE.MeshPhongMaterial( {color:"#00ff00", side: THREE.DoubleSide} );
const formula = new THREE.Mesh( formulaGeometry, formulaMaterial );

formula.position.set(23, 1.6, -24);

const usbKeyGeometry = new THREE.BoxGeometry( .1, .1, .1 );
const usbKeyMaterial = new THREE.MeshPhongMaterial( {color:"#ff0000", side: THREE.DoubleSide} );
const usbKey = new THREE.Mesh( usbKeyGeometry, usbKeyMaterial );

usbKey.position.set(1.5, 0.2, -3);

const techSheet1Geometry = new THREE.BoxGeometry( .1, .1, .1 );
const techSheet1Material = new THREE.MeshPhongMaterial( {color:"#ffff00", side: THREE.DoubleSide} );
const techSheet1 = new THREE.Mesh( techSheet1Geometry, techSheet1Material );

techSheet1.position.set(22, 1.4, -1.3);

const techSheet2Geometry = new THREE.BoxGeometry( .1, .1, .1 );
const techSheet2Material = new THREE.MeshPhongMaterial( {color:"#ffff00", side: THREE.DoubleSide} );
const techSheet2 = new THREE.Mesh( techSheet2Geometry, techSheet2Material );

techSheet2.position.set(-20.9, .7, -24);

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

tile.position.y = -.49;

const light = new THREE.PointLight( 0xffffff, 1, 10 );
light.position.set(0, 0, 0);
camera.add( light );

// const light = new THREE.AmbientLight( 0xffffff );
// scene.add( light );

scene.add(camera);

// const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
// const planeMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff, side: THREE.DoubleSide, flatShading: THREE.FlatShading});
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// scene.add(planeMesh);

// const {array} = planeMesh.geometry.attributes.position;

// for(let i=0; i<array.length; i+=3)
// {
//     const x = array[i];
//     const y = array[i+1];
//     const z = array[i+2];

//     array[i+2] = z + Math.random();
// }
// const ambientLight = new THREE.AmbientLight()
// scene.add(ambientLight)

// const light = new THREE.PointLight()
// light.position.set(0.8, 1.4, 1.0)
// scene.add(light)

const btnGeometry = new THREE.BoxGeometry( 1, .3, .1 );
const btnMaterial = new THREE.MeshPhongMaterial( {color:"#000000", side: THREE.DoubleSide} );
const btn = new THREE.Mesh( btnGeometry, btnMaterial );
btn.position.set(-2.2, 1.8, 17.5);

const fontLoader = new THREE.FontLoader();

fontLoader.load( './Fonts/OpenSans.json', function ( font ) {

	const textGeometry = new THREE.TextGeometry( 'Reveal Ghosty', {
		font: font,
		size: .1,
		height: .05,
	} );

    const textMesh = new THREE.Mesh(textGeometry, 
        new THREE.MeshPhongMaterial({color: "#ffffff"}));
    
    textMesh.position.set(-2.65, 1.75, 17.51);

    const btnGroup = new THREE.Group();
    btnGroup.add(btn, textMesh);

    scene.add(btnGroup);
    
    btnGroup.name = "btnGroup";

    revealGhosty = scene.getObjectByName("btnGroup");

    const kitchen = new THREE.TextGeometry( 'Kitchen', {
		font: font,
		size: .05,
		height: .05,
	} );

    const kitchenMesh = new THREE.Mesh(kitchen, 
        new THREE.MeshPhongMaterial({color: "#000000"}));
    
    kitchenMesh.position.set(-1.83, 3.34, 17.45);
    scene.add(kitchenMesh);

    const bathroom = new THREE.TextGeometry( 'Bathroom', {
		font: font,
		size: .05,
		height: .05,
	} );

    const bathroomMesh = new THREE.Mesh(bathroom, 
        new THREE.MeshPhongMaterial({color: "#000000"}));
    
    bathroomMesh.position.set(-2.9, 3.34, 17.45);
    scene.add(bathroomMesh);

    const livingRoom = new THREE.TextGeometry( 'Living\nRoom', {
		font: font,
		size: .05,
		height: .05,
	} );

    const livingRoomMesh = new THREE.Mesh(livingRoom, 
        new THREE.MeshPhongMaterial({color: "#000000"}));
    
    livingRoomMesh.position.set(-2.85, 2.8, 17.45);
    scene.add(livingRoomMesh);

    const diningRoom = new THREE.TextGeometry( 'Dining\nRoom', {
		font: font,
		size: .05,
		height: .05,
	} );

    const diningRoomMesh = new THREE.Mesh(diningRoom, 
        new THREE.MeshPhongMaterial({color: "#000000"}));
    
    diningRoomMesh.position.set(-1.845, 2.8, 17.45);
    scene.add(diningRoomMesh);

    const bedroom = new THREE.TextGeometry( 'Bedroom', {
		font: font,
		size: .05,
		height: .05,
	} );

    const bedroomMesh = new THREE.Mesh(bedroom, 
        new THREE.MeshPhongMaterial({color: "#000000"}));
    
    bedroomMesh.position.set(-2.4, 2.19, 17.45);
    scene.add(bedroomMesh);
} );

const map = new THREE.TextureLoader().load( "./Models/ghost.png" );
const spriteMaterial = new THREE.SpriteMaterial( { map: map, color: 0xffffff, transparent: true, opacity: 0} );
const sprite = new THREE.Sprite( spriteMaterial );
sprite.position.set(-1.69, 3.3, 17.6);
sprite.scale.set(.15, .15, 1);
scene.add( sprite );

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // controls.update();
    TWEEN.update();
    // planeMesh.rotation.x += 0.01;
}

animate();

export {scene, camera, ghosty, code, formula, usbKey, techSheet1, techSheet2, domEvents, revealGhosty, map, sprite, ghostyGameOver, btn};