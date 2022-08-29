HomeView.vue

<template>
  <el-row>
    <el-col :span="24">
      <el-button @click="mvBranch_m">支部マスター</el-button>
      <el-button>会場マスター</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-button>試合記録</el-button>
    </el-col>
  </el-row>

</template>

<script >
export default{
  methods: {
    mvBranch_m: function() {
      this.$router.push('/Branch_m')
    }
  }
}
</script>

<style >
.el-row{
  margin-bottom: 20px;
}
</style>
