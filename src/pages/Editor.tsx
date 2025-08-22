import {useState, useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import Navbar from '../components/Navbar';
import {transpile} from '../lib/transpiler';
import {parse} from '../lib/parser';
import {translateErrorToBengali} from '../lib/error_translator';
import { EditorView } from '@codemirror/view';
import { undo, redo } from '@codemirror/commands';

// Icons
import {RotateCcw, RotateCw, Play, TimerReset, FilePlus, X} from 'lucide-react';

interface File {
  name: string;
  content: string;
}

export default function Editor() {
  const [files, setFiles] = useState<File[]>([{ name: 'main.bs', content: 'দেখাও("হ্যালো, বিশ্ব!");' }]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [output, setOutput] = useState('');
  const editorRef = useRef<EditorView | null>(null);

  const activeFile = files[activeFileIndex];
  const code = activeFile?.content || '';

  const setCode = (content: string) => {
    const newFiles = [...files];
    newFiles[activeFileIndex].content = content;
    setFiles(newFiles);
  };

  const run = () => {
    if (!activeFile) return;
    try {
      const ast = parse(code);
      const result = transpile(ast);
      // Debugging
      console.log(`[DEBUG]: Transpiled code: ${result}`);

      const originalLog = console.log;
      let capturedOutput = '';
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\n';
      };

      try {
        new Function(result)();
        setOutput(capturedOutput);
      } catch (e: any) {
        setOutput(translateErrorToBengali(e.message));
      } finally {
        console.log = originalLog;
      }
    } catch (err: any) {
      setOutput(translateErrorToBengali(err.message));
    }
  };

  const reset = () => {
    if (!activeFile) return;
    setCode('');
    setOutput('');
  };

  const newFile = () => {
    const newFileName = `file${files.length + 1}.bs`;
    setFiles([...files, { name: newFileName, content: '' }]);
    setActiveFileIndex(files.length);
  };

  const closeFile = (index: number) => {
    if (files.length <= 1) return; // Prevent closing the last file
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    if (activeFileIndex >= index) {
      setActiveFileIndex(Math.max(0, activeFileIndex - 1));
    }
  };

  const handleUndo = () => {
    if (editorRef.current) {
      undo(editorRef.current);
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      redo(editorRef.current);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Toolbar & File Tabs */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-300">
          <div className="flex items-center gap-2">
            {files.map((file, index) => (
              <div key={index} className={`flex items-center gap-2 px-4 py-2 ${ index === activeFileIndex
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                <button onClick={() => setActiveFileIndex(index)} title={file.name}>
                  {file.name}
                </button>
                {index > 0 && (
                  <button onClick={() => closeFile(index)} className="hover:text-red-500" title="ফাইল বন্ধ করুন">
                    <X className="w-4 h-4"/>
                  </button>
                )}
              </div>
            ))}

            <button onClick={newFile} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-blue-600" title="নতুন ফাইল">
              <FilePlus className="w-4 h-5"/>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={run} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700" title="রান">
              <Play className="w-4 h-4"/>
            </button>
            <button onClick={reset} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600" title="রিসেট">
              <TimerReset className="w-4 h-4"/>
            </button>
            <button onClick={handleUndo} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" title="আগের অবস্থায় ফিরুন">
              <RotateCcw className="w-4 h-4"/>
            </button>
            <button onClick={handleRedo} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" title="পুনরায় করুন">
              <RotateCw className="w-4 h-4"/>
            </button>
          </div>
        </div>


        {/* Editor */}
        <div className="flex-1 overflow-auto bg-gray-800 text-white">
          {activeFile && (
            <CodeMirror
              value={code}
              height="100%"
              theme="dark"
              extensions={[javascript()]} // This is where the javascript language extension is applied
              onChange={(value, viewUpdate) => {
                setCode(value);
                editorRef.current = viewUpdate.view;
              }}
              className="h-full"
            />
          )}
        </div>

        {/* Output */}
        <div className="h-[30%] bg-black text-green-400 p-4 font-mono overflow-auto border-t border-gray-700">
          <pre>{output}</pre>
        </div>
      </div>
    </>
  );
}

