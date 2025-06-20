import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type Question = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string }[];
  defaultSolution: string;
  testCases: { input: string; expected: string }[];
  hints: string[];
  notes: string;
};

export type BlogTopic = {
  id: number;
  name: string;
  count: number;
  color: string;
  description: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  topicId: number;
  content: string;
  tags: string[];
};

export type NoteCategory = {
  id: number;
  name: string;
  count: number;
  color: string;
  icon: LucideIcon;
  description: string;
};

export type AppState = {
  currentView: "problems" | "blog" | "notes";
  selectedQuestion: Question | null;
  code: string;
  output: string;
  notes: string;
  testResults: TestResult[];
  showSolution: boolean;
  showHints: boolean;
  activeTab: "problem" | "editor" | "notes";
  sidebarCollapsed: boolean;
  selectedBlogPost: BlogPost | null;
  selectedBlogTopic: BlogTopic | null;
  selectedNoteCategory: NoteCategory | null;
  currentNote: string;
};

export type TestResult = {
  input: string;
  expected: string;
  actual: string | Error;
  passed: boolean;
};

export type Action =
  | { type: "SET_VIEW"; payload: AppState["currentView"] }
  | { type: "SET_QUESTION"; payload: Question }
  | { type: "SET_CODE"; payload: string }
  | { type: "SET_OUTPUT"; payload: string }
  | { type: "SET_NOTES"; payload: string }
  | { type: "SET_TEST_RESULTS"; payload: TestResult[] }
  | { type: "TOGGLE_SOLUTION" }
  | { type: "TOGGLE_HINTS" }
  | { type: "SET_ACTIVE_TAB"; payload: AppState["activeTab"] }
  | { type: "RESET_CODE" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_BLOG_POST"; payload: BlogPost | null }
  | { type: "SET_BLOG_TOPIC"; payload: BlogTopic }
  | { type: "SET_NOTE_CATEGORY"; payload: NoteCategory }
  | { type: "SET_CURRENT_NOTE"; payload: string };

// Component Props
export type ButtonProps = {
  variant?: "default" | "primary" | "success" | "warning" | "secondary";
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BadgeProps = {
  variant?: "default" | "success" | "warning" | "error" | "info";
  children: ReactNode;
  className?: string;
};

export type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type AppProviderProps = {
  children: ReactNode;
};
