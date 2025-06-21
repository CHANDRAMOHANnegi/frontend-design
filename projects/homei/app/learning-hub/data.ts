import { Code, Trophy } from "lucide-react";
import { BlogPost, BlogTopic, NoteCategory, Question } from "./type";

// Data
export const questions: Question[] = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    description:
      "Write a function to reverse a given string without using built-in reverse methods.",
    examples: [
      { input: "reverseString('hello')", output: "'olleh'" },
      { input: "reverseString('JavaScript')", output: "'tpircSavaJ'" },
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
    ],
    hints: [
      "Think about accessing string characters by index",
      "You can build a new string character by character",
    ],
    notes: "This problem teaches string manipulation and loop control.",
  },
];

export const blogTopics:BlogTopic[] = [
  {
    id: 1,
    name: "JavaScript Fundamentals",
    count: 12,
    color: "bg-blue-100 text-blue-700",
    description: "Core JavaScript concepts",
  },
  {
    id: 2,
    name: "Data Structures",
    count: 8,
    color: "bg-green-100 text-green-700",
    description: "Arrays and objects",
  },
  {
    id: 3,
    name: "Algorithms",
    count: 15,
    color: "bg-purple-100 text-purple-700",
    description: "Problem-solving techniques",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    excerpt: "Deep dive into closures...",
    date: "2025-06-10",
    readTime: "7 min",
    topicId: 1,
    content: "Closures are powerful features in JavaScript...",
    tags: ["JavaScript", "Functions"],
  },
  {
    id: 2,
    title: "Array Methods Every Developer Should Know",
    excerpt: "Master important array methods...",
    date: "2025-06-08",
    readTime: "5 min",
    topicId: 1,
    content: "JavaScript arrays have many built-in methods...",
    tags: ["JavaScript", "Arrays"],
  },
];

export const noteCategories:NoteCategory[] = [
  {
    id: 1,
    name: "Learning Goals",
    count: 5,
    color: "bg-amber-100 text-amber-700",
    icon: Trophy,
    description: "Track learning objectives",
  },
  {
    id: 2,
    name: "Code Snippets",
    count: 12,
    color: "bg-blue-100 text-blue-700",
    icon: Code,
    description: "Useful code examples",
  },
];

export const sampleNotes = {
  1: `# Learning Goals for 2025\n\n## JavaScript Mastery\n- [ ] Complete 100 coding problems\n- [x] Understand closures`,
  2: `# Code Snippets\n\n\`\`\`javascript\nexport const unique = [...new Set(array)];\n\`\`\``,
};