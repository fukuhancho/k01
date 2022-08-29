<template>
  <el-table 
    ref="singleTableRef" 
    :data="tableData" 
    highlight-current-row 
    style="width: 100%" 
    @current-change="handleCurrentChange" 
    >
    <el-table-column type="index" width="50" />
    <el-table-column prop="branch_id" label="支部コード" width="180" />
    <el-table-column prop="branch_nm" label="支部名" width="180" />
    <el-table-column prop="branch_nm2" label="支部名（カナ）"   />
  </el-table>
 

 <el-button type="default" @click="dialogFormVisible = true" >
    <el-icon style="vertical-align: middle">
      <Plus />
    </el-icon>
    <span style="vartical-align: middle">追加</span>
  </el-button>
  <el-button type="default" @click="onDelete()">
    <el-icon style="vertical-align: middle">
      <Delete />
    </el-icon>
    <span style="vartical-align: middle">削除</span>
  </el-button>
 <el-button type="default" @click="onSerch()">
    <el-icon style="vertical-align: middle" >
      <Search />
    </el-icon>
    <span style="vartical-align: middle">検索</span>
  </el-button>


  <el-dialog v-model="dialogFormVisible" title="支部追加">
    <el-form :model="form">
      <el-form-item label="支部コード" :label-width="formLabelWidth">
        <el-input v-model="form.branch_id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="支部名" :label-width="formLabelWidth">
        <el-input v-model="form.branch_nm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="支部名（カナ）" :label-width="formLabelWidth">
        <el-input v-model="form.branch_nm2" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; onConfirm()" >登録</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script  lang="ts"  >
import axios from 'axios'
import { reactive, ref } from 'vue'

const form = reactive({
  branch_id: '',
  branch_nm: '',
  branch_nm2: '',
})

interface Recdata {
    branch_id: string
    branch_nm: string
    branch_nm2: string
}

const currentRow = ref()

export default {
  data() {
    return {
      tableData:[],
      dialogFormVisible :false,
      form:{
        branch_id: '',
        branch_nm: '',
        branch_nm2: '',
      },
      formLabelWidth : '140px',
    }
  },
  mounted() {
    axios.get("http://192.168.101.21:1880/get-branch")
    .then((response) => {
        response.data["data"].forEach((element: Recdata) => {
            this.tableData.push(element);
        });
    } )
    .catch((e) => {
        alert(e);
    })
  },

  methods: {
      handleCurrentChange (val: Recdata | undefined)  {
        currentRow.value = val;
      },
      onConfirm(){
        axios.post("http://192.168.101.21:1880/add-branch",{
          form: this.form
        })
        .then((response) => {
          this.onSerch();
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      onSerch: function() {
        this.tableData = [];
        axios.get("http://192.168.101.21:1880/get-branch")
          .then((response) => {
            response.data["data"].forEach((element: Recdata) => {
              this.tableData.push(element);
            });
          } )
          .catch((e) => {
            alert(e);
          })
      },

      onDelete: function() {        
        axios.post("http://192.168.101.21:1880/del-branch",{
          branch_id: currentRow.value.branch_id
        })
        .then((response) => {
          this.onSerch();
        })
        .catch(function(error) {
          console.log(error);
        });
      },
  }

}
</script>
