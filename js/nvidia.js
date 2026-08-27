/**
 * Fullscreen + key blocking — modernized for all browsers
 *
 * Changes:
 * - Removed mozRequestFullScreen / msRequestFullscreen (Firefox/IE legacy — not needed)
 * - Removed mozFullScreenElement / msFullscreenElement checks (not needed)
 * - Removed setInterval(forceFullScreen, 100) — aggressive polling is blocked
 *   by modern browsers and causes performance issues; replaced with event-driven approach
 * - Fullscreen must be triggered by a user gesture (click/keydown) — browser requirement
 * - Kept webkitRequestFullscreen / webkitFullscreenElement for Safari
 * - Works in: Chrome, Edge, Firefox, Safari, Opera
 */

(function () {
  function requestFullScreen(elem) {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      return;
    }
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(function () {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  function blockExitKeys(event) {
    var blockedKeys = ["F5", "F11", "F12", "Escape"];
    if (blockedKeys.indexOf(event.key) !== -1) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.ctrlKey && event.key === "w") {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  document.addEventListener("keydown", blockExitKeys);
  document.addEventListener("keyup", blockExitKeys);

  document.addEventListener("click", function () {
    requestFullScreen(document.documentElement);
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      requestFullScreen(document.documentElement);
    }
  });

  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      requestFullScreen(document.documentElement);
    }
  });

  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "";
  });
})();
