class Character {
  constructor() {
    this.mesh = new THREE.Group();

    this.body = new THREE.Mesh(
      new THREE.BoxGeometry(2, 3, 1),
      new THREE.MeshBasicMaterial({ color: 0xff00ff })
    );
    this.body.position.set(0, 1.5, 0);
    this.mesh.add(this.body);

    this.head = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    this.head.position.set(0, 4, 0);
    this.mesh.add(this.head);

    this.leftArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2, 0.5),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    this.leftArm.position.set(1.25, 0.75, 0);
    this.leftArm.rotation.z = Math.PI / 4;
    this.body.add(this.leftArm);

    this.rightArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2, 0.5),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    this.rightArm.position.set(-1.25, 0.75, 0);
    this.rightArm.rotation.z = -Math.PI / 4;
    this.body.add(this.rightArm);

    this.leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2, 0.5),
      new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    this.leftLeg.position.set(0.5, -2.2, 0);
    this.body.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 2, 0.5),
      new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    this.rightLeg.position.set(-0.5, -2.2, 0);
    this.body.add(this.rightLeg);

    this.leftEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.leftEye.position.set(0.5, 0, 0.75);
    this.head.add(this.leftEye);

    this.leftEyeLens = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    this.leftEyeLens.position.set(0.1, 0, 0.1);
    this.leftEye.add(this.leftEyeLens);

    this.rightEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.rightEye.position.set(-0.5, 0, 0.75);
    this.head.add(this.rightEye);

    this.rightEyeLens = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    this.rightEyeLens.position.set(-0.1, 0, 0.1);
    this.rightEye.add(this.rightEyeLens);

    this.nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.2, 0.6, 32),
      new THREE.MeshBasicMaterial({ color: 0xffa500 })
    );
    this.nose.position.set(0, 0, 1);
    this.head.add(this.nose);

    this.mouth = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.2, 0.2),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    this.mouth.position.set(0, -0.5, 0.85);
    this.head.add(this.mouth);

    const earsGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 16);
    const earsMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    const earsMesh = new THREE.Mesh(earsGeometry, earsMaterial);
    earsMesh.position.set(0, 0, 0);
    earsMesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    this.head.add(earsMesh);

    this.hairGeometry = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    this.hairGeometry.position.set(0, 0.2, 0);
    this.hairGeometry.scale.set(0.95, 0.95, 0.95);
    this.head.add(this.hairGeometry);
  }
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const character = new Character();

const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Animate character's legs
  character.leftLeg.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;
  character.rightLeg.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI) * 0.5;

  // Animate character's arms
  character.leftArm.rotation.x = Math.sin(Date.now() * 0.01 + Math.PI) * 0.5;
  character.rightArm.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;

  // Animate character's head
  character.head.rotation.y = Math.sin(Date.now() * 0.01) * 0.2;

  renderer.render(scene, camera);
}

scene.add(character.mesh);

renderer.render(scene, camera);
animate();
