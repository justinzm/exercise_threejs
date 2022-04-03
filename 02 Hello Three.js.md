![image-20220403111707263](http://img.9lake.com/uPic/image-20220403111707263.png)

```js
  let scene, camera, pointLight, cube, renderer  

  function init(){
    // 01 建立场景
    scene = new THREE.Scene();

    // 02 建立相机 透视投影相机（PerspectiveCamera）
    // 视角（fov, field of view）：又称为视野、视场，指的是我们能从画面上看到的视野范围，一般在游戏中会设定在60 ~ 90 度。
    // 画面宽高比（aspect）：渲染结果的画面比例，一般都是使用window.innerWidth / window.innerHeight。
    // 近面距离（near）：从距离相机多近的地方开始渲染，一般推荐使用0.1。
    // 远面距离（far）：相机能看得多远，一般推荐使用1000，可视需求调整，设置过大会影响效能。
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(10,10,10);  // 相机位置
    camera.lookAt(scene.position);  // 相机焦点

    // 03 建立光源
    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10,10,-10);
    scene.add(pointLight);

    // 04 建立物体
    const geometry = new THREE.BoxGeometry(1,1,1);  // 建立几何体
    const material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    }); // 材质
    cube = new THREE.Mesh(geometry, material);  // 建立网络物体
    cube.position.set(0,0,0);
    scene.add(cube);

    // 05 建立渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);  // 场景大小
    renderer.setClearColor(0xeeeeee, 1.0);  // 预设背景颜色
    renderer.shadowMap.enable = true;   // 阴影效果

    // 将渲染器的DOM绑到网页上
    document.body.appendChild(renderer.domElement);
  }
  
  // 创建动画
  function animate(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  // 渲染场景
  function render(){
    renderer.render(scene, camera); //执行渲染操作
    animate();	//执行动画
    requestAnimationFrame(render);	//请求再次执行渲染函数render
  }

  // 监听屏幕宽高变化来做简单 RWD 设定
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
  
  init();
  render();
```

