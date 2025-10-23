import React from 'react';
import { FilePlus, X, Trash, File as FileIcon } from 'lucide-react';
import type { File } from '../../pages/Editor';

interface SidebarProps {
  files: File[];
  activeFileIndex: number;
  setActiveFileIndex: (index: number) => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                           files,
                                           activeFileIndex,
                                           setActiveFileIndex,
                                           setFiles,
                                           showSidebar,
                                           setShowSidebar,
                                         }) => {
  const createNewFile = () => {
    const newFileName = `main${files.length + 1}.bs`;
    setFiles([...files, { name: newFileName, content: '', isSaved: false }]);
    setActiveFileIndex(files.length);
  };

  const closeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) return;

    // A confirmation could be added here for unsaved files
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    if (activeFileIndex >= index) {
      setActiveFileIndex(Math.max(0, activeFileIndex - 1));
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      <aside
        className={`absolute md:relative flex flex-col h-full bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out z-30
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64`}
      >
        <div className="flex items-center justify-between p-3 border-b border-slate-700">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase">ফাইল এক্সপ্লোরার</h3>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {files.map((file, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 mb-1 rounded-md cursor-pointer transition-colors text-sm group
                ${index === activeFileIndex
                ? 'bg-blue-600/20 text-white border-l-2 border-blue-400'
                : 'text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => {
                setActiveFileIndex(index);
                setShowSidebar(false);
              }}
              title={file.name}
            >
              <div className="flex items-center gap-2 truncate">
                <FileIcon className="w-4 h-4 text-slate-400" />
                <span className="flex-1 truncate">{file.name}</span>
              </div>

              {!file.isSaved ? (
                <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:hidden" />
              ) : null}

              {files.length > 1 && (
                <button
                  onClick={(e) => closeFile(index, e)}
                  className="ml-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Close ${file.name}`}
                >
                  <Trash className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={createNewFile}
          className="m-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-2 rounded-md flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <FilePlus className="w-4 h-4" />
          নতুন ফাইল
        </button>
      </aside>
    </>
  );
};

export default Sidebar;