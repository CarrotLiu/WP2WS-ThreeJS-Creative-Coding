const WORLD_SIZE = 300;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let ifClicked = false;
let geo1;
let verticesGeo = [],
  vertices = [];

let geo1Vex = [],
  geoVex = [];

let pointCloud;
let texture;

let geoIndex = 1;

let Mvectors = [];

let particles = [];
let data_loaded = false;

let params = {
  ground: 0.2,
  initVY: 0.3,
  size: 1,
  scale: 10,
  color: 0xcc9911,
};

function setupTHREE() {
  texture = new THREE.TextureLoader().load(
    "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/%5BCITYPNG.COM%5DHD%20Glowing%20Blue%20Turquoise%20Ball%20Effect%20Transparent%20PNG%20-%201278x1278.png?v=1666006838955"
  );

  // push particles based on the vectors!
  verticesGeo = getGeo1()[0];
  geo1Vex = getGeo1()[1];
}

function updateTHREE(frame) {
  raycaster.setFromCamera(mouse, camera);
  params.scale = random(0.7, 1.3);
  if (data_loaded) {
    for (let i = 0; i < particles.length; i++) {
      if (ifClicked) {
        //console.log(particles.length);
        //IDEA1 random Floating
        // particles[i].update();

        //IDEA2 falling sand
        particles[i].checkOntoGround();
        particles[i].fall(true);

        //IDEA3 morphing between geos
        // particles[i].mapPosition(true, i, Mvectors, geo1Vex);

        //IDEA4
      }
    }

    // console.log(particles.length);

    let positionArray = pointCloud.geometry.attributes.position.array;

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      let pcIndex = i * 3;
      positionArray[pcIndex + 0] = p.pos.x;
      positionArray[pcIndex + 1] = p.pos.y;
      positionArray[pcIndex + 2] = p.pos.z;
    }
    pointCloud.geometry.setDrawRange(0, particles.length);
    pointCloud.geometry.attributes.position.needsUpdate = true;
    // pointCloud.geometry.attributes.color.needsUpdate = true;
    // pointCloud.geometry.attributes.material.needsUpdate = true;
    params.number = particles.length;
  }
}

function getGeo1() {
  // let geometry = new THREE.SphereGeometry(50, 120, 60);
  // let geometry = new THREE.CylinderGeometry( 50, 100, 150, 200 );
  const geometry = new THREE.TorusKnotGeometry( 70, 30, 200, 100 );
  // console.log(geometry);
  let material = new THREE.MeshNormalMaterial({
    // wireframe: true,
  });
  let mesh = new THREE.Mesh(geometry, material);
  verticesGeo = geometry.attributes.position.array;
  for (let v = 0; v < verticesGeo.length; v += 3) {
    geo1Vex.push(
      new THREE.Vector3(verticesGeo[v], verticesGeo[v + 1], verticesGeo[v + 2])
    );
  }
  // scene.add(mesh);
  // processData(verticesGeo);
  return [verticesGeo, geo1Vex];
}

function getPoints(objects) {
  const vertices = [];
  for (let obj of objects) {
    // console.log(obj.pos.x);
    vertices.push(obj);
  }

  // geometry
  const geometry = new THREE.BufferGeometry();

  // attributes
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  // geometry.setAttribute(
  //   "color",
  //   new THREE.Color(params.color)
  // );

  // draw range
  const drawCount = objects.length; // draw the whole objects
  geometry.setDrawRange(0, drawCount);
  // material
  const material = new THREE.PointsMaterial({
    size: random(5, 6),
    vertexColor: true,
    color: params.color,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    map: texture,
    transparent: true,
  });

  // geometry.setAttribute(
  //   "material",
  //   material
  // );
  // material.color.setHSL( 1.0, 0.3, 0.7 );
  // Points
  const points = new THREE.Points(geometry, material);
  // console.log(points);
  // scene.add(points);
  return points;
}

///// Model Loading /////
let gltf;
let model, model1;

function setupGLTF() {
  const loader1 = new THREE.GLTFLoader();
  // console.log(loader);
  scene = new THREE.Scene();

  loader1.load(
    // "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/babyHead2.gltf?v=1665721744622", //baby
    "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/camel2.gltf?v=1666003997995", //camel
    // "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/penguin.gltf?v=1666018766354", //penguin
    // "https://cdn.glitch.global/172e62b7-4b58-4daf-88af-2fec1e2231b7/mouse.gltf?v=1666019548967", //mouse

    (gltfData) => {
      // called when the resource is loaded
      console.log("Model is loaded");

      gltf = gltfData;
      // console.log(gltf);

      model = gltf.scene.children[0];
      // model = gltf.scene.children[1]; //penguin
      // gltf.scene.scale.set(1000, 1000, 1000);

      // model.scale.set(0.1, 0.1, 0.1);

      model.position.center;
      // model.rotate.setZ = 90;

      // model1 = model.parent.children[2]; //baby
      model1 = model.children[0].children[0]; //camel

      // model1.rotateZ( 180);
      vertices = model1.geometry.attributes.position.array;

      for (let i = 0; i < vertices.length; i += 3) {
        Mvectors.push(
          new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2])
        );
      }

      processData(vertices);

      scene.add(pointCloud);
      data_loaded = true;
      // return Mvectors;
    },
    (xhr) => {
      // called while loading is progressing
      // console.log(vectors);
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      // called when loading has errors
      console.error("An error happened", error);
    }
  );
}

function processData(vertices) {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i] *= params.size;
  }
  pointCloud = getPoints(vertices);
  // pointCloud.geometry.rotateX(90); //rotation not updated for the vertices :(

  // console.log(pointCloud);
  // for (let i = 0; i < vertices.length; i += 12) { //baby
  for (let i = 0; i < vertices.length; i++) {
    //camel
    let p = new Particle();
    p.setPosition(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2])
      .setVelocity(0, 0, 0)
      .setScale(params.scale);
    particles.push(p);
  }
}

//// Particle Class ////
class Particle {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.geoIndex = 1;
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.frame = 0;
    this.ground = -150;
    this.isClicked = false;
    this.onGround = false;
    this.finMorph = false;
  }

  //initiate
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
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

  setGround(g) {
    this.ground = g;
  }

  //IDEA1 random floating
  update() {
    let m = map(sin(this.frame * random(0.03, 0.06)), -1, 1, 0.997, 1.003);
    this.pos.x *= m;
    this.pos.y *= m;
    this.pos.z *= m;
    this.frame += 1;
  }

  //IDEA2 falling movement
  fall(ifclick) {
    if (ifclick) {
      this.isClicked = true;
    }

    if (!this.onGround) {
      if (this.isClicked) {
        this.acc.y = random(-0.01, 0);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
      }
    } else {
      this.acc.y = 0;
      this.vel.y = 0;
      this.pos.add(this.vel);
      this.isClicked = false;
    }
  }

  checkOntoGround() {
    if (this.pos.y <= this.ground) {
      this.onGround = true;
      // console.log(this.onGround);
    }
  }

  //IDEA3 morphing between geos
  mapPosition(ifclick, i, Mvectors, geo1Vex) {
    if (ifclick && !this.finMorph) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }

    if (this.isClicked) {
      if (this.geoIndex == 1) {
        if (i > geo1Vex.length) {
          //map the index to the geo with less vertices
          let j = Math.floor(
            Math.map(i, geo1Vex.length, Mvectors.length, 0, geo1Vex.length)
          );
          this.pos.x = this.pos.lerp(this.pos.x, Mvectors[j].x, 0.05);
          this.pos.y = this.pos.lerp(this.pos.y, Mvectors[j].y, 0.05);
          this.pos.z = this.pos.lerp(this.pos.z, Mvectors[j].z, 0.05);

          // terminate when lerping is finished
          if (this.pos == Mvectors[j]) {
            this.finMorph = true;
            this.geoIndex *= -1;
          }
        } else {
          this.pos.x = this.pos.lerp(this.pos.x, Mvectors[i].x, 0.05);
          this.pos.y = this.pos.lerp(this.pos.y, Mvectors[i].y, 0.05);
          this.pos.z = this.pos.lerp(this.pos.z, Mvectors[i].z, 0.05);

          // terminate when lerping is finished
          if (this.pos == Mvectors[i]) {
            this.finMorph = true;
            this.geoIndex *= -1;
          }
        }
      } else {
        this.pos.x = this.pos.lerp(this.pos.x, geo1Vex[i].x, 0.05);
        this.pos.y = this.pos.lerp(this.pos.y, geo1Vex[i].y, 0.05);
        this.pos.z = this.pos.lerp(this.pos.z, geo1Vex[i].z, 0.05);

        // terminate when lerping is finished
        if (this.pos == geo1Vex[i]) {
          this.finMorph = true;
          this.geoIndex *= -1;
        }
      }
    }
  }

  //IDEA4 mouse attraction
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}

///// three.js /////

let container, stats, gui;

let scene, camera, renderer;
let time = 0;
let frame = 0;

function initTHREE() {
  // scene
  scene = new THREE.Scene();

  // camera (fov, ratio, near, far)
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.5,
    5000
  );
  // camera.position.z = 100;
  camera.position.z = 200;
  camera.position.y = 80;
  camera.position.x = 200;

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#000000");
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // container
  container = document.getElementById("container-three");
  container.appendChild(renderer.domElement);

  // controls
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  setupGLTF();

  // gui
  // https://davidwalsh.name/dat-gui
  gui = new dat.gui.GUI();
  // .listen()
  gui.add(params, "ground", -100, -10).onChange(function (e) {
    for (let p of particles) {
      p.setGround(e);
    }
  });
  gui.add(params, "initVY", 0, 1).onChange(function (e) {
    for (let p of particles) {
      if (p.vel.y != 0) {
        p.vel.y = e;
      }
    }
  });
  gui.add(params, "size", 0.9, 1.1).onChange(function (e) {
    for (let p of particles) {
      if (p.vel.y != 0) {
        p.pos.mult(e);
      }
    }
  });
  gui.add(params, "scale", 0.3, 2).onChange(function (e) {
    for (let p of particles) {
      p.setScale(e);
    }
  });
  // gui.addColor(params, "color").onChange(function (e) {
  //   pointCloud.color = e;
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
THREE p5 ml5 colorController Stats dat alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera ADD CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
