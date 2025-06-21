"use client";
import React,
 { useState } from 'react';
import { Hash, ArrowRight, Target, Layers, Search, GitBranch, TreePine, TrendingUp, RotateCcw, Network, BarChart3, Grid3X3, Zap, CheckCircle, Circle, ExternalLink, Filter } from 'lucide-react';
const neetcodeProblems = {
  "array-hashing": [
    { title: "Contains Duplicate", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/" },
    { title: "Valid Anagram", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/valid-anagram/" },
    { title: "Two Sum", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/two-sum/" },
    { title: "Group Anagrams", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/group-anagrams/" },
    { title: "Top K Frequent Elements", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { title: "Product of Array Except Self", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/" },
    { title: "Valid Sudoku", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/" },
    { title: "Encode and Decode Strings", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/encode-and-decode-strings/" },
    { title: "Longest Consecutive Sequence", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/" }
  ],
  "two-pointers": [
    { title: "Valid Palindrome", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/" },
    { title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
    { title: "3Sum", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/3sum/" },
    { title: "Container With Most Water", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/" },
    { title: "Trapping Rain Water", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/" }
  ],
  "sliding-window": [
    { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { title: "Longest Repeating Character Replacement", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
    { title: "Permutation in String", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/" },
    { title: "Minimum Window Substring", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/" },
    { title: "Sliding Window Maximum", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/" }
  ],
  "stack": [
    { title: "Valid Parentheses", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/" },
    { title: "Min Stack", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/min-stack/" },
    { title: "Evaluate Reverse Polish Notation", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
    { title: "Generate Parentheses", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/" },
    { title: "Daily Temperatures", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/" },
    { title: "Car Fleet", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/car-fleet/" },
    { title: "Largest Rectangle in Histogram", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/" }
  ],
  "binary-search": [
    { title: "Binary Search", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/binary-search/" },
    { title: "Search a 2D Matrix", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { title: "Koko Eating Bananas", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/" },
    { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { title: "Search in Rotated Sorted Array", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { title: "Time Based Key-Value Store", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/time-based-key-value-store/" },
    { title: "Median of Two Sorted Arrays", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/" }
  ],
  "linked-list": [
    { title: "Reverse Linked List", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/" },
    { title: "Merge Two Sorted Lists", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { title: "Reorder List", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/reorder-list/" },
    { title: "Remove Nth Node From End of List", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    { title: "Copy List with Random Pointer", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
    { title: "Add Two Numbers", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/" },
    { title: "Linked List Cycle", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/" },
    { title: "Find the Duplicate Number", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/" },
    { title: "LRU Cache", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/lru-cache/" },
    { title: "Merge k Sorted Lists", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { title: "Reverse Nodes in k-Group", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/" }
  ],
  "trees": [
    { title: "Invert Binary Tree", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/" },
    { title: "Maximum Depth of Binary Tree", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { title: "Diameter of Binary Tree", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/" },
    { title: "Balanced Binary Tree", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/" },
    { title: "Same Tree", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/same-tree/" },
    { title: "Subtree of Another Tree", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/" },
    { title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { title: "Binary Tree Level Order Traversal", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { title: "Binary Tree Right Side View", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/" },
    { title: "Count Good Nodes in Binary Tree", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
    { title: "Validate Binary Search Tree", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { title: "Kth Smallest Element in a BST", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
    { title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { title: "Binary Tree Maximum Path Sum", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" }
  ],
  "heap-priority-queue": [
    { title: "Kth Largest Element in a Stream", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
    { title: "Last Stone Weight", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/" },
    { title: "K Closest Points to Origin", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/" },
    { title: "Kth Largest Element in an Array", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { title: "Task Scheduler", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/task-scheduler/" },
    { title: "Design Twitter", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/design-twitter/" },
    { title: "Find Median from Data Stream", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/" }
  ],
  "backtracking": [
    { title: "Subsets", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/subsets/" },
    { title: "Combination Sum", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/combination-sum/" },
    { title: "Permutations", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/permutations/" },
    { title: "Subsets II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/subsets-ii/" },
    { title: "Combination Sum II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/" },
    { title: "Word Search", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/word-search/" },
    { title: "Palindrome Partitioning", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/" },
    { title: "Letter Combinations of a Phone Number", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
    { title: "N-Queens", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/n-queens/" }
  ],
  "graphs": [
    { title: "Number of Islands", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/number-of-islands/" },
    { title: "Clone Graph", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/clone-graph/" },
    { title: "Max Area of Island", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/max-area-of-island/" },
    { title: "Pacific Atlantic Water Flow", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
    { title: "Surrounded Regions", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/" },
    { title: "Rotting Oranges", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/" },
    { title: "Walls and Gates", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/walls-and-gates/" },
    { title: "Course Schedule", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/course-schedule/" },
    { title: "Course Schedule II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/" },
    { title: "Redundant Connection", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/redundant-connection/" },
    { title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
    { title: "Graph Valid Tree", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/" },
    { title: "Word Ladder", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/word-ladder/" }
  ],
  "1d-dynamic-programming": [
    { title: "Climbing Stairs", difficulty: "Easy", solved: true, leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/" },
    { title: "Min Cost Climbing Stairs", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
    { title: "House Robber", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/house-robber/" },
    { title: "House Robber II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/" },
    { title: "Longest Palindromic Substring", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { title: "Palindromic Substrings", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/" },
    { title: "Decode Ways", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/decode-ways/" },
    { title: "Coin Change", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/coin-change/" },
    { title: "Maximum Product Subarray", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/" },
    { title: "Word Break", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/word-break/" },
    { title: "Longest Increasing Subsequence", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { title: "Partition Equal Subset Sum", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/" }
  ],
  "2d-dynamic-programming": [
    { title: "Unique Paths", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/unique-paths/" },
    { title: "Longest Common Subsequence", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/" },
    { title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
    { title: "Coin Change 2", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/coin-change-2/" },
    { title: "Target Sum", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/target-sum/" },
    { title: "Interleaving String", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/interleaving-string/" },
    { title: "Longest Increasing Path in a Matrix", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
    { title: "Distinct Subsequences", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/" },
    { title: "Edit Distance", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/edit-distance/" },
    { title: "Burst Balloons", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/burst-balloons/" },
    { title: "Regular Expression Matching", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/" }
  ],
  "greedy": [
    { title: "Maximum Subarray", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/" },
    { title: "Jump Game", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/jump-game/" },
    { title: "Jump Game II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/" },
    { title: "Gas Station", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/gas-station/" },
    { title: "Hand of Straights", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/" },
    { title: "Merge Intervals", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/merge-intervals/" },
    { title: "Insert Interval", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/insert-interval/" },
    { title: "Non-overlapping Intervals", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { title: "Meeting Rooms", difficulty: "Easy", solved: false, leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/" },
    { title: "Meeting Rooms II", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/" },
    { title: "Minimum Interval to Include Each Query", difficulty: "Hard", solved: false, leetcodeUrl: "https://leetcode.com/problems/minimum-interval-to-include-each-query/" },
    { title: "Partition Labels", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/partition-labels/" },
    { title: "Valid Parenthesis String", difficulty: "Medium", solved: false, leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/" }
  ]
};
const patterns = [
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

export default function NeetCodeTracker() {
  const [selectedPattern, setSelectedPattern] = useState("array-hashing");
  const [filter, setFilter] = useState("all");
  const [problemStates, setProblemStates] = useState(() => {
    const states = {};
    Object.keys(neetcodeProblems).forEach(pattern => {
      states[pattern] = {};
      neetcodeProblems[pattern].forEach((problem, idx) => {
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
    const problems = neetcodeProblems[patternId];
    const solved = Object.values(problemStates[patternId] || {}).filter(Boolean).length;
    return { solved, total: problems.length };
  };

  const getTotalStats = () => {
    let totalSolved = 0;
    let totalProblems = 0;
    patterns.forEach(pattern => {
      const stats = getPatternStats(pattern.id);
      totalSolved += stats.solved;
      totalProblems += stats.total;
    });
    return { solved: totalSolved, total: totalProblems };
  };

  const filteredProblems = neetcodeProblems[selectedPattern]?.filter(problem => {
    const problemIndex = neetcodeProblems[selectedPattern].indexOf(problem);
    if (filter === "solved") return problemStates[selectedPattern][problemIndex];
    if (filter === "unsolved") return !problemStates[selectedPattern][problemIndex];
    return true;
  }) || [];

  const totalStats = getTotalStats();
  const selectedPatternObj = patterns.find(p => p.id === selectedPattern);
  const Icon = selectedPatternObj?.icon;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">NeetCode 150</h1>
              <p className="text-gray-400 mt-1">Track your coding interview preparation</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{totalStats.solved}/{totalStats.total}</div>
              <div className="text-sm text-gray-400">Problems Solved</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Patterns</h2>
              <div className="space-y-2">
                {patterns.map((pattern) => {
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
                      width: `${(getPatternStats(selectedPattern).solved / getPatternStats(selectedPattern).total) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Problems List */}
              <div className="space-y-3">
                {filteredProblems.map((problem, index) => {
                  const originalIndex = neetcodeProblems[selectedPattern].indexOf(problem);
                  const isSolved = problemStates[selectedPattern][originalIndex];
                  
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
                          <h3 className={`font-medium ${isSolved ? 'text-green-400 line-through' : 'text-white'}`}>
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
                        </div>
                      </div>
                      
                      <a
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}