<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="branch_id" label="支部コード" width="180" />
    <el-table-column prop="branch_nm" label="支部名" width="180" />
    <el-table-column prop="branch_nm2" label="支部名（カナ）"   />
  </el-table>
</template>

<script >
import axios from 'axios'

export default {
  data() {
    return {
      tableData : [
        {
        branch_id: '123',
        branch_nm: '日進',
        branch_nm2:'ニッシン'
        },
        {
        branch_id: '456',
        branch_nm: '豊明',
        branch_nm2:'トヨアケ'
        },
      ]
    }
  },
  mounted() {
    axios.get("localhost:1880/get-branch")
    .then(response=>(this.tableData = response.data))
  }
}
</script>
