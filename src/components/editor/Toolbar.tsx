import React, {useEffect, useCallback} from 'react';
import {RotateCcw, RotateCw, Play, Trash2, Download, Menu} from 'lucide-react';
import {EditorView} from '@codemirror/view';
import {undo, redo} from '@codemirror/commands';

import type {File} from '../../pages/Editor';

interface ToolbarProps {
  activeFile: File | undefined;
  runCode: () => void;
  resetCode: () => void;
  saveFile: () => void;
  editorRef: React.MutableRefObject<EditorView | null>;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
                                           activeFile,
                                           runCode,
                                           resetCode,
                                           saveFile,
                                           editorRef,
                                           showSidebar,
                                           setShowSidebar,
                                         }) => {
  const handleUndo = useCallback(() => {
    if (editorRef.current) {
      undo(editorRef.current);
    }
  }, [editorRef]);

  const handleRedo = useCallback(() => {
    if (editorRef.current) {
      redo(editorRef.current);
    }
  }, [editorRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveFile();
            break;
          case 'r':
            e.preventDefault();
            runCode();
            break;
          case 'z':
            e.preventDefault();
            handleUndo();
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode, saveFile, handleUndo, handleRedo]);

  const ToolbarButton = ({onClick, title, children, className = ''}: { onClick: () => void; title: string; children: React.ReactNode; className?: string }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 hover:text-white transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 hover:text-white transition-all duration-150 md:hidden"
          aria-label="Toggle file explorer"
        >
          <Menu className="w-5 h-5"/>
        </button>
        <span className="text-sm font-mono text-slate-400">{activeFile?.name || 'কোনো ফাইল নেই'}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ToolbarButton onClick={handleUndo} title="আগের অবস্থায় ফিরুন (Ctrl+Z)">
            <RotateCcw className="w-5 h-5"/>
          </ToolbarButton>
          <ToolbarButton onClick={handleRedo} title="পুনরায় করুন (Ctrl+Y)">
            <RotateCw className="w-5 h-5"/>
          </ToolbarButton>
        </div>

        <div className="h-6 w-px bg-slate-600"/>

        <div className="flex items-center gap-2">
          <ToolbarButton onClick={saveFile} title="ফাইল সেভ করুন (Ctrl+S)">
            <Download className="w-5 h-5"/>
          </ToolbarButton>
          <ToolbarButton onClick={resetCode} title="কোড রিসেট করুন" className="hover:bg-red-500">
            <Trash2 className="w-5 h-5"/>
          </ToolbarButton>
          <button
            onClick={runCode}
            title="কোড রান করুন (Ctrl+R)"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors font-semibold text-sm"
          >
            <Play className="w-5 h-5"/>
            <span className="hidden sm:inline">রান</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;