"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    store_user.useUserStore();
    const myForm = common_vendor.ref(null);
    const loginModel = common_vendor.reactive({
      email: "",
      password: ""
    });
    const rules = {
      email: {
        rules: [
          {
            required: true,
            errorMessage: "必填项"
          },
          {
            format: "email",
            errorMessage: "邮件格式错误"
          }
        ]
      }
    };
    function toRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/index/register",
        success(res) {
          console.log(res);
        },
        fail(res) {
          console.log(res);
        }
      });
    }
    const toWxLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/wx_login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => loginModel.email = $event),
        c: common_vendor.p({
          placeholder: "请输入电子邮箱",
          ["suffix-icon"]: "email",
          modelValue: loginModel.email
        }),
        d: common_vendor.p({
          name: "email"
        }),
        e: common_vendor.o(($event) => loginModel.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: loginModel.password
        }),
        g: common_vendor.p({
          name: "password"
        }),
        h: common_vendor.o((...args) => _ctx.wxlogin && _ctx.wxlogin(...args)),
        i: common_vendor.o(toRegister),
        j: common_vendor.o(toWxLogin),
        k: common_vendor.sr(myForm, "fa14255b-0", {
          "k": "myForm"
        }),
        l: common_vendor.p({
          modelValue: loginModel,
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa14255b"], ["__file", "C:/vue/dead-wx/pages/index/login.vue"]]);
wx.createPage(MiniProgramPage);
