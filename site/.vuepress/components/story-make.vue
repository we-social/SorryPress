<template>
  <div>
    <div class="img-box" ref="imgBox">
      <slot></slot>
    </div>
    <el-form class="form" :model="form">
      <el-form-item v-for="(item, i) in form.inputs" :key="i">
        <el-input :placeholder="meta.sentences[i]" v-model="form.inputs[i]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" :loading="making" @click="make">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Meta from '@story/meta.json'
import req, { serverBase } from '@utils/req'

// fixme: element components import
export default {
  props: {
    name: String
  },
  data () {
    const meta = Meta[this.name]
    return {
      making: false,
      meta,
      form: {
        inputs: meta.sentences.map(() => '')
      }
    }
  },
  methods: {
    make () {
      // todo 表单验证
      if (this.making) return
      this.making = true
      req({
        method: 'POST',
        url: '/api/make',
        params: {
          story: this.name,
          textList: this.form.inputs
        }
      })
      .then(res => {
        const src = `${serverBase}/output/${res.outputFileName}`
        this.$refs.imgBox.querySelector('img').src = src
        this.$message.success('已生成')
        this.making = false
      })
      .catch(err => {
        this.$message.error(err.message)
        this.making = false
      })
    }
  }
}
</script>

<style scoped>
.img-box img {
  width: 200px; /* fixme */
  height: 123px;
}
.form {
  margin-top: 20px;
  max-width: 320px;
}
</style>
