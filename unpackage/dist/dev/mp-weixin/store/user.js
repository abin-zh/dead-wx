"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: "",
    userinfo: {
      id: 0,
      state: 0,
      userName: "",
      userType: "",
      token: "",
      binding: 0,
      email: "",
      mobile: ""
    },
    wx_userinfo: {
      nickName: "",
      avatarUrl: "",
      openid: ""
    }
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    fillUser(userinfo) {
      this.userinfo = userinfo;
    },
    saveWxUserinfo(wxUserinfo) {
      this.wx_userinfo = wxUserinfo;
    },
    setAll(token, userinfo, wx_userinfo) {
      this.token = token;
      this.userinfo = userinfo;
      this.wx_userinfo = wx_userinfo;
    }
  },
  persist: {
    enabled: true,
    H5Storage: window == null ? void 0 : window.localStorage
  }
});
exports.useUserStore = useUserStore;
