"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "things",
  props: {
    msg: ""
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.msg)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/vue/dead-wx/components/things.vue"]]);
wx.createComponent(Component);
