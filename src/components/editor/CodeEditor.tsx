import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

interface CodeEditorProps {
  code: string;
  setCode: (content: string) => void;
  editorRef: React.MutableRefObject<EditorView | null>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, editorRef }) => {
  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={okaidia}
      extensions={[
        javascript({ typescript: true }), // For better syntax highlighting
        EditorView.lineWrapping,
        EditorView.theme({
          '&': {
            fontSize: '14px',
            fontFamily: `'Fira Code', 'JetBrains Mono', monospace`,
          },
          '.cm-scroller': { overflow: 'auto' },
        }),
      ]}
      onChange={(value, viewUpdate) => {
        setCode(value);
        if (viewUpdate.view) {
            editorRef.current = viewUpdate.view;
        }
      }}
      onCreateEditor={(view) => {
        editorRef.current = view;
      }}
      className="h-full"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        highlightActiveLine: true,
      }}
    />
  );
};

export default CodeEditor;