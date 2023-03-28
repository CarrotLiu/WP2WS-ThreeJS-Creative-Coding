let sceneIndex = 1;
let ground, wall;

///CAMERA///
function cameraSet() {

      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 2500;
  
}
function cameraMove() {
  switch (sceneIndex) {
    case 0: // starting scene
      break;
    case 1: //bridge scene
      // camera.position.z = 100;
      break;
    case 2: //corridor scene1: light cube
      if (camera.position.z >= -500) {
        const delta = clock.getDelta();
        controls.update(delta);
        camera.position.z -= 1;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.rotation.x = -PI;
        camera.rotation.y = -PI;
      } else if (camera.position.z < -500 && camera.rotation.x > -2 * PI) {
        camera.position.z -= 1;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        camera.rotation.x -= (2 * PI) / 360;
        // camera.rotation.y -= 2 * PI / 360;
      } else if (camera.position.z > -1000 && camera.rotation.z > -PI) {
        camera.position.z -= 0.5;
        camera.position.x = 0;
        camera.position.y = 0;
        // camera.rotation.z -= PI / 360;
      }
      break;

    case 3: // corridor scene2: triangle walls
      break;
    case 4: // ending scene
      break;
  }
}

///FOG///
let fogParams = {
  near: 1,
  far: 2500,
  color: 0x000000,
};
function sceneFog() {
  scene.fog = new THREE.Fog(fogParams.color, fogParams.near, fogParams.far);
}

///LIGHT///
let light, ambiLight, hemiLight, directLight;
const lightParams = {
  orthographic: false,
  fade: false,
  far: 1000,
  mode: "practical",
  lightX: -5,
  lightY: 10,
  lightZ: -0.426,
  margin: 100,
  lightFar: 5000,
  lightNear: 1,
};

let targetBox;

function sceneLight() {
  //ambilight
  ambiLight = new THREE.AmbientLight(0x333333);
  ambiLight.color.r = 0.5;
  ambiLight.color.g = 0.48;
  ambiLight.color.b = 0.9;
  scene.add(ambiLight);

  //hemilight
  hemiLight = new THREE.HemisphereLight(0x000000, 0x330000, 1); //skyColor, groundColor, intensity
  hemiLight.color.r = 0;
  hemiLight.color.g = 0.64;
  hemiLight.color.b = 0;
  hemiLight.groundColor.r = 0;
  hemiLight.groundColor.g = 0.99;
  hemiLight.groundColor.b = 0;
  scene.add(hemiLight);

  //directlight target
  targetBox = getBox();
  targetBox.material.color.set(0xff00ff);
  targetBox.position.set(0, -200, 200 * 5);
  targetBox.visible = false;
  scene.add(targetBox);

  //directlight
  directLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directLight.position
    .set(lightParams.lightX, lightParams.lightY, lightParams.lightZ)
    .normalize()
    .multiplyScalar(-200);
  directLight.position.set(-2000, 500, 1000);
  directLight.shadow.mapSize.width = 512; // default
  directLight.shadow.mapSize.height = 512; // default
  // directLight.target = bridges[1];
  directLight.castShadow = true;
  directLight.target = targetBox;
  scene.add(directLight);
  // add helper for the light frustum and shadow
  directLight.shadow.camera.near = 0.5;
  directLight.shadow.camera.far = 200;
  // const helper = new THREE.CameraHelper(directLight.shadow.camera);
  // scene.add(helper);

  // gui
  let guiLight = gui.addFolder("light");
  guiLight.add(directLight, "intensity", 0.1, 1).step(0.05);
  guiLight.add(directLight.position, "x", -2000, 2000).step(0.1);
  guiLight.add(directLight.position, "y", 0, 1000).step(0.1);
  guiLight.add(directLight.position, "z", -10, 2000).step(0.1);
  guiLight.add(directLight.color, "r", 0.0, 1).step(0.05);
  guiLight.add(directLight.color, "g", 0.0, 1).step(0.05);
  guiLight.add(directLight.color, "b", 0.0, 1).step(0.05);

  let guiambiLightSky = gui.addFolder("AmbientLight");
  guiambiLightSky.add(ambiLight.color, "r", 0.0, 1.0);
  guiambiLightSky.add(ambiLight.color, "g", 0.0, 1.0);
  guiambiLightSky.add(ambiLight.color, "b", 0.0, 1.0);

  let guihemiLightSky = gui.addFolder("HemiLight-Sky");
  guihemiLightSky.add(hemiLight.color, "r", 0.0, 1.0);
  guihemiLightSky.add(hemiLight.color, "g", 0.0, 1.0);
  guihemiLightSky.add(hemiLight.color, "b", 0.0, 1.0);

  let guihemiLightGround = gui.addFolder("HemiLight-Ground");
  guihemiLightGround.add(hemiLight.groundColor, "r", 0.0, 1.0);
  guihemiLightGround.add(hemiLight.groundColor, "g", 0.0, 1.0);
  guihemiLightGround.add(hemiLight.groundColor, "b", 0.0, 1.0);
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

function lightMove() {
  switch (sceneIndex) {
    case 0: // starting scene
      break;
    case 1: //bridge scene
      break;
    case 2: //corridor scene1: light cube
      break;
    case 3: // corridor scene2: triangle walls
      break;
    case 4: // ending scene
      break;
  }
}

function setGround() {
  // ground = getPlane();
  ground = getGround();
  ground.rotation.x = PI / 2;
  ground.position.set(0, -300, 0);
wall = getGround();
  // wall = getReflector();
  wall.position.set(0, 0, 0);
}

function getGround() {
  let geometry = new THREE.PlaneGeometry(20000, 20000);
  let material = new THREE.MeshPhongMaterial({
    wireframe: false,
    color: 0x333333,
    side: THREE.DoubleSide,
  });

  let mesh = new THREE.Mesh(geometry, material);
  // mesh.castShadow = true;

  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

/* global
Ladder
scene
sceneIndex
clock
controls
grpSpace
ambiLight
light
getLight
hemiLight
gui
setupTHREE updateTHREE mirror
ParticleLad
vex
getPlane
getGate
ifHandMove
getPoints
WORLD_HALF_SIZE
handArea
handCenter
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
