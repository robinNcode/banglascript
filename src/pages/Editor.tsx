import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Navbar from '../components/Navbar';
import { transpile } from '../lib/transpiler';
import { parse } from '../lib/parser';
import { translateErrorToBengali } from '../lib/error_translator';

export default function Editor() {
  const [code, setCode] = useState('দেখাও("হ্যালো, বিশ্ব!");');
  const [output, setOutput] = useState('');

  const run = () => {
    try {
      const ast = parse(code);
      const result = transpile(ast);
      setOutput(result);
    } catch (err: any) {
      setOutput(translateErrorToBengali(err.message));
    }
  };

  const reset = () => {
    setCode('');
    setOutput('');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Toolbar */}
        <div className="flex gap-4 px-4 py-2 bg-gray-100 border-b border-gray-300">
          <button onClick={run} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Run</button>
          <button onClick={reset} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">Reset</button>
          <button onClick={() => document.execCommand('undo')} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Undo</button>
          <button onClick={() => document.execCommand('redo')} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Redo</button>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-auto">
          <CodeMirror
            value={code}
            height="100%"
            theme="dark"
            extensions={[javascript()]} // Replace with your BanglaScript mode later
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* Output */}
        <div className="h-[30%] bg-black text-green-400 p-4 font-mono overflow-auto border-t border-gray-700">
          <pre>{output}</pre>
        </div>
      </div>
    </>
  );
}
