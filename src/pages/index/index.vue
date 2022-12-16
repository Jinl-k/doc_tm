<template>
	<tm-app color="#ffffff">
<!--		<template v-slot:menu="{sys}">-->
<!--			<tm-sheet :margin="[0,0]" :padding="[0,0]" >-->
<!--				<image class="opacity-1" :style="{width:`${sys.width}px`,height:`${sys.height}px`}"-->
<!--					:src="`https://picsum.photos/${sys.width}/${sys.height}?id=${Math.random()}`" mode="scaleToFill" />-->
<!--				<view class="absolute l-0 t-0" :style="{width:`${sys.width}px`,height:`${sys.height}px`}">-->
<!--					<view class="flex flex-row flex-row-center-between py-24 px-16">-->
<!--						<tm-text label="TMUI 3.0.88"></tm-text>-->
<!--					</view>-->
<!--				</view>-->
<!--			</tm-sheet>-->
<!--		</template>-->

		<tm-navbar title="" :shadow="0" hide-home>
		</tm-navbar>

<!--		<tm-sheet :margin="[0, 0]" >-->
<!--			<view class="flex-row flex-row-center-start pb-10">-->
<!--				<tm-image :width="108" :height="67.5" :src="logoimg"></tm-image>-->
<!--				<view class="pl-16 flex-1" style="width:0">-->
<!--					<tm-text _class="text-weight-b" :font-size="36" label="早上好"></tm-text>-->
<!--					<tm-text _class="opacity-6" label="2022.12.15"></tm-text>-->
<!--				</view>-->
<!--			</view>-->
<!--		</tm-sheet>-->


    <view class="drop_card mr-24 ml-24 mt-20">
      <view class="drop_data">
        <img src="@/static/icon.png" alt="avatar" class="drop_img" />
        <view>
          <h1 class="drop_name">张志鹏</h1>
          <span class="drop_profession">早上好</span>
        </view>
      </view>
      <view>
        <a href="#" class="drop_social"><i class="bx bxl-instagram"></i></a>
      </view>
    </view>


    <tm-sheet  :round="4" :shadow="16"  :margin="[24,12]">
      <view class="progress" @click="goto_wenzheng">
        <view class="progress_text">
          <tm-text :fontSize="54" _class="font-weight-b mb-20" label="待回复问诊"></tm-text>
          <view class="flex " >
            <tm-badge  status :fontSize="30" _class="font-weight-b" dot label="未处理: 3" color="red"></tm-badge>
            <tm-badge status :fontSize="30" _class="font-weight-b" dot label="已处理: 6" color="green"></tm-badge>
          </view>
<!--          <tm-text :fontSize="30" _class="font-weight-b" label=" 已完成 3 / 6"></tm-text>-->
        </view>
        <view class="flex flex-row">
          <tm-progress model="circle" color="cyan" bgColor="grey-4" showBar="true" :height="16" :width="160" v-model:percent="percent"></tm-progress>
          <view class="py-12"></view>
        </view>
      </view>
    </tm-sheet>


		<tm-sheet ref="sheet" :round="4" :margin="[24, 10]" :padding="[0, 0]"  :shadow="16">
			<tm-text :font-size="24" _class="font-weight-b pt-24 px-24" label="特色功能"></tm-text>
			<tm-divider></tm-divider>
      <tm-grid :col="4" :width="704">
				<view v-for="(item,index) in list" :key="index" >
          <tm-grid-item :url="item.url" :height="180"  color="primary">
            <tm-icon :color="item.color" _class="pb-10" :font-size="52" :name="item.icon"></tm-icon>
            <tm-text :font-size="28" _class="font-weight-b" :label="item.title"></tm-text>
          </tm-grid-item>
        </view>
			</tm-grid>
		</tm-sheet>
		<tm-message ref="msg"></tm-message>
  </tm-app>
</template>

<script lang="ts" setup>

	import {
		ref,
		getCurrentInstance,
	} from "vue"
	import {
		onLoad,
		onInit
	} from "@dcloudio/uni-app";
	import {
		language
	} from "@/tmui/tool/lib/language"
	import {
		useTmpiniaStore
	} from '@/tmui/tool/lib/tmpinia';

	import logoimg from "@/static/logo.png"
  import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
  import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
  import {StubTask} from "echarts/types/src/core/Scheduler";

	const proxy = getCurrentInstance()?.proxy??null;
	const store = useTmpiniaStore();
	const sheet = ref < InstanceType < typeof tmSheet > | null > (null)
  const msg = ref < InstanceType < typeof tmMessage > | null > (null)
	const sysinfo = uni.$tm.u.getWindow()
	const str = ref("")

  const list = ref([
    {
      path: '../changyong/index',
      title: '全部处方',
      url: '/packageA/pages/chu_fang/chu_fang',
      icon:'tmicon-layergroup-fill',
      color: 'primary'
    },
    {
      path: '../layout/index',
      title: '我的团队',
      url: '/packageA/pages/myTeam/myTeam',
      icon: 'tmicon-map-fill',
      color: 'blue'
    },
    {
      path: '../showdata/index',
      title: '服务设置',
      url: '/packageA/pages/myInfo/medicalService',
      icon: 'tmicon-paperplane-fill',
      color: 'pink'
    },
    {
      path: '../form/index',
      title: '医生排班',
      url: '/packageA/pages/typesetting/chooseSection',
      icon: 'tmicon-commentdots-fill',
      color: 'green'
    },
    {
      path: '../fankui/index',
      title: '回复模板',
      url: '/packageA/pages/replyTemplate/replyTemplate',
      icon: 'tmicon-lightbulb-fill',
      color: 'orange'
    },
    {
      path: '../daohang/index',
      title: '电子病历',
      url: '/packageA/pages/caseTemplate/caseTemplate',
      icon: 'tmicon-flag-fill',
      color: 'teal'
    },
    {
      path: '../yewu/index',
      title: '处方模板',
      url: '/packageA/pages/prescriptionTemplate/prescriptionTemplate',
      icon: 'tmicon-box-fill',
      color: 'red'
    },
    {
      path: '../../static/Hospital.png',
      title: '门诊',
      url: '/packageA/pages/outpatient/index',
      icon: 'tmicon-smile-fill',
      color: 'cyan'
    },
  ]);

  const percent = ref(50)

  const goto_wenzheng = () => {
    uni.navigateTo({
      url: '/packageA/pages/wen_zheng/wen_zheng'
    })
  }
	onLoad(() => {
    console.log(sysinfo);
  })
</script>

<style scoped>


.progress_text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.progress{
  display: flex;
  justify-content: space-between;
}


h1 {
  margin: 0;
}

img {
  max-width: 100%;
  height: auto;
}

.drop_card,
.drop_data {
  display: flex;
  align-items: center;
}
.drop_card {
  justify-content: space-between;
  padding: 0.75rem 1.25rem 0.75rem 0.75rem;
   background-color: #fafafa;
   box-shadow: 4rpx 4rpx 16rpx #e1e1e1;
   border-radius: 2.5rem;
}
.drop_img {
  width: 75rpx;
  height: 75rpx;
  border-radius: 50%;
  margin-right: 1rem;
}

.drop_name {
  font-size: 1rem;
  font-weight: 500;
}

.drop_profession {
  font-size: 0.813rem;
  color: #8a8eaa;
}

.drop_social {
  margin: 0 0.375rem;
  color: #8a8eaa;
  transition: 0.4s;
}
</style>
