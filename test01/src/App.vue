<template>
  <el-select v-model="value" class="m-2" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-button type="default" @click="onSerch()">検索</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'op1',
    label: 'Option1',
  },
  {
    value: 'op2',
    label: 'Option2',
  },
  {
    value: 'op3',
    label: 'Option3',
  },
  {
    value: 'op4',
    label: 'Option4',
  },
  {
    value: 'op5',
    label: 'Option5',
  },
]

const onSerch = () =>{
  console.log(value.value);
}

</script>
