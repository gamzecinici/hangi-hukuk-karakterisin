(function () {
  "use strict";

  // If we're on the homepage, always clear any quiz state so index is a clean start
  if (document.body && document.body.classList.contains("page-home")) {
    try {
      // Use sessionStorage to keep state ephemeral; clear any quiz keys on homepage load
      sessionStorage.removeItem("quizAnswers");
      sessionStorage.removeItem("quizResult");
      sessionStorage.removeItem("quizIndex");
      // Also remove localStorage keys if present (cleanup only)
      try {
        localStorage.removeItem("quizAnswers");
        localStorage.removeItem("quizResult");
        localStorage.removeItem("quizIndex");
      } catch (e) {}
    } catch (e) {
      // ignore storage errors
    }
  }

  // When clicking "Teste Başla" on the homepage, mark a session token so quiz.html
  // knows this was a fresh navigation (not a reload). This token is removed by quiz.js
  // when quiz starts. This prevents F5 from resuming the quiz.
  if (document.body && document.body.classList.contains("page-home")) {
    document.querySelectorAll('a[href$="quiz.html"]').forEach(function (link) {
      link.addEventListener('click', function () {
        try {
          sessionStorage.setItem('quizStarted', '1');
        } catch (e) {}
      });
    });
  }

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  if (!toggle || !nav) return;

  // Add a close (X) button inside the menu for easy closing when open
  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'menu-close';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', function () {
    setOpen(false);
    try { toggle.focus(); } catch (e) {}
  });
  // Insert as first child of nav so it's available visually in the menu
  try {
    nav.insertBefore(closeBtn, nav.firstChild);
  } catch (e) {
    nav.appendChild(closeBtn);
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    nav.hidden = !open;
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    // focus the close button when menu opens for accessibility
    if (open) {
      try { closeBtn.focus(); } catch (e) {}
    }
  }

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
})();
