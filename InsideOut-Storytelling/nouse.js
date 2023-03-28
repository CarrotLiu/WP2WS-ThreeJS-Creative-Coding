// function getEmissive() {
//   let geometry = new THREE.BoxGeometry(50, 20, 20);
//   let material = new THREE.MeshStandardMaterial({
//     color: 0x049ef4,
//     wireframe: false,
//     emissive: 0x666666,
//   });
//   material.emissive = ambiLight.color;
//   let mesh = new THREE.Mesh(geometry, material);
//   mesh.layers.enable(1);
//   scene.add(mesh);
  
//   // console.log("bloom scene")

//   return mesh;
// }

function getCorridor() {
  const geometry = new THREE.BoxGeometry(WORLD_HALF_SIZE , WORLD_HALF_SIZE, 10);
  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,

  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}