"use client";
import React, { useState } from "react";
import {
  Play,
  BookOpen,
  Code,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Lightbulb,
  Copy,
  Check,
  Timer,
  Target,
} from "lucide-react";
import useSwr from "@/app/hooks/useSwr";


  const runCode = () => {
    try {
      const func = new Function("return " + state.code)();
      const results = [];
      let allPassed = true;

      state.selectedQuestion.testCases.forEach((testCase) => {
        try {
          const input = testCase.input.match(/reverseString\('(.*)'\)/)[1];
          const actual = func(input);
          const passed = actual === testCase.expected;

          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: actual,
            passed: passed,
          });
          if (!passed) allPassed = false;
        } catch (error) {
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: error?.message,
            passed: false,
          });
          allPassed = false;
        }
      });

      // dispatch({ type: "SET_TEST_RESULTS", payload: results });
      // dispatch({
      //   type: "SET_OUTPUT",
      //   payload: allPassed ? "✅ All tests passed!" : "❌ Some tests failed",
      // });
    } catch (error) {
      // dispatch({ type: "SET_OUTPUT", payload: `❌ Error: ${error.message}` });
      // dispatch({ type: "SET_TEST_RESULTS", payload: [] });
    }
  };

export const QuestionsView = ({ slug }: { slug?: string }) => {
  const { data: selectedQuestion } = useSwr("/problems/" + slug);

  console.log("selectedQuestion---selectedQuestion", selectedQuestion);

  // Mock data for demonstration - replace with actual data
  //   const 'selectedQuestion---selectedQuestion',selectedQuestion = {
  //     title: "Two Sum",
  //     difficulty: "Easy",
  //     description:
  //       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  //     examples: [
  //       {
  //         input: "nums = [2,7,11,15], target = 9",
  //         output: "[0,1]",
  //         explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
  //       },
  //       {
  //         input: "nums = [3,2,4], target = 6",
  //         output: "[1,2]",
  //         explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
  //       },
  //     ],
  //     hints: [
  //       "Try using a hash map to store the numbers you've seen",
  //       "For each number, check if target - number exists in your hash map",
  //       "Don't forget to return the indices, not the values",
  //     ],
  //     defaultSolution: `function twoSum(nums, target) {
  //     const map = new Map();

  //     for (let i = 0; i < nums.length; i++) {
  //         const complement = target - nums[i];

  //         if (map.has(complement)) {
  //             return [map.get(complement), i];
  //         }

  //         map.set(nums[i], i);
  //     }

  //     return [];
  // }`,
  //   };

  const [state, setState] = useState({
    showHints: false,
    showSolution: false,
    activeTab: "problem",
    notes: "",
    output: "",
    code: selectedQuestion?.defaultSolution,
    testResults: [],
    copiedSolution: false,
    isRunning: false,
  });

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Hard: "bg-red-100 text-red-800 border-red-200",
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setState((prev) => ({ ...prev, copiedSolution: true }));
    setTimeout(
      () => setState((prev) => ({ ...prev, copiedSolution: false })),
      2000
    );
  };

  const runTests = () => {
    setState((prev) => ({ ...prev, isRunning: true }));

    // Simulate test execution
    setTimeout(() => {
      const mockResults = [
        {
          input: "nums = [2,7,11,15], target = 9",
          expected: [0, 1],
          actual: [0, 1],
          passed: true,
        },
        {
          input: "nums = [3,2,4], target = 6",
          expected: [1, 2],
          actual: [1, 2],
          passed: true,
        },
      ];

      setState((prev) => ({
        ...prev,
        isRunning: false,
        output: "✅ All tests passed!",
        testResults: mockResults,
      }));
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedQuestion?.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    difficultyColors[selectedQuestion?.difficulty]
                  }`}
                >
                  {selectedQuestion?.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>Array • Hash Table</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>~15 min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, showHints: !prev.showHints }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  state.showHints
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                {state.showHints ? "Hide Hints" : "Show Hints"}
              </button>

              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showSolution: !prev.showSolution,
                  }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  state.showSolution
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {state.showSolution ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {state.showSolution ? "Hide Solution" : "Show Solution"}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-200">
          {[
            { key: "problem", label: "Problem", icon: BookOpen },
            { key: "editor", label: "Code Editor", icon: Code },
            { key: "notes", label: "Notes", icon: FileText },
          ].map(({ key, label, icon: Icon }, index) => (
            <button
              key={key}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative ${
                state.activeTab === key
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setState((prev) => ({ ...prev, activeTab: key }))}
            >
              <Icon className="w-4 h-4" />
              {label}
              {index === 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Problem Tab */}
        {state.activeTab === "problem" && (
          <div className="h-full overflow-auto">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
              {/* Problem Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Problem Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedQuestion?.description}
                </p>
              </div>

              {/* Examples */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Examples
                </h2>
                <div className="space-y-4">
                  {selectedQuestion?.examples?.map((example, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-900">
                          Example {index + 1}
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">
                              Input:
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-3 font-mono text-sm text-blue-800">
                              {example.input}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">
                              Output:
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded p-3 font-mono text-sm text-green-800">
                              {example.output}
                            </div>
                          </div>
                        </div>
                        {example.explanation && (
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">
                              Explanation:
                            </div>
                            <div className="text-gray-700 text-sm">
                              {example.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hints */}
              {state.showHints && (
                <div className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <h2 className="text-xl font-semibold text-amber-900">
                      Hints
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {selectedQuestion?.hints?.map((hint, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                          {index + 1}
                        </span>
                        <span className="text-amber-800 leading-relaxed">
                          {hint}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution */}
              {state.showSolution && (
                <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h2 className="text-xl font-semibold text-green-900">
                        Solution
                      </h2>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(selectedQuestion?.defaultSolution)
                      }
                      className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      {state.copiedSolution ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {state.copiedSolution ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <pre className="text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                      <code>{selectedQuestion?.defaultSolution}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Code Editor Tab */}
        {state.activeTab === "editor" && (
          <div className="h-full flex flex-col">
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Code Editor
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        code: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
                      }))
                    }
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={runTests}
                    disabled={state.isRunning}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {state.isRunning ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {state.isRunning ? "Running..." : "Run Tests"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 bg-gray-50">
              <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                <div className="border-b border-gray-200 p-3 bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">
                    solution.js
                  </span>
                </div>
                <textarea
                  className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                  value={state.code}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, code: e.target.value }))
                  }
                  placeholder="Write your solution here..."
                  style={{ minHeight: "300px" }}
                />
              </div>

              {/* Test Results */}
              {state.output && (
                <div className="mt-6 space-y-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      state.output.includes("✅")
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {state.output.includes("✅") ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span
                        className={`font-semibold ${
                          state.output.includes("✅")
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {state.output}
                      </span>
                    </div>
                  </div>

                  {state.testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        result.passed
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="font-medium text-gray-900">
                          Test Case {index + 1}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <span className="font-medium text-blue-800">
                            Input:{" "}
                          </span>
                          <span className="font-mono text-blue-700">
                            {result.input}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="bg-gray-50 border border-gray-200 rounded p-2">
                            <span className="font-medium text-gray-700">
                              Expected:{" "}
                            </span>
                            <span className="font-mono text-gray-600">
                              {JSON.stringify(result.expected)}
                            </span>
                          </div>
                          <div
                            className={`border rounded p-2 ${
                              result.passed
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                            }`}
                          >
                            <span className="font-medium text-gray-700">
                              Got:{" "}
                            </span>
                            <span
                              className={`font-mono ${
                                result.passed
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {JSON.stringify(result.actual)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {state.activeTab === "notes" && (
          <div className="h-full p-6">
            <div className="max-w-4xl mx-auto h-full">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Personal Notes
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Keep track of your thoughts, approach, and learnings
                  </p>
                </div>
                <textarea
                  className="flex-1 p-6 resize-none focus:outline-none leading-relaxed"
                  placeholder="• What's your approach to solving this problem?
• What edge cases should you consider?
• What did you learn from this problem?

Start writing your notes here..."
                  value={state.notes}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsView;
