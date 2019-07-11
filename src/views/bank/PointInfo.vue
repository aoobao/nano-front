<template>
  <MaskDialog height="600px" :value="value" @input="(e)=>{this.$emit('input',e)}">
    <div class="context">

      <div class="body">
        <mt-navbar class="page-part" :value="selected">
          <mt-tab-item id="tab1" @click.native.prevent="selected = 'tab1'">主体信息</mt-tab-item>
          <mt-tab-item id="tab2" @click.native.prevent="selected = 'tab2'">上传图片</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="tab1">
            <p class="text">信息</p>
            <mt-field label="点位名称" :value="name"></mt-field>
            <div class="map-container">
              <map-select :longitude="longitude" :latitude="latitude" :imageSrc="imageSrc" @click="changePosition"></map-select>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab2">
            <mt-radio title="图片类型" v-model="imageType" :options="[{label:'6方向图片',value:'1'}, {label:'360°全景图',value:'2'}]">
            </mt-radio>
            <upload-image6 v-show="imageType === '1'" />
            <UploadImage v-show="imageType === '2'" />
          </mt-tab-container-item>
        </mt-tab-container>

      </div>
      <!--

        <div class="map-container">
        <map-select :longitude="longitude" :latitude="latitude" :imageSrc="imageSrc" @click="changePosition" />
      </div> -->
      <div class="footer">
        <mt-button type="primary" style="margin-right:10px;" @click="submit">确定</mt-button>
        <mt-button type="default" style="margin-right:10px;" @click="cancel">取消</mt-button>
      </div>
    </div>

  </MaskDialog>
</template>
<script>
import MapSelect from '@/components/map/MapSelect'
import MaskDialog from '@/components/bank/MaskDialog'
import UploadImage from './UploadImage'
import UploadImage6 from './UploadImage6'
export default {
  components: { MapSelect, MaskDialog, UploadImage, UploadImage6 },
  props: {
    value: Boolean,
    point: Object,
    imageSrc: {
      type: String,
      default: './images/default_bank.jpg'
    }
  },
  data () {
    return {
      data: {},
      selected: 'tab2',
      imageType: '2'
    }
  },
  computed: {
    name () {
      let name = this.data.name
      if (!name) {
        name = '点位' + new Date().getTime()
      }
      return name
    },
    longitude () {
      return this.data.longitude
    },
    latitude () {
      return this.data.latitude
    }
  },
  methods: {
    changePosition (e) {
      let lnglat = e.lnglat
      let longitude = lnglat.getLng()
      let latitude = lnglat.getLat()
      this.data = {
        ...this.data,
        longitude,
        latitude
      }
    },
    cancel () {
      this.$emit('input', false)
    },
    submit () {
      if (!this.data.name) {
        this.data.name = this.name
      }
      this.$emit('change', { ...this.data })
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.data = {
          ...this.point
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.context {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .body {
    width: 90%;
    height: 80%;
    margin: 20px auto 0;
    flex-shrink: 0;
  }
  .map-container {
    width: 100%;
    height: 350px;
    // background-color: red;
  }
  .footer {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
