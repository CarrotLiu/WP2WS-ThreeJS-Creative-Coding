const WORLD_HALF_SIZE = 100;
const FLOOR_POSITION = 0;
const COLOR_BG = 0x000000;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const grpSpace = new THREE.Group();


let ifClicked = false;

let cube;
let Bottom, Top, Right, Left, Front, Back;
let gate;
let gateVec = [];
let gates = [];
let light;
let ground;

let pointCloud;

let sceneIndex = 1;

let particles = [];

let spaceData = {
  widt: 1,
  dept: 1,
  heig: 1,
  color: 0xcc9911,
};

let fogParams = {
  near: 300,
  far: 10,
};

const gui = new dat.gui.GUI();

function setupTHREE() {
  // texture = new THREE.TextureLoader().load(
  //   "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/%5BCITYPNG.COM%5DHD%20Glowing%20Blue%20Turquoise%20Ball%20Effect%20Transparent%20PNG%20-%201278x1278.png?v=1666006838955"
  // );
  // let guiFog = gui.addFolder("fog");
  // guiFog.add(fogParams, "near", 1, 500).step(1);
  // guiFog.add(fogParams, "far", 1, 500).step(1);

  if (sceneIndex == 0) {
    // starting scene
  } else if (sceneIndex == 1) {
    for (let i = 0; i < WORLD_HALF_SIZE * 2; i++) {
      for (let a = 0; a < WORLD_HALF_SIZE * 2 + WORLD_HALF_SIZE / 2; a += 10) {
        gateVec.push(
          a - WORLD_HALF_SIZE / 2 - 80,
          i - WORLD_HALF_SIZE / 2 - 75,
          WORLD_HALF_SIZE / 2
        );
      }
    }
    for (let i = 0; i < gateVec.length / 3; i++) {
      gates
        .push(new Gate(gateVec[i * 3], gateVec[i * 3 + 1], gateVec[i * 3 + 2])
        .setPosition(gateVec[i * 3], gateVec[i * 3 + 1], gateVec[i * 3 + 2]));
    }

    // cube = getBox();

    // lights
    const ambiLight = new THREE.AmbientLight(0x000000);
    scene.add(ambiLight);
    light = getLight();
    scene.add(light);
    const hemiLight = new THREE.HemisphereLight(0x000000, 0x330000, 1); //skyColor, groundColor, intensity
    scene.add(hemiLight);
    let guihemiLightSky = gui.addFolder("HemiLight-Sky");
    guihemiLightSky.add(hemiLight.color, "r", 0.0, 1.0);
    guihemiLightSky.add(hemiLight.color, "g", 0.0, 1.0);
    guihemiLightSky.add(hemiLight.color, "b", 0.0, 1.0);

    let guihemiLightGround = gui.addFolder("HemiLight-Ground");
    guihemiLightGround.add(hemiLight.groundColor, "r", 0.0, 1.0);
    guihemiLightGround.add(hemiLight.groundColor, "g", 0.0, 1.0);
    guihemiLightGround.add(hemiLight.groundColor, "b", 0.0, 1.0);
  } else if (sceneIndex == 2) {
    getSpace();
    // moving walls scene
  } else if (sceneIndex == 3) {
    // sea scene
  } else if (sceneIndex == 3) {
    // ending scene
  }

}

function updateTHREE(frame) {
  raycaster.setFromCamera(mouse, camera);
  for (let p of gates) {
    // p.display();
    // if (camera.position.z > 0) {
    p.whetherFloat();
    p.float();
  }
  for (let i = 0; i < gates.length; i++) {
    let p = gates[i];
    let pcIndex = i * 3;
    p.gate.geometry.attributes.position.array[pcIndex + 0] = p.pos.x;
    p.gate.geometry.attributes.position.array[pcIndex + 1] = p.pos.y;
    p.gate.geometry.attributes.position.array[pcIndex + 2] = p.pos.z;
    p.gate.geometry.attributes.position.needsUpdate = true;
  }

  // if (cube.position.z < 10) {
  //   // grpSpace.scale.x += 1;
  //   // grpSpace.scale.z += 2;
  //   controls.enablePan = false;
  //   controls.enableRotate = false;
  //   controls.enableZoom = false;
  //   camera.position.z -= 1;
  //   camera.position.x = 0;
  //   camera.position.y = 0;
  //   camera.rotation.x = -PI;
  // }

  //   if (!ifClicked) {
  //     controls.enableRotate = false;
  //     controls.enablePan = false;
  //     controls.enableZoom = false;
  //   } else {
  //     controls.enableRotate = true;
  //     controls.enablePan = true;
  //     controls.enableZoom = true;
  //   }

  // scene.fog = new THREE.Fog(COLOR_BG, fogParams.near, fogParams.far);
}

function getSpace() {
  Bottom = getPlane();
  Top = getPlane();
  Right = getPlane();
  Left = getPlane();
  Front = getPlane();
  Back = getPlane();

  Top.rotation.x = PI / 2;
  Top.position.y = WORLD_HALF_SIZE;
  Top.position.z = -WORLD_HALF_SIZE / 2;

  Bottom.rotation.x = -PI / 2;
  Bottom.position.y = -WORLD_HALF_SIZE;
  Bottom.position.z = -WORLD_HALF_SIZE / 2;

  Left.rotation.y = PI / 2;
  Left.position.x = -WORLD_HALF_SIZE / 2;
  Left.scale.y = 2;
  Left.position.z = -WORLD_HALF_SIZE / 2;

  Right.rotation.y = -PI / 2;
  Right.position.x = WORLD_HALF_SIZE / 2;
  Right.scale.y = 2;
  Right.position.z = -WORLD_HALF_SIZE / 2;

  Back.position.z = -WORLD_HALF_SIZE / 2;
  Back.scale.y = 2;
  Back.position.z = -WORLD_HALF_SIZE / 2;

  grpSpace.add(Top);
  grpSpace.add(Bottom);
  grpSpace.add(Left);
  grpSpace.add(Right);
  grpSpace.add(Back);

  const folder = gui.addFolder("Space");

  folder.add(spaceData, "widt", 0, 2).onChange(function (e) {
    grpSpace.scale.x = e;

    // Right.scale.x = e;
    // Left.scale.x = e;
    // Back.position.z = -e;
  });
  folder.add(spaceData, "dept", 0, 2).onChange(function (e) {
    grpSpace.scale.z = e;
    // Right.scale.x = e;
    // Left.scale.x = e;
    // Back.position.z = -e;
  });
  folder.add(spaceData, "heig", 0, 2).onChange(function (e) {
    grpSpace.scale.y = e;
    // Right.scale.x = e;
    // Left.scale.x = e;
    // Back.position.z = -e;
  });

  //grpSpace.translateZ(WORLD_HALF_SIZE / 2);
  //grpSpace.translateY(WORLD_HALF_SIZE / 2);
}

function getBox() {
  let geometry = new THREE.BoxGeometry(20, 20, 20);
  let material = new THREE.MeshBasicMaterial({
    wireframe: false,
    color: 0xffffff,
  });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}

function getBridge() {
  let geometry = new THREE.BoxGeometry(200, 200, 80);
  let material = new THREE.MeshBasicMaterial({
    wireframe: false,
    color: 0xffffff,
  });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}

function getReflector() {
  const geometry = new THREE.PlaneGeometry(
    WORLD_HALF_SIZE * 80,
    WORLD_HALF_SIZE * 20,
    50,
    50
  );

  const reflector = new THREE.Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x333333,
  });
  //reflector.position.z = WORLD_HALF_SIZE / 2;
  //reflector.scale.y = 2;
  //reflector.position.y = WORLD_HALF_SIZE + FLOOR_POSITION;
  scene.add(reflector);
  return reflector;
}

function getPlane() {
  const geometry = new THREE.PlaneGeometry(WORLD_HALF_SIZE, WORLD_HALF_SIZE);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

function getPoints(vertices) {
  // geometry
  const geometry = new THREE.BufferGeometry();

  // attributes
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // material
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    //vertexColor: true,
    size: 3,
    depthTest: false,
    // blending: THREE.AdditiveBlending,
    // map: texture,
    // transparent: true,
  });

  const points = new THREE.Points(geometry, material);
  console.log("added");
  scene.add(points);

  return points;
}

function getLight() {
  // There is no shadow support.
  // Only MeshStandardMaterial and MeshPhysicalMaterial are supported.
  const w = 30;
  const h = 30;
  const intensity = 10;
  const light = new THREE.RectAreaLight(0xffffff, intensity, w, h);
  light.position.set(0, WORLD_HALF_SIZE * 2, 0);
  light.lookAt(0, 0, 0);

  return light;
}

///// three.js /////

let container, stats;

let scene, camera, renderer;
let time = 0;
let frame = 0;
let controls;

function initTHREE() {
  // scene
  scene = new THREE.Scene();
  scene.add(grpSpace);

  // camera (fov, ratio, near, far)
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.5,
    5000
  );
  camera.position.z = 300;
  //camera.position.y = 80;
  //camera.position.x = 200;

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#000000");
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // container
  container = document.getElementById("container-three");
  container.appendChild(renderer.domElement);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // gui
  // https://davidwalsh.name/dat-gui
  // gui = new dat.gui.GUI();
  // // .listen()

  // gui.add(params, "initVY", 0, 1).onChange(function (e) {
  //   for (let p of particles) {
  //     if (p.vel.y != 0) {
  //       p.vel.y = e;
  //     }
  //   }
  // });

  // stats
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  container.appendChild(stats.dom);

  setupTHREE();

  // let's draw!
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  time = performance.now();
  frame++;
  // cube.position.z = camera.position.z;
  updateTHREE(frame);

  renderer.render(scene, camera);
}

// event listeners
window.addEventListener("resize", onWindowResize, false);
window.addEventListener("click", onClick);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onClick(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  ifClicked = true;
}

function releaseMouse() {
  // put the position out of the renderer with an arbitrary value
  mouse.set(-10000, -10000);
}

/* global
Ladder
setupTHREE updateTHREE mirror
Gate
vex
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
