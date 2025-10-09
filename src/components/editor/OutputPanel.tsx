import React from 'react';
import { Trash, Copy, Terminal } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  setOutput: (output: string) => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, setOutput }) => {
  const isError = output.includes('ত্রুটি');
  
  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 text-sm font-semibold">কনসোল</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-slate-400 hover:text-white transition-colors"
            title="আউটপুট কপি করুন"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOutput('')}
            className="text-slate-400 hover:text-white transition-colors"
            title="কনসোল পরিষ্কার করুন"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre className={`whitespace-pre-wrap ${isError ? 'text-red-400' : 'text-green-300'}`}>
          {output || <span className="text-slate-500">চালানোর জন্য অপেক্ষা করা হচ্ছে...</span>}
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;