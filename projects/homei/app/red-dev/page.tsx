"use client";
import { useState, useEffect } from "react";
import { Resizable } from "re-resizable";

export default function LearningPlatform() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/updateQuestions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setSelectedQuestion(data[0]);
        setCode(data[0]?.defaultSolution || "");
        setNotes(data[0]?.notes || "");
      });
  }, []);

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(
        `(() => { ${code} return ${selectedQuestion.testInput}; })()`
      );
      setOutput(result.toString());
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const saveChanges = () => {
    const updatedQuestions = questions.map((q) =>
      q.id === selectedQuestion.id ? { ...q, defaultSolution: code, notes } : q
    );

    fetch("/api/updateQuestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedQuestions),
    })
      .then((res) => res.text())
      .then((message) => alert(message))
      .catch((err) => console.error("Error saving questions:", err));

    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Resizable
        defaultSize={{ width: 300, height: "100%" }}
        minWidth={200}
        maxWidth={600}
        enable={{ right: true }}
        className="bg-gray-200 border-r overflow-auto shadow-lg"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            JavaScript Questions
          </h2>
          <ul>
            {questions.map((question) => (
              <li
                key={question.id}
                className={`p-2 cursor-pointer rounded transition-colors duration-200 ${
                  selectedQuestion?.id === question.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-300 text-gray-800"
                }`}
                onClick={() => {
                  setSelectedQuestion(question);
                  setCode(question.defaultSolution);
                  setOutput("");
                  setNotes(question.notes);
                }}
              >
                {question.title}
              </li>
            ))}
          </ul>
        </div>
      </Resizable>
      <div className="flex-1 p-4 flex flex-col bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {selectedQuestion?.title}
        </h1>
        <p className="text-gray-700 mb-4">{selectedQuestion?.description}</p>
        <textarea
          className="w-full h-40 mt-4 p-2 border rounded font-mono bg-gray-100 text-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={runCode}
        >
          Run Code
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">Output:</h3>
          <pre className="bg-gray-100 p-2 rounded border text-gray-800 shadow-inner">
            {output}
          </pre>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Notes:</h3>
          <textarea
            className="w-full h-32 mt-2 p-2 border rounded bg-gray-100 text-gray-800 shadow-inner focus:ring-2 focus:ring-yellow-500"
            placeholder="Add your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
