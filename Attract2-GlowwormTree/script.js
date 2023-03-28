let root;
let a, b;
let f;
let branches = [];
let leaves = [];
let tm = 0;
let colorChange;
let oriC = [];
let glowworms = [];
let bR = 3;
let bG = 5;
let bB = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);
    let a = createVector(width / 2, height);
    let b = createVector(width / 2, height - 150);
    for (let i = 0; i < 335; i++) {
        glowworms.push(new Glowworm(createVector(random(100, width - 100), height + 20)));
    }
    let root = new Branch(a, b);
    branches[0] = root;
    oriC.push(branches[0].r);
}

function draw() {
    // background(map(mouseX, 0, width, 6, 255), map(mouseX, 0, width, 40, 246), map(mouseX, 0, width, 61, 255));
    background(2, 30, 45);

    for (let i = branches.length - 1; i >= 0; i--) {
        if (branches[i].len > 50) {
            if (!branches[i].finished) {
                // console.log(!branches[i].finished);
                branches.push(branches[i].branchR(radians(random(15, 35))));
                oriC.push(branches[i].r);
                branches.push(branches[i].branchL(radians(random(15, 35))));
                // console.log(branches[i].r);
                oriC.push(branches[i].r);
                // console.log(oriC);
            }
            branches[i].finished = true;
            // oriC.push(branches[i].r);
        }
    }
  console.log(branches);

    let f = createVector(0, 0);
    let g = createVector(0, 0);
    if (mouseIsPressed) {
        tm++;
        console.log(tm);
        // if (mouseX < width / 2) {
        //     f.lerp(createVector(0, 0), createVector(tm * 0.0005, random(0, 0.01)), 0.2);
        // } else {
        //     f.lerp(createVector(0, 0), createVector(-tm * 0.0005, random(0, 0.01)), 0.2);
        // }
        if (mouseX > width / 2) {
            f.add(createVector(-mouseX, -mouseY).mult(0.3));
        } else {
            f.add(createVector(mouseX, -mouseY).mult(0.3));
        }

        // f.lerp(f, createVector(0, 0), 0.2);

        for (var i = 0; i < oriC.length; i++) {
            oriC[i] = lerp(oriC[i], 205, 0.1);
            console.log(branches[i].r);
        }

    } else {

        for (var i = 0; i < oriC.length; i++) {
            oriC[i] = lerp(oriC[i], 85, 0.1);
            console.log(branches[i].r);
        }

    }


    for (var i = 0; i < branches.length; i++) {
        // let a = createVector(0.1 * i, 0);
        branches[i].applyWind(f);
        branches[i].update();
        if (mouseIsPressed) {
            branches[i].jitter();
        }
        branches[i].display(oriC[i]);

        // branches[i].display(oriC[random(oriC.length - 1)]);
        // leaves[i].display();
    }


    for (let i = 0; i < glowworms.length; i++) {
        // glowworms[i].applyForce(f);

        glowworms[i].checkBoundaries();

        glowworms[i].attractedTo(createVector(width / 2 + random(-3000, 3000), height / 2 + 200 * random(-5, 8)));
        glowworms[i].attractedTo(createVector(width / 2 + random(-13, 20), height / 2 - 200 * random(-1, 1)));
        glowworms[i].slowDown();
        glowworms[i].applyWind(f);
        glowworms[i].update();
        glowworms[i].display();

    }
}

// for the linter
/* global
THREE p5 Glowworm Branch Leaf Particle Rect Elip Attractor Mover GLTFLoader rotation scale ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
