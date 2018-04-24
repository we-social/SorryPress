<template>
  <div>
    <div ref="imgBox">
      <slot></slot>
    </div>
    <el-form class="form" :model="form">
      <el-form-item v-for="(item, i) in form.inputs">
        <el-input :placeholder="meta.sentences[i]" v-model="form.inputs[i]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" @click="make">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Meta from '@story/meta.json'
import req from '@utils/req'

export default {
  props: {
    name: String
  },
  data () {
    const meta = Meta[this.name]
    return {
      meta,
      form: {
        inputs: meta.sentences.map(() => '')
      }
    }
  },
  methods: {
    make () {
      // todo 表单验证
      req({
        method: 'POST',
        url: '/api/make',
        params: {
          story: this.name,
          textList: this.form.inputs
        }
      })
      .then(res => {
        const src = this.$withBase(`/output/${res.outputFileName}`)
        this.$refs.imgBox.querySelector('img')
          .setAttribute('src', src)
        this.$message.success('已生成')
      })
      .catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 20px;
  max-width: 320px;
}
</style>
