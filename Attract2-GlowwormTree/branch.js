// let leaves;

class Branch {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
        this.newBegin = this.begin.copy();
        this.newEnd = this.end.copy();
        this.lpt = this.end.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.finished = false;
        this.Lscale = random(0.9, 1.5);
        this.r = 80 + random(-20, 20);
        this.g = 120 + random(-20, 20);
        this.b = 40 + random(-20, 20);
        this.lR = random(radians(-20), radians(20));
        // this.force = force;

        this.len = dist(this.begin.x, this.begin.y, this.end.x, this.end.y);

    }

    applyWind(f) {
        // console.log(f);
        let force = p5.Vector.div(f, this.mass);
        this.acc.add(force);


        // this.vel.x += this.len;
        this.acc.mult(0);
    }

    update() {
        this.vel.add(this.acc);
        this.newEnd.add(this.vel);
        this.lpt.add(this.vel);
    }

    display(r) {
        push();
        stroke(102, 65, 10);

        strokeWeight(map(dist(this.newBegin.x, this.newBegin.y, this.newEnd.x, this.newEnd.y), 20, 150, 0.5, 9));
        // this.newEnd.add(this.vel);
        // push();
        // translate(this.begin.x, this.begin.y);
        // rotate(radians(this.vel.x * 10));

        // this.end.x += lerp(this.end.x, this.vel.x * 0.05, 0.2);
        // this.end.y += lerp(this.end.y, this.vel.y * 0.03, 0.2);

        // pop();
        line(this.newBegin.x, this.newBegin.y, this.newEnd.x, this.newEnd.y);

        if (dist(this.begin.x, this.begin.y, this.end.x, this.end.y) < 80) {

            push();
            translate(this.lpt.x, this.lpt.y);
            scale(this.Lscale);
            rotate(this.lR);
            // if (radians(this.vel * 0.1) < 90) {
            //     rotate(radians(this.vel * 0.1));
            // }

            //draw leaf
            push();
            noStroke();
            fill(r, this.g, this.b, 230);

            // console.log();
            beginShape();
            vertex(0, 0);
            // vertex(3, 2);
            vertex(4, 5);
            vertex(5, 10);
            vertex(4, 13);
            vertex(0, 17);
            vertex(-4, 13);
            vertex(-5, 10);
            vertex(-4, 5);
            // vertex(-3, 2);
            vertex(0, 0);
            endShape(CLOSE);
            pop();

            //draw stem
            push();
            stroke("#3E432E");
            strokeWeight(0.5);
            line(0, 0, 0, 13);
            line(0, 3, -2, 5);
            line(0, 5, 3, 7);
            line(0, 7, -3, 11);
            pop();

            pop();
        }

        pop();

    }
    jitter() {
        this.lR += random(radians(-20), radians(20));
        // this.lpt.y += random(-1, 1);
    }

    branchR(angle) {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(angle - random(radians(1), radians(10)));
        dir.mult(0.75 + random(-0.1, 0.02));
        let newEnd = p5.Vector.add(this.end, dir);
        // console.log(dist(this.end.x, this.end.y, newEnd.x, newEnd.y));
        this.len = dist(this.end.x, this.end.y, newEnd.x, newEnd.y);
        let b = new Branch(this.end, newEnd);
        return b;
    }

    branchL(angle) {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-angle + random(radians(0), radians(10)));
        dir.mult(0.77 + random(-0.35, 0.06));



        let newEnd = p5.Vector.add(this.end, dir);
        this.len = dist(this.end.x, this.end.y, newEnd.x, newEnd.y);

        let b = new Branch(this.end, newEnd);

        return b;

    }
}

// for the linter
/* global
THREE Particle p5 Leaf Attractor Mover GLTFLoader rotation scale ml5 Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/