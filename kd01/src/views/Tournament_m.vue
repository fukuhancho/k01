<template>
  <el-table 
    ref="singleTableRef" 
    :data="tableData" 
    highlight-current-row 
    style="width: 100%" 
    @current-change="handleCurrentChange" 
    >
    <el-table-column type="index" width="50" />
    <el-table-column prop="tournament_id" label="大会コード" width="180" />
    <el-table-column prop="tournament_nm" label="大会名称" width="180" />
    <el-table-column prop="dateofevent" label="開催日" width="180" />
    <el-table-column prop="venue_nm" label="会場" width="180" />
    <el-table-column prop="number_coat" label="コート数"   />
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


  <el-dialog v-model="dialogFormVisible" title="大会情報追加" draggable>
    <el-form :model="form">
      <el-form-item label="大会コード：" :label-width="formLabelWidth">
        <el-input v-model="form.tournament_id"  placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="大会名称：" :label-width="formLabelWidth">
        <el-input v-model="form.tournament_nm" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="開催日：" :label-width="formLabelWidth">
        <el-date-picker v-model="form.dateofevent" type="date" placeholder="Pick a day"
              format="YYYY/MM/DD" value-format="YYYY/MM/DD" />
      </el-form-item>
      <el-form-item label="会場名：" :label-width="formLabelWidth">
        <el-select v-model="form.venue_id" placeholder="Please select" >
          <el-option
            v-for="item in selData"
            :key="item.venue_id"
            :label="item.venue_nm"
            :value="item.venue_id"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="コート数：" :label-width="formLabelWidth">
        <el-input v-model="form.number_coat" placeholder="Please input" clearable />
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
  tournament_id: '',
  tournament_nm: '',
  dateofevent: '',
  venue_nm: '',
  number_coat: 2,
})

interface Recdata {
    tournament_id: string
    tournament_nm: string
    dateofevent : string
    venue_nm : string
    number_coat : number
}

interface Recdata2 {
    venue_id: string
    venue_nm: string
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
      selData:[] as Recdata2[],
      dialogFormVisible :false,
      form:{
        tournament_id: '',
        tournament_nm: '',
        dateofevent : '',
        venue_nm : '',
        number_coat : 2,
      },
      formLabelWidth : '140px',
    }
  },
  mounted() {
    axios.get("http://192.168.101.21:1880/get-tournament")
    .then((response) => {
        response.data["data"].forEach((element: Recdata) => {
            this.tableData.push(element);
        });

        response.data["data2"].forEach((element: Recdata2) => {
            this.selData.push(element);
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
        axios.post("http://192.168.101.21:1880/add-tournament",{
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
        axios.get("http://192.168.101.21:1880/get-tournament")
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
        axios.post("http://192.168.101.21:1880/del-tournament",{
          tournament_id: currentRow.value.tournament_id
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
