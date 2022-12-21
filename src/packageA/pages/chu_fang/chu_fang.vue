<template>
  <tm-app color="#ffffff">
    <tm-sheet :margin="[0,0]" :padding="[0,0]" class="flex-center">
<!--    <view class="flex-center">-->

      <tm-tabs :list="tabsTitle" align="center" :width="692" :height="300" default-name="1" :round="2" color="blue" text
               activeFontColor="primary" unSelectedColor="grey-darken-2">
      </tm-tabs>
<!--    </view>-->
    </tm-sheet>

    <tm-sheet :round="4" :shadow="16" :margin="[24,12]">
      <tm-text :font-size="34" _class="font-weight-b" label="张志鹏 男"></tm-text>
      <tm-divider :margin="[0,12]"></tm-divider>
      <tm-descriptions transprent :margin="[12,0]" :round="3" text title="病情描述:">
        <tm-descriptions-item  :font-size="24" v-for="(item,index) in list" :key="index" :label="item.label" :value="item.value"></tm-descriptions-item>
        <tm-descriptions-item :font-size="24" color="red" label="问诊类型" value="vscode">
          <tm-sheet color="red" text :border="1" :margin="[12,0]" :padding="[12,4]" :round="2">
            <tm-text :font-size="24" label="图文问诊"></tm-text>
          </tm-sheet>
        </tm-descriptions-item>
      </tm-descriptions>
      <tm-divider :margin="[0,12]"></tm-divider>
      <view class="flex flex-row flex-end">
        <tm-button icon="tmicon-account" color="pink" :margin="[0,0]" :shadow="0" text :border="2"
                   borderStyle="dashed" size="small" label="拒绝"></tm-button>
        <tm-button icon="tmicon-account" color="green" :margin="[10,0]" :shadow="0" text :border="2"
                   borderStyle="dashed" size="small" label="处方"></tm-button>
        <tm-button icon="tmicon-account" color="blue" :margin="[0,0]" :shadow="0" text :border="2"
                   borderStyle="dashed" size="small" label="续方"></tm-button>
      </view>

    </tm-sheet>

    <tm-sheet :round="4" :shadow="16" :margin="[24,4]">
      <tm-text :font-size="34" _class="font-weight-b" label="张志鹏 男"></tm-text>
      <tm-divider :margin="[0,12]"></tm-divider>
      <tm-descriptions transprent :margin="[12,0]" :round="3" text title="病情描述:">
        <tm-descriptions-item  :font-size="24" v-for="(item,index) in list" :key="index" :label="item.label" :value="item.value"></tm-descriptions-item>
        <tm-descriptions-item :font-size="24" color="red" label="问诊类型" value="vscode">
          <tm-sheet color="red" text :border="1" :margin="[12,0]" :padding="[12,4]" :round="2">
            <tm-text :font-size="24" label="图文问诊"></tm-text>
          </tm-sheet>
        </tm-descriptions-item>
      </tm-descriptions>
      <tm-divider :margin="[0,12]"></tm-divider>
        <view class="flex flex-row flex-end">
          <tm-button icon="tmicon-account" color="pink" :margin="[0,0]" :shadow="0" text :border="2"
                     borderStyle="dashed" size="small" label="拒绝"></tm-button>
          <tm-button icon="tmicon-account" color="green" :margin="[10,0]" :shadow="0" text :border="2"
                     borderStyle="dashed" size="small" label="处方"></tm-button>
          <tm-button icon="tmicon-account" color="blue" :margin="[0,0]" :shadow="0" text :border="2"
                     borderStyle="dashed" size="small" label="续方"></tm-button>
        </view>
    </tm-sheet>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const tabsTitle = ref([
  { key: "1", title: "已诊", count:"1", dotColor:"green",icon: "tmicon-ios-leaf" },
  { key: "2", title: "未诊", count:"2",dotColor:"orange",icon: "tmicon-ios-umbrella" },
  { key: "3", title: "拒绝",count:"2", dotColor:"blue", icon: "tmicon-ios-rocket" },
  { key: "4", title: "审核未通过",count:"3", icon: "tmicon-ios-partly-sunny" },
])

const list = [
  {label:'问诊医生',value:'李医生'},
  {label:'诊断结果',value:'xxxxx'},
  {label:'主诉',value:'xxxxx'}
]

function tabschange(key:string|number){
  console.log(key)
}

</script>
