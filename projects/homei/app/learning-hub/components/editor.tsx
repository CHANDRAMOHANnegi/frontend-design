import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import MonacoEditor from "react-monaco-editor";

// const socket = io("http://localhost:3000");

type CollaborativeEditorProps = {
  sessionId: string;
  question: { title: string; description: string };
};

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  sessionId,
  question,
}) => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  // useEffect(() => {
  //   socket.emit("join-session", sessionId);

  //   socket.on("load-code", (initialCode: string) => {
  //     setCode(initialCode);
  //   });

  //   socket.on("receive-code", (updatedCode: string) => {
  //     setCode(updatedCode);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [sessionId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // socket.emit("code-change", { sessionId, code: newCode });
  };

  const runCode = () => {
    try {
      // Use `eval` to execute the code
      const result = eval(code);
      setOutput(result !== undefined ? String(result) : "Code executed successfully");
    } catch (error) {
      setOutput(`Error: ${error?.message??""}`);
    }
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
      <p className="text-gray-600 mb-4">{question.description}</p>
      <MonacoEditor
        width="100%"
        height="300px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={runCode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Run Code
        </button>
      </div>
      <div className="mt-4 bg-gray-100 p-4 rounded text-sm">
        <h3 className="font-bold text-gray-700 mb-2">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};
