//gate
let gate,
  gateVec = [],
  gates = [];
let pointCloud,
  particles = [];


function constructGate() {
  for (let i = 0; i < WORLD_HALF_SIZE * 2 + 55; i++) {
    for (let a = 0; a < (WORLD_HALF_SIZE * 5) / 2; a += 15) {
      gateVec.push(
        a - WORLD_HALF_SIZE / 2 - 20,
        i - WORLD_HALF_SIZE / 2 - 75,
        WORLD_HALF_SIZE / 2
      );
    }
  }

  for (let i = 0; i < gateVec.length / 3; i++) {
    gates.push(
      new Gate(
        gateVec[i * 3],
        gateVec[i * 3 + 1],
        gateVec[i * 3 + 2]
      ).setPosition(gateVec[i * 3], gateVec[i * 3 + 1], gateVec[i * 3 + 2])
    );
  }
}

class Gate {
  constructor(gateVec, gateVec2, gateVec3) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.xi = 0;
    this.yi = 0;
    this.zi = 0;
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.gate = getPoints([gateVec, gateVec2, gateVec3]);
    this.zMax = -10;
    this.ifFloat = false;
    this.finishFloat = false;
    this.ifDisappear = false;
    this.finishDisappear = false;
  }

  //initiate
  setPosition(x, y, z) {
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
    this.xi = x;
    this.yi = y;
    this.zi = z;
    return this;
  }

  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }

  setScale(w, h = w, d = w) {
    // or
    //h = (h === undefined) ? w : h;
    //d = (d === undefined) ? w : d;
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  whetherFloat() {
    if (ifHandMove) {
      console.log("move!");
      if (
        this.pos.x > handArea.xMin &&
        this.pos.x < handArea.xMax &&
        this.pos.y > handArea.yMin &&
        this.pos.y < handArea.yMax
      ) {
        console.log("handmove");
        this.ifFloat = true;
      } else {
        this.ifFloat = false;
      }
    }
  }
  float() {
    if (this.ifFloat && this.z < -WORLD_HALF_SIZE / 2) {
      if (this.finishFloat != true) {
        this.pos.z -= 1;
        this.gate.position.z = this.pos.z;
        console.log(this.pos.z);
      }
    }
  }
}

/* global
Ladder
setupTHREE updateTHREE mirror
ParticleLad
vex
constructGate
ifHandMove
getPoints
WORLD_HALF_SIZE
handArea
handCenter
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
