"use strict";
const common_vendor = require("../common/vendor.js");
const store_user = require("../store/user.js");
const whiteList = [
  "/",
  "/pages/index/index",
  "/pages/my/my",
  "/pages/index/login",
  "/pages/index/register",
  "/pages/index/wiki",
  "/pages/index/crop",
  "/pages/index/mqtt",
  "/pages/index/wx_login",
  "/pages/my/articles/articles",
  "/pages/my/articles/create"
];
function hasPermission(url) {
  if (authList.includes(url)) {
    console.log("授权", url);
    const userStore = store_user.useUserStore();
    const token = userStore.userinfo.token;
    if (token != null && token.length > 0) {
      return true;
    } else {
      common_vendor.index.reLaunch({
        url: "/pages/index/wx_login"
      });
      return false;
    }
  } else {
    return true;
  }
}
async function routingIntercept() {
  const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    common_vendor.index.addInterceptor(item, {
      invoke(e) {
        const url = e.url.split("?")[0];
        if (whiteList.includes(url) || hasPermission()) {
          console.log("url", url, e);
          return true;
        } else {
          common_vendor.index.showToast({
            title: "用户没有权限...",
            duration: 2e3,
            icon: "none"
          });
          return false;
        }
      },
      fail() {
        return false;
      }
    });
  });
}
exports.routingIntercept = routingIntercept;
