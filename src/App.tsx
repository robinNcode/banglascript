import { useState } from 'react';
import { parse } from './lib/parser.ts';
import { transpile } from './lib/transpiler.ts';
import { banglascript } from './lib/banglascript_mode.ts';

// Importing styles
import './App.css';

// Editor component for BanglaScript code
import CodeMirror from '@uiw/react-codemirror';


const App = () => {
  const [code, setCode] = useState('দেখাও("হ্যালো, বিশ্ব!");');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    setOutput('');
    setError('');
    try {
      // 1. Parse the code to an AST
      const ast = parse(code);

      // 2. Transpile the AST to JavaScript
      const jsCode = transpile(ast);

      // 3. Execute the transpiled code in a sandboxed environment
      const browserConsole = {
        log: (...args: any[]) => {
          setOutput(prev => prev + args.join(' ') + '\n');
        }
      };
      
      // The `new Function` approach is a simple way to sandbox code
      new Function('console', jsCode)(browserConsole);

    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="container">
      <h1>বাংলাস্ক্রিপ্ট অনলাইন সম্পাদক</h1>
      <CodeMirror value={code} onChange={setCode} extensions={[banglascript()]} theme="dark" />
      <div className="editor-container">
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={runCode} className="run-button">
          চালু করুন (Run)
        </button>
      </div>
      <div className="output-container">
        <h2>আউটপুট (Output)</h2>
        <pre className="output-area">{output}</pre>
        {error && <pre className="error-area">Error: {error}</pre>}
      </div>
    </div>
  );
};

export default App;