/*
 * @Author       : Justin.zm 草根之明
 * @Date         : 2022-04-03 13:36:26
 * @LastEditTime : 2022-04-03 15:36:34
 * @FilePath     : /exercise_threejs/exercises/js/05material.js
 * @Email        : 3907721@qq.com
 * @Description  : 
 */
let scene, camera, pointLight, cube, renderer
let cameraControl

// 人物类
class Creeper{
  constructor(){
    // 创建头、身体、脚 几何体
    const headGeo = new THREE.BoxGeometry(4,4,4);
    const bodyGeo = new THREE.BoxGeometry(4,8,2);
    const footGeo = new THREE.BoxGeometry(2,3,2);

    // 苦力怕脸部贴图
    const headMap = new THREE.TextureLoader().load(
      './imgs/creeper_face.png'
    )
    // 苦力怕皮肤贴图
    const skinMap = new THREE.TextureLoader().load(
      './imgs/creeper.png'
    )

    // 身体与脚的材质设定
    const skinMat = new THREE.MeshStandardMaterial({
      roughness: 0.3, // 粗糙度
      metalness: 0.8, // 金属感
      transparent: true, // 透明与否
      opacity: 0.9, // 透明度
      side: THREE.DoubleSide, // 双面材质
      map: skinMap // 皮肤贴图
    });

    // 准备头部与脸的材质
    const headMaterials = [];
    for(let i = 0; i < 6; i++) {
      let map;
      if(i === 4){
        map = headMap;
      }else{
        map = skinMap;
      }
      headMaterials.push(new THREE.MeshStandardMaterial({ map: map }));
    }

    // 镜面高光的光泽表面的材质 设为绿色
    // const creeperMat = new THREE.MeshPhongMaterial({color: 0x00ff00});
    
    // 头 建立网络物体
    this.head = new THREE.Mesh(headGeo, headMaterials);
    this.head.position.set(0,6,0);

    // 身体
    this.body = new THREE.Mesh(bodyGeo, skinMat);
    this.body.position.set(0,0,0);

    // 四只脚
    this.foot1 = new THREE.Mesh(footGeo, skinMat);
    this.foot1.position.set(-1,-5.5,2);
    this.foot2 = this.foot1.clone();  // 剩下三只脚都复制第一只的 Mesh
    this.foot2.position.set(-1,-5.5,-2);
    this.foot3 = this.foot1.clone();
    this.foot3.position.set(1,-5.5,2);
    this.foot4 = this.foot1.clone();
    this.foot4.position.set(1,-5.5,-2);

    // 将四只脚组合为一个group
    this.feet = new THREE.Group();
    this.feet.add(this.foot1);
    this.feet.add(this.foot2);
    this.feet.add(this.foot3);
    this.feet.add(this.foot4);

    // 将头、身体、脚组合为一个group
    this.creeper = new THREE.Group();
    this.creeper.add(this.head);
    this.creeper.add(this.body);
    this.creeper.add(this.feet);
  }
}

// 生成苦力怕并加到场景
function createCreeper(){
  const creeperObj = new Creeper();
  scene.add(creeperObj.creeper);
}

function init(){
  // 01 建立场景
  scene = new THREE.Scene();

  // 02 建立相机 透视投影相机（PerspectiveCamera）
  // 视角（fov, field of view）：又称为视野、视场，指的是我们能从画面上看到的视野范围，一般在游戏中会设定在60 ~ 90 度。
  // 画面宽高比（aspect）：渲染结果的画面比例，一般都是使用window.innerWidth / window.innerHeight。
  // 近面距离（near）：从距离相机多近的地方开始渲染，一般推荐使用0.1。
  // 远面距离（far）：相机能看得多远，一般推荐使用1000，可视需求调整，设置过大会影响效能。
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  );
  camera.position.set(0,30,30);  // 相机位置
  camera.lookAt(scene.position);  // 相机焦点

  // 03 建立光源
  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-10,40,30);
  scene.add(pointLight);

  // 04 建立物体
  // 生成苦力怕并加到场景
  createCreeper();

  // 05 建立地板
  const planeGeometry = new THREE.PlaneGeometry(60,60); // 生成平面几何体的类。
  const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // 一种非光泽表面的材质，没有镜面高光
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;  // 使平面与y轴垂直，并让正面朝上
  plane.position.set(0,-7,0);
  scene.add(plane);

  // 06 三轴座标
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // 07 建立渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);  // 场景大小
  renderer.setClearColor(0xeeeeee, 1.0);  // 预设背景颜色
  renderer.shadowMap.enable = true;   // 阴影效果

  // 08 建立 OrbitControls
  cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControl.enableDamping = true; // 启用阻尼效果
  cameraControl.dampingFactor = 0.25; // 阻尼系数
  cameraControl.autoRotate = true;    // 启用自动旋转

  // 将渲染器的DOM绑到网页上
  document.body.appendChild(renderer.domElement);
}

// 渲染场景
function render(){
  cameraControl.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// 监听屏幕宽高变化来做简单 RWD 设定
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init();
render();

