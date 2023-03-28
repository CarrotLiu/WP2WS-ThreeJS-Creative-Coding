const grpSpace = new THREE.Group();
let Bottom, Top, Right, Left, Front, Back;
let spaceData = {
  widt: 1,
  dept: 1,
  heig: 1,
  color: 0xcc9911,
};


///CORRIDOR GRP///
function getSpace() {
  Bottom = getPlane();
  Top = getPlane();
  Right = getPlane();
  Left = getPlane();
  Front = getPlane();
  Back = getPlane();

  Top.rotation.x = PI / 2;
  Top.position.y = 3 * WORLD_HALF_SIZE;
  Top.position.z = -2 * WORLD_HALF_SIZE / 2;
  Top.scale.x = 2;

  Bottom.rotation.x = -PI / 2;
  Bottom.position.y = -3 * WORLD_HALF_SIZE ;
  Bottom.position.z = -2 * WORLD_HALF_SIZE / 2;
  Bottom.scale.x = 2;

  Left.rotation.y = PI / 2;
  Left.position.x = - 2 * WORLD_HALF_SIZE;
  Left.scale.y = 3;
  Left.position.z = -2 * WORLD_HALF_SIZE / 2;

  Right.rotation.y = -PI / 2;
  Right.position.x = 2 * WORLD_HALF_SIZE;
  Right.scale.y = 3;
  Right.position.z = -2 * WORLD_HALF_SIZE / 2;

  Back.position.z = -2 * WORLD_HALF_SIZE;
  Back.scale.y = 3;
  Back.scale.x = 2;
  Back.position.z = -2 * WORLD_HALF_SIZE;

  grpSpace.add(Top);
  grpSpace.add(Bottom);
  grpSpace.add(Left);
  grpSpace.add(Right);
  grpSpace.add(Back);
  grpSpace.position.set(0, FLOOR_POSITION + 10, 0)

}


///CORRIDOR ANIME///
function corridorMove() {
  if (sceneIndex == 2) {
    if (camera.position.z >= -500) {
      grpSpace.scale.z += .5;
      // grpSpace.scale.x +=.01;
      // grpSpace.scale.y += .01;
    } else if (camera.position.z > -1000 ) {//&& camera.rotation.z > -PI
      grpSpace.scale.x += 0.1;
      // console.log()
      grpSpace.children[3].rotation.z -= 2 * PI / 720 //rotate right plane
//       grpSpace.children[3].position.x +=1;
//       grpSpace.children[3].scale.y +=2;
      
//       grpSpace.children[2].position.x -=1;
//       grpSpace.children[2].scale.y +=2;
      
//       grpSpace.children[1].scale.x +=2;
      
//       grpSpace.children[0].position.y +=1;
//       grpSpace.children[0].scale.x +=2;
      
//       grpSpace.children[4].scale.x +=2;
    
    }
  }
}

// GUI
const folder = gui.addFolder("Space");

folder.add(spaceData, "widt", 0, 2).onChange(function (e) {
  grpSpace.scale.x = e;
});
folder.add(spaceData, "dept", 0, 2).onChange(function (e) {
  grpSpace.scale.z = e;
});
folder.add(spaceData, "heig", 0, 2).onChange(function (e) {
  grpSpace.scale.y = e;
});


class Corridor {
  constructor() {}
}

/* global
Ladder
sceneIndex
scene
getLight
gui
setupTHREE updateTHREE mirror
ParticleLad
vex
getPlane
getGate
ifHandMove
getPoints
WORLD_HALF_SIZE
FLOOR_POSITION
handArea
handCenter
THREE p5 ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
