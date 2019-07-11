<template>
  <div class="full-container">
    <mt-header fixed title="项目详情">
      <mt-button icon="back" slot="left" @click="goback"></mt-button>
    </mt-header>
    <div class="body">
      <p class="text">主体信息</p>
      <div class="main">
        <mt-field label="设备名称" placeholder="请输入设备名称" v-model="data.name"></mt-field>
        <mt-field label="设备坐标" :value="location" readonly disableClear>
          <mt-button size="small" @click="choosePosition()">修改</mt-button>
        </mt-field>
        <mt-field label="图片">
          <!-- <img class="main-image" :src="imageSrc"> -->
          <div class="main-image">
            <UploadImage />
          </div>
        </mt-field>
      </div>
      <div class="new">
        <p class="">点位信息</p>
        <mt-button type="primary" size="small" @click="addPoint()">新增点位</mt-button>
      </div>

      <div class="card" v-for="(point,index) in points" :key="index">
        <mt-field label="点位名称" :value="point.name" @input="changeName(point,$event)">
          <span class="mint-field-state is-error" @click="deletePoint(index)">
            <i class="mintui mintui-field-error"></i>
          </span>
        </mt-field>
        <mt-field label="点位坐标" readonly disableClear :value="pointLocation(point)">
          <mt-button size="small" @click="choosePoint(index)">修改</mt-button>
        </mt-field>
      </div>
      <mt-button type="primary" size="large" class="submit" @click="submit">确定</mt-button>
    </div>

    <DialogChoose v-model="show" :longitude="chooseX" :latitude="chooseY" @change="changePosition" />

    <PointInfo v-model="pointShow" :point="point" :imageSrc="data.imageSrc" @change="changePointInfo" />
  </div>
</template>

<script>
import DialogChoose from '@/components/map/DialogChoose'
import PointInfo from './PointInfo'
import UploadImage from '@/components/bank/UploadImage'
import { errMessage, confirm } from '@/assets/js/utils'
export default {
  components: { DialogChoose, PointInfo, UploadImage },
  props: {
    pid: [String, Number]
  },
  data () {

    return {
      data: {},
      show: false,
      pointShow: false,
      selectPoint: 0,
      chooseX: null,
      chooseY: null
    }
  },
  computed: {

    points () {
      let data = this.data || {}
      return data.points || []
    },
    point () {
      if (this.selectPoint >= 0) {
        return this.points[this.selectPoint] || {}
      } else {
        return {}
      }
    },
    imageSrc () {
      return this.data ? this.data.imageSrc : null
    },
    location () {
      if (this.data && this.data.longitude != null && this.data.latitude != null) {
        return `${this.data.longitude},${this.data.latitude}`
      } else {
        return '-'
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.pid == 0) {
        // 新增
        let data = {
          id: 0,
          name: null,
          imageSrc: null,
          longitude: null,
          latitude: null,
          points: []
        }
        this.data = data

      } else {
        // 抓取项目详情 todo
        this.getInfo()
      }
    },
    getInfo () {
      let data = {
        id: 1,
        name: '设备名称',
        imageSrc: './images/default_bank.jpg',
        longitude: null,
        latitude: null,
        points: [{
          id: 1,
          name: '部件名称',
          longitude: 0.1,
          latitude: 0.1
        }, {
          id: 2,
          name: '部件名称2',
          longitude: 0.3,
          latitude: 0.2
        }]
      }
      this.data = data
    },
    changeName (point, name) {
      point.name = name
    },
    goback () {
      this.$router.go(-1)
    },
    choosePosition () {
      this.chooseX = this.data.longitude
      this.chooseY = this.data.latitude
      this.show = true
    },
    changePosition (e) {
      this.data.longitude = this.chooseX = e.longitude
      this.data.latitude = this.chooseY = e.latitude
    },
    addPoint () {
      this.selectPoint = -1
      this.pointShow = true
    },
    choosePoint (index) {
      this.selectPoint = index
      this.pointShow = true
    },
    changePointInfo (data) {
      let points = this.data.points
      if (data.longitude == null || data.latitude == null) {
        errMessage('请选择坐标点')
        return
      }
      if (data.id) {
        let index = points.findIndex(t => t.id === data.id)
        if (index > -1) {
          points[index] = { ...data }
        } else {
          console.warn('point 未找到 err')
        }
      } else {
        points.push({ ...data, id: 0 })
      }

      this.data = {
        ...this.data,
        points
      }
      this.pointShow = false
    },
    pointLocation (point) {
      if (!point) return '-'
      if (point.longitude !== null && this.latitude !== null) {
        return `${detailPointNumber(point.longitude)},${detailPointNumber(point.latitude)}`
      } else {
        return '-'
      }
    },
    deletePoint (i) {
      let point = this.points[i]
      confirm(`确认删除${point.name}?`).then(() => {
        // console.log(action)
        let points = this.points
        points.splice(i, 1)
        this.data = {
          ...this.data,
          points
        }
      })
    },
    submit () {
      console.log(this.data)
    }
  }
}

function detailPointNumber (number) {
  return ~~(number * 1000)
}
</script>
<style lang="scss" scoped>
.body {
  margin-top: 40px;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  .text {
    margin-left: 10px;
  }
  .main {
    width: 95%;
    margin: 0 auto;
    border: 1px solid #888;
    border-radius: 4px;
    .main-image {
      width: 200px;
      height: 200px;
      margin: 20px 30px;
    }
  }
  .new {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
  }

  .card {
    width: 95%;
    margin: 0 auto 10px;
    border: 1px solid #888;
    border-radius: 4px;
  }

  .submit {
    width: 95%;
    margin: 30px auto;
  }
}
</style>

