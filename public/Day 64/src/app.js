const editor = document.getElementById("codeEditor");

// 🔥 AUTO SAVE feature
editor.addEventListener("input", () => {
  localStorage.setItem("savedCode", editor.value);
});

window.addEventListener("load", () => {
  editor.value = localStorage.getItem("savedCode") || "";
});

const outputFrame = document.getElementById("outputFrame");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const languageSelect = document.getElementById("languageSelect");

runBtn.addEventListener("click", () => {
  const code = editor.value;
  const lang = languageSelect.value;

  if (lang === "html") {
    outputFrame.srcdoc = code;
    return;
  }

  if (lang === "css") {
    outputFrame.srcdoc = `
      <html>
        <head>
          <style>${code}</style>
        </head>
        <body></body>
      </html>
    `;
    return;
  }

  if (lang === "javascript") {
    outputFrame.srcdoc = `
      <html>
        <body>
          <pre id="output"></pre>

          <script>
            const outputEl = document.getElementById("output");

            console.log = function (...args) {
              outputEl.innerHTML += args.join(" ") + "\\n";
            };

            try {
              ${code}
            } catch (err) {
              outputEl.innerHTML += err;
            }
          </script>
        </body>
      </html>
    `;
  }


  const output = document.getElementById("output");
const isDark = document.body.classList.contains("dark");

output.contentDocument.body.style.color = isDark ? "white" : "black";
output.contentDocument.body.style.background = isDark ? "#1e1e1e" : "white";
});

clearBtn.addEventListener("click", () => {
  editor.value = "";
  outputFrame.srcdoc = "";
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("savedCode", editor.value);
  alert("Code saved locally");
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("savedCode");
  if (saved) editor.value = saved;
});


editor.addEventListener("input", runCode);

function runCode() {
  const code = editor.value;
  const lang = languageSelect.value;

  if (lang === "html") {
    outputFrame.srcdoc = code;
  }

  else if (lang === "css") {
    outputFrame.srcdoc = `<style>${code}</style>`;
  }

  else if (lang === "javascript") {
    outputFrame.srcdoc = `
      <script>
      try {
        ${code}
      } catch(e){
        parent.postMessage(e.message,"*");
      }
      <\/script>`;
  }

  else {
    outputFrame.srcdoc =
      "<h3>This language needs backend compiler</h3>";
  }
}


const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});



const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "code.txt";
  a.click();
});


const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  document.body.classList.toggle("fullscreen");
});


const consoleOutput = document.getElementById("consoleOutput");

window.addEventListener("message", (e) => {
  consoleOutput.innerText += e.data + "\n";
});