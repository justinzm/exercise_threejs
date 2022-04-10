/*
 * @Author       : Justin.zm 草根之明
 * @Date         : 2022-04-03 13:36:26
 * @LastEditTime : 2022-04-04 09:52:31
 * @FilePath     : /exercise_threejs/examples/js/07animation.js
 * @Email        : 3907721@qq.com
 * @Description  : 
 */
let scene, camera, cube, renderer;
let cameraControl, creeperObj;
let sphereLightMesh, pointLight;

function init() {
    // 01 建立场景
    scene = new THREE.Scene();

    // 02 建立相机 透视投影相机（PerspectiveCamera）
    // 视角（fov, field of view）：又称为视野、视场，指的是我们能从画面上看到的视野范围，一般在游戏中会设定在60 ~ 90 度。
    // 画面宽高比（aspect）：渲染结果的画面比例，一般都是使用window.innerWidth / window.innerHeight。
    // 近面距离（near）：从距离相机多近的地方开始渲染，一般推荐使用0.1。
    // 远面距离（far）：相机能看得多远，一般推荐使用1000，可视需求调整，设置过大会影响效能。
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.6,
        100
    );
    camera.position.set(30, 30, 30);  // 相机位置
    camera.lookAt(scene.position);  // 相机焦点

    // 03 三轴座标
    // let axes = new THREE.AxesHelper(20);
    // scene.add(axes);

    // 04 建立渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);  // 场景大小
    // renderer.setClearColor(0xeeeeee, 1.0);  // 预设背景颜色
    renderer.shadowMap.enable = true;   // 阴影效果
    renderer.shadowMap.type = 2;        // THREE.PCFSoftShadowMap

    // 05 建立 OrbitControls
    cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControl.enableDamping = true; // 启用阻尼效果
    cameraControl.dampingFactor = 0.25; // 阻尼系数
    // cameraControl.autoRotate = true;    // 启用自动旋转

    // 06 建立地板
    const planeGeometry = new THREE.PlaneGeometry(60, 60); // 生成平面几何体的类。
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 一种非光泽表面的材质，没有镜面高光
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;  // 使平面与y轴垂直，并让正面朝上
    plane.position.set(0, -7, 0);
    plane.receiveShadow = true;   // 接收其他元素投影的效果
    scene.add(plane);

    // 07 建立物体
    var loader = new THREE.GLTFLoader();
    loader.load('./imgs/yanpeng.glb', function (gltf) {
        console.log('控制台查看加载gltf文件返回的对象结构', gltf);
        console.log('gltf对象场景属性', gltf.scene);
        console.log('gltf对象相机属性', gltf.cameras);
        scene.add(gltf.scene);
    }, undefined, function (e) {
        console.error(e);
    });

    // 08 建立光源
    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-10, 40, 30);
    scene.add(pointLight);

    // 将渲染器的DOM绑到网页上
    document.body.appendChild(renderer.domElement);
}

// 渲染场景
function render() {
    cameraControl.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// 监听屏幕宽高变化来做简单 RWD 设定
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

init();
render();

