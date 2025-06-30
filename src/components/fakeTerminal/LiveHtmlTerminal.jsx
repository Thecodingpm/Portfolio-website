import React, { useState, useEffect, useRef } from "react";

const LiveHtmlTerminal = () => {
  const [selectedTab, setSelectedTab] = useState("HTML");
  const [htmlCode, setHtmlCode] = useState(`<!-- Edit HTML here -->
<h1>Counter: <span id="count">0</span></h1>
<button onclick="increment()">+</button>
<button onclick="decrement()">-</button>`);
  const [cssCode, setCssCode] = useState(`/* Edit CSS here */
body {
  background-color: black;
  color: lime;
  font-family: monospace;
  text-align: center;
  margin-top: 50px;
}
button {
  background-color: orange;
  color: black;
  font-weight: bold;
  padding: 10px;
  margin: 5px;
  border: none;
  cursor: pointer;
}`);
  const [jsCode, setJsCode] = useState(`// Edit JavaScript here
let count = 0;
function increment() {
  count++;
  document.getElementById('count').innerText = count;
}
function decrement() {
  count--;
  document.getElementById('count').innerText = count;
}`);

  const [output, setOutput] = useState("");

  useEffect(() => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            ${jsCode}
          </script>
        </body>
      </html>
    `;
    setOutput(fullHtml);
  }, [htmlCode, cssCode, jsCode]);

  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);

  const highlightCode = (code, type) => {
    if (type === "html") {
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span style="color:#6a9955;">$1</span>')
        .replace(/(&lt;\/?[a-zA-Z0-9\-]+)([^&]*?)(&gt;)/g, (match, p1, p2, p3) => {
          const attr = p2.replace(/([a-zA-Z\-]+)(=)("[^"]*"|'[^']*')/g, '<span style="color:#9cdcfe;">$1</span>$2<span style="color:#ce9178;">$3</span>');
          return `<span style="color:#569cd6;">${p1}</span>${attr}<span style="color:#569cd6;">${p3}</span>`;
        });
    } else if (type === "css") {
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6a9955;">$1</span>')
        .replace(/([^\{]+){/g, '<span style="color:#dcdcaa;">$1</span>{')
        .replace(/{([^}]*)}/g, (match, inner) => {
          const highlighted = inner.replace(/([a-zA-Z\-]+)(\s*:\s*)([^;{}]+)(;?)/g, (m, prop, colon, val, semi) => {
            return `<span style="color:#9cdcfe;">${prop}</span>${colon}<span style="color:#ce9178;">${val}</span>${semi}`;
          });
          return `{${highlighted}}`;
        });
    } else if (type === "js") {
      const keywords = "\\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield)\\b";
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, '<span style="color:#6a9955;">$1</span>')
        .replace(/("[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*')/g, '<span style="color:#ce9178;">$1</span>')
        .replace(new RegExp(keywords, "g"), '<span style="color:#569cd6;">$1</span>')
        .replace(/\b(\d+)\b/g, '<span style="color:#b5cea8;">$1</span>');
    }
    return code;
  };

  const handleInput = (e, type) => {
    const val = e.target.value;
    if (type === "html") setHtmlCode(val);
    else if (type === "css") setCssCode(val);
    else if (type === "js") setJsCode(val);
  };

  const renderEditor = (code, type) => {
    const highlighted = highlightCode(code, type);
    const ref = type === "html" ? htmlRef : type === "css" ? cssRef : jsRef;

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 230,
          backgroundColor: "#1e1e2f",
          border: "1px solid #555",
          borderRadius: "8px",
          fontSize: 14,
          fontFamily: "'Fira Code', monospace, monospace",
          overflow: "hidden",
          padding: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 10,
            whiteSpace: "pre-wrap",
            pointerEvents: "none",
            zIndex: 1,
            color: "#ccc",
            fontFamily: "'Fira Code', monospace",
          }}
          dangerouslySetInnerHTML={{ __html: highlighted + "<br />" }}
        />

        <textarea
          ref={ref}
          value={code}
          onChange={(e) => handleInput(e, type)}
          spellCheck={false}
          style={{
            position: "relative",
            zIndex: 2,
            background: "transparent",
            color: "transparent",
            caretColor: "#fff",
            outline: "none",
            border: "none",
            resize: "none",
            width: "100%",
            height: "100%",
            padding: 10,
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            lineHeight: "1.4em",
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        height: "700px", // Set total height of the container as needed
        position: "relative",
        padding: "20px",
        background: "#1f1f2f",
        borderRadius: "0 0 8px 8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        color: "#e0e0e0",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Heading or other content on top */}
      <h2 style={{ marginBottom: "16px" }}>My Custom Heading</h2>

      {/* Terminal and tabs pinned to bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 20px 20px 20px",
          background: "#1e1e2f",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            marginBottom: "6px",
            display: "flex",
            gap: "2px",
            padding: "8px 10px 0 10px",
          }}
        >
          <button
            onClick={() => setSelectedTab("HTML")}
            style={{
              marginRight: "2px",
              padding: "4.5px 12px",
              backgroundColor: selectedTab === "HTML" ? "#61dafb" : "#282c34",
              color: "#fff",
              border: "none",
              borderRadius: "5px 5px 0 0",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            HTML
          </button>
          <button
            onClick={() => setSelectedTab("CSS")}
            style={{
              marginRight: "2px",
              padding: "4.5px 12px",
              backgroundColor: selectedTab === "CSS" ? "#61dafb" : "#282c34",
              color: "#fff",
              border: "none",
              borderRadius: "5px 5px 0 0",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            CSS
          </button>
          <button
            onClick={() => setSelectedTab("JS")}
            style={{
              padding: "4.5px 12px",
              backgroundColor: selectedTab === "JS" ? "#61dafb" : "#282c34",
              color: "#fff",
              border: "none",
              borderRadius: "5px 5px 0 0",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            JS
          </button>
        </div>

        <div style={{ margin: "0 10px 0 10px" }}>
          {selectedTab === "HTML"
            ? renderEditor(htmlCode, "html")
            : selectedTab === "CSS"
            ? renderEditor(cssCode, "css")
            : renderEditor(jsCode, "js")}
        </div>

        <div style={{ margin: "18px 0 0 0" }}>
          <div
            style={{
              background: "#2b2b3a",
              padding: "5px 10px",
              color: "#fff",
              fontSize: "13px",
              borderTop: "1px solid #444",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            Live Preview
          </div>
          <iframe
            title="Live Preview"
            srcDoc={output}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "0 0 8px 8px",
              backgroundColor: "#000",
              border: "none",
              boxShadow: "none",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveHtmlTerminal;
