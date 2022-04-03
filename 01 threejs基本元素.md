### 基本元素

- 场景（Scene）：供其他元素设置的空间。
- 相机（Camera）：在场景中建立观察点，并确定观察方向、角度。
- 物体（Objects）：在场景中添加被观察的物体。
- 光源（Light）：在场景中用来照亮物体的光。
- 渲染器（Renderer）：将所要呈现的场景渲染到画面上。

#### 右手座标定位

![左手/右手坐標系](http://img.9lake.com/uPic/1476704135-7279.jpg)

在Three.js 中采用「右手座标定位」，也就是当你伸出右手来看时，大拇指代表X 轴、食指为Y 轴、中指代表Z 轴，可以试着比出一个如图右两两互相垂直的手势，而这三只手指的指向即为座标轴正向的方向。

#### 场景

场景就是一个容器，用来保存与追踪所有要呈现到画面上的内容，在后面的代码中会常看到 scene.add(...)，意思是将元素加到场景中。

#### 相机

相机可以当作是一个观察点，决定了我们从哪个位置、方向、角度来观察场景中的画面，在 Three.js 中主要有两种比较常用的相机。

![這裏寫圖片描述](http://img.9lake.com/uPic/1476704136-6168.jpg)

##### 透视投影相机（PerspectiveCamera）

在透视投影相机中，越远的物体会有比较小的尺寸，更接近真实世界的效果，所以一般在三维场景中，我们会使用这种相机来呈现，让使用者更有临场感。

透视投影相机视景体是个四角锥，它透过视角（fov）、画面长宽比（aspect）、远近平面距离决定观察结果。

![PerspectiveCameraIntro](http://img.9lake.com/uPic/20107572tDgY4WpG3z.jpg)



##### 正交投影相机（OrthographicCamera）

透过比较可以发现，正交投影相机中的物体不论远近，看起来的尺寸都一样，这样的相机一般被用在二维场景中。
如下图，正交投影相机的视景体是长方体，由于此种相机渲染出的物体大小皆相同，所以并不需要长宽比与视角，而是纪录远近平面距离、视景体的上下左右边界。

![OrthographicCameraIntro](http://img.9lake.com/uPic/20107572FzebUauVIc.jpg)



#### 物体（Object）模型种类

物体很直观，就是在场景中被观察的物体，就像是上面范例中的一大堆立方体，以下来看几个在Three.js 中常见的种类。

##### 网格模型（Mesh）

![mesh](http://img.9lake.com/uPic/20107572TbrTvCtxq4.png)

在3D 世界的模型中，常以三角形网格为一个单位来组成一个物体，当三角形数量增加，一个物体的表面就越平滑，如上图。

##### 粒子模型（Points）

![points](http://img.9lake.com/uPic/201075725EchwpExRk.png)

粒子模型可以轻易地创建很多细小的物体，可以模拟雪花、雨滴、星空、烟、火焰、爆炸等效果。

#### 物体（Object）组成

上面介绍了物体常见的模型种类，而每一种物体都各自具备两种基本要素：几何体与材质。

##### 几何体（Geometry）

几何体简单来说就是物体的形状，通过储存模型点之间关系来达到描述物体形状的目的，从一般的平面、球体、正方体到各种扭曲体、多面体应有尽有。

![Geometry](http://img.9lake.com/uPic/20107572TSjeNFaprl.png)

##### 材质（Material）

![Material](http://img.9lake.com/uPic/20107572zeHwD9wMfF.png)

材质简单来说就是物体的外观、皮肤，记录了物体表面除了几何体以外所有的资讯，像是颜色（color）、纹理（texture）、透明度（opacity）等等。而其中有些材质具有一些对光源产生反应的属性像是发光度（shininess）、镜面反射程度（specular）等等，会决定物体会像金属或像塑胶。

#### 光源（Light）

为了要让画面更逼近真实，光源是不可或缺的要素，透过光源与物体材质的调整能够让画面更丰富。
不过在Three.js 中有一些材质并不需要考虑光源即可被渲染在画面上，例如`MeshBasicMaterial`、`MeshNormalMaterial`，能够与光源互动的材质一般会用 `MeshLambertMaterial` 或`MeshPhongMaterial`。
在Three.js 中提供了包括环境光（AmbientLight）、点光源（PointLight）、 聚光灯（SpotLight）、方向光（DirectionalLight）、半球光（HemisphereLight）等多种光源。

#### 渲染器（Renderer）

有了以上各种基本元素后，最后会透过渲染器使用电脑显卡来渲染场景到浏览器上。
在Three.js 中有不只一种渲染器，但一般而言都是使用 `WebGLRenderer` 这个渲染器，它能支援较多功能，像是材质、阴影等等，在后面的程式码中会看到常透过渲染器来设定预设背景颜色、场景尺寸、阴影效果等。



