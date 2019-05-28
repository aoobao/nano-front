<script>
// 粒子特效 demo
import register from '@/components/mixins/register'
import { vertexShader, fragmentShader } from './glsl'
const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
export default {
  mixins: [register],
  data () {
    return {
      count: 0
    }
  },
  methods: {
    init () {
      // var geometry = new THREE.PlaneGeometry(5, 20, 32);
      // var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
      // this.$mesh = new THREE.Mesh(geometry, material);
      // this.$addObject(this.$mesh)
      var numParticles = AMOUNTX * AMOUNTY;
      var positions = new Float32Array(numParticles * 3);
      var scales = new Float32Array(numParticles);
      var i = 0, j = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
          positions[i + 1] = 0; // y
          positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
          scales[j] = 1;
          i += 3;
          j++;
        }
      }
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1));

      var material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      this.$mesh = new THREE.Points(geometry, material);
      this.$addObject(this.$mesh)

    },
    render () {
      let particles = this.$mesh
      var positions = particles.geometry.attributes.position.array;
      var scales = particles.geometry.attributes.scale.array;
      var i = 0, j = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 50) +
            (Math.sin((iy + this.count) * 0.5) * 50);
          scales[j] = (Math.sin((ix + this.count) * 0.5) + 1) * 8 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 8;
          i += 3;
          j++;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      this.count += 0.1;
    }
  }
}
</script>
