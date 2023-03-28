let texture;
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

function getPlane() {
  const geometry = new THREE.PlaneGeometry(WORLD_HALF_SIZE * 2, WORLD_HALF_SIZE * 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
  // scene.add(mesh)
  return mesh;
}



function getPoints(vertices) {
  texture = new THREE.TextureLoader().load(
    "https://cdn.glitch.global/498d7fee-068c-4e8e-b28e-695ad1e1795b/particle_texture.jpg?v=1666643924141"
  );
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
    size: 5,
    depthTest: false,
    // blending: THREE.AdditiveBlending,
    // map: texture,
    // transparent: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return points;
}

function getGlowBox() {
  let geometry = new THREE.BoxGeometry(20, 50, 50);
  let material = new THREE.MeshBasicMaterial({
    color: 0x049ef4,
    wireframe: false,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.layers.enable(1); // ***
  scene.add(mesh);
  return mesh;
}

function getEmissive() {
  let geometry = new THREE.BoxGeometry(80, 200, 80);
  let material = new THREE.MeshStandardMaterial({
    color: 0x049ef4,
    wireframe: false,
    emissive: 0x666666,
  });
  material.emissive = ambiLight.color;
  let mesh = new THREE.Mesh(geometry, material);
  // mesh.layers.enable(1);
  scene.add(mesh);

  // console.log("bloom scene")

  return mesh;
}

function getOutline() {
  let geometry = new THREE.BoxGeometry(50, 20, 20);
  let material = new THREE.MeshPhongMaterial({
    color: 0x049ef4,
    wireframe: false
  });
  material.emissive = ambiLight.color;
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // console.log("bloom scene")

  return mesh;
}

function getGround(){
    let geometry = new THREE.BoxGeometry(20000, 1, 100000);
  let material = new THREE.MeshPhongMaterial({
    wireframe: false,
    color: 0x333333,
  });
  
  let mesh = new THREE.Mesh(geometry, material);
  // mesh.castShadow = true;
  mesh.receiveShadow = true;
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

/* global
Ladder
scene
setupTHREE updateTHREE mirror
ParticleLad
vex
getGate
ifHandMove
ambiLight
getPoints
WORLD_HALF_SIZE
handArea
handCenter
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
