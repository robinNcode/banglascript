import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import Navbar from "../components/Navbar.tsx";

const BlockCoding: React.FC = () => {
  const blocklyDiv = useRef(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: `
          <xml id="toolbox" style="display: none; background: darkslateblue;">
            <category name="Logic" colour="%{BKY_LOGIC_HUE}">
              <block type="controls_if"></block>
              <block type="logic_compare"></block>
              <block type="logic_operation"></block>
              <block type="logic_boolean"></block>
            </category>
            <category name="Loops" colour="%{BKY_LOOPS_HUE}">
              <block type="controls_repeat_ext">
                <value name="TIMES">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
              </block>
            </category>
            <category name="Math" colour="%{BKY_MATH_HUE}">
              <block type="math_number"></block>
              <block type="math_arithmetic"></block>
            </category>
            <category name="Text" colour="%{BKY_TEXTS_HUE}">
              <block type="text"></block>
              <block type="text_print"></block>
            </category>
            <category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
          </xml>
        `,
        // Other options can be added here
      });

      // Add a change listener to update code/output in real-time (optional)
      // workspace.current.addChangeListener(() => {
      //   const code = javascriptGenerator.workspaceToCode(workspace.current!);
      //   console.log(code); // For debugging
      // });
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);

  const runCode = () => {
    if (workspace.current) {
      const code = javascriptGenerator.workspaceToCode(workspace.current);
      console.log("Generated Code:", code); // For debugging

      // Clear previous output
      setOutput([]);

      // Redirect console.log to capture output
      const originalConsoleLog = console.log;
      const capturedOutput: string[] = [];
      console.log = (...args: any[]) => {
        capturedOutput.push(args.map(String).join(' '));
      };

      try {
        // Execute the generated JavaScript code
        eval(code);
      } catch (e: any) {
        capturedOutput.push(`Error: ${e.message}`);
      } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
        setOutput(capturedOutput);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-800 text-white"> {/* Adjust height based on Navbar height */}
        <div className="flex-none p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold">KidsCoder Block Coding</h1>
          <button
            onClick={runCode}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold"
          >
            Run Code
          </button>
        </div>
        <div className="flex flex-grow">
          <div ref={blocklyDiv} className="flex-grow h-full w-3/4" id="blocklyDiv"></div>
          <div className="w-1/4 bg-gray-900 p-4 overflow-auto border-l border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Output:</h2>
            {output.length === 0 ? (
              <p className="text-gray-400">Run your code to see output here.</p>
            ) : (
              <pre className="bg-gray-700 p-2 rounded text-sm whitespace-pre-wrap">
              {output.join('\n')}
            </pre>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default BlockCoding;