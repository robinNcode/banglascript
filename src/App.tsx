import { useState } from 'react';
import { parse } from './parser';
import { transpile } from './transpiler.ts';
import './App.css';

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