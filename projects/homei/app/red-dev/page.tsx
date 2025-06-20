"use client";
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
  Menu,
  Hash,
  Calendar,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { blogPosts, blogTopics, noteCategories, questions } from "./data";
import { AppProvider, useApp } from "./Providers/app-provider";
import { Card, Badge, Button } from "./components";

// Views
const ProblemsView = ({ state, dispatch, runCode }) => (
  <>
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {state.selectedQuestion.title}
          </h1>
          <Badge
            variant={
              state.selectedQuestion.difficulty === "Easy"
                ? "success"
                : "warning"
            }
          >
            {state.selectedQuestion.difficulty}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="warning"
            icon={Eye}
            onClick={() => dispatch({ type: "TOGGLE_HINTS" })}
          >
            {state.showHints ? "Hide" : "Show"} Hints
          </Button>
          <Button
            variant="success"
            icon={state.showSolution ? EyeOff : Eye}
            onClick={() => dispatch({ type: "TOGGLE_SOLUTION" })}
          >
            {state.showSolution ? "Hide" : "Show"} Solution
          </Button>
        </div>
      </div>
    </div>

    <div className="flex border-b border-gray-200 bg-gray-50">
      {[
        { key: "problem", label: "Problem", icon: BookOpen },
        { key: "editor", label: "Code Editor", icon: Code },
        { key: "notes", label: "Notes", icon: FileText },
      ].map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
            state.activeTab === key
              ? "text-blue-600 bg-white border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: key })}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>

    <div className="flex-1 overflow-auto">
      {state.activeTab === "problem" && (
        <div className="p-6 max-w-4xl space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
            <p className="text-gray-700">
              {state.selectedQuestion.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Examples</h3>
            {state.selectedQuestion.examples.map((example, index) => (
              <Card key={index} className="p-4 mb-3">
                <div className="font-mono text-sm">
                  <div className="text-blue-600 mb-2 bg-blue-50 p-2 rounded">
                    {example.input}
                  </div>
                  <div className="text-green-600 bg-green-50 p-2 rounded">
                    {example.output}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {state.showHints && (
            <Card className="p-4 bg-amber-50 border-amber-200">
              <h3 className="text-lg font-semibold mb-3">💡 Hints</h3>
              <ul className="space-y-2">
                {state.selectedQuestion.hints.map((hint, index) => (
                  <li key={index} className="flex gap-3">
                    <Badge variant="warning">{index + 1}</Badge>
                    <span className="text-amber-800">{hint}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {state.showSolution && (
            <Card className="p-4 bg-green-50 border-green-200">
              <h3 className="text-lg font-semibold mb-3">✅ Solution</h3>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                <code>{state.selectedQuestion.defaultSolution}</code>
              </pre>
            </Card>
          )}
        </div>
      )}

      {state.activeTab === "editor" && (
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Code Editor</h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon={RotateCcw}
                onClick={() => dispatch({ type: "RESET_CODE" })}
              >
                Reset
              </Button>
              <Button variant="success" icon={Play} onClick={runCode}>
                Run Tests
              </Button>
            </div>
          </div>

          <textarea
            className="w-full h-64 p-3 border-2 rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            value={state.code}
            onChange={(e) =>
              dispatch({ type: "SET_CODE", payload: e.target.value })
            }
            placeholder="Write your solution here..."
          />

          {state.output && (
            <div className="space-y-3">
              <Card className="p-3">
                <span className="font-semibold">Result: </span>
                <span
                  className={
                    state.output.includes("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {state.output}
                </span>
              </Card>

              {state.testResults.map((result, index) => (
                <Card
                  key={index}
                  className={`p-3 ${
                    result.passed
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-mono text-sm">{result.input}</span>
                  </div>
                  <div className="text-sm font-mono ml-6 space-y-1">
                    <div>
                      Expected:{" "}
                      <span className="text-blue-600">
                        {JSON.stringify(result.expected)}
                      </span>
                    </div>
                    <div>
                      Got:{" "}
                      <span
                        className={
                          result.passed ? "text-green-600" : "text-red-600"
                        }
                      >
                        {JSON.stringify(result.actual)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {state.activeTab === "notes" && (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3">Personal Notes</h3>
          <textarea
            className="w-full h-80 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your notes here..."
            value={state.notes}
            onChange={(e) =>
              dispatch({ type: "SET_NOTES", payload: e.target.value })
            }
          />
        </div>
      )}
    </div>
  </>
);

const BlogView = ({ state, dispatch }) => {
  const filteredPosts = blogPosts.filter(
    (post) => post.topicId === state.selectedBlogTopic.id
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded-lg ${state.selectedBlogTopic.color
                .replace("text-", "bg-")
                .replace("100", "500")}`}
            >
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {state.selectedBlogTopic.name}
              </h1>
              <p className="text-gray-600">
                {state.selectedBlogTopic.description}
              </p>
            </div>
          </div>
        </div>

        {state.selectedBlogPost ? (
          <div className="bg-white">
            <Button
              variant="primary"
              onClick={() => dispatch({ type: "SET_BLOG_POST", payload: null })}
              className="mb-4"
              icon={ChevronLeft}
            >
              Back to {state.selectedBlogTopic.name}
            </Button>

            <article>
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {state.selectedBlogPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {state.selectedBlogPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {state.selectedBlogPost.readTime}
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {state.selectedBlogPost.tags.map((tag) => (
                    <Badge key={tag} variant="info">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>
              <div className="text-gray-700 whitespace-pre-line">
                {state.selectedBlogPost.content}
              </div>
            </article>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                hover
                onClick={() =>
                  dispatch({ type: "SET_BLOG_POST", payload: post })
                }
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="info">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const NotesView = ({ state, dispatch }) => (
  <div className="flex-1 overflow-auto p-6">
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`p-2 rounded-lg ${state.selectedNoteCategory.color
              .replace("text-", "bg-")
              .replace("100", "500")}`}
          >
            <state.selectedNoteCategory.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {state.selectedNoteCategory.name}
            </h1>
            <p className="text-gray-600">
              {state.selectedNoteCategory.description}
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <textarea
          className="w-full h-96 p-3 border-2 rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Write your notes here..."
          value={state.currentNote}
          onChange={(e) =>
            dispatch({ type: "SET_CURRENT_NOTE", payload: e.target.value })
          }
        />
      </Card>
    </div>
  </div>
);

// Main App
function LearningPlatform() {
  const { state, dispatch } = useApp();

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
            actual: error.message,
            passed: false,
          });
          allPassed = false;
        }
      });

      dispatch({ type: "SET_TEST_RESULTS", payload: results });
      dispatch({
        type: "SET_OUTPUT",
        payload: allPassed ? "✅ All tests passed!" : "❌ Some tests failed",
      });
    } catch (error) {
      dispatch({ type: "SET_OUTPUT", payload: `❌ Error: ${error.message}` });
      dispatch({ type: "SET_TEST_RESULTS", payload: [] });
    }
  };

  const getSidebarItems = () => {
    switch (state.currentView) {
      case "problems":
        return questions;
      case "blog":
        return blogTopics;
      case "notes":
        return noteCategories;
      default:
        return [];
    }
  };

  const handleSidebarItemClick = (item) => {
    switch (state.currentView) {
      case "problems":
        dispatch({ type: "SET_QUESTION", payload: item });
        break;
      case "blog":
        dispatch({ type: "SET_BLOG_TOPIC", payload: item });
        break;
      case "notes":
        dispatch({ type: "SET_NOTE_CATEGORY", payload: item });
        break;
    }
  };

  const getActiveSidebarItem = () => {
    switch (state.currentView) {
      case "problems":
        return state.selectedQuestion;
      case "blog":
        return state.selectedBlogTopic;
      case "notes":
        return state.selectedNoteCategory;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          state.sidebarCollapsed ? "w-16" : "w-80"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-200`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!state.sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">Learning Hub</h1>
            )}
            <Button
              variant="secondary"
              icon={Menu}
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            />
          </div>
        </div>

        {!state.sidebarCollapsed && (
          <>
            <div className="p-4 border-b border-gray-200">
              <nav className="space-y-2">
                {[
                  { view: "problems", icon: Code, label: "Problems" },
                  { view: "blog", icon: BookOpen, label: "Blog" },
                  { view: "notes", icon: FileText, label: "Notes" },
                ].map(({ view, icon: Icon, label }) => (
                  <button
                    key={view}
                    onClick={() =>
                      dispatch({ type: "SET_VIEW", payload: view })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-full ${
                      state.currentView === view
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {getSidebarItems().map((item) => (
                <div
                  key={item.id}
                  className={`p-4 cursor-pointer rounded-lg border-2 transition-all mb-3 ${
                    getActiveSidebarItem()?.id === item.id
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50 border-gray-100"
                  }`}
                  onClick={() => handleSidebarItemClick(item)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {item.name || item.title}
                    </h3>
                    <Badge variant="info">
                      {item.count || item.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {state.currentView === "problems" && (
          <ProblemsView state={state} dispatch={dispatch} runCode={runCode} />
        )}
        {state.currentView === "blog" && (
          <BlogView state={state} dispatch={dispatch} />
        )}
        {state.currentView === "notes" && (
          <NotesView state={state} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}

// Wrap App with Provider
const AppWrapper = () => (
  <AppProvider>
    <LearningPlatform />
  </AppProvider>
);

export default AppWrapper;
