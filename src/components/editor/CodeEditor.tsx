import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {EditorView} from '@codemirror/view';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  editorRef: React.MutableRefObject<EditorView | null>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({code, setCode, editorRef}) => {
  return (
    <CodeMirror
      value={code}
      height="100%"
      extensions={[javascript({jsx: true})]}
      onChange={(value) => setCode(value)}
      theme={okaidia}
      onCreateEditor={(view) => {
        editorRef.current = view;
      }}
    />
  );
};

export default CodeEditor;