HomeView.vue

<template>
  <el-row >
    <el-col :span="3">
      <el-button @click="mvBranch_m">支部マスター</el-button>
    </el-col>
    <el-col :span="3">
      <el-button @click="mvVenue_m">会場マスター</el-button>
    </el-col>
    <el-col :span="3">
      <el-button @click="mvTournament_m">大会マスター</el-button>
    </el-col>
    <el-col :span="3">
      <el-button @click="mvCategory_m">カテゴリーマスター</el-button>
    </el-col>
    <el-col :span="4">
      <el-button @click="mvGameclass_m">試合種別マスター</el-button>
    </el-col>
    <el-col :span="4">
      <el-button @click="mvPlayer_m">選手マスター</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="3">
      <el-button>【試合記録】</el-button>
    </el-col>
  </el-row>

</template>

<script >
export default{
  methods: {
    mvBranch_m: function() {
      this.$router.push('/Branch_m')
    },
    mvVenue_m: function() {
      this.$router.push('/Venue_m')
    },
    mvTournament_m: function() {
      this.$router.push('/Tournament_m')
    },
    mvCategory_m: function() {
      this.$router.push('/Category_m')
    },
    mvGameclass_m: function() {
      this.$router.push('/Gameclass_m')
    },
    mvPlayer_m: function() {
      this.$router.push('/Player_m')
    },
  }
}
</script>

<style >
.el-row{
  margin-bottom: 20px;
}
</style>
