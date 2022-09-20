<template>
  <el-table 
    ref="singleTableRef" 
    :data="tableData" 
    highlight-current-row 
    style="width: 100%" 
    @current-change="handleCurrentChange" 
    >
    <el-table-column type="index" width="50" />
    <el-table-column prop="gameclass_id" label="試合種別コード" width="180" />
    <el-table-column prop="gameclass_nm" label="試合種別名称"  />
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


  <el-dialog v-model="dialogFormVisible" title="試合種別追加">
    <el-form :model="form">
      <el-form-item label="試合種別コード：" :label-width="formLabelWidth">
        <el-input v-model="form.gameclass_id"  placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="試合種別名称：" :label-width="formLabelWidth">
        <el-input v-model="form.gameclass_nm" placeholder="Please input" clearable />
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
import { ElMessage } from 'element-plus'

const form = reactive({
  gameclass_id: '',
  gameclass_nm: '',
})

interface Recdata {
    gameclass_id: string
    gameclass_nm: string
}

const currentRow = ref()

const sucmsg = () => {
  ElMessage({
    message: '正常に処理しました。',
    type: 'success',
  })
}


export default {
  data() {
    return {
      tableData:[] as Recdata[],
      dialogFormVisible :false,
      form:{
        gameclass_id: '',
        gameclass_nm: '',
      },
      formLabelWidth : '140px',
    }
  },
  mounted() {
    axios.get("http://192.168.101.21:1880/get-gameclass")
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
        axios.post("http://192.168.101.21:1880/add-gameclass",{
          form: this.form
        })
        .then((response) => {
          sucmsg();
          this.onSerch();
        })
        .catch(function(error) {
          console.log(error);
        });
      },

      onSerch: function()  {
        this.tableData = [];
        axios.get("http://192.168.101.21:1880/get-gameclass")
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
        axios.post("http://192.168.101.21:1880/del-gameclass",{
          branch_id: currentRow.value.gameclass_id
        })
        .then((response) => {
          sucmsg();
          this.onSerch();
        })
        .catch(function(error) {
          console.log(error);
        });
      },

  }

}
</script>
