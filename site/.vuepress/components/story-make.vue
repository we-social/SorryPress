<template>
  <div>
    <slot></slot>
    <el-form class="form" ref="form" :model="form">
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
      // todo
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
