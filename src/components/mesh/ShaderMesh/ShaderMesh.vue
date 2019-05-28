<script>
// 自定义shader demo
import register from '@/components/mixins/register'
import { vertexShader, fragmentShader } from './glsl.js'
export default {
  mixins: [register],
  methods: {
    init () {
      // console.log(vertexShader, fragmentShader)
      var segments = 200;

      var geometry = new THREE.BufferGeometry();
      // var material = new THREE.LineBasicMaterial({
      //   vertexColors: THREE.VertexColors
      // });
      var positions = [];
      var colors = [];

      var r = 800;

      for (var i = 0; i < segments; i++) {

        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;

        // positions

        positions.push(x, y, z);

        // colors

        colors.push((x / r) + 0.5);
        colors.push((y / r) + 0.5);
        colors.push((z / r) + 0.5);
        colors.push(Math.random())
      }

      geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

      geometry.computeBoundingSphere();

      // three的shader不会对color第4个参数做处理,所以需要自己写shader处理颜色的透明值
      var material = new THREE.RawShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.$mesh = new THREE.Line(geometry, material);

      this.$addObject(this.$mesh)

    }
  }
}
</script>
