//World parameters
const WORLD_HALF_SIZE = 100;
const FLOOR_POSITION = 0;
let scene1Move = false;

// Setup Threejs
function setupTHREE() {
  sceneLight();
  sceneFog();
  getSpace();
  setGround();
  constructHandrail();
  constructBridge();

  constructLightcube();
}

function updateTHREE(frame) {
  cameraMove();
  corridorMove();
if (camera.position.z < 50) {
  sceneIndex = 2;
}
  switch (sceneIndex) {
    case 0: // starting scene
      break;
    case 1: //bridge scene
      for (let i = 0; i < handrailsL.length; i++) {
        handrailsL[i].whetherSpring = true;
        if (directLight.position.x == 0) {
          handrailsL[i].whetherDisappear = true;
        }
        handrailsL[i].ifSpring(frame);
        handrailsL[i].spring(frame);
        handrailsL[i].ifDisappear(frame);
        handrailsL[i].disappear(frame);
        handrailsL[i].update();
      }
      for (let i = 0; i < handrailsR.length; i++) {
        handrailsR[i].whetherSpring = true;
        if (directLight.position.x == 0) {
          // console.log("trigger")
          handrailsR[i].whetherDisappear = true;
        }
        handrailsR[i].ifSpring(frame);
        handrailsR[i].spring(frame);
        handrailsR[i].ifDisappear(frame);
        handrailsR[i].disappear(frame);
        handrailsR[i].update();
      }
      for (let i = 0; i < bridges.length; i++) {
        if (!handrailsR[i].mesh.visible) {
          bridges[i].whetherSpring = true;

          // console.log(bridges)
          bridges[i].ifSpring(frame);
          bridges[i].spring(frame);
          bridges[i].update();
          if (bridges[i].pos.y >= -300) {
            scene1Move = true;
          }
        }
      }
      // if (camera.position.z < 400) {
      //   const pos = wall.geometry.attributes.position;
      //   for (let i = 0; i < pos.array.length; i += 3) {
      //     const x = pos.array[i + 0];
      //     const y = pos.array[i + 1];
      //     const frqX = 1 + x * 3 + sin(frame * 0.008) * 10;
      //     const frqY = 1 + y * 3 + cos(frame * 0.01) * 10;
      //     let noiseVal = noise(frqX, frqY);
      //     noiseVal = map(noiseVal, 0, 1, -1, 1) * 20;
      //     pos.array[i + 2] = noiseVal; // z
      //   }
      //   wall.geometry.attributes.position.needsUpdate = true;
      // }

      break;
    case 2: //corridor scene1: light cube
      updateLightcube(frame);

      break;

    case 3: // corridor scene2: triangle walls
      break;
    case 4: // ending scene
      break;
  }
}

/* global
Ladder
setupTHREE updateTHREE mirror
Gate
renderer
camera
composer
controls
scene
sceneIndex
clock
cameraMove
corridorMove
sceneLight
directLight
getLight
getPlane
constructBridge
bridgeMove
sceneFog
setGround
handrailsL
handrailsR
constructHandrail
constructGate
getBridge
updateLightcube
getSpace
grpSpace
bridges
FlyControls
constructLightcube
vex
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
