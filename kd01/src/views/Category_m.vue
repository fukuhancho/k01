<template>
  <el-table 
    ref="singleTableRef" 
    :data="tableData" 
    highlight-current-row 
    style="width: 100%" 
    @current-change="handleCurrentChange" 
    >
    <el-table-column type="index" width="50" />
    <el-table-column prop="category_id" label="カテゴリーコード" width="180" />
    <el-table-column prop="category_nm" label="カテゴリー名" width="180" />
    <el-table-column prop="filter_age" label="フィルタ（年齢）" width="180" />
    <el-table-column prop="filter_phigicalindex" label="フィルタ（体力指数）"   />
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


  <el-dialog v-model="dialogFormVisible" title="カテゴリー追加">
    <el-form :model="form">
      <el-form-item label="カテゴリーコード：" :label-width="formLabelWidth">
        <el-input v-model="form.category_id"  placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="カテゴリー名：" :label-width="formLabelWidth">
        <el-input v-model="form.category_nm" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="フィルタ（年齢）：" :label-width="formLabelWidth">
        <el-input v-model="form.filter_age" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="フィルタ（体力指数）：" :label-width="formLabelWidth">
        <el-input v-model="form.filter_phigicalindex" placeholder="Please input" clearable />
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
  category_id: '',
  category_nm: '',
  filter_age: 0,
  filter_phigicalindex: 0,
})

interface Recdata {
    category_id: string
    category_nm: string
    filter_age : number
    filter_phigicalindex : number
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
        category_id: '',
        category_nm: '',
        filter_age: 0,
        filter_phigicalindex: 0,
      },
      formLabelWidth : '140px',
    }
  },
  mounted() {
    axios.get("http://192.168.101.21:1880/get-category")
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
        axios.post("http://192.168.101.21:1880/add-category",{
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
        axios.get("http://192.168.101.21:1880/get-category")
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
        axios.post("http://192.168.101.21:1880/del-category",{
          category_id: currentRow.value.category_id
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
