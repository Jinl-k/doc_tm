<template>
  <view @click="onClick" class="flex flex-col flex-col-center-center pa-32">
    <tm-translate :eventPenetrationEnabled="true" name="zoom" :delay="300">
      <tm-sheet
        :dark="props.dark"
        :followTheme="false"
        :followDark="props.followDark"
        _class="flex-center flex-row rounded"
        :width="props.size"
        :height="props.size"
        :round="25"
        :color="icon_color"
        :text="props.text"
      >
        <tm-icon
          _style="line-height:normal"
          :dark="props.dark"
          :followDark="props.followDark"
          :fontSize="80"
          :name="icon_rp"
        ></tm-icon>
      </tm-sheet>
    </tm-translate>
    <view :eventPenetrationEnabled="true" class="flex flex-col flex-center pb-10">
      <tm-text
        :dark="props.dark"
        :followDark="props.followDark"
        _class="text-weight-b"
        :fontSize="34"
        :label="icon_title"
      ></tm-text>
    </view>
    <view :eventPenetrationEnabled="true" class="flex flex-col flex-center pb-24">
      <tm-text
        :dark="props.dark"
        :followDark="props.followDark"
        _class="opacity-6 "
        :fontSize="24"
        :label="icon_subtitle"
      ></tm-text>
    </view>
    <view
      :eventPenetrationEnabled="true"
      v-if="props.showBtn"
      hover-class="opacity-6"
      class="flex flex-col flex-center"
    >
      <slot name="default">
        <tm-sheet
          :padding="[0, 0]"
          @click="emits('click', $event)"
          :height="80"
          :dark="dark"
          :followTheme="props.followTheme"
          :followDark="props.followDark"
          :shadow="3"
          linear="right"
          :color="icon_color"
          _style="cursor: pointer;"
          :round="4"
          :width="420"
          _class="flex-center"
          :margin="[0, 32]"
        >
          <tm-text
            :userInteractionEnabled="false"
            :dark="props.dark"
            _class="text-size-n"
            :followDark="props.followDark"
            :label="btnText"
          ></tm-text>
        </tm-sheet>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
/**
 * ?????????
 * @description ???????????????????????????????????????????????????????????????
 */
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "../tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmTranslate from "../tm-translate/tm-translate.vue";
import { computed } from "vue";
//click??????????????????resultClick??????????????????????????????
const emits = defineEmits(["click", "resultClick"]);
const props = defineProps({
  // empty,error,success,warning,lock,network
  status: {
    type: String,
    default: "empty",
  },
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "primary",
  },
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  btnText: {
    type: String,
    default: "??????",
  },
  //??????????????????????????????????????????
  followTheme: {
    type: [Boolean, String],
    default: true,
  },
  followDark: {
    type: [Boolean, String],
    default: true,
  },
  //??????
  dark: {
    type: [Boolean, String],
    default: false,
  },
  //????????????????????????????????????
  showBtn: {
    type: Boolean,
    default: true,
  },
  //??????????????????????????????????????????
  clickDisabled: {
    type: Boolean,
    default: true,
  },
  text: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 140,
  },
});
const statusData = {
  empty: {
    icon: "tmicon-shiliangzhinengduixiang-",
    title: "?????????",
    subTitle: "????????????",
    color: "primary",
  },
  error: {
    icon: "tmicon-times",
    title: "??????",
    subTitle: "?????????????????????",
    color: "red",
  },
  success: {
    icon: "tmicon-check",
    title: "????????????",
    subTitle: "?????????",
    color: "green",
  },
  warning: {
    icon: "tmicon-exclamation-circle",
    title: "??????",
    subTitle: "?????????????????????",
    color: "orange",
  },
  lock: {
    icon: "tmicon-ios-unlock",
    title: "????????????",
    subTitle: "????????????????????????????????????",
    color: "blue",
  },
  network: {
    icon: "tmicon-wifi-off",
    title: "????????????",
    subTitle: "???????????????????????????",
    color: "blue",
  },
};
const icon_rp = computed(() => {
  if (props.icon) return props.icon;
  if (!props.status) return "";
  return statusData[props.status].icon || "";
});
const icon_title = computed(() => {
  if (props.title) return props.title;
  if (!props.status) return "";
  return statusData[props.status].title || "";
});
const icon_subtitle = computed(() => {
  if (props.subTitle) return props.subTitle;
  if (!props.status) return "";
  return statusData[props.status].subTitle || "";
});
const icon_color = computed(() => {
  if (props.color) return props.color;
  if (!props.status) return "";
  return statusData[props.status].color || "";
});
const onClick = (e: Event) => {
  if (props.clickDisabled) return;
  emits("resultClick", e);
};
</script>

<style scoped></style>
