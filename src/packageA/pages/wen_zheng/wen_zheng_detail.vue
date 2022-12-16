<template>
  <tm-app color="#ffffff">

    <tm-sheet :round="4" :shadow="16"  :margin="[24,12]" @click="goto_detail">
      <view class="flex flex-between ">
        <tm-text :font-size="34" _class="font-weight-b" label="张志鹏 男"></tm-text>
        <tm-button icon="tmicon-account" color="blue" :margin="[0,0]" :width="220" :shadow="0" text :border="2"
                   borderStyle="dashed" size="small" label="患者健康信息"></tm-button>
      </view>
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
      <tm-sheet :margin="[0,0]">
        <tm-text :font-size="30" _class="font-weight-b mb-20" label="病历或检查图片"></tm-text>
        <tm-image-group >
          <tm-image  :padding="[2,2]" preview :width="148" :height="156" :src="'https://picsum.photos/312/312?id='+item" v-for="item in 5" :key="item"></tm-image>
        </tm-image-group>
      </tm-sheet>
    </tm-sheet>

  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const list = [
  {label:'xxxxxxx',value:'xxxxxxxx'},
  {label:'xxxxxxx',value:'xxxxxxxx'},
  {label:'日期',value:'xx天xx时'}
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
