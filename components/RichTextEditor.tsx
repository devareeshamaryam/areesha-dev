 "use client";

import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (editorRef.current && isFirstRender.current) {
      editorRef.current.innerHTML = value || "";
      isFirstRender.current = false;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => execCommand("bold")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bold">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
          </svg>
        </button>
        <button type="button" onClick={() => execCommand("italic")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Italic">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
          </svg>
        </button>
        <button type="button" onClick={() => execCommand("underline")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Underline">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
          </svg>
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => execCommand("formatBlock", "<h1>")} className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-semibold" title="Heading 1">H1</button>
        <button type="button" onClick={() => execCommand("formatBlock", "<h2>")} className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-semibold" title="Heading 2">H2</button>
        <button type="button" onClick={() => execCommand("formatBlock", "<h3>")} className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-semibold" title="Heading 3">H3</button>
        <button type="button" onClick={() => execCommand("formatBlock", "<p>")} className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm" title="Paragraph">P</button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => execCommand("insertUnorderedList")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bullet List">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
          </svg>
        </button>
        <button type="button" onClick={() => execCommand("insertOrderedList")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Numbered List">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
          </svg>
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => { const url = prompt("Enter URL:"); if (url) execCommand("createLink", url); }} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Insert Link">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
        </button>
        <button type="button" onClick={() => execCommand("removeFormat")} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Clear Formatting">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/>
          </svg>
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder || "Start writing..."}
        className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none prose prose-sm max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        style={{ wordBreak: "break-word" }}
        suppressContentEditableWarning
      />
    </div>
  );
}