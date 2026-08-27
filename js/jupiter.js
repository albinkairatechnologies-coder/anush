/**
 * Exit intent popup — modernized for all browsers
 *
 * Changes:
 * - Removed addEvent() IE helper (used attachEvent) → standard addEventListener()
 * - Replaced mouseout + evt.toElement (Chrome-only, non-standard)
 *   with document mouseleave + evt.relatedTarget (W3C standard)
 * - .click() → .on("click") for jQuery 3 compatibility
 * - Works in: Chrome, Edge, Firefox, Safari, Opera
 */

document.addEventListener("mouseleave", function (evt) {
  if (
    evt.clientY <= 0 ||
    evt.clientX <= 0 ||
    evt.clientX >= window.innerWidth ||
    evt.clientY >= window.innerHeight
  ) {
    $(".lightbox").slideDown();
  }
});

$(document).ready(function () {
  $("a.close").on("click", function () {
    $(".lightbox").slideUp();
  });

  $("body").on("click", function () {
    $(".lightbox").slideUp();
  });
});
