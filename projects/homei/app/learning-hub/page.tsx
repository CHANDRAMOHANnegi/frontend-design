"use client"
import React, { useState } from 'react';
import { Hash, ArrowRight, Target, Layers, Search, GitBranch, TreePine, TrendingUp, RotateCcw, Network, BarChart3, Grid3X3, Zap, CheckCircle, Circle, ExternalLink, Filter, BookOpen, Code, Database, Server, Users, MessageSquare, Lock, Clock, Cpu, HardDrive, ArrowLeft, Play, Save, RotateCw, FileText, Lightbulb, Brain } from 'lucide-react';

// Core Skills patterns
const coreSkillsPatterns = [
  { id: "arrays", name: "Arrays", icon: Hash, color: "bg-blue-500" },
  { id: "strings", name: "Strings", icon: BookOpen, color: "bg-green-500" },
  { id: "hashmaps", name: "Hash Maps", icon: Grid3X3, color: "bg-purple-500" },
  { id: "recursion", name: "Recursion", icon: RotateCcw, color: "bg-orange-500" }
];

// NeetCode 150 patterns
const neetcode150Patterns = [
  { id: "array-hashing", name: "Array & Hashing", icon: Hash, color: "bg-blue-500" },
  { id: "two-pointers", name: "Two Pointers", icon: ArrowRight, color: "bg-green-500" },
  { id: "sliding-window", name: "Sliding Window", icon: Target, color: "bg-purple-500" },
  { id: "stack", name: "Stack", icon: Layers, color: "bg-orange-500" },
  { id: "binary-search", name: "Binary Search", icon: Search, color: "bg-teal-500" },
  { id: "linked-list", name: "Linked List", icon: GitBranch, color: "bg-indigo-500" },
  { id: "trees", name: "Trees", icon: TreePine, color: "bg-emerald-500" },
  { id: "heap-priority-queue", name: "Heap / Priority Queue", icon: TrendingUp, color: "bg-pink-500" },
  { id: "backtracking", name: "Backtracking", icon: RotateCcw, color: "bg-red-500" },
  { id: "graphs", name: "Graphs", icon: Network, color: "bg-cyan-500" },
  { id: "1d-dynamic-programming", name: "1-D Dynamic Programming", icon: BarChart3, color: "bg-violet-500" },
  { id: "2d-dynamic-programming", name: "2-D Dynamic Programming", icon: Grid3X3, color: "bg-rose-500" },
  { id: "greedy", name: "Greedy", icon: Zap, color: "bg-yellow-500" }
];

// System Design patterns
const systemDesignPatterns = [
  { id: "scalability", name: "Scalability", icon: TrendingUp, color: "bg-blue-500" },
  { id: "databases", name: "Databases", icon: Database, color: "bg-green-500" },
  { id: "caching", name: "Caching", icon: Cpu, color: "bg-purple-500" },
  { id: "load-balancing", name: "Load Balancing", icon: Server, color: "bg-orange-500" },
  { id: "microservices", name: "Microservices", icon: Network, color: "bg-teal-500" },
  { id: "messaging", name: "Messaging Systems", icon: MessageSquare, color: "bg-indigo-500" },
  { id: "security", name: "Security", icon: Lock, color: "bg-red-500" },
  { id: "storage", name: "Storage Systems", icon: HardDrive, color: "bg-cyan-500" }
];

// Sample problems data structure with detailed problem info
const problemsData = {
  // Core Skills
  arrays: [
    { 
      id: "two-sum",
      title: "Two Sum", 
      difficulty: "Easy", 
      leetcodeUrl: "https://leetcode.com/problems/two-sum/", 
      solved: false,
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
      solution: `The brute force approach is to use nested loops to check every pair of numbers. However, we can optimize this using a hash map.

**Approach: Hash Map**
1. Create a hash map to store numbers and their indices
2. For each number, calculate the complement (target - current number)
3. If the complement exists in the hash map, return the indices
4. Otherwise, add the current number and its index to the hash map

**Time Complexity:** O(n)
**Space Complexity:** O(n)`,
      starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
      notes: ""
    },
    { 
      id: "best-time-stock",
      title: "Best Time to Buy and Sell Stock", 
      difficulty: "Easy", 
      leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", 
      solved: true,
      description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
      solution: `**Approach: Single Pass**
Keep track of the minimum price seen so far and the maximum profit.

**Time Complexity:** O(n)
**Space Complexity:** O(1)`,
      starterCode: `def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      notes: ""
    }
  ],
  "array-hashing": [
    { 
      id: "two-sum-ah",
      title: "Two Sum", 
      difficulty: "Easy", 
      leetcodeUrl: "https://leetcode.com/problems/two-sum/", 
      solved: false,
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
      solution: `Use a hash map to store complements.`,
      starterCode: `def twoSum(nums, target):
    pass`,
      notes: ""
    }
  ]
};

const sections = [
  { id: "core-skills", name: "Core Skills", patterns: coreSkillsPatterns, icon: BookOpen },
  { id: "neetcode-150", name: "NeetCode 150", patterns: neetcode150Patterns, icon: Code },
  { id: "system-design", name: "System Design", patterns: systemDesignPatterns, icon: Server }
];

// Problem Detail Component
const ProblemDetail = ({ problem, onBack, onToggleSolved, isSolved }) => {
  const [activeTab, setActiveTab] = useState("problem");
  const [code, setCode] = useState(problem.starterCode);
  const [notes, setNotes] = useState(problem.notes);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      alert("Code executed! (This is a demo - no actual execution)");
    }, 1500);
  };

  const handleSaveNotes = () => {
    // In a real app, you'd save this to your backend
    alert("Notes saved!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div>
                <h1 className="text-xl font-bold">{problem.title}</h1>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onToggleSolved}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isSolved 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {isSolved ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                <span>{isSolved ? 'Solved' : 'Mark as Solved'}</span>
              </button>
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col border-r border-gray-700">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {[
              { id: "problem", label: "Problem", icon: FileText },
              { id: "solution", label: "Solution", icon: Lightbulb },
              { id: "notes", label: "Notes", icon: Brain }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400 bg-gray-800'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "problem" && (
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {problem.description}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "solution" && (
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {problem.solution}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Personal Notes</h3>
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes, insights, or key takeaways here..."
                    className="w-full h-96 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">Code Editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCode(problem.starterCode)}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 rounded text-sm transition-colors"
              >
                {isRunning ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-gray-300 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your solution here..."
              style={{ 
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                lineHeight: '1.5',
                tabSize: 4
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="h-32 bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-400">Output</span>
            </div>
            <div className="bg-gray-900 rounded p-2 h-20 overflow-y-auto">
              <div className="text-sm text-gray-500 font-mono">
                {isRunning ? "Running your code..." : "Click 'Run' to execute your code"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function NeetCodeTracker() {
  const [selectedSection, setSelectedSection] = useState("core-skills");
  const [selectedPattern, setSelectedPattern] = useState("arrays");
  const [filter, setFilter] = useState("all");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [problemStates, setProblemStates] = useState(() => {
    const states = {};
    Object.keys(problemsData).forEach(pattern => {
      states[pattern] = {};
      problemsData[pattern].forEach((problem, idx) => {
        states[pattern][idx] = problem.solved;
      });
    });
    return states;
  });

  const toggleProblem = (patternId, problemIndex) => {
    setProblemStates(prev => ({
      ...prev,
      [patternId]: {
        ...prev[patternId],
        [problemIndex]: !prev[patternId][problemIndex]
      }
    }));
  };

  const getPatternStats = (patternId) => {
    const problems = problemsData[patternId] || [];
    const solved = Object.values(problemStates[patternId] || {}).filter(Boolean).length;
    return { solved, total: problems.length };
  };

  const getSectionStats = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    let totalSolved = 0;
    let totalProblems = 0;
    
    section.patterns.forEach(pattern => {
      const stats = getPatternStats(pattern.id);
      totalSolved += stats.solved;
      totalProblems += stats.total;
    });
    
    return { solved: totalSolved, total: totalProblems };
  };

  const getCurrentPatterns = () => {
    return sections.find(s => s.id === selectedSection)?.patterns || [];
  };

  const filteredProblems = (problemsData[selectedPattern] || []).filter((problem, index) => {
    if (filter === "solved") return problemStates[selectedPattern]?.[index];
    if (filter === "unsolved") return !problemStates[selectedPattern]?.[index];
    return true;
  });

  const currentSection = sections.find(s => s.id === selectedSection);
  const selectedPatternObj = getCurrentPatterns().find(p => p.id === selectedPattern);
  const Icon = selectedPatternObj?.icon;

  // Set default pattern when section changes
  React.useEffect(() => {
    const patterns = getCurrentPatterns();
    if (patterns.length > 0 && !patterns.find(p => p.id === selectedPattern)) {
      setSelectedPattern(patterns[0].id);
    }
  }, [selectedSection]);

  // Show problem detail if a problem is selected
  if (selectedProblem) {
    const problemIndex = (problemsData[selectedPattern] || []).findIndex(p => p.id === selectedProblem.id);
    const isSolved = problemStates[selectedPattern]?.[problemIndex];
    
    return (
      <ProblemDetail
        problem={selectedProblem}
        onBack={() => setSelectedProblem(null)}
        onToggleSolved={() => toggleProblem(selectedPattern, problemIndex)}
        isSolved={isSolved}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">NeetCode</h1>
              <p className="text-gray-400 mt-1">Master coding interviews with structured practice</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                {getSectionStats(selectedSection).solved}/{getSectionStats(selectedSection).total}
              </div>
              <div className="text-sm text-gray-400">{currentSection?.name} Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              const stats = getSectionStats(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                    selectedSection === section.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <SectionIcon className="w-5 h-5" />
                  <span className="font-medium">{section.name}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {stats.solved}/{stats.total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{currentSection?.name} Topics</h2>
              <div className="space-y-2">
                {getCurrentPatterns().map((pattern) => {
                  const stats = getPatternStats(pattern.id);
                  const IconComponent = pattern.icon;
                  return (
                    <button
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedPattern === pattern.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded ${pattern.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium truncate">{pattern.name}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-green-400">{stats.solved}</span>
                        <span className="text-gray-500">/{stats.total}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-6">
              {/* Pattern Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${selectedPatternObj?.color}`}>
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatternObj?.name}</h2>
                    <div className="text-sm text-gray-400">
                      {getPatternStats(selectedPattern).solved} of {getPatternStats(selectedPattern).total} completed
                    </div>
                  </div>
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="solved">Solved</option>
                    <option value="unsolved">Unsolved</option>
                  </select>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getPatternStats(selectedPattern).total > 0 ? 
                        (getPatternStats(selectedPattern).solved / getPatternStats(selectedPattern).total) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Problems List */}
              <div className="space-y-3">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, index) => {
                    const originalIndex = (problemsData[selectedPattern] || []).indexOf(problem);
                    const isSolved = problemStates[selectedPattern]?.[originalIndex];
                    
                    return (
                      <div
                        key={originalIndex}
                        className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleProblem(selectedPattern, originalIndex)}
                            className="flex-shrink-0"
                          >
                            {isSolved ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400 hover:text-green-400" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <button
                              onClick={() => setSelectedProblem(problem)}
                              className="text-left"
                            >
                              <h3 className={`font-medium hover:text-blue-400 transition-colors ${isSolved ? 'text-green-400 line-through' : 'text-white'}`}>
                                {problem.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {problem.difficulty}
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProblem(problem)}
                            className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm font-medium"
                          >
                            <Code className="w-4 h-4" />
                            <span>Solve</span>
                          </button>
                          {problem.leetcodeUrl !== "#" && (
                            <a
                              href={problem.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No problems available for this topic yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}