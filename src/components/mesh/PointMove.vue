<script>
// 粒子移动 demo
import register from '@/components/mixins/register'
import OBJLoader from '@/assets/js/three-plugin/loaders/OBJLoader'

let clock = new THREE.Clock();

export default {
  mixins: [register],
  methods: {
    init () {
      let loader = new OBJLoader()
      loader.load('./models/female/female02.obj', obj => {
        // this.$mesh = obj
        this.create(obj)
      })
    },
    create (obj) {
      // this.$addObject(this.$mesh)
      let positions = combineBuffer(obj, 'position')
      this._objs = []
      // parent
      this.$mesh = new THREE.Object3D()
      this.$addObject(this.$mesh)

      for (let i = 0; i < 10; i++) {
        let mesh = this.createMesh(positions, 5, rp(), 0, rp(), 0xffdd44)
        this.$mesh.add(mesh)

        let data = {
          mesh,
          direction: -1,  // -1表示往下移动粒子,1表示往上移动粒子
          speed: 50, // 移动速度
          reachCount: 0,  // 当粒子移动状态中,记录已经到达指定位置的粒子数量
          // delay: ~~(200 + 200 * Math.random()),
          start: ~~(100 + 200 * Math.random())  // 延迟多少时间开启运动粒子
        }

        this._objs.push(data)
      }
    },
    createMesh (positions, scale, x, y, z, color) {
      let geometry = new THREE.BufferGeometry()
      geometry.addAttribute('position', positions.clone());
      geometry.addAttribute('initialPosition', positions.clone());

      // gl.DYNAMIC_DRAW  如果不写会已gl.STATIC_DRAW形式渲染,影响性能
      geometry.attributes.position.setDynamic(true)

      let mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 8, color: color }))

      mesh.scale.x = mesh.scale.y = mesh.scale.z = scale

      mesh.position.x = x
      mesh.position.y = y
      mesh.position.z = z

      return mesh
    },
    render () {
      if (!this.$mesh) return
      let delta = 10 * clock.getDelta()
      if (delta > 2) delta = 2
      this.$mesh.rotation.y += -0.02 * delta

      // 粒子运动
      this._objs.forEach(data => {
        let positions = data.mesh.geometry.attributes.position
        // initialPosition 为粒子的初始状态位置,用来做还原使用
        let initialPositions = data.mesh.geometry.attributes.initialPosition

        let count = positions.count

        if (data.start > 0) {
          data.start -= 1
          return
        }

        // // 设置粒子运动方向
        // if (data.direction >= 0) {
        //   data.direction = -1
        // } else {
        //   data.direction = 1
        // }

        data.reachCount = 0

        if (data.direction < 0) {
          // console.log('向下移动')
          for (let i = 0; i < count; i++) {
            let px = positions.getX(i)
            let py = positions.getY(i)
            let pz = positions.getZ(i)
            if (py > 0) { // 粒子还没有到位置

              let y = py + 3.0 * (0.25 - Math.random()) * data.speed * delta
              if (y < 0) y = 0
              positions.setXYZ(
                i,
                px + 1.5 * (0.5 - Math.random()) * data.speed * delta,
                // Math.random() 大概率约为0.5为平衡,y轴粒子随机整体向下移动,
                y,
                pz + 1.5 * (0.5 - Math.random()) * data.speed * delta
              )
            } else {
              data.reachCount += 1
            }
          }
        } else {
          // 向上移动
          // console.log('向上移动')
          for (let i = 0; i < count; i++) {
            let px = positions.getX(i)
            let py = positions.getY(i)
            let pz = positions.getZ(i)

            let ix = initialPositions.getX(i)
            let iy = initialPositions.getY(i)
            let iz = initialPositions.getZ(i)

            // 计算粒子距离初始距离位置
            // let dx = Math.abs(px - ix)
            // let dy = Math.abs(py - iy)
            // let dz = Math.abs(pz - iz)
            // let d = dx + dy + dz

            if (px != ix || py != iy || pz != iz) {
              positions.setXYZ(
                i,
                getFixDirection(px, ix, data.speed * delta),
                getFixDirection(py, iy, data.speed * delta),
                getFixDirection(pz, iz, data.speed * delta)
              )
            } else {
              data.reachCount += 1
            }
          }
        }

        // 所有的粒子都已经到达动画目的地
        if (data.reachCount === count) {
          data.start = 100 + ~~(Math.random() * 300)
          data.direction = data.direction === 1 ? -1 : 1
          data.reachCount = 0
        }

        positions.needsUpdate = true;

      });


    }
  }
}

function getFixDirection (nowValue, sourceValue, speed) {
  if (Math.abs(nowValue - sourceValue) < 1) {
    return sourceValue
  }
  let minDirection = speed * Math.random()
  if (nowValue < sourceValue) {
    return Math.min(sourceValue, nowValue + minDirection)
  } else {
    return Math.max(sourceValue, nowValue - minDirection)
  }
}

function rp () {
  return ~~(Math.random() * 5000) - ~~(Math.random() * 5000)
  // return 0
}

// 返回mesh对象所有的顶点 BufferAttribute
function combineBuffer (model, bufferName) {

  let count = 0;
  // console.log(model, bufferName)

  model.traverse(function (child) {
    if (child.isMesh) {

      var buffer = child.geometry.attributes[bufferName];
      // console.log(buffer)
      // debugger
      count += buffer.array.length;

    }

  });

  var combined = new Float32Array(count);

  let offset = 0;

  model.traverse(function (child) {

    if (child.isMesh) {

      var buffer = child.geometry.attributes[bufferName];

      combined.set(buffer.array, offset);
      offset += buffer.array.length;

    }

  });

  return new THREE.BufferAttribute(combined, 3);

}
</script>
