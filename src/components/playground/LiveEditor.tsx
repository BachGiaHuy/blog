"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Copy, Code2, Paintbrush, FileJson, Play } from "lucide-react";

export default function LiveEditor() {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "javascript">("html");
  const [html, setHtml] = useState('<div class="box">\n  <h1>Hello WPLearn!</h1>\n  <p>Hãy thử sửa code HTML, CSS hoặc JS ở bên trái để xem kết quả ngay bên phải nhé.</p>\n  <button id="btn">Click vào đây!</button>\n</div>');
  const [css, setCss] = useState('.box {\n  text-align: center;\n  font-family: sans-serif;\n  padding: 40px;\n  background: linear-gradient(135deg, #f0f9ff 0%, #cffafe 100%);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.05);\n}\nh1 {\n  color: #0369a1;\n  font-size: 2rem;\n}\nbutton {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: bold;\n  margin-top: 20px;\n  transition: all 0.3s ease;\n}\nbutton:hover {\n  background: #2563eb;\n  transform: translateY(-2px);\n}');
  const [js, setJs] = useState('document.getElementById("btn").addEventListener("click", () => {\n  alert("Bạn vừa tương tác thành công với đoạn mã Javascript!");\n});');
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250); // Debounce to avoid jittering

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleEditorChange = (value: string | undefined) => {
    const val = value || "";
    if (activeTab === "html") setHtml(val);
    else if (activeTab === "css") setCss(val);
    else setJs(val);
  };

  const currentCode = activeTab === "html" ? html : activeTab === "css" ? css : js;

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-[#0f172a] text-white p-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code2 className="w-6 h-6 text-blue-400" />
          <h2 className="font-bold text-lg font-serif tracking-wide">WPLearn Playground</h2>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button 
            onClick={() => setActiveTab("html")}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'html' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Code2 className="w-4 h-4" /> HTML
          </button>
          <button 
            onClick={() => setActiveTab("css")}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'css' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Paintbrush className="w-4 h-4" /> CSS
          </button>
          <button 
            onClick={() => setActiveTab("javascript")}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'javascript' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}
          >
            <FileJson className="w-4 h-4" /> JS
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Editor Pane */}
        <div className="flex-1 border-r border-gray-200 bg-[#1e1e1e] flex flex-col relative w-full lg:w-1/2">
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <span className="bg-black/50 text-gray-300 text-xs px-2 py-1 rounded backdrop-blur uppercase tracking-wider font-bold">
              {activeTab}
            </span>
          </div>
          <Editor
            height="100%"
            language={activeTab}
            theme="vs-dark"
            value={currentCode}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              formatOnPaste: true,
              scrollBeyondLastLine: false,
              padding: { top: 16 }
            }}
          />
        </div>

        {/* Output Pane */}
        <div className="flex-1 bg-white relative w-full lg:w-1/2">
          <div className="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur shadow-sm p-1.5 rounded-lg flex items-center text-xs font-bold text-gray-500 gap-1 uppercase tracking-wider border border-gray-100">
            <Play className="w-3.5 h-3.5 text-green-500 fill-current" /> Preview
          </div>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
