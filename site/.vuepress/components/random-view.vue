<template>
  <div>
    <div class="card" v-for="item in list">
      <el-card class="card" :body-style="{ padding: '0px' }">
        <img :src="item.src">
        <div style="padding: 8px; text-align: center">
          {{ item.displayName }}
        </div>
      </el-card>
    </div>
    <div class="bottom">
      <el-button size="large" type="primary" :loading="pulling" @click="pull">换一批</el-button>
    </div>
  </div>
</template>

<script>
import req, { serverBase } from '@utils/req'

export default {
  data () {
    return {
      pulling: false,
      list: [],
      count: 6
    }
  },
  created () {
    this.pull()
  },
  methods: {
    pull () {
      if (this.pulling) return
      this.pulling = true
      req({
        method: 'GET',
        url: `/api/random?count=${this.count}`
      })
      .then(res => {
        this.list = res.randomList.map(filename => {
          const src = `${serverBase}/output/${filename}` // fixme
          const hash = filename.split(/\-|\./)[1]
          const displayName = hash.slice(0, 3) + '...' + hash.slice(-4, -1)
          return { src, displayName }
        })
        return this.$nextTick()
      })
      .then(() => {
        this.$message.success('已拉取')
        this.pulling = false
      })
      .catch(err => {
        this.$message.error(err.message)
        this.pulling = false
      })
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  width: 200px;
  margin-top: .4em;
  margin-right: 1em;
}
.bottom {
  margin-top: 1.2em;
}
</style>
