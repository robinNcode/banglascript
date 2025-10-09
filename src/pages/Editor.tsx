import React, { useState, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Navbar from '../components/Navbar';
import Sidebar from '../components/editor/Sidebar';
import Toolbar from '../components/editor/Toolbar';
import CodeEditor from '../components/editor/CodeEditor';
import OutputPanel from '../components/editor/OutputPanel';
import { transpile } from '../lib/transpiler';
import { parse } from '../lib/parser';
import { translateErrorToBengali } from '../lib/error_translator';

export interface File {
  name: string;
  content: string;
  isSaved: boolean;
}

const Editor: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    { name: 'main.bs', content: 'দেখাও("হ্যালো, বিশ্ব!");', isSaved: true },
  ]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [output, setOutput] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const editorRef = useRef<EditorView | null>(null);

  const activeFile = files[activeFileIndex];

  const setCode = (content: string) => {
    const newFiles = [...files];
    if (newFiles[activeFileIndex]) {
      newFiles[activeFileIndex].content = content;
      newFiles[activeFileIndex].isSaved = false;
      setFiles(newFiles);
    }
  };

  const runCode = () => {
    if (!activeFile) return;
    try {
      const ast = parse(activeFile.content);
      const result = transpile(ast);

      const originalLog = console.log;
      let capturedOutput = '';
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\n';
      };

      try {
        new Function(result)();
        setOutput(capturedOutput.trim() || '✓ কোড সফলভাবে চলেছে');
      } catch (e: any) {
        setOutput(translateErrorToBengali(e.message));
      } finally {
        console.log = originalLog;
      }
    } catch (err: any) {
      setOutput(translateErrorToBengali(err.message));
    }
  };

  const resetCode = () => {
    if (!activeFile) return;
    setCode('');
    setOutput('');
  };

  const saveFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Mark file as saved
    const newFiles = [...files];
    if (newFiles[activeFileIndex]) {
        newFiles[activeFileIndex].isSaved = true;
        setFiles(newFiles);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={files}
          activeFileIndex={activeFileIndex}
          setActiveFileIndex={setActiveFileIndex}
          setFiles={setFiles}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <main className="flex-1 flex flex-col min-w-0">
          <Toolbar
            activeFile={activeFile}
            runCode={runCode}
            resetCode={resetCode}
            saveFile={saveFile}
            editorRef={editorRef}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <PanelGroup direction="vertical" className="flex-1 overflow-hidden">
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full w-full bg-[#272822]">
                {activeFile && (
                  <CodeEditor
                    key={activeFile.name} // Force re-mount when file changes
                    code={activeFile.content}
                    setCode={setCode}
                    editorRef={editorRef}
                  />
                )}
              </div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-slate-800 hover:bg-blue-600 transition-colors data-[resize-handle-state=drag]:bg-blue-600" />
            <Panel defaultSize={30} minSize={10} collapsible>
              <OutputPanel output={output} setOutput={setOutput} />
            </Panel>
          </PanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Editor;