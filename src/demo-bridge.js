/* Loaded only by API_MODE=demo. Native provider actions stay entirely on localhost. */
(() => {
  if (['upstream', 'ruoyi'].includes(window.__H5_SERVER_MODE__)) return;
  const pay = (params, success, fail) => {
    uni.showModal({
      title: "模拟支付",
      content: "当前为本地演示。确认后将更新演示订单，不会产生真实扣款。",
      success: async (result) => {
        if (!result.confirm) {
          fail?.({ errMsg: "requestPayment:fail cancel" });
          return;
        }
        try {
          const response = await fetch("/demo/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: uni.getStorageSync("TOKEN"),
            },
            body: JSON.stringify(params),
          });
          const data = await response.json();
          if (data.code !== 1) {
            uni.showToast({ title: data.msg, icon: "none" });
            fail?.({ errMsg: data.msg });
            return;
          }
          uni.showToast({ title: "模拟支付成功", icon: "none" });
          success?.(data);
        } catch (error) {
          uni.showToast({ title: "本地服务连接失败", icon: "none" });
          fail?.({ errMsg: error.message });
        }
      },
    });
  };
  window.WeixinJSBridge = {
    on() {},
    invoke(name, params, callback) {
      if (name !== "getBrandWCPayRequest") {
        callback?.({ err_msg: name + ":ok" });
        return;
      }
      pay(
        {
          trade_no: String(params.package || "").replace("prepay_id=", ""),
          channel: "微信",
        },
        () => callback?.({ err_msg: "get_brand_wcpay_request:ok" }),
        () => callback?.({ err_msg: "get_brand_wcpay_request:cancel" }),
      );
    },
  };
  uni.requestPayment = (options) =>
    pay(
      {
        trade_no: String(
          options.package || options.orderInfo?.prepayid || "",
        ).replace("prepay_id=", ""),
        channel: options.provider || "模拟",
      },
      () => {
        options.success?.({ errMsg: "requestPayment:ok" });
        options.complete?.();
      },
      (error) => {
        options.fail?.(error);
        options.complete?.();
      },
    );
  uni.requestSubscribeMessage = (options) =>
    options.success?.({ errMsg: "requestSubscribeMessage:ok" });
  uni.saveImageToPhotosAlbum = (options) => {
    const link = document.createElement("a");
    link.href = options.filePath;
    link.download = "鑫芮商贸分享图片.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    options.success?.({ errMsg: "saveImageToPhotosAlbum:ok" });
    options.complete?.();
  };
  let active = false;
  function cashier() {
    const params = new URLSearchParams(location.hash.split("?")[1] || "");
    const id = params.get("demo_pay_order");
    if (!id || active) return;
    active = true;
    const returnTo =
      Number(params.get("order_type")) === 5
        ? "/pages/integral/jforder"
        : "/pages/order/shoporder";
    const finish = () => {
      active = false;
      uni.redirectTo({ url: returnTo + "?showTab=all" });
    };
    pay({ order_id: id, channel: "支付宝" }, finish, finish);
  }
  window.addEventListener("hashchange", cashier);
  setTimeout(cashier, 250);
})();
