(function () {
  "use strict";

  function fallbackCopy(text) {
    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.focus();
    input.select();
    var copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      document.body.removeChild(input);
    }
    return copied;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  document.querySelectorAll("[data-copy-email]").forEach(function (button) {
    button.addEventListener("click", function () {
      var email = button.getAttribute("data-copy-email");
      var status = document.getElementById(button.getAttribute("data-copy-status"));
      copyText(email).then(function (copied) {
        if (!status) return;
        status.textContent = copied ? "已复制到剪贴板" : "复制失败，请手动选择邮箱";
        status.classList.toggle("copy-failed", !copied);
        window.setTimeout(function () {
          status.textContent = "";
          status.classList.remove("copy-failed");
        }, 2600);
      }).catch(function () {
        if (!status) return;
        status.textContent = "复制失败，请手动选择邮箱";
        status.classList.add("copy-failed");
      });
    });
  });
}());
