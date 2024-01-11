"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  setup() {
    const userStore = store_user.useUserStore();
    return {
      userStore
    };
  },
  data() {
    return {
      bgColor: "#2979ff",
      fontColor: "#ffffff",
      //只能设置白色和黑色
      value: 9,
      avatarUrl: "",
      nickName: ""
    };
  },
  onShow() {
  },
  onLoad() {
    const { nickName, avatarUrl } = this.userStore.wx_userinfo;
    this.avatarUrl = avatarUrl;
    this.nickName = nickName;
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgColor,
      frontColor: this.fontColor
    });
  },
  methods: {
    btnScanCode() {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        success(res) {
          console.log("success", res);
        },
        fail(err) {
          console.log("fail", err);
        }
      });
    },
    btnMyPic() {
      common_vendor.index.chooseImage({
        extension: ["png", "jpg"],
        crop: {
          width: 100,
          height: 100
        },
        success(res) {
          console.log("success", res);
        },
        fail(err) {
          console.log("fail", err);
        }
      });
    },
    toArticles() {
      common_vendor.index.navigateTo({
        url: "/pages/my/articles/articles"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  (_easycom_uni_icons2 + _easycom_uni_nav_bar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.btnScanCode),
    b: common_vendor.p({
      type: "scan",
      size: "24",
      color: "#d4e4ff"
    }),
    c: common_vendor.p({
      type: "settings",
      size: "24",
      color: "#d4e4ff"
    }),
    d: $data.bgColor,
    e: $data.avatarUrl == ""
  }, $data.avatarUrl == "" ? {
    f: common_vendor.p({
      type: "person",
      size: "60",
      color: "white"
    })
  } : {
    g: $data.avatarUrl
  }, {
    h: common_vendor.o($options.btnMyPic),
    i: common_vendor.p({
      type: "cloud-upload",
      size: "18",
      color: "#d4e4ff"
    }),
    j: common_vendor.t($data.nickName),
    k: common_vendor.t($setup.userStore.userinfo.email),
    l: $data.bgColor,
    m: common_vendor.o($options.toArticles),
    n: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "我的文章"
    }),
    o: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "开启阴影"
    }),
    p: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "开启阴影"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/vue/dead-wx/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
