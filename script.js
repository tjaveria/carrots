// ====== CONFIG ======
// Change this to your desired passcode:
const PASSCODE = "Rufus0809"; // example: Valentine's Day
// Optional: store a "name" for a cuter error message
const CUTE_NAME = "Carrots";

// ====== PASSCODE GATE (index.html) ======
const passForm = document.getElementById("passForm");
const passInput = document.getElementById("passcode");
const errorEl = document.getElementById("error");

if (passForm && passInput) {
  passForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = passInput.value.trim();

    if (val === PASSCODE) {
      // save unlocked status for a nicer flow
      localStorage.setItem("valentineUnlocked", "true");
      window.location.href = "ask.html";
    } else {
      localStorage.setItem("valentineUnlocked", "false");
      errorEl.textContent = `Nope 😅 Try again, ${CUTE_NAME}.`;
      passInput.value = "";
      passInput.focus();
      shake(passForm);
    }
  });
}

// ====== PROTECT ask.html (optional) ======
// If you want ask.html to require unlocking first, keep this on.
// If you want ask.html accessible directly, delete this block.
if (window.location.pathname.endsWith("ask.html")) {
  const ok = localStorage.getItem("valentineUnlocked") === "true";
  if (!ok) window.location.replace("index.html");
}

// ====== "NO" BUTTON DODGE (ask.html) ======
const noBtn = document.getElementById("noBtn");
const noMsg = document.getElementById("noMsg");

if (noBtn) {
  let tries = 0;

  const messages = [
    "Wait… are you sure? 😭",
    "That button seems suspicious…",
    "I don’t think you meant that 😌",
    "Be serious rn 😤",
    "Okay fine, you can’t press it 😂",
  ];

  noBtn.addEventListener("mouseenter", () => {
    tries++;
    if (noMsg) noMsg.textContent = messages[Math.min(tries - 1, messages.length - 1)];
    yeetButton(noBtn);
  });

  noBtn.addEventListener("click", () => {
    tries++;
    if (noMsg) noMsg.textContent = "Nice try 😌";
    yeetButton(noBtn);
  });
}

function yeetButton(btn) {
  const padding = 16;
  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.max(padding, Math.floor(Math.random() * maxX));
  const y = Math.max(padding, Math.floor(Math.random() * maxY));

  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

// ====== RESET (yes.html) ======
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("valentineUnlocked");
  });
}

// ====== LITTLE SHAKE ANIMATION ======
function shake(el) {
  el.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(0px)" },
    ],
    { duration: 300, iterations: 1 }
  );
}
