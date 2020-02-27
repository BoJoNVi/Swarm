//------------------Scene & Camera & Controls------------------
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
document.addEventListener('mousemove', onDocumentMouseMove, false);

//------------------Drawables------------------
let ring = new THREE.Mesh(new THREE.RingBufferGeometry(1, 20, 100), new THREE.MeshBasicMaterial( {color: 0x000000}));
scene.add(ring);

starGeo = new THREE.Geometry();
     for(let i=0;i<100000;i++) {
       star = new THREE.Vector3(
         Math.random() * 600 - 300,
         Math.random() * 600 - 300,
         Math.random() * 600 - 300
       );
       star.velocity = 0;
       star.acceleration = 1;
       starGeo.vertices.push(star);
     }
 
     let starMaterial = new THREE.PointsMaterial({
       color: 0xffffff,
       size: 0.7
     });
 
     stars = new THREE.Points(starGeo,starMaterial);
     scene.add(stars);

     window.addEventListener("resize", onWindowResize, false);

     //------------------Renderer------------------
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    let mousePos = { x: 0, y: 0 };
    let counter = true;
    


//------------------Functions------------------
function onDocumentMouseMove(mouse){
    console.log(mouse.x)
    mx = (event.clientX / window.innerWidth) * 14 - 7;
    my = - (event.clientY / window.innerHeight) * 8 + 4;  
    mousePos = {x:mx, y:my};
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
function animate() {
  starGeo.vertices.forEach(p => {
    p.velocity = p.acceleration
    p.y -= p.velocity;
    p.z = -40;

    ring.position.y = mousePos.y;
    ring.position.x = mousePos.x;
     
    if (p.y < -200) {
      p.y = 100;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


animate();