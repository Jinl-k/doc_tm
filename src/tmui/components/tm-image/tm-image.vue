<template>
  <tm-translate
    :width="img_width + props.padding[0] * 2 + props.unit"
    v-if="!isRmove"
    @end="aniEnd"
    ref="aniplay"
    :autoPlay="false"
    name="zoom"
    reverse
  >
    <view class="absolute" style="transform: translateX(1200px); opacity: 0">
      <image
        v-if="loading"
        :src="img_src"
        style="width: 10px; height: 10px; opacity: 0"
        @load="imageLoad"
        @error="imageError"
        mode="scaleToFill"
      ></image>
    </view>
    <tm-sheet
      :color="props.color"
      :transprent="props.transprent"
      :margin="props.margin"
      :round="props.round"
      :border="props.border"
      :padding="[props.padding[0], 0]"
      :class="['round-' + props.round]"
      :width="img_width - props.padding[0] * 2"
      :unit="props.unit"
    >
      <view :class="[`pb-${props.padding[1]}`, 'flex flex-col flex-col-center-center']">
        <image
          :show-menu-by-longpress="props.showMenuByLongPress"
          @click="imageClick"
          :class="['round-' + props.round]"
          v-if="!loading && !error"
          :src="img_src"
          :style="[{ width: img_width + props.unit, height: img_height + props.unit }]"
          :mode="props.model"
        ></image>
        <view
          v-if="loading && !error"
          :style="[
            { width: img_width + props.unit, height: img_height + 10 + props.unit },
          ]"
          class="flex flex-center opacity-3"
        >
          <tm-icon
            v-if="props.showLoad"
            :font-size="26"
            spin
            name="tmicon-shuaxin"
          ></tm-icon>
        </view>

        <view
          v-if="!loading && error"
          :style="[{ width: img_width + props.unit, height: img_height + props.unit }]"
          class="flex flex-col flex-center opacity-5"
        >
          <slot name="error">
            <view>
              <tm-icon name="tmicon-exclamation-circle"></tm-icon>
              <tm-text _class="pt-10" :font-size="26" :label="props.errorLabel"></tm-text>
            </view>
          </slot>
        </view>
        <!-- extra -->
        <view
          :eventPenetrationEnabled="true"
          v-if="props.extra"
          :class="[
            props.extraPosition == 'in' ? 'absolute l-0 b-0 zIndex-5 ' : '',
            'flex flex-col flex-col-bottom-start ',
          ]"
          :style="[
            props.extra && props.extraPosition == 'in'
              ? { height: img_height + props.unit, width: img_width + props.unit }
              : '',
            props.extra && props.extraPosition == 'out'
              ? { width: img_width + props.unit }
              : '',
          ]"
        >
          <view
            @click.stop="imageClick"
            :class="['flex flex-col flex-col-bottom-start flex-1']"
            :style="[
              props.extra && props.extraPosition == 'in'
                ? { height: img_height + props.unit, width: img_width + props.unit }
                : '',
              props.extra && props.extraPosition == 'out'
                ? { width: img_width + props.unit }
                : '',
            ]"
          >
            <slot name="extra"></slot>
          </view>
        </view>
        <!-- delete ????????????????????? -->
        <view
          v-if="props.delete"
          class="absolute r-4 t-4 flex flex-col flex-col-center-end zIndex-10"
          :style="[props.delete ? { width: img_width + props.unit } : '']"
        >
          <tm-icon @click="del" color="red" name="tmicon-times-circle-fill"></tm-icon>
        </view>
      </view>
    </tm-sheet>
  </tm-translate>
</template>

<script lang="ts" setup>
/**
 * ??????
 * @description ?????????????????????tm-image-group??????,?????????????????????????????????????????????????????????????????????????????????
 * @template extra??????????????????????????????
 */
import {
  getCurrentInstance,
  computed,
  ref,
  inject,
  watch,
  PropType,
  ComponentInternalInstance,
} from "vue";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmText from "..//tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmTranslate from "../tm-translate/tm-translate.vue";
import { custom_props } from "../../tool/lib/minxs";
const aniplay = ref<InstanceType<typeof tmTranslate> | null>(null);
const proxy = getCurrentInstance()?.proxy ?? null;
const emits = defineEmits(["load", "error", "click", "delete", "close"]);
const props = defineProps({
  ...custom_props,
  //????????????
  margin: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0],
  },
  //????????????
  padding: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0],
  },
  color: {
    type: String,
    default: "white",
  },
  transprent: {
    type: [Boolean, String],
    default: true,
  },
  border: {
    type: Number,
    default: 0,
  },
  width: {
    type: [Number],
    default: 200,
    required: true,
  },
  height: {
    type: [Number],
    default: 200,
    required: true,
  },
  src: {
    type: String,
    default: "",
    required: true,
  },
  errorIcon: {
    type: String,
    default: "",
  },
  errorLabel: {
    type: String,
    default: "????????????",
  },
  loadIcon: {
    type: String,
    default: "",
  },
  //???????????????????????????
  showLoad: {
    type: Boolean,
    default: true,
  },
  //?????????????????????
  preview: {
    type: [Boolean],
    default: false,
  },
  //?????????????????????????????????????????????
  extra: {
    type: [Boolean],
    default: false,
  },
  extraPosition: {
    type: String,
    default: "in", //in:?????????????????????,out?????????????????????,
  },
  //???????????????????????????
  delete: {
    type: [Boolean],
    default: false,
  },
  //??????????????????delete??????????????????????????????false,????????????delete???????????????????????????????????????
  allowDelete: {
    type: [Boolean],
    default: true,
  },
  //?????????????????????
  //??????????????????https://uniapp.dcloud.io/component/image.html
  model: {
    type: String,
    default: "scaleToFill",
  },
  unit: {
    type: String,
    default: "rpx",
  },
  //????????????????????????????????????????????????,???preview?????????,???????????????????????????,???????????????
  showMenuByLongPress: {
    type: [Boolean],
    default: false,
  },
});
if (!props.height && !props.width) {
  console.error("????????????????????????????????????????????????");
}
const img_width = computed(() => {
  return props.width;
});
const img_height = computed(() => {
  return props.height - props.padding[1];
});
const img_src = computed(() => props.src);
const loading = ref(true);
const error = ref(false);
const isRmove = ref(false);

//???????????????
let parent: any = proxy?.$parent;

while (parent) {
  if (parent?.tmImageGroup == "tmImageGroup" || !parent) {
    break;
  } else {
    parent = parent?.$parent ?? undefined;
  }
}

const ImagGrupList = inject(
  "ImagGrupList",
  computed(() => [])
);
//?????????????????????????????????
if (parent?.pushKey) {
  parent.pushKey({
    width: img_width.value,
    height: img_width.value,
    src: props.src,
  });
}

watch(img_src, () => {
  loading.value = true;
  error.value = false;
  if (parent?.pushKey) {
    parent.pushKey({
      width: img_width.value,
      height: img_width.value,
      src: props.src,
    });
  }
});
function imageLoad(event: Event) {
  loading.value = false;
  emits("load", event);
}

function imageError(event: Event) {
  console.error("???????????????:" + props.src, event);
  error.value = true;
  loading.value = false;
  emits("error", event);
}

function imageClick(event: Event) {
  emits("click", event);
  if (props.preview) {
    let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
    uni.previewImage({
      urls: list,
      current: props.src,
    });
  }
}

async function del() {
  isRmove.value = false;
  if (!props.allowDelete) {
    emits("delete", props.src);
    return;
  }
  if (aniplay.value?.play) {
    aniplay.value?.play();
  } else {
    isRmove.value = true;
    emits("close", props.src);
  }
}

function aniEnd() {
  isRmove.value = true;
  emits("close", props.src);
}
</script>

<style></style>
