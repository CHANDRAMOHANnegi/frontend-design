import mongoose from "mongoose";
import {
  User,
  Problem,
  Submission,
  BlogTopic,
  BlogPost,
  NoteCategory,
  Note,
  Progress,
} from "./schema/schema.js"; // Adjust the import path as necessary

// Sample data variables
const userData = [
  {
    email: "john.doe@example.com",
    password: "hashedpassword123",
    name: "John Doe",
    avatar: "https://example.com/avatar1.png",
    preferences: { theme: "dark", difficulty: "medium" },
    lastLogin: new Date("2024-12-01"),
  },
  {
    email: "jane.smith@example.com",
    password: "hashedpassword456",
    name: "Jane Smith",
    avatar: "https://example.com/avatar2.png",
    preferences: { theme: "light", difficulty: "all" },
    lastLogin: new Date("2024-12-15"),
  },
  {
    email: "mike.johnson@example.com",
    password: "hashedpassword789",
    name: "Mike Johnson",
    avatar: "https://example.com/avatar3.png",
    preferences: { theme: "dark", difficulty: "hard" },
    lastLogin: new Date("2024-12-20"),
  },
  {
    email: "sarah.wilson@example.com",
    password: "hashedpassword101",
    name: "Sarah Wilson",
    avatar: "https://example.com/avatar4.png",
    preferences: { theme: "light", difficulty: "easy" },
    lastLogin: new Date("2024-12-18"),
  },
  {
    email: "alex.brown@example.com",
    password: "hashedpassword102",
    name: "Alex Brown",
    avatar: "https://example.com/avatar5.png",
    preferences: { theme: "dark", difficulty: "medium" },
    lastLogin: new Date("2024-12-22"),
  },
  {
    email: "emma.davis@example.com",
    password: "hashedpassword103",
    name: "Emma Davis",
    avatar: "https://example.com/avatar6.png",
    preferences: { theme: "light", difficulty: "all" },
    lastLogin: new Date("2024-12-21"),
  },
  {
    email: "david.miller@example.com",
    password: "hashedpassword104",
    name: "David Miller",
    avatar: "https://example.com/avatar7.png",
    preferences: { theme: "dark", difficulty: "hard" },
    lastLogin: new Date("2024-12-19"),
  },
  {
    email: "lisa.garcia@example.com",
    password: "hashedpassword105",
    name: "Lisa Garcia",
    avatar: "https://example.com/avatar8.png",
    preferences: { theme: "light", difficulty: "medium" },
    lastLogin: new Date("2024-12-17"),
  },
  {
    email: "ryan.martinez@example.com",
    password: "hashedpassword106",
    name: "Ryan Martinez",
    avatar: "https://example.com/avatar9.png",
    preferences: { theme: "dark", difficulty: "easy" },
    lastLogin: new Date("2024-12-16"),
  },
  {
    email: "jennifer.taylor@example.com",
    password: "hashedpassword107",
    name: "Jennifer Taylor",
    avatar: "https://example.com/avatar10.png",
    preferences: { theme: "light", difficulty: "hard" },
    lastLogin: new Date("2024-12-14"),
  },
  {
    email: "kevin.anderson@example.com",
    password: "hashedpassword108",
    name: "Kevin Anderson",
    avatar: "https://example.com/avatar11.png",
    preferences: { theme: "dark", difficulty: "all" },
    lastLogin: new Date("2024-12-13"),
  },
  {
    email: "amanda.thomas@example.com",
    password: "hashedpassword109",
    name: "Amanda Thomas",
    avatar: "https://example.com/avatar12.png",
    preferences: { theme: "light", difficulty: "medium" },
    lastLogin: new Date("2024-12-12"),
  },
  {
    email: "chris.jackson@example.com",
    password: "hashedpassword110",
    name: "Chris Jackson",
    avatar: "https://example.com/avatar13.png",
    preferences: { theme: "dark", difficulty: "easy" },
    lastLogin: new Date("2024-12-11"),
  },
  {
    email: "nicole.white@example.com",
    password: "hashedpassword111",
    name: "Nicole White",
    avatar: "https://example.com/avatar14.png",
    preferences: { theme: "light", difficulty: "hard" },
    lastLogin: new Date("2024-12-10"),
  },
  {
    email: "daniel.harris@example.com",
    password: "hashedpassword112",
    name: "Daniel Harris",
    avatar: "https://example.com/avatar15.png",
    preferences: { theme: "dark", difficulty: "medium" },
    lastLogin: new Date("2024-12-09"),
  },
];

const blogTopicData = [
  { 
    name: "Algorithms", 
    description: "All about algorithms and problem-solving techniques", 
    color: "#f39c12" 
  },
  { 
    name: "JavaScript", 
    description: "JavaScript tips, tricks, and best practices", 
    color: "#27ae60" 
  },
  { 
    name: "Data Structures", 
    description: "Understanding fundamental data structures", 
    color: "#3498db" 
  },
  { 
    name: "System Design", 
    description: "Large-scale system architecture and design patterns", 
    color: "#9b59b6" 
  },
  { 
    name: "Web Development", 
    description: "Frontend and backend web development", 
    color: "#e74c3c" 
  },
  { 
    name: "Database", 
    description: "Database design, optimization, and management", 
    color: "#1abc9c" 
  },
  { 
    name: "Career", 
    description: "Career advice and interview preparation", 
    color: "#f1c40f" 
  },
  { 
    name: "Machine Learning", 
    description: "ML algorithms and data science", 
    color: "#e67e22" 
  },
];

const problemData = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    defaultSolution: "function twoSum(nums, target) {\n    // Your code here\n    return [];\n}",
    testCases: [
      { input: "[2,7,11,15], 9", expected: [0,1] },
      { input: "[3,2,4], 6", expected: [1,2] },
      { input: "[3,3], 6", expected: [0,1] },
    ],
    hints: ["Use a hash map to store complements", "Check if target - current number exists in map"],
    notes: "Classic array problem, good for beginners",
    tags: ["array", "hash-table"],
    category: "Array",
    submissions: 1500,
    successRate: 85.2,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" },
    ],
    defaultSolution: "function lengthOfLongestSubstring(s) {\n    // Your code here\n    return 0;\n}",
    testCases: [
      { input: '"abcabcbb"', expected: 3 },
      { input: '"bbbbb"', expected: 1 },
      { input: '"pwwkew"', expected: 3 },
    ],
    hints: ["Use sliding window technique", "Keep track of character positions"],
    tags: ["string", "sliding-window", "hash-table"],
    category: "String",
    submissions: 2100,
    successRate: 65.8,
  },
  {
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
    ],
    defaultSolution: "function addTwoNumbers(l1, l2) {\n    // Your code here\n    return null;\n}",
    testCases: [
      { input: "[2,4,3], [5,6,4]", expected: [7,0,8] },
    ],
    hints: ["Handle carry-over carefully", "Consider different list lengths"],
    tags: ["linked-list", "math", "recursion"],
    category: "Linked List",
    submissions: 1800,
    successRate: 72.3,
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" },
    ],
    defaultSolution: "function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n    return 0;\n}",
    testCases: [
      { input: "[1,3], [2]", expected: 2.0 },
      { input: "[1,2], [3,4]", expected: 2.5 },
    ],
    hints: ["Use binary search", "Time complexity should be O(log(m+n))"],
    tags: ["array", "binary-search", "divide-and-conquer"],
    category: "Array",
    submissions: 800,
    successRate: 35.2,
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    defaultSolution: "function isValid(s) {\n    // Your code here\n    return false;\n}",
    testCases: [
      { input: '"()"', expected: true },
      { input: '"()[]{}"', expected: true },
      { input: '"(]"', expected: false },
    ],
    hints: ["Use a stack data structure", "Match opening brackets with closing ones"],
    tags: ["string", "stack"],
    category: "Stack",
    submissions: 1200,
    successRate: 78.9,
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
    ],
    defaultSolution: "function mergeTwoLists(list1, list2) {\n    // Your code here\n    return null;\n}",
    testCases: [
      { input: "[1,2,4], [1,3,4]", expected: [1,1,2,3,4,4] },
    ],
    hints: ["Use two pointers", "Create a dummy head node"],
    tags: ["linked-list", "recursion"],
    category: "Linked List",
    submissions: 1400,
    successRate: 82.1,
  },
  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    ],
    defaultSolution: "function maxSubArray(nums) {\n    // Your code here\n    return 0;\n}",
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: 6 },
    ],
    hints: ["Use Kadane's algorithm", "Dynamic programming approach"],
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    category: "Dynamic Programming",
    submissions: 1900,
    successRate: 68.4,
  },
  {
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2" },
      { input: "n = 3", output: "3" },
    ],
    defaultSolution: "function climbStairs(n) {\n    // Your code here\n    return 0;\n}",
    testCases: [
      { input: "2", expected: 2 },
      { input: "3", expected: 3 },
      { input: "4", expected: 5 },
    ],
    hints: ["This is a Fibonacci sequence", "Use dynamic programming"],
    tags: ["math", "dynamic-programming", "memoization"],
    category: "Dynamic Programming",
    submissions: 1100,
    successRate: 79.6,
  },
  {
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]" },
    ],
    defaultSolution: "function inorderTraversal(root) {\n    // Your code here\n    return [];\n}",
    testCases: [
      { input: "[1,null,2,3]", expected: [1,3,2] },
    ],
    hints: ["Use recursion or iterative approach with stack", "Left -> Root -> Right"],
    tags: ["stack", "tree", "depth-first-search", "binary-tree"],
    category: "Tree",
    submissions: 1300,
    successRate: 75.3,
  },
  {
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
    ],
    defaultSolution: "function reverseList(head) {\n    // Your code here\n    return null;\n}",
    testCases: [
      { input: "[1,2,3,4,5]", expected: [5,4,3,2,1] },
    ],
    hints: ["Use three pointers: prev, curr, next", "Can be solved iteratively or recursively"],
    tags: ["linked-list", "recursion"],
    category: "Linked List",
    submissions: 1600,
    successRate: 81.7,
  },
];

const blogPostData = [
  {
    title: "Understanding Big-O Notation: A Beginner's Guide",
    excerpt: "Learn the fundamentals of algorithmic complexity and how to analyze the efficiency of your code.",
    content: `# Understanding Big-O Notation

Big-O notation is a mathematical concept used to describe the performance characteristics of algorithms. It helps us understand how an algorithm's runtime or space requirements grow as the input size increases.

## What is Big-O?

Big-O notation describes the upper bound of an algorithm's complexity. It gives us the worst-case scenario for how long an algorithm will take to run or how much memory it will use.

## Common Big-O Complexities

### O(1) - Constant Time
Operations that take the same amount of time regardless of input size.

### O(log n) - Logarithmic Time
Algorithms that divide the problem in half with each step, like binary search.

### O(n) - Linear Time
Processing each element in the input once.

### O(n²) - Quadratic Time
Nested loops that process each element against every other element.

Understanding these concepts is crucial for writing efficient code and passing technical interviews.`,
    tags: ["algorithms", "performance", "interview-prep"],
    readTime: "5 min read",
    published: true,
    publishedAt: new Date("2024-11-15"),
    views: 1250,
    likes: 89,
  },
  {
    title: "JavaScript Array Methods You Should Know",
    excerpt: "Master the most useful JavaScript array methods with practical examples and use cases.",
    content: `# Essential JavaScript Array Methods

JavaScript provides powerful array methods that can make your code more concise and readable. Here are the most important ones every developer should master.

## map()
Transform each element in an array and return a new array.

## filter()
Create a new array with elements that pass a test condition.

## reduce()
Reduce an array to a single value through accumulation.

## forEach()
Execute a function for each array element.

## find() and findIndex()
Locate specific elements in an array.

These methods are fundamental to functional programming in JavaScript and are commonly used in modern web development.`,
    tags: ["javascript", "arrays", "functional-programming"],
    readTime: "7 min read",
    published: true,
    publishedAt: new Date("2024-11-20"),
    views: 890,
    likes: 67,
  },
  {
    title: "Data Structures: Stacks and Queues Explained",
    excerpt: "Deep dive into two fundamental data structures and their real-world applications.",
    content: `# Stacks and Queues: Essential Data Structures

Understanding stacks and queues is fundamental to computer science and software engineering. These data structures have specific ordering principles that make them perfect for certain problems.

## Stack (LIFO - Last In, First Out)

A stack is like a pile of plates - you can only add or remove from the top.

### Common Use Cases:
- Function call management
- Undo operations
- Expression evaluation
- Backtracking algorithms

## Queue (FIFO - First In, First Out)

A queue is like a line at a store - first person in line is the first to be served.

### Common Use Cases:
- Task scheduling
- Breadth-first search
- Print job management
- Web server request handling

Both structures are essential building blocks for more complex algorithms and systems.`,
    tags: ["data-structures", "algorithms", "computer-science"],
    readTime: "8 min read",
    published: true,
    publishedAt: new Date("2024-11-25"),
    views: 1100,
    likes: 94,
  },
  {
    title: "System Design Basics: Scalability Patterns",
    excerpt: "Learn fundamental patterns for building scalable systems that can handle millions of users.",
    content: `# System Design: Building for Scale

As applications grow, they need to handle more users, data, and requests. Understanding scalability patterns is crucial for building robust systems.

## Horizontal vs Vertical Scaling

### Vertical Scaling (Scale Up)
Adding more power to existing machines.

### Horizontal Scaling (Scale Out)
Adding more machines to the pool of resources.

## Load Balancing

Distribute incoming requests across multiple servers to prevent any single server from becoming overwhelmed.

## Caching Strategies

- Browser caching
- CDN caching
- Application-level caching
- Database caching

## Database Scaling

- Read replicas
- Sharding
- Federation
- Denormalization

Understanding these concepts helps you design systems that can grow with your user base.`,
    tags: ["system-design", "scalability", "architecture"],
    readTime: "12 min read",
    published: true,
    publishedAt: new Date("2024-12-01"),
    views: 750,
    likes: 112,
  },
  {
    title: "React Hooks: useState and useEffect Deep Dive",
    excerpt: "Master the most commonly used React hooks with practical examples and best practices.",
    content: `# React Hooks: useState and useEffect

React Hooks revolutionized how we write React components by allowing us to use state and lifecycle methods in functional components.

## useState Hook

The useState hook lets you add state to functional components.

## useEffect Hook

The useEffect hook lets you perform side effects in functional components.

### Common Use Cases:
- Data fetching
- Setting up subscriptions
- Manually changing the DOM
- Cleanup operations

## Best Practices

- Use multiple state variables for unrelated data
- Use useEffect cleanup to prevent memory leaks
- Optimize performance with dependency arrays

These hooks form the foundation of modern React development.`,
    tags: ["react", "javascript", "web-development", "hooks"],
    readTime: "10 min read",
    published: true,
    publishedAt: new Date("2024-12-05"),
    views: 950,
    likes: 78,
  },
  {
    title: "Database Indexing: Performance Optimization",
    excerpt: "Learn how database indexes work and how to use them effectively to speed up your queries.",
    content: `# Database Indexing for Performance

Database indexes are crucial for query performance, but they come with trade-offs. Understanding when and how to use them can dramatically improve your application's speed.

## What are Indexes?

Indexes are data structures that improve the speed of data retrieval operations on a database table.

## Types of Indexes

### B-Tree Indexes
Most common type, good for equality and range queries.

### Hash Indexes
Excellent for equality comparisons, not suitable for range queries.

### Bitmap Indexes
Efficient for columns with low cardinality.

## Index Strategy

- Index columns used in WHERE clauses
- Consider composite indexes for multi-column queries
- Don't over-index - updates become slower

## Monitoring Performance

Use query execution plans to identify slow queries and missing indexes.`,
    tags: ["database", "performance", "sql", "optimization"],
    readTime: "9 min read",
    published: true,
    publishedAt: new Date("2024-12-08"),
    views: 680,
    likes: 85,
  },
  {
    title: "Cracking the Coding Interview: Top 10 Tips",
    excerpt: "Essential strategies and tips to help you succeed in technical interviews at top tech companies.",
    content: `# Cracking the Coding Interview: Your Success Guide

Technical interviews can be challenging, but with the right preparation and mindset, you can succeed. Here are the top strategies used by successful candidates.

## 1. Master the Fundamentals

- Data structures (arrays, linked lists, trees, graphs)
- Algorithms (sorting, searching, dynamic programming)
- Time and space complexity analysis

## 2. Practice Coding by Hand

Many interviews still involve whiteboard coding or paper-based problems.

## 3. Think Out Loud

Communicate your thought process clearly to the interviewer.

## 4. Ask Clarifying Questions

Don't jump into coding immediately - understand the problem first.

## 5. Start with a Brute Force Solution

Get something working first, then optimize.

## 6. Test Your Code

Walk through your solution with example inputs.

## 7. Know Your Resume

Be prepared to discuss any project or technology mentioned.

## 8. Prepare Questions

Show genuine interest in the company and role.

## 9. Mock Interviews

Practice with friends or platforms like Pramp or InterviewBit.

## 10. Stay Calm and Confident

Nervousness can hurt your performance - practice relaxation techniques.

Remember, interviews are as much about problem-solving approach as they are about getting the right answer.`,
    tags: ["career", "interview-prep", "coding-interview", "tips"],
    readTime: "15 min read",
    published: true,
    publishedAt: new Date("2024-12-10"),
    views: 1400,
    likes: 156,
  },
  {
    title: "Introduction to Machine Learning Algorithms",
    excerpt: "Get started with machine learning by understanding the most common algorithms and their applications.",
    content: `# Machine Learning Algorithms: A Beginner's Guide

Machine learning is transforming industries and creating new possibilities. Understanding the core algorithms is essential for anyone interested in this field.

## Supervised Learning

### Linear Regression
Predicts continuous values based on linear relationships.

### Decision Trees
Easy to understand and interpret, good for classification and regression.

### Random Forest
Ensemble method that combines multiple decision trees.

### Support Vector Machines
Effective for high-dimensional data and text classification.

## Unsupervised Learning

### K-Means Clustering
Groups similar data points together.

### Principal Component Analysis (PCA)
Reduces dimensionality while preserving important information.

## Deep Learning

### Neural Networks
Inspired by the human brain, capable of learning complex patterns.

### Convolutional Neural Networks (CNN)
Excellent for image recognition and computer vision.

## Choosing the Right Algorithm

Consider factors like:
- Size of your dataset
- Type of problem (classification, regression, clustering)
- Interpretability requirements
- Computational resources

Start with simple algorithms and gradually move to more complex ones as needed.`,
    tags: ["machine-learning", "algorithms", "data-science", "ai"],
    readTime: "11 min read",
    published: true,
    publishedAt: new Date("2024-12-12"),
    views: 820,
    likes: 103,
  },
];

const noteCategoryData = [
  { name: "Frontend", description: "Client-side development notes", color: "#3498db", icon: "🎨" },
  { name: "Backend", description: "Server-side development notes", color: "#e74c3c", icon: "⚙️" },
  { name: "Database", description: "Database design and queries", color: "#2ecc71", icon: "💾" },
  { name: "Algorithms", description: "Algorithm implementations and explanations", color: "#f39c12", icon: "🧮" },
  { name: "System Design", description: "Architecture and design patterns", color: "#9b59b6", icon: "🏗️" },
  { name: "DevOps", description: "Deployment and infrastructure", color: "#1abc9c", icon: "🚀" },
  { name: "Testing", description: "Testing strategies and frameworks", color: "#e67e22", icon: "🧪" },
  { name: "Performance", description: "Optimization and performance tuning", color: "#34495e", icon: "⚡" },
];

const noteData = [
  {
    title: "React useState Hook",
    content: `# useState Hook

The useState hook is the most commonly used hook in React. It allows you to add state to functional components.

## Basic Usage
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## Key Points
- Returns an array with current state and setter function
- State updates are asynchronous
- Use functional updates for state that depends on previous state
- Multiple state variables should be separate useState calls

## Example
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\``,
    tags: ["react", "hooks", "state-management"],
  },
  {
    title: "SQL JOIN Types",
    content: `# SQL JOIN Types

JOINs are used to combine rows from two or more tables based on related columns.

## INNER JOIN
Returns records that have matching values in both tables.

## LEFT JOIN (LEFT OUTER JOIN)
Returns all records from the left table and matched records from the right table.

## RIGHT JOIN (RIGHT OUTER JOIN)
Returns all records from the right table and matched records from the left table.

## FULL OUTER JOIN
Returns all records when there is a match in either left or right table.

## Examples
\`\`\`sql
-- INNER JOIN
SELECT customers.name, orders.order_date
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;

-- LEFT JOIN
SELECT customers.name, orders.order_date
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
\`\`\``,
    tags: ["sql", "database", "joins"],
  },
  {
    title: "Binary Search Implementation",
    content: `# Binary Search Algorithm

Binary search is an efficient algorithm for finding an item from a sorted list of items.

Time Complexity: O(log n)
Space Complexity: O(1) for iterative, O(log n) for recursive

## Iterative Implementation
\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}
\`\`\`

## Key Points
- Array must be sorted
- Eliminates half of remaining elements in each iteration
- Much faster than linear search for large datasets`,
    tags: ["algorithms", "binary-search", "javascript"],
  },
  {
    title: "Node.js Express Middleware",
    content: `# Express Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

## Types of Middleware
1. Application-level middleware
2. Router-level middleware
3. Error-handling middleware
4. Built-in middleware
5. Third-party middleware

## Example
\`\`\`javascript
// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route-specific middleware
app.get('/protected', authenticate, (req, res) => {
  res.send('Protected route');
});

function authenticate(req, res, next) {
  // Check authentication
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
\`\`\`

## Best Practices
- Always call next() or send a response
- Handle errors properly
- Order matters - middleware executes in order`,
    tags: ["nodejs", "express", "middleware"],
  },
  {
    title: "CSS Flexbox Cheat Sheet",
    content: `# CSS Flexbox Cheat Sheet

Flexbox is a powerful layout method for arranging items in rows or columns.

## Container Properties
- \`display: flex\` - Creates a flex container
- \`flex-direction\` - Sets the main axis (row, column, row-reverse, column-reverse)
- \`justify-content\` - Aligns items along main axis
- \`align-items\` - Aligns items along cross axis
- \`flex-wrap\` - Controls wrapping of flex items

## Item Properties
- \`flex-grow\` - How much item should grow
- \`flex-shrink\` - How much item should shrink
- \`flex-basis\` - Initial size of item
- \`align-self\` - Override align-items for individual item

## Common Patterns
\`\`\`css
/* Center everything */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Equal width columns */
.item {
  flex: 1;
}
\`\`\``,
    tags: ["css", "flexbox", "layout"],
  },
  {
    title: "Docker Commands Reference",
    content: `# Docker Commands Reference

Essential Docker commands for containerized development.

## Basic Commands
\`\`\`bash
# Build an image
docker build -t myapp .

# Run a container
docker run -p 3000:3000 myapp

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove containers
docker rm <container_id>

# List images
docker images

# Remove images
docker rmi <image_id>
\`\`\`

## Docker Compose
\`\`\`bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs
\`\`\`

## Cleanup Commands
\`\`\`bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune

# Remove all unused volumes
docker volume prune
\`\`\``,
    tags: ["docker", "devops", "containers"],
  },
  {
    title: "JavaScript Promises and Async/Await",
    content: `# Promises and Async/Await

Modern JavaScript asynchronous programming patterns.

## Promises
\`\`\`javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

// Using promises
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

## Async/Await
\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## Promise Methods
- \`Promise.all()\` - Wait for all promises
- \`Promise.race()\` - First promise to settle
- \`Promise.allSettled()\` - Wait for all, get all results

## Best Practices
- Always handle errors
- Use async/await for cleaner code
- Don't mix callbacks with promises`,
    tags: ["javascript", "promises", "async", "es6"],
  },
  {
    title: "Git Workflow and Commands",
    content: `# Git Workflow and Commands

Essential Git commands for version control.

## Basic Workflow
\`\`\`bash
# Initialize repository
git init

# Add files to staging
git add .
git add <filename>

# Commit changes
git commit -m "Commit message"

# Push to remote
git push origin main
\`\`\`

## Branching
\`\`\`bash
# Create new branch
git checkout -b feature-branch

# Switch branches
git checkout main

# Merge branch
git merge feature-branch

# Delete branch
git branch -d feature-branch
\`\`\`

## Useful Commands
\`\`\`bash
# View status
git status

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Stash changes
git stash
git stash pop
\`\`\`

## Best Practices
- Write clear commit messages
- Use feature branches
- Pull before pushing
- Review changes before committing`,
    tags: ["git", "version-control", "workflow"],
  },
  {
    title: "REST API Design Principles",
    content: `# REST API Design Principles

Guidelines for designing clean and maintainable REST APIs.

## HTTP Methods
- \`GET\` - Retrieve data
- \`POST\` - Create new resource
- \`PUT\` - Update entire resource
- \`PATCH\` - Partial update
- \`DELETE\` - Remove resource

## URL Structure
\`\`\`
# Good examples
GET /api/users
GET /api/users/123
POST /api/users
PUT /api/users/123
DELETE /api/users/123

# Collections and resources
GET /api/users/123/posts
POST /api/users/123/posts
\`\`\`

## Status Codes
- \`200\` - OK
- \`201\` - Created
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Internal Server Error

## Best Practices
- Use nouns for resources, not verbs
- Be consistent with naming
- Version your APIs
- Implement proper error handling
- Use HTTPS
- Document your API`,
    tags: ["api", "rest", "web-development", "backend"],
  },
  {
    title: "Python List Comprehensions",
    content: `# Python List Comprehensions

Elegant way to create lists in Python.

## Basic Syntax
\`\`\`python
# Basic list comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Multiple conditions
filtered = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
\`\`\`

## Nested Comprehensions
\`\`\`python
# 2D list
matrix = [[i+j for j in range(3)] for i in range(3)]

# Flattening
flattened = [item for sublist in matrix for item in sublist]
\`\`\`

## Dictionary and Set Comprehensions
\`\`\`python
# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}

# Set comprehension
unique_squares = {x**2 for x in range(-5, 6)}
\`\`\`

## When to Use
- Simple transformations
- Filtering data
- Creating new collections
- When readability isn't compromised

## When NOT to Use
- Complex logic (use regular loops)
- Side effects (printing, file operations)
- Very long expressions`,
    tags: ["python", "list-comprehension", "functional-programming"],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const dbUri = "mongodb+srv://cmsingh1721997:mgK0mN6mrFbAWTQa@cluster0.n5xtmhq.mongodb.net/Bucket"; // Adjust as per your database config
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Problem.deleteMany();
    await Submission.deleteMany();
    await BlogTopic.deleteMany();
    await BlogPost.deleteMany();
    await NoteCategory.deleteMany();
    await Note.deleteMany();
    await Progress.deleteMany();

    // Seed Users
    const users = await User.insertMany(userData);

    // Seed Problems
    const problems = await Problem.insertMany(problemData);

    // Seed Submissions
    await Submission.insertMany([
      {
        userId: users[0]._id,
        problemId: problems[0]._id,
        code: "function twoSum(nums, target) { return [0, 1]; }",
        language: "javascript",
        status: "passed",
        testResults: [
          {
            input: "[2,7,11,15], target=9",
            expected: "[0,1]",
            actual: "[0,1]",
            passed: true,
          },
        ],
      },
    ]);

    // Seed Blog Topics
    const blogTopics = await BlogTopic.insertMany(blogTopicData);

    // Seed Blog Posts
    await BlogPost.insertMany(blogPostData);

    // Seed Note Categories
    const noteCategories = await NoteCategory.insertMany(noteCategoryData);

    // Seed Notes
    await Note.insertMany(noteData);

    // Seed Progress
    await Progress.insertMany([
      {
        userId: users[0]._id,
        problemId: problems[0]._id,
        status: "completed",
        attempts: 1,
        bestSubmission: null,
        timeSpent: 10,
      },
    ]);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
