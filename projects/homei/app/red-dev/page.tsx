"use client"
import { useState, useEffect, useReducer } from 'react';
import { Resizable } from 're-resizable';
import { 
  Play, BookOpen, Code, FileText, CheckCircle, XCircle, Eye, EyeOff, 
  RotateCcw, Settings, User, Trophy, Menu, PenTool, BookMarked, 
  StickyNote, Bookmark, Hash, Calendar, Clock, Tag
} from 'lucide-react';

// Sample data
const questions = [{
  id: 1,
  title: "Reverse a String",
  difficulty: "Easy",
  description: "Write a function to reverse a given string without using built-in reverse methods.",
  examples: [
    { input: "reverseString('hello')", output: "'olleh'" },
    { input: "reverseString('JavaScript')", output: "'tpircSavaJ'" }
  ],
  defaultSolution: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}`,
  testCases: [
    { input: "reverseString('hello')", expected: "olleh" },
    { input: "reverseString('JavaScript')", expected: "tpircSavaJ" },
    { input: "reverseString('')", expected: "" },
    { input: "reverseString('a')", expected: "a" }
  ],
  hints: [
    "Think about accessing string characters by index",
    "You can build a new string character by character"
  ],
  notes: "This problem teaches string manipulation and loop control."
}];

const blogTopics = [
  { 
    id: 1, 
    name: "JavaScript Fundamentals", 
    count: 12, 
    color: "bg-blue-100 text-blue-700",
    description: "Core JavaScript concepts and syntax"
  },
  { 
    id: 2, 
    name: "Data Structures", 
    count: 8, 
    color: "bg-green-100 text-green-700",
    description: "Arrays, objects, and complex data structures"
  },
  { 
    id: 3, 
    name: "Algorithms", 
    count: 15, 
    color: "bg-purple-100 text-purple-700",
    description: "Problem-solving techniques and algorithms"
  },
  { 
    id: 4, 
    name: "Web Development", 
    count: 6, 
    color: "bg-orange-100 text-orange-700",
    description: "Frontend and backend development"
  },
  { 
    id: 5, 
    name: "Best Practices", 
    count: 9, 
    color: "bg-teal-100 text-teal-700",
    description: "Code quality and development practices"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    excerpt: "Deep dive into how closures work and why they're important in JavaScript programming...",
    date: "2025-06-10",
    readTime: "7 min read",
    topicId: 1,
    content: `Closures are one of the most powerful and sometimes confusing features in JavaScript. 
    
A closure is created when a function is defined inside another function, and the inner function has access to the outer function's variables and parameters, even after the outer function has returned.

Here's a simple example:

function outerFunction(x) {
  // This is the outer function's scope
  return function innerFunction(y) {
    // This inner function has access to 'x'
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

In this example, the inner function has "closed over" the variable 'x' from the outer function's scope.`,
    tags: ["JavaScript", "Functions", "Scope"]
  },
  {
    id: 2,
    title: "Array Methods Every Developer Should Know",
    excerpt: "Master the most important array methods in JavaScript for efficient data manipulation...",
    date: "2025-06-08",
    readTime: "5 min read",
    topicId: 1,
    content: `JavaScript arrays come with many built-in methods that make data manipulation easier and more readable.

Here are the essential methods:

1. map() - Transform each element
2. filter() - Select elements based on condition
3. reduce() - Combine elements into single value
4. forEach() - Execute function for each element
5. find() - Find first matching element

Example:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);`,
    tags: ["JavaScript", "Arrays", "Methods"]
  },
  {
    id: 3,
    title: "Introduction to Binary Search Trees",
    excerpt: "Learn about binary search trees and their applications in computer science...",
    date: "2025-06-05",
    readTime: "10 min read",
    topicId: 2,
    content: `Binary Search Trees (BST) are a fundamental data structure that provides efficient searching, insertion, and deletion operations.

A BST is a binary tree where:
- Each node has at most two children
- Left child's value is less than parent's value
- Right child's value is greater than parent's value

This property allows for O(log n) average case performance for basic operations.`,
    tags: ["Data Structures", "Trees", "Algorithms"]
  },
  {
    id: 4,
    title: "Sorting Algorithms Explained",
    excerpt: "Compare different sorting algorithms and understand when to use each one...",
    date: "2025-06-03",
    readTime: "12 min read",
    topicId: 3,
    content: `Sorting is a fundamental operation in computer science. Here are the most common algorithms:

1. Bubble Sort - O(n²) - Simple but inefficient
2. Quick Sort - O(n log n) average - Divide and conquer
3. Merge Sort - O(n log n) guaranteed - Stable sorting
4. Heap Sort - O(n log n) - In-place sorting

Each has its own trade-offs in terms of time complexity, space complexity, and stability.`,
    tags: ["Algorithms", "Sorting", "Complexity"]
  }
];

const noteCategories = [
  { 
    id: 1, 
    name: "Learning Goals", 
    count: 5, 
    color: "bg-amber-100 text-amber-700",
    icon: Trophy,
    description: "Track your learning objectives and progress"
  },
  { 
    id: 2, 
    name: "Code Snippets", 
    count: 12, 
    color: "bg-blue-100 text-blue-700",
    icon: Code,
    description: "Useful code examples and templates"
  },
  { 
    id: 3, 
    name: "Problem Solutions", 
    count: 8, 
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    description: "Your solutions and approaches to problems"
  },
  { 
    id: 4, 
    name: "Interview Prep", 
    count: 6, 
    color: "bg-purple-100 text-purple-700",
    icon: BookOpen,
    description: "Interview questions and preparation notes"
  },
  { 
    id: 5, 
    name: "Quick Thoughts", 
    count: 15, 
    color: "bg-pink-100 text-pink-700",
    icon: PenTool,
    description: "Random ideas and quick observations"
  }
];

const sampleNotes = {
  1: `# Learning Goals for 2025

## JavaScript Mastery
- [ ] Complete 100 coding problems
- [ ] Build 3 full-stack projects
- [ ] Master async/await patterns
- [x] Understand closures and prototypes

## Data Structures & Algorithms
- [ ] Implement all major sorting algorithms
- [ ] Master tree traversal techniques
- [ ] Understand dynamic programming
- [ ] Practice graph algorithms

## Web Development
- [ ] Learn React hooks in depth
- [ ] Build a REST API with Express
- [ ] Deploy applications to cloud platforms
- [ ] Implement authentication systems`,

  2: `# Useful Code Snippets

## Array Operations
\`\`\`javascript
// Remove duplicates from array
const unique = [...new Set(array)];

// Group array by property
const groupBy = (arr, key) => 
  arr.reduce((groups, item) => {
    const group = groups[item[key]] || [];
    groups[item[key]] = [...group, item];
    return groups;
  }, {});
\`\`\`

## String Utilities
\`\`\`javascript
// Capitalize first letter
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// Convert to kebab-case
const kebabCase = str => str.replace(/([A-Z])/g, '-$1').toLowerCase();
\`\`\`

## Date Formatting
\`\`\`javascript
// Format date as YYYY-MM-DD
const formatDate = date => date.toISOString().split('T')[0];
\`\`\``,

  3: `# Problem Solutions

## Two Sum Problem
**Approach**: Use hash map for O(n) solution
\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
\`\`\`

## Palindrome Check
**Key insight**: Compare string with its reverse
\`\`\`javascript
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
\`\`\``,

  4: `# Interview Preparation Notes

## Common Questions
1. **What is the difference between == and ===?**
   - == performs type coercion
   - === requires same type and value

2. **Explain event delegation**
   - Use event bubbling to handle events on parent element
   - More efficient than adding listeners to each child

3. **What is hoisting?**
   - Variables and functions are moved to top of scope
   - var is hoisted with undefined, let/const throw ReferenceError

## Behavioral Questions
- Tell me about a challenging project
- How do you handle feedback?
- Describe a time you had to learn something quickly

## Technical Challenges
- Implement a debounce function
- Design a URL shortener
- Explain the event loop`,

  5: `# Quick Thoughts & Ideas

## Today's Learnings (June 12, 2025)
- Discovered that Array.from() can take a mapping function as second argument
- CSS Grid is more powerful than I initially thought for complex layouts
- Need to practice more with async/await error handling

## Project Ideas
- Build a code snippet manager
- Create a habit tracking app
- Develop a markdown-based blog
- Personal finance tracker with charts

## Resources to Check Out
- MDN Web Docs for comprehensive references
- freeCodeCamp for structured learning
- LeetCode for algorithm practice
- GitHub trending for inspiration

## Random Notes
- Remember to use semantic HTML elements
- Always validate user input on both client and server
- Keep components small and focused on single responsibility`
};

// Reducer for state management
const initialState = {
  currentView: 'problems',
  selectedQuestion: questions[0],
  code: '// Write your solution here\nfunction reverseString(str) {\n  \n}',
  output: '',
  notes: questions[0].notes,
  quickNotes: '',
  testResults: [],
  showSolution: false,
  showHints: false,
  activeTab: 'problem',
  sidebarCollapsed: false,
  selectedBlogPost: null,
  selectedBlogTopic: blogTopics[0],
  selectedNoteCategory: noteCategories[0],
  currentNote: sampleNotes[1]
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_QUESTION':
      return {
        ...state,
        selectedQuestion: action.payload,
        code: '// Write your solution here\nfunction reverseString(str) {\n  \n}',
        output: '',
        notes: action.payload.notes,
        testResults: [],
        showSolution: false,
        showHints: false,
        activeTab: 'problem'
      };
    case 'SET_CODE':
      return { ...state, code: action.payload };
    case 'SET_OUTPUT':
      return { ...state, output: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_QUICK_NOTES':
      return { ...state, quickNotes: action.payload };
    case 'SET_TEST_RESULTS':
      return { ...state, testResults: action.payload };
    case 'TOGGLE_SOLUTION':
      return { 
        ...state, 
        showSolution: !state.showSolution,
        code: !state.showSolution ? state.selectedQuestion.defaultSolution : state.code
      };
    case 'TOGGLE_HINTS':
      return { ...state, showHints: !state.showHints };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'RESET_CODE':
      return { 
        ...state, 
        code: '// Write your solution here\nfunction reverseString(str) {\n  \n}',
        output: '',
        testResults: []
      };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_BLOG_POST':
      return { ...state, selectedBlogPost: action.payload };
    case 'SET_BLOG_TOPIC':
      return { ...state, selectedBlogTopic: action.payload, selectedBlogPost: null };
    case 'SET_NOTE_CATEGORY':
      return { 
        ...state, 
        selectedNoteCategory: action.payload,
        currentNote: sampleNotes[action.payload.id] || ''
      };
    case 'SET_CURRENT_NOTE':
      return { ...state, currentNote: action.payload };
    default:
      return state;
  }
}

const getDifficultyColor = (difficulty) => {
  const colors = {
    'Easy': 'text-green-600 bg-green-100 border-green-200',
    'Medium': 'text-yellow-600 bg-yellow-100 border-yellow-200',
    'Hard': 'text-red-600 bg-red-100 border-red-200'
  };
  return colors[difficulty] || 'text-gray-600 bg-gray-100 border-gray-200';
};

export default function LearningPlatform() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const runCode = () => {
    try {
      const results = [];
      let allPassed = true;

      state.selectedQuestion.testCases.forEach((testCase) => {
        try {
          const result = eval(`(() => { ${state.code} return ${testCase.input}; })()`);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            passed
          });
          if (!passed) allPassed = false;
        } catch (error) {
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: `Error: ${error.message}`,
            passed: false
          });
          allPassed = false;
        }
      });

      dispatch({ type: 'SET_TEST_RESULTS', payload: results });
      dispatch({ 
        type: 'SET_OUTPUT', 
        payload: allPassed ? "✅ All tests passed!" : "❌ Some tests failed." 
      });
    } catch (error) {
      dispatch({ type: 'SET_OUTPUT', payload: `Error: ${error.message}` });
      dispatch({ type: 'SET_TEST_RESULTS', payload: [] });
    }
  };

  const NavButton = ({ view, icon: Icon, label, isActive }) => (
    <button
      onClick={() => dispatch({ type: 'SET_VIEW', payload: view })}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-blue-100 text-blue-700 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const getFilteredBlogPosts = () => {
    return blogPosts.filter(post => post.topicId === state.selectedBlogTopic.id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Enhanced Top Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">CodeLearner</h1>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center gap-2">
              <NavButton 
                view="problems" 
                icon={BookOpen} 
                label="Problems" 
                isActive={state.currentView === 'problems'} 
              />
              <NavButton 
                view="blog" 
                icon={BookMarked} 
                label="Blog" 
                isActive={state.currentView === 'blog'} 
              />
              <NavButton 
                view="quickNotes" 
                icon={StickyNote} 
                label="Notes" 
                isActive={state.currentView === 'quickNotes'} 
              />
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Beginner</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conditional Sidebar */}
        {!state.sidebarCollapsed && (
          <Resizable
            defaultSize={{ width: 320, height: '100%' }}
            minWidth={280}
            maxWidth={450}
            enable={{ right: true }}
            className="bg-white border-r border-gray-200"
          >
            <div className="p-4 h-full overflow-auto">
              {/* Problems Sidebar */}
              {state.currentView === 'problems' && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Problems</h2>
                    <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {questions.length}
                    </span>
                  </div>
                  
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-4 cursor-pointer rounded-lg border-2 transition-all mb-3 ${
                        state.selectedQuestion.id === question.id 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                      onClick={() => dispatch({ type: 'SET_QUESTION', payload: question })}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{question.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{question.description}</p>
                    </div>
                  ))}
                </>
              )}

              {/* Blog Topics Sidebar */}
              {state.currentView === 'blog' && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Topics</h2>
                  </div>
                  
                  {blogTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-4 cursor-pointer rounded-lg border-2 transition-all mb-3 ${
                        state.selectedBlogTopic.id === topic.id 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                      onClick={() => dispatch({ type: 'SET_BLOG_TOPIC', payload: topic })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${topic.color}`}>
                          {topic.count}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                  ))}
                </>
              )}

              {/* Notes Categories Sidebar */}
              {state.currentView === 'quickNotes' && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                  </div>
                  
                  {noteCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={category.id}
                        className={`p-4 cursor-pointer rounded-lg border-2 transition-all mb-3 ${
                          state.selectedNoteCategory.id === category.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'hover:bg-gray-50 border-gray-100'
                        }`}
                        onClick={() => dispatch({ type: 'SET_NOTE_CATEGORY', payload: category })}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                            <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                            {category.count}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Resizable>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Problems View */}
          {state.currentView === 'problems' && (
            <>
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">{state.selectedQuestion.title}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(state.selectedQuestion.difficulty)}`}>
                        {state.selectedQuestion.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                      onClick={() => dispatch({ type: 'TOGGLE_HINTS' })}
                    >
                      <Eye className="w-4 h-4" />
                      {state.showHints ? 'Hide' : 'Show'} Hints
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                      onClick={() => dispatch({ type: 'TOGGLE_SOLUTION' })}
                    >
                      {state.showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {state.showSolution ? 'Hide' : 'Show'} Solution
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {[
                  { key: 'problem', label: 'Problem', icon: BookOpen },
                  { key: 'editor', label: 'Code Editor', icon: Code },
                  { key: 'notes', label: 'Notes', icon: FileText }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                      state.activeTab === key
                        ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: key })}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-auto">
                {state.activeTab === 'problem' && (
                  <div className="p-6 max-w-4xl space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
                      <p className="text-gray-700">{state.selectedQuestion.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Examples</h3>
                      <div className="space-y-3">
                        {state.selectedQuestion.examples.map((example, index) => (
                          <div key={index} className="bg-gray-50 border p-4 rounded-lg">
                            <div className="font-mono text-sm">
                              <div className="text-gray-600 mb-1">Input:</div>
                              <div className="text-blue-600 mb-2 bg-blue-50 p-2 rounded">{example.input}</div>
                              <div className="text-gray-600 mb-1">Output:</div>
                              <div className="text-green-600 bg-green-50 p-2 rounded">{example.output}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {state.showHints && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">💡 Hints</h3>
                        <ul className="space-y-2">
                          {state.selectedQuestion.hints.map((hint, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="bg-amber-200 text-amber-800 font-bold text-sm px-2 py-1 rounded-full">
                                {index + 1}
                              </span>
                              <span className="text-amber-800">{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {state.showSolution && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">✅ Solution</h3>
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                          <code>{state.selectedQuestion.defaultSolution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {state.activeTab === 'editor' && (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Code Editor</h3>
                      <div className="flex gap-2">
                        <button
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200"
                          onClick={() => dispatch({ type: 'RESET_CODE' })}
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          onClick={runCode}
                        >
                          <Play className="w-4 h-4" />
                          Run Tests
                        </button>
                      </div>
                    </div>

                    <textarea
                      className="w-full h-64 p-3 border-2 rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      value={state.code}
                      onChange={(e) => dispatch({ type: 'SET_CODE', payload: e.target.value })}
                      placeholder="Write your solution here..."
                    />

                    {state.output && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border-2 bg-gray-50">
                          <span className="font-semibold">Result: </span>
                          <span className={state.output.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                            {state.output}
                          </span>
                        </div>

                        {state.testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-2 ${
                              result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
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
                              <div>Expected: <span className="text-blue-600">{JSON.stringify(result.expected)}</span></div>
                              <div>Got: <span className={result.passed ? 'text-green-600' : 'text-red-600'}>
                                {JSON.stringify(result.actual)}
                              </span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {state.activeTab === 'notes' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Personal Notes</h3>
                    <textarea
                      className="w-full h-80 p-3 border-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Write your notes here..."
                      value={state.notes}
                      onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Blog View */}
          {state.currentView === 'blog' && (
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${state.selectedBlogTopic.color.replace('text-', 'bg-').replace('100', '500')}`}>
                        <Hash className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">{state.selectedBlogTopic.name}</h1>
                        <p className="text-gray-600">{state.selectedBlogTopic.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{getFilteredBlogPosts().length} articles</span>
                      <span>•</span>
                      <span>Updated recently</span>
                    </div>
                  </div>

                  {state.selectedBlogPost ? (
                    /* Blog Post Detail */
                    <div className="bg-white">
                      <button
                        onClick={() => dispatch({ type: 'SET_BLOG_POST', payload: null })}
                        className="mb-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        ← Back to {state.selectedBlogTopic.name}
                      </button>
                      
                      <article className="prose prose-lg max-w-none">
                        <header className="mb-6">
                          <h1 className="text-3xl font-bold text-gray-800 mb-3">{state.selectedBlogPost.title}</h1>
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
                          <div className="flex gap-2">
                            {state.selectedBlogPost.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </header>
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {state.selectedBlogPost.content}
                        </div>
                      </article>
                    </div>
                  ) : (
                    /* Blog Posts List */
                    <div className="grid gap-6">
                      {getFilteredBlogPosts().map((post) => (
                        <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                             onClick={() => dispatch({ type: 'SET_BLOG_POST', payload: post })}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  {post.date}
                                </div>
                                <span className="text-sm text-gray-500">•</span>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {post.readTime}
                                </div>
                              </div>
                              <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{post.title}</h2>
                              <p className="text-gray-600 mb-3">{post.excerpt}</p>
                              <div className="flex gap-2">
                                {post.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    <Tag className="w-3 h-3 inline mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg">
                              <Bookmark className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-600 hover:text-blue-700 font-medium">Read more →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notes View */}
          {state.currentView === 'quickNotes' && (
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${state.selectedNoteCategory.color.replace('text-', 'bg-').replace('100', '500')}`}>
                        <state.selectedNoteCategory.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">{state.selectedNoteCategory.name}</h1>
                        <p className="text-gray-600">{state.selectedNoteCategory.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{state.selectedNoteCategory.count} notes</span>
                      <span>•</span>
                      <span>Last updated today</span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PenTool className="w-5 h-5 text-gray-600" />
                          <h2 className="text-lg font-semibold text-gray-800">
                            {state.selectedNoteCategory.name} Notes
                          </h2>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Auto-saved</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <textarea
                        className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors font-mono text-sm"
                        placeholder={`Write your ${state.selectedNoteCategory.name.toLowerCase()} here...`}
                        value={state.currentNote}
                        onChange={(e) => dispatch({ type: 'SET_CURRENT_NOTE', payload: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}