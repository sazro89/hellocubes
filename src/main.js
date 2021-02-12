let canvas = document.getElementById("renderCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let camera;
let boxes1 = [];
let boxes2 = [];
let boxes3 = [];
let boxSize = 50;
let distance = 170;
let halfDis;
let boxNum = 10;
let angle = 0;
let cameraPos = 1100;
let cameraZ = 5;
let mergedBoxes;


/******* Add the create scene function ******/
let createScene = function () {

    // Create the scene space
    let scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    // Parameters: alpha, beta, radius, target position, scene
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, cameraPos, new BABYLON.Vector3.Zero, scene);
    camera.attachControl(canvas, false);

    // Add lights to the scene
    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    halfDis = distance * (boxNum-1)/2;

    // Add and manipulate meshes in the scene

    for(let x = 0; x < boxNum; x++){
        let box = BABYLON.MeshBuilder.CreateBox("box", {size: 50});
        box.position.x = x * distance - halfDis;
        boxes1.push(box);
    }

    mergedBoxes = BABYLON.Mesh.MergeMeshes(boxes1, true, true, false, false, false);

    for (let y = 0; y < boxNum; y++) {
        let box = mergedBoxes.clone();
        box.position.y = y * distance - halfDis;
        boxes2.push(box);
    }

    mergedBoxes.dispose();
    mergedBoxes = BABYLON.Mesh.MergeMeshes(boxes2, true, true, false, false, false);

    for (let z = 0; z < boxNum; z++) {
        let box = mergedBoxes.clone();
        box.position.z = z * distance - halfDis;
        boxes3.push(box);
    }

    mergedBoxes.dispose();
    mergedBoxes = BABYLON.Mesh.MergeMeshes(boxes3, true, true, false, false, false);
//     for(let y = 0; y < boxNum; y++){
//         // reposition meshes and push copies, this time moving along the y axis
//         box.position.y = y * distance - halfDis;

//         boxes2.push(box);
//     }
//     for(let z = 0; z < boxNum; z++){
//         box.position.z = z * distance - halfDis;
//     }

//     mergedBoxes = BABYLON.Mesh.MergeMeshes(boxes, true, true, false, false, false);
        
    return scene;
};
/******* End of the create scene function ******/

let scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    if (cameraPos > 1100 || cameraPos < -850) {
        cameraZ *= -1; 
    }
    cameraPos += cameraZ
    scene.activeCamera.radius = cameraPos;
    angle += 4;
    mergedBoxes.rotation.x = angle / 180;
    mergedBoxes.rotation.y = angle / 180;
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
