<template>
  <div>
    <img :src="$withBase(`/story/${story}.gif`)">
    <el-input placeholder="Please input" v-model="input"></el-input>
    <el-button type="primary">生成</el-button>
  </div>
</template>

<script>
export default {
  props: {
    story: String
  }
}
</script>
