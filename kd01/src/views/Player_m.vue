<template>
  <el-select v-model="sel_branch" placeholder="Please select">
    <el-option
      v-for="item in selData"
      :key="item.branch_id"
      :label="item.branch_nm"
      :value="item.branch_id"
      />
  </el-select>
  <el-button type="default" @click="onSerch()">
    <el-icon style="vertical-align: middle" >
      <Search />
    </el-icon>
    <span style="vartical-align: middle">検索</span>
  </el-button>
  <el-table 
    ref="singleTableRef" 
    :data="tableData" 
    highlight-current-row 
    style="width: 100%" 
    @current-change="handleCurrentChange" 
    >
    <el-table-column type="index" width="50" />
    <el-table-column prop="player_id" label="塾生No" width="100" />
    <el-table-column prop="player_nm" label="氏名" width="300" />
    <el-table-column prop="sex" label="性別" width="80" />
    <el-table-column prop="birthday" label="生年月日" width="120" />
    <el-table-column prop="admissionday" label="入門日" width="120" />
    <el-table-column prop="xclass" label="級" width="80" />
    <el-table-column prop="height" label="身長" width="140" />
    <el-table-column prop="weight" label="体重"   />
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


  <el-dialog v-model="dialogFormVisible" title="選手追加">
    <el-form :model="form">
      <el-form-item label="選手ID：" :label-width="formLabelWidth">
        <el-input v-model="form.player_id"  placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="氏（漢字）：" :label-width="formLabelWidth">
        <el-input v-model="form.familyname" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="氏（カナ）：" :label-width="formLabelWidth">
        <el-input v-model="form.familyname2" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="名（漢字）：" :label-width="formLabelWidth">
        <el-input v-model="form.firstname" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="名（カナ）：" :label-width="formLabelWidth">
        <el-input v-model="form.firstname2" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="性別：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男性</el-radio>
          <el-radio label="2">女性</el-radio>
          <el-radio label="3">その他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生年月日：" :label-width="formLabelWidth">
        <el-input v-model="form.birthday" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="入門日：" :label-width="formLabelWidth">
        <el-input v-model="form.admissionday" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="級／段：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.xclass">
          <el-radio label="1級">1級</el-radio>
          <el-radio label="2級">2級</el-radio>
          <el-radio label="3級">3級</el-radio>
          <el-radio label="4級">4級</el-radio>
          <el-radio label="5級">5級</el-radio>
          <el-radio label="6級">6級</el-radio>
          <el-radio label="7級">7級</el-radio>
          <el-radio label="8級">8級</el-radio>
          <el-radio label="9級">9級</el-radio>
          <el-radio label="10級">10級</el-radio>
          <el-radio label="前級">前級</el-radio>
          <el-radio label="無級">無級</el-radio>
          <el-radio label="初段">初段</el-radio>
          <el-radio label="弐段">弐段</el-radio>
          <el-radio label="参段">参段</el-radio>
          <el-radio label="四段">四段</el-radio>
          <el-radio label="五段">五段</el-radio>
          <el-radio label="六段">六段</el-radio>
          <el-radio label="七段">七段</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身長：" :label-width="formLabelWidth">
        <el-input v-model="form.height" placeholder="Please input" clearable />
      </el-form-item>
      <el-form-item label="体重：" :label-width="formLabelWidth">
        <el-input v-model="form.weight" placeholder="Please input" clearable />
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

<script  lang="ts"   >
import axios from 'axios'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  branch_id: '',
  player_id: '',
  familyname: '',
  familyname2:'',
  firstname: '',
  firstname2: '',
  sex: '',
  birthday: '',
  admissionday: '',
  xclass: '',
  height: 0,
  weight: 0
})


interface Recdata {
    branch_id: string
    player_id: string
    familyname: string
    familyname2:string
    firstname: string
    firstname2: string
    sex: string
    birthday: string
    admissionday: string
    xclass: string
    height: number
    weight: number
}

interface Recdata2 {
    branch_id: string
    branch_nm: string
}

const sel_branch = ref('')

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
      sel_branch: '',
      form:{
              branch_id: '',
              player_id: '',
              familyname: '',
              familyname2:'',
              firstname: '',
              firstname2: '',
              sex: '',
              birthday: '',
              admissionday: '',
              xclass: '',
              height: 0,
              weight: 0,
      },
      formLabelWidth : '140px',
    }
  },
  mounted() {
    axios.get("http://192.168.101.21:1880/get-branch")
    .then((response) => {
        response.data["data"].forEach((element: Recdata) => {
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
        this.form.branch_id = this.sel_branch;
        axios.post("http://192.168.101.21:1880/add-player",{
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
        axios.get("http://192.168.101.21:1880/get-player/" + this.sel_branch)
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
        axios.post("http://192.168.101.21:1880/del-player",{
          branch_id: this.sel_branch,
          player_id: currentRow.value.player_id
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
