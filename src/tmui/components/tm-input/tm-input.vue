<template>
  <tm-sheet :transprent="true" :margin="props.margin" :padding="props.padding">
    <tm-sheet
      :transprent="props.transprent"
      :round="props.round"
      no-level
      :margin="[0, 0]"
      :padding="_inputPadding"
      :border="props.border"
      :text="props.text"
      :color="_color"
      :outlined="props.outlined"
      :shadow="props.shadow"
      :linear="props.linear"
      :linearDeep="props.linearDeep"
    >
      <view
        class="flex flex-row relative"
        @click="inputClick($event, '')"
        :class="[
          propsDetail.type == 'textarea'
            ? propsDetail.layoutAlign
            : 'flex-row-center-start',
        ]"
        :style="[
          propsDetail.autoHeight && propsDetail.type == 'textarea'
            ? {}
            : { height: `${_height}rpx` },
        ]"
      >
        <view v-if="propsDetail.search || propsDetail.searchLabel" class="px-9"></view>
        <slot name="left"></slot>
        <view v-if="propsDetail.prefix" class="pr-16">
          <tm-icon
            :font-size="propsDetail.fontSize"
            :color="props.prefixColor"
            :name="propsDetail.prefix"
          ></tm-icon>
        </view>
        <view v-if="propsDetail.prefixLabel" class="pr-24">
          <tm-text
            :font-size="propsDetail.fontSize"
            :color="props.prefixColor"
            :label="propsDetail.prefixLabel"
          ></tm-text>
        </view>

        <view
          v-if="!isAndroid"
          @click.stop="inputClick($event, 'ali')"
          class="flex-1 relative flex-row flex"
          :style="[{ width: '0px' }]"
        >
          <!-- <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: `${_height}rpx`,background:'red'}"></view> -->
          <input
            class="flex-1"
            :userInteractionEnabled="false"
            v-if="propsDetail.type != 'textarea'"
            :value="_value"
            :focus="propsDetail.focus"
            @focus="focus"
            @blur="blur"
            @confirm="confirm"
            @input="inputHandler"
            @keyboardheightchange="emits('keyboardheightchange')"
            :password="showPasswordText"
            :maxlength="propsDetail.maxlength"
            :disabled="propsDetail.disabled"
            :cursorSpacing="propsDetail.cursorSpacing"
            :confirmType="propsDetail.confirmType"
            :confirmHold="propsDetail.confirmHold"
            :autoBlur="propsDetail.autoBlur"
            :holdKeyboard="propsDetail.holdKeyboard"
            :adjustPosition="propsDetail.adjustPosition"
            :readonly="propsDetail.readyOnly"
            :type="propsDetail.type"
            :placeholder="propsDetail.placeholder"
            :style="[
              {
                height: `${_height}rpx`,
                color: propsDetail.fontColor
                  ? propsDetail.fontColor
                  : tmcomputed.textColor,
                'text-align': props.align,
                fontSize: `${propsDetail.fontSize_px}px`,
              },
            ]"
            :placeholder-style="`fontSize:${propsDetail.fontSize_px}px;${props.placeholderStyle}`"
          />

          <textarea
            :userInteractionEnabled="false"
            v-if="propsDetail.type == 'textarea'"
            :value="_value"
            :focus="propsDetail.focus"
            @focus="focus"
            @blur="blur"
            @confirm="confirm"
            @input="inputHandler"
            @keyboardheightchange="emits('keyboardheightchange')"
            :maxlength="propsDetail.maxlength"
            :disabled="propsDetail.disabled"
            :placeholder="propsDetail.placeholder"
            :cursorSpacing="propsDetail.cursorSpacing"
            :confirmHold="propsDetail.confirmHold"
            :autoBlur="propsDetail.autoBlur"
            :holdKeyboard="propsDetail.holdKeyboard"
            :cursor="propsDetail.cursor"
            :show-confirm-bar="propsDetail.showConfirmBar"
            :selectionStart="propsDetail.selectionStart"
            :selectionEnd="propsDetail.selectionEnd"
            :disable-default-padding="propsDetail.disableDefaultPadding"
            :fixed="propsDetail.fixed"
            :autoHeight="propsDetail.autoHeight"
            :readonly="propsDetail.readyOnly"
            :adjustPosition="propsDetail.adjustPosition"
            :type="propsDetail.type"
            :style="[
              propsDetail.autoHeight ? {} : { height: `${_height}rpx` },
              {
                width: 'auto',
                'word-break': 'break-word',
                color: propsDetail.fontColor
                  ? propsDetail.fontColor
                  : tmcomputed.textColor,
                'text-align': props.align,
                fontSize: `${propsDetail.fontSize_px}px`,
              },
            ]"
            class="wrap flex-1"
            :placeholder-style="`fontSize:${propsDetail.fontSize_px}px;${props.placeholderStyle}`"
          ></textarea>
        </view>
        <view
          v-if="isAndroid"
          class="flex-1 relative flex-row flex"
          :style="[{ width: '0px' }]"
        >
          <!-- <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: `${_height}rpx`,background:'red'}"></view> -->
          <input
            class="flex-1"
            @click.stop="emits('click', $event)"
            :userInteractionEnabled="false"
            v-if="propsDetail.type != 'textarea'"
            :value="_value"
            :focus="propsDetail.focus"
            @focus="focus"
            @blur="blur"
            @confirm="confirm"
            @input="inputHandler"
            @keyboardheightchange="emits('keyboardheightchange')"
            :password="showPasswordText"
            :disabled="propsDetail.disabled"
            :cursorSpacing="propsDetail.cursorSpacing"
            :confirmType="propsDetail.confirmType"
            :confirmHold="propsDetail.confirmHold"
            :autoBlur="propsDetail.autoBlur"
            :holdKeyboard="propsDetail.holdKeyboard"
            :adjustPosition="propsDetail.adjustPosition"
            :maxlength="propsDetail.maxlength"
            :type="propsDetail.type"
            :readonly="propsDetail.readyOnly"
            :placeholder="propsDetail.placeholder"
            :style="[
              {
                height: `${_height}rpx`,
                color: propsDetail.fontColor
                  ? propsDetail.fontColor
                  : tmcomputed.textColor,
                'text-align': props.align,
                fontSize: `${propsDetail.fontSize_px}px`,
              },
            ]"
            :placeholder-style="`fontSize:${propsDetail.fontSize_px}px;${props.placeholderStyle}`"
          />
          <textarea
            @click.stop="emits('click', $event)"
            :userInteractionEnabled="false"
            v-if="propsDetail.type == 'textarea'"
            :value="_value"
            :focus="propsDetail.focus"
            @focus="focus"
            @blur="blur"
            @confirm="confirm"
            @input="inputHandler"
            @keyboardheightchange="emits('keyboardheightchange')"
            :disabled="propsDetail.disabled"
            :placeholder="propsDetail.placeholder"
            :cursorSpacing="propsDetail.cursorSpacing"
            :confirmHold="propsDetail.confirmHold"
            :autoBlur="propsDetail.autoBlur"
            :holdKeyboard="propsDetail.holdKeyboard"
            :adjustPosition="propsDetail.adjustPosition"
            :maxlength="propsDetail.maxlength"
            :autoHeight="propsDetail.autoHeight"
            :cursor="propsDetail.cursor"
            :show-confirm-bar="propsDetail.showConfirmBar"
            :selectionStart="propsDetail.selectionStart"
            :selectionEnd="propsDetail.selectionEnd"
            :disable-default-padding="propsDetail.disableDefaultPadding"
            :readonly="propsDetail.readyOnly"
            :fixed="propsDetail.fixed"
            :type="propsDetail.type"
            :style="[
              propsDetail.autoHeight ? {} : { height: `${_height}rpx` },
              {
                width: 'auto',
                'word-break': 'break-word',
                color: propsDetail.fontColor
                  ? propsDetail.fontColor
                  : tmcomputed.textColor,
                'text-align': props.align,
                fontSize: `${propsDetail.fontSize_px}px`,
              },
            ]"
            class="wrap flex-1"
            :placeholder-style="`fontSize:${propsDetail.fontSize_px}px;${props.placeholderStyle}`"
          ></textarea>
        </view>
        <view class="pl-16" v-if="propsDetail.showClear && _valueLenChar > 0">
          <tm-icon
            @click="clearBtn"
            :font-size="propsDetail.fontSize * 0.9"
            name="tmicon-times-circle-fill"
          >
          </tm-icon>
        </view>
        <view class="pl-16" v-if="_requiredError">
          <tm-icon
            :font-size="propsDetail.fontSize"
            name="tmicon-exclamation-circle"
          ></tm-icon>
        </view>
        <view class="pl-16" v-if="propsDetail.suffix">
          <tm-icon
            :font-size="propsDetail.fontSize * 0.85"
            :color="props.suffixColor"
            :name="propsDetail.suffix"
          ></tm-icon>
        </view>

        <view v-if="propsDetail.suffixLabel" class="pl-16">
          <tm-text
            :font-size="propsDetail.fontSize"
            :color="props.suffixColor"
            :label="propsDetail.suffixLabel"
          ></tm-text>
        </view>

        <view class="pl-16" v-if="showPasswordIcon">
          <!-- tmicon-eyeslash-fill -->
          <tm-icon
            @click="changeSeePassword"
            :font-size="propsDetail.fontSize"
            :name="showPasswordText ? 'tmicon-eyeslash-fill' : 'tmicon-eye-fill'"
          ></tm-icon>
        </view>

        <!-- #ifndef MP-ALIPAY -->
        <view
          v-if="
            propsDetail.showCharNumber &&
            _valueLenChar > 0 &&
            propsDetail.type != 'textarea'
          "
          class="pl-16 flex-row flex"
        >
          <tm-text :label="_valueLenChar"></tm-text>
          <tm-text
            v-if="propsDetail.maxlength > 0"
            :label="'/' + propsDetail.maxlength"
          ></tm-text>
        </view>
        <!-- ?????????????????????????????????????????????????????????????????? -->
        <view
          v-if="
            propsDetail.showCharNumber &&
            _valueLenChar > 0 &&
            propsDetail.type == 'textarea'
          "
          class="pl-16 flex-row flex absolute r-0"
          :class="[`b-${12}`]"
        >
          <tm-text :label="_valueLenChar"></tm-text>
          <tm-text
            v-if="propsDetail.maxlength > 0"
            :label="'/' + propsDetail.maxlength"
          ></tm-text>
        </view>
        <!-- #endif -->
        <slot name="right">
          <view v-if="propsDetail.search || propsDetail.searchLabel" class="pl-16">
            <TmButton
              :followTheme="props.followTheme"
              @click="searchClick"
              :color="props.focusColor"
              :font-size="24"
              :height="_height - 11"
              :padding="[16, 0]"
              block
              :margin="[0, 0]"
              :icon="propsDetail.search"
              :label="propsDetail.searchLabel"
            ></TmButton>
          </view>
        </slot>
      </view>
    </tm-sheet>

    <!-- <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">
            <tm-divider :margin="[0,0]"></tm-divider>
        </view> -->
    <!-- _requiredError -->
    <!-- <view v-if="false" class="pt-12">
            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>
        </view> -->
  </tm-sheet>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch, getCurrentInstance, inject, toRaw } from "vue";
import { inputPushItem, rulesItem } from "./../tm-form-item/interface";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmText from "../tm-text/tm-text.vue";
import {
  custom_props,
  computedTheme,
  computedClass,
  computedStyle,
  computedDark,
} from "../../tool/lib/minxs";
import { useTmpiniaStore } from "../../tool/lib/tmpinia";
import TmButton from "../tm-button/tm-button.vue";
const store = useTmpiniaStore();
const emits = defineEmits([
  "focus",
  "blur",
  "confirm",
  "input",
  "update:modelValue",
  "clear",
  "search",
  "keyboardheightchange",
  "click",
]);
const proxy = getCurrentInstance()?.proxy ?? null;
const props = defineProps({
  ...custom_props,
  followTheme: {
    type: [Boolean, String],
    default: true,
  },
  color: {
    type: String,
    default: "grey-4",
  },
  prefixColor: {
    type: String,
    default: "",
  },
  suffixColor: {
    type: String,
    default: "",
  },
  //???????????????????????????
  focusColor: {
    type: String,
    default: "primary",
  },
  //????????????????????????
  fontColor: {
    type: String,
    default: "",
  },
  text: {
    type: Boolean,
    default: true,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Number,
    default: 0,
  },
  transprent: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Number,
    default: 3,
  },
  shadow: {
    type: Number,
    default: 0,
  },
  margin: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0],
  },
  padding: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0],
  },
  height: {
    type: Number,
    default: 64,
  },
  //????????????
  prefix: {
    type: String,
    default: "",
  },
  //????????????
  prefixLabel: {
    type: String,
    default: "",
  },
  //????????????
  suffix: {
    type: String,
    default: "",
  },
  //????????????
  suffixLabel: {
    type: String,
    default: "",
  },

  fontSize: {
    type: Number,
    default: 30,
  },
  //tmicon-search
  search: {
    type: String,
    default: "",
  },
  //??????
  searchLabel: {
    type: String,
    default: "",
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  password: {
    type: Boolean,
    default: false,
  },
  //????????????
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "???????????????",
  },
  //??????????????????????????????
  errorLabel: {
    type: String,
    default: "???????????????",
  },
  //???????????????
  //left,right,center
  align: {
    type: String as PropType<"left" | "right" | "center">,
    default: "left",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  inputPadding: {
    type: Array as PropType<Array<number>>,
    default: () => [24, 0],
  },
  //???????????????????????????
  showCharNumber: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: -1,
  },
  type: {
    type: String as PropType<
      | "text"
      | "number"
      | "idcard"
      | "idcard"
      | "tel"
      | "safe-password"
      | "nickname"
      | "textarea"
    >,
    default: "text",
  },
  cursorSpacing: {
    type: Number,
    default: 24,
  },
  confirmType: {
    type: String as PropType<"send" | "search" | "next" | "go" | "done">,
    default: "done",
  },
  confirmHold: {
    type: Boolean,
    default: false,
  },
  autoBlur: {
    type: Boolean,
    default: true,
  },
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  //?????????????????????
  focus: {
    type: Boolean,
    default: false,
  },
  cursor: {
    type: Number,
    default: 0,
  },
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  disableDefaultPadding: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  placeholderStyle: {
    type: String,
    default: "",
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
  readyOnly: {
    type: Boolean,
    default: false,
  },
  /**????????????????????????,?????????????????????????????????,??????????????????????????????????????????. */
  layoutAlign: {
    type: String,
    default: "flex-row-top-start",
  },
});

let parentFormItem: any = proxy?.$parent;
while (parentFormItem) {
  if (
    parentFormItem?.tmFormComnameFormItem == "tmFormComnameFormItem" ||
    !parentFormItem
  ) {
    break;
  } else {
    parentFormItem = parentFormItem?.$parent ?? undefined;
  }
}

const isAndroid = ref(false);
isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
const _height = computed(() => props.height);
const _inputPadding = computed(() => {
  if (props.search !== "" || props.searchLabel !== "") {
    return [4, 0];
  }
  return props.inputPadding;
});
let timerId = NaN;
function debounce(func: Function, wait = 500, immediate = false) {
  // ???????????????
  if (!isNaN(timerId)) clearTimeout(timerId);
  // ??????????????????????????????????????????
  if (immediate) {
    var callNow = !timerId;
    timerId = setTimeout(() => {
      timerId = NaN;
    }, wait);

    if (callNow) typeof func === "function" && func();
  } else {
    // ?????????????????????????????????????????????timeout????????????????????????????????????wait???????????????func????????????
    timerId = setTimeout(() => {
      typeof func === "function" && func();
      timerId = NaN;
    }, wait);
  }
}
const propsDetail = computed(() => {
  return {
    ...props,
    fontSize_px: uni.upx2px(props.fontSize),
  };
});
const _blackValue = props.modelValue;
// ??????????????????????????????????????????
const tmcfg = computed(() => store.tmStore);
//??????????????????
const customCSSStyle = computed(() => computedStyle(props));
//?????????
const customClass = computed(() => computedClass(props));
//?????????????????????
const isDark = computed(() => computedDark(props, tmcfg.value));
//???????????????????????????????????????
const _requiredError = ref(false);
//??????????????????
const _foucsActive = ref(props.focus || false);
watch(
  () => props.focus,
  () => {
    _foucsActive.value = props.focus;
  }
);
const _color = computed(() => {
  let color = props.color;
  if (_foucsActive.value) {
    if (props.followTheme && store.tmStore.color) {
      color = store.tmStore.color;
    } else {
      color = props.focusColor;
    }
  }
  if (_requiredError.value) color = "red";
  return color;
});
//????????????
const tmcomputed = computed(() => {
  const _props = { ...props, color: _color.value };
  return computedTheme(_props, isDark.value, tmcfg.value);
});

//??????????????????????????????
const showPasswordText = ref(propsDetail.value.password);
const showPasswordIcon = computed(() => props.password);
const _errorLabel = ref(props.errorLabel);
const _value = ref(props.modelValue);
const _valueLenChar = computed(() => {
  //???ios??????????????????????????????str.length??????????????????????????????=2???????????????=1???
  let str = String(_value.value).split("");
  return str.length;
});
watch(
  () => props.modelValue,
  () => (_value.value = props.modelValue)
);

function searchClick() {
  emits("search", _value.value);
}
function clearBtn() {
  _value.value = "";
  emits("update:modelValue", "");
  emits("clear");
}
function changeSeePassword() {
  showPasswordText.value = !showPasswordText.value;
}
function focus() {
  _foucsActive.value = true;
  emits("focus");
  // pushFormItem();
}
function blur(e: any) {
  _foucsActive.value = false;
  // pushFormItem();
  emits("blur", e);
}
function confirm() {
  emits("confirm", _value.value);
}
function inputHandler(e: CustomEvent) {
  // _value.value = e.detail.value;
  emits("input", e.detail.value);
  emits("update:modelValue", e.detail.value);

  return e.detail.value;
}
function inputClick(e: Event, type: string) {
  e.stopPropagation();

  if (type == "ali") {
    debounce(
      () => {
        emits("click", e);
      },
      200,
      true
    );
    return;
  }

  debounce(() => emits("click", e), 200, true);
}
</script>

<style scoped>
/* #ifndef APP-NVUE */
input,
textarea {
  background-color: transparent;
  background: transparent;
}
/* #endif */
</style>
