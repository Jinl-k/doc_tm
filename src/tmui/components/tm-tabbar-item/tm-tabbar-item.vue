<template>
  <view class="flex flex-col flex-col-top-center" style="height: 75px">
    <tm-sheet
      :height="60"
      :width="_width"
      :round="24"
      unit="px"
      _class="flex-center flex "
      parenClass="relative"
      class="relative"
      :_style="_styletop"
      :followTheme="_btnTop && props.followTheme"
      :transprent="_transprent"
      :color="props.color"
      :margin="[0, 0]"
      :padding="_padding"
      :shadow="props.shadow"
      :outlined="props.outlined"
      :border="props.border"
      :borderStyle="props.borderStyle"
      :borderDirection="props.borderDirection"
      :linear="props.linear"
      :linearDeep="props.linearDeep"
      @click="itemClick"
    >
      <tm-badge
        :fontSize="20"
        :color="c_font_style.dotColor"
        :eventPenetrationEnabled="true"
        :dot="props.dot"
        :count="props.count"
        :icon="props.dotIcon"
        :maxCount="props.maxCount"
      >
        <view
          :class="[_active ? 'anifun' : '']"
          class="flex flex-col flex-col-center-center"
          :style="{ width: 65 + 'px', height: '30px' }"
        >
          <slot>
            <tm-icon
              v-if="!_load"
              _style="line-height: 0px;"
              :color="_color"
              :font-size="c_font_style.iconSize"
              :name="
                _active ? c_font_style.icon : c_font_style.unicon || c_font_style.icon
              "
            ></tm-icon>
          </slot>
          <tm-icon
            v-if="_load"
            spin
            _style="line-height: 0px;"
            :color="_color"
            :font-size="c_font_style.iconSize"
            name="tmicon-shuaxin"
          ></tm-icon>
        </view>
      </tm-badge>
      <tm-text
        v-if="c_font_style.text !== ''"
        :color="_color"
        _class="pb-0"
        :font-size="c_font_style.textSize"
        :label="c_font_style.text"
      ></tm-text>
    </tm-sheet>
  </view>
</template>

<script lang="ts" setup>
/**
 * ?????????????????????
 * @description ???????????????tm-tabbar??????
 */
import tmBadge from "../tm-badge/tm-badge.vue";
import tmText from "../tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmSheet from "../tm-sheet/tm-sheet.vue";
import { custom_props } from "../../tool/lib/minxs";
import { useTmpiniaStore } from "../../tool/lib/tmpinia";
import {
  getCurrentInstance,
  computed,
  watchEffect,
  ref,
  provide,
  inject,
  onUpdated,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
  PropType,
  ComponentInternalInstance,
} from "vue";
const store = useTmpiniaStore();
/**
 * click ???????????????????????????
 * beforeClick???????????????????????????????????????false??????Promise<false>???????????????????????????????????????????????????url??????????????????????????????????????????
 */
const emits = defineEmits(["click", "beforeClick"]);
const proxy = getCurrentInstance()?.proxy ?? null;
const props = defineProps({
  ...custom_props,
  followTheme: {
    type: [Boolean, String],
    default: true,
  },
  transprent: {
    type: Boolean,
    default: true,
  },
  //???????????????
  color: {
    type: String,
    default: "white",
  },
  //?????????????????????
  fontColor: {
    type: String,
    default: "grey-darken-1",
  },
  linear: {
    type: String,
    default: "",
  },
  //????????????????????????
  activeColor: {
    type: String,
    default: "primary",
  },
  //???????????????????????????
  active: {
    type: Boolean,
    default: false,
  },
  //????????????????????????????????????
  btnTop: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  //?????????????????????????????????????????????????????????????????????
  unicon: {
    type: String,
    default: "",
  },
  textSize: {
    type: Number,
    default: 20,
  },
  iconSize: {
    type: Number,
    default: 38,
  },
  dot: {
    type: [Boolean],
    default: false,
  },
  dotColor: {
    type: [String],
    default: "red",
  },
  dotIcon: {
    type: [String],
    default: "",
  },
  //??????count?????????????????????????????????????????????string????????????????????????
  count: {
    type: [Number, String],
    default: 0,
  },
  maxCount: {
    type: [Number],
    default: 99,
  },
  url: {
    type: [String],
    default: "",
  },
  //??????????????????????????????
  openType: {
    type: String as PropType<openUrlType>,
    default: "navigate",
  },
  //????????????????????????????????????????????????fase??????????????????????????????new Promise.
  beforeClick: {
    type: [Function, Boolean],
    default: () => false,
  },
  load: {
    type: [Boolean, String],
    default: false,
  },
  //??????????????????????????????beforeClick??????????????????????????????
  data: {
    type: [Object, String, Number],
    default: () => undefined,
  },
  /**??????????????????. */
  disabled: {
    type: Boolean,
    default: false,
  },
});
const _btnTop = computed(() => props.btnTop);
const _transprent = computed(() => {
  if (_btnTop.value === true) return false;
  return true;
});
const _styletop = computed(() => {
  if (_btnTop.value !== true) return "top:15px";
  return "top:0px";
});

const _padding = computed(() => {
  return [0, 0];
});
const _disabled = computed(() => props.disabled);
const _load = ref(props.load);
const _active = ref(false);
const c_font_style = computed(() => {
  return {
    dotColor: props.dotColor,
    text: props.text,
    icon: props.icon,
    textSize: props.textSize,
    iconSize: props.iconSize,
    unicon: props.unicon,
  };
});
const uid = uni.$tm.u.getUid(1);
const tmTabbarWidth = inject(
  "tmTabbarWidth",
  computed(() => 50)
);
const _width = computed(() => {
  if (_btnTop.value === true) return 60;
  return tmTabbarWidth.value;
});
const nowUrl = inject(
  "tmTabbarUrl",
  computed(() => "")
);
const tmTabbarItemList = inject(
  "tmTabbarItemList",
  computed<Array<string | number>>(() => [])
);
const nowUid = inject(
  "tmTabbarUid",
  computed<string | number>(() => "")
);
const tmTabbarItemSafe = inject("tmTabbarItemSafe", false);
const tmTabbarItemActive = inject(
  "tmTabbarItemActive",
  computed(() => -1)
);
const tmTabbarItemAutoSelect = inject(
  "tmTabbarItemAutoSelect",
  computed(() => false)
);
const _color = computed(() => {
  if (_active.value === true && !_btnTop.value) {
    if (store.tmStore.color && props.followTheme) {
      return store.tmStore.color;
    }
    return props.activeColor;
  }
  return props.fontColor;
});

//???????????????
let parent: any = proxy?.$parent;
while (parent) {
  if (parent?.tmTabbarId == "tmTabbarId" || !parent) {
    break;
  } else {
    parent = parent?.$parent ?? undefined;
  }
}
if (parent) {
  parent.pushKey(uid);
}
onUnmounted(() => {
  if (parent) {
    parent.delKey(uid);
  }
});

if (tmTabbarItemAutoSelect.value) {
  _active.value = props.active || false;
} else {
  if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
    _active.value = true;
  } else {
    _active.value = false;
  }
}
function setActive() {
  if (nowUid.value == uid) {
    _active.value = true;
  } else {
    _active.value = false;
  }
}

watch([nowUid, () => props.active], () => {
  if (tmTabbarItemAutoSelect.value) {
    setActive();
  }
});
watch(tmTabbarItemActive, () => {
  if (!tmTabbarItemAutoSelect.value) {
    // ????????????????????????????????????active??????????????????
    if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
      nextTick(() => {
        _active.value = true;
      });
    } else {
      nextTick(() => {
        _active.value = false;
      });
    }
  }
});
watch([() => props.load], () => {
  _load.value = props.load;
});
async function itemClick() {
  if (_load.value || _disabled.value) return;
  if (typeof props.beforeClick === "function") {
    _load.value = true;
    let p = await props.beforeClick(props.data);
    if (typeof p === "function") {
      p = await p(props.data);
    }
    _load.value = false;
    if (!p) return;
  }

  emits("click");
  nextTick(() => {
    if (tmTabbarItemAutoSelect.value) {
      if (parent) {
        parent.setNowurl(props.url, uid);
      }
      setActive();
    }
    if (props.url == "") return;
    uni.$tm.u.routerTo(props.url, props.openType);
  });
}
</script>

<style scoped>
/* #ifndef APP-NVUE */
.anifun {
  animation: scale 0.2s ease;
}

@keyframes scale {
  0% {
    transform: scale(0.9);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

/* #endif */
</style>
