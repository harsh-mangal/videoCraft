(function () {
  try {
    var saved;
    try { saved = window.localStorage && window.localStorage.getItem("videocrafts-theme"); } catch (_) { saved = null; }
    if (!saved) {
      var match = (document.cookie || "").match(/(?:^|; )videocrafts-theme=(dark|light)(?:;|$)/);
      saved = match && match[1];
    }
    var dark = saved ? saved === "dark" : typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#111513" : "#4D504A");
  } catch (_) {
    document.documentElement.classList.remove("dark");
  }
}());
