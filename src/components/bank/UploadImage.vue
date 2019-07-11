<template>
  <div class="upload-image-container">
    <input @change="uploadFile" type="file" class="upload-input-file" accept="image/*" ref="file" />
    <img class="upload-image-view" :src="url" alt="" />
  </div>
</template>
<script>
import { errMessage } from '@/assets/js/utils'
export default {
  props: {
    defaultUrl: {
      type: String,
      default: './images/default_bank.jpg'
    },
    // 默认5m
    maxSize: {
      type: Number,
      default: 5 << 10 << 10
    },
    // 校验图片,传入参数为img,返回false认为校验失败
    requireImage: {
      type: Function,
      default: null
    },
    param: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      src: null,
      uploadData: null
    }
  },
  computed: {
    url () {
      return this.src || this.defaultUrl
    }
  },
  methods: {
    uploadFile (e) {
      console.log(e)
      debugger
      let files = e.target.files
      if (files.length === 0) return
      let file = files[0]
      let size = file.size
      if (size > this.maxSize) {
        errMessage('选择文件过大')
        return
      }

      // 校验图片
      let fr = new FileReader()
      fr.onloadend = (e) => {
        let result = e.target.result
        let img = document.createElement('img')
        img.src = result

        img.onload = () => {
          if (typeof this.requireImage === 'function') {
            if (this.requireImage(img) === false) return
          }

          let width = img.width
          let height = img.height

          let formData = new FormData()
          formData.append('width', width)
          formData.append('height', height)
          formData.append('name', file.name)
          if (this.param !== null) {
            let param = this.param
            for (const key in param) {
              if (param.hasOwnProperty(key)) {
                const value = param[key];
                formData.append(key, value)
              }
            }
          }

          formData.append('file', file) // 最后添加文件

          this.$http.postUrl('upload', formData).then(rst => {
            if (rst.isok) {
              this.uploadData = rst.data
              this.src = rst.data.url
              this.$emit('change', rst.data)
            }
          })
        }

        img.onerror = () => {
          errMessage('图片加载失败')
        }
      }
      fr.readAsDataURL(file)
      // let imageSize =
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-image-container {
  width: 100%;
  height: 100%;
  position: relative;
  .upload-image-view {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .upload-input-file {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
