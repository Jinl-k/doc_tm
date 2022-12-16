<template>
  <tm-app color="#ffffff">
    <tm-sheet :margin="[0,0]" :padding="[0,0]" class="flex-center">
      <!--    <view class="flex-center">-->

      <tm-tabs :list="tabsTitle" align="center" :width="692" :height="300" default-name="1" :round="2" color="blue" text
               activeFontColor="primary" unSelectedColor="grey-darken-2">
      </tm-tabs>
      <!--    </view>-->
    </tm-sheet>

    <tm-sheet :round="4" :shadow="16"  :margin="[24,12]" @click="goto_detail">
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
    </tm-sheet>

    <tm-sheet :round="4" :shadow="16" :margin="[24,4]" @click="goto_detail">
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
    </tm-sheet>


  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const tabsTitle = ref([
  { key: "1", title: "待接诊", count:"1", dotColor:"green",icon: "tmicon-ios-leaf" },
  { key: "2", title: "就诊中", count:"2",dotColor:"orange",icon: "tmicon-ios-umbrella" },
  { key: "3", title: "已完成",count:"2", dotColor:"blue", icon: "tmicon-ios-rocket" },
  { key: "4", title: "已拒绝",count:"3", icon: "tmicon-ios-partly-sunny" },
])

const list = [
  {label:'xxxxxxx',value:'xxxxxxxx'},
  {label:'xxxxxxx',value:'xxxxxxxx'},
  {label:'已等待时间',value:'xx天xx时'}
]

function tabschange(key:string|number){
  console.log(key)
}

const goto_detail = () => {
  uni.navigateTo({
    url: '/packageA/pages/wen_zheng/wen_zheng_detail'
  })
}

</script>
