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

const themeBtn = document.getElementById("themeBtn");
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const fullBtn = document.getElementById("fullBtn");

const container = document.querySelector(".editor-container");


/* Initialize CodeMirror */

const editor = CodeMirror.fromTextArea(
  document.getElementById("codeEditor"),
  {
    mode: "javascript",
    theme: "default",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
  }
);


/* Load Saved Code */

window.addEventListener("load", () => {

  const saved = localStorage.getItem("savedCode");
  if (saved) editor.setValue(saved);

  const theme = localStorage.getItem("theme");
  if (theme === "dark") enableDark();

});


/* Language Change */

languageSelect.addEventListener("change", () => {

  editor.setOption("mode", languageSelect.value);

});


/* Run Code */

runBtn.addEventListener("click", () => {

  const code = editor.getValue();
  const lang = languageSelect.value;


  if (lang === "htmlmixed") {

    outputFrame.srcdoc = code;
    return;

  }

  if (lang === "css") {

    outputFrame.srcdoc = `
      <html>
        <head>
          <style>${code}</style>
        </head>
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

            const out = document.getElementById("output");

            console.log = function(...args){
              out.innerHTML += args.join(" ") + "\\n";
            }

            try{
              ${code}
            }catch(e){
              out.innerHTML += e;
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


/* Clear */

clearBtn.addEventListener("click", () => {

  editor.setValue("");
  outputFrame.srcdoc = "";

});


/* Save */

saveBtn.addEventListener("click", () => {

  localStorage.setItem("savedCode", editor.getValue());
  alert("Code Saved!");

});


/* Theme Toggle */

function enableDark() {

  document.body.classList.add("dark");
  editor.setOption("theme", "dracula");

  themeBtn.innerText = "☀ Light";

  localStorage.setItem("theme", "dark");

}

function disableDark() {

  document.body.classList.remove("dark");
  editor.setOption("theme", "default");

  themeBtn.innerText = "🌙 Dark";

  localStorage.setItem("theme", "light");

}


themeBtn.addEventListener("click", () => {

  if (document.body.classList.contains("dark")) {
    disableDark();
  } else {
    enableDark();
  }

});


/* Font Size */

let fontSize = 14;

increaseFont.addEventListener("click", () => {

  fontSize += 1;
  editor.getWrapperElement().style.fontSize = fontSize + "px";
  editor.refresh();

});

decreaseFont.addEventListener("click", () => {

  if (fontSize > 10) {

    fontSize -= 1;
    editor.getWrapperElement().style.fontSize = fontSize + "px";
    editor.refresh();

  }

});


/* Fullscreen */

fullBtn.addEventListener("click", () => {

  container.classList.toggle("fullscreen");
  editor.refresh();

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