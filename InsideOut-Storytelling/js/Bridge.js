//bridge
let handrailsL = [];
let handrailsR = [];
let bridges = [];

function constructHandrail() {
  for (let i = 0; i < 10; i++) {
    let handrail = new Bridge()
      .setPosition(-300, -460, WORLD_HALF_SIZE + i * 200)
      .setScale(1, 1, 1)
      .setInterval(10-i);
    handrail.ishandrail = true;
    handrailsL.push(handrail);
  }
  for (let i = 0; i < 10; i++) {
    let handrail = new Bridge()
      .setPosition(300, -460, WORLD_HALF_SIZE + i * 200)
      .setScale(1, 1, 1)
      .setInterval(10-i);
    handrail.ishandrail = true;
    handrailsR.push(handrail);
    console.log(handrail)
  }
}

function constructBridge() {
  for (let i = 0; i < 10; i++) {
    let bridge = new Bridge()
      .setPosition(0, -320, WORLD_HALF_SIZE + i * 200)
      .setScale(19, 0.1, 3)
      .setInterval(10-i);
      // .mesh.material.color.set(0xffffff);
    bridge.mesh.material.color.set(0xffffff);
    bridge.isbridge = true;
    bridges.push(bridge);
    console.log(bridge)
  }
}

function bridgeMove(frame) {
  for (let i = 0; i < bridges.length; i++) {
    //bridges[i].rotate();
  }
}

function getBridge() {
  let geometry = new THREE.BoxGeometry(30, 300, 30);
  let material = new THREE.MeshStandardMaterial({
    color: 0xFAEAB1,
    wireframe: false,
    // emissive: 0x666666,
  });
  // material.emissive = ambiLight.color;
  let mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // mesh.layers.enable(1);
  scene.add(mesh);

  // console.log("bloom scene")

  return mesh;
}

class Bridge {
  constructor() {
    this.pos = createVector();
    this.startPos = createVector();
    this.vel = createVector(0, 0, 0);
    this.acc = createVector();

    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;

    this.whetherSpring = false;
    this.whetherDisappear = false;
    this.startIsDone = false;
    this.endIsDone = false;

    this.isbridge = false;
    this.ishandrail = false;

    this.startT = 0;
    this.startF = 1;
    this.endF = 1;
    this.startFrameRecorded = false;
    this.endFrameRecorded = false;

    this.mesh = getBridge();
  }

  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    this.startPos = createVector(x, y, z);
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    return this;
  }

  setScale(w, h = w, d = w) {
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.mesh.scale.set(w, h, d);
    return this;
  }

  setInterval(i) {

    this.startT = i * 20;
    return this;
  }

  disappear(frame) {
    if (this.whetherDisappear) {
      if (this.pos.y <= this.startPos.y) {
        this.endIsDone = true;
        this.mesh.visible = false;
        // console.log("disappear");
        this.whetherDisappear = false;
      }
      if(!this.endIsDone){
      if (frame >= this.startT + this.endF) {
      this.pos.y -= 2;
    }
}
    }
  


  }

  ifDisappear(frame) {
    if (!this.endFrameRecorded) {
      if (this.whetherDisappear) {
        console.log("trigger")
        this.endF = frame;
        this.endFrameRecorded = true;
      }
    }
  }

  spring(frame) {
    if (this.whetherSpring) {
      if (this.ishandrail) {
        if (this.pos.y >= -200) {
          this.startIsDone = true;
          this.whetherSpring = false;
        }
      } else if (this.isbridge) {
        if (this.pos.y >= -300) {
          this.startIsDone = true;
          this.whetherSpring = false;
        }
      }
    }

    if (!this.startIsDone) {
      if (frame >= this.startT + this.startF) {
        // console.log(this.startT + this.startF);
        if(this.ishandrail){
          this.pos.y += 5;
        } else if(this.isbridge){
          this.pos.y +=.5;
        }
        
      }
    }
  }

  ifSpring(frame) {
    if (!this.startFrameRecorded) {
      // console.log("!");
      if (this.whetherSpring) {
        this.startF = frame;
        this.startFrameRecorded = true;
      }
    }
  }
  update() {
    this.pos.add(this.vel);
    // console.log(this.mesh.position)
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
}

/* global

container stats gui
scene amera renderer
time frame
getEmissive
OBJLoader
ambiLight
grpLadder
getLadder
WORLD_HALF_SIZE
WORLD_SIZE
getGlowBox
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
