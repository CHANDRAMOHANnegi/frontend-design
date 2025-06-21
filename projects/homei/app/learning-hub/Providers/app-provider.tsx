"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { blogTopics, noteCategories, questions, sampleNotes } from "../data";
import { Action, AppState } from "../type";
import { useInit } from "./useInit";

// State Management
const initialState: AppState = {
  currentView: "problems",
  selectedQuestion: questions[0],
  code: "// Write your solution here\nfunction reverseString(str) {\n  \n}",
  output: "",
  testResults: [],
  showSolution: false,
  showHints: false,
  activeTab: "problem",
  sidebarCollapsed: false,
  selectedBlogPost: null,
  selectedBlogTopic: blogTopics[0],
  selectedNoteCategory: noteCategories[0],
  currentNote: sampleNotes[1],
  questionsData: { questions: [] },
  blogsData: { blogs: [] },
  notesData: { notes: [] },
};

// Create Context
const AppContext = createContext({});

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, currentView: action.payload };
    case "SET_QUESTION":
      return {
        ...state,
        selectedQuestion: action.payload,
        code: "// Write your solution here\nfunction reverseString(str) {\n  \n}",
        output: "",
        testResults: [],
        showSolution: false,
        showHints: false,
        activeTab: "problem",
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questionsData: {
          questions: action.payload,
        },
      };

    case "SET_BLOGS":
      return {
        ...state,
        blogsData: {
          blogs: action.payload,
        },
      };

    case "SET_NOTES":
      return {
        ...state,
        notesData: {
          notes: action.payload,
        },
      };
    case "SET_CODE":
      return { ...state, code: action.payload };
    case "SET_OUTPUT":
      return { ...state, output: action.payload };
    case "SET_TEST_RESULTS":
      return { ...state, testResults: action.payload };
    case "TOGGLE_SOLUTION":
      return {
        ...state,
        showSolution: !state.showSolution,
        code: !state.showSolution
          ? state.selectedQuestion?.defaultSolution ?? ""
          : state.code,
      };
    case "TOGGLE_HINTS":
      return { ...state, showHints: !state.showHints };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "RESET_CODE":
      return {
        ...state,
        code: "// Write your solution here\nfunction reverseString(str) {\n  \n}",
        output: "",
        testResults: [],
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case "SET_BLOG_POST":
      return { ...state, selectedBlogPost: action.payload };
    case "SET_BLOG_TOPIC":
      return {
        ...state,
        selectedBlogTopic: action.payload,
        selectedBlogPost: null,
      };
    case "SET_NOTE_CATEGORY":
      return {
        ...state,
        selectedNoteCategory: action.payload,
        currentNote:
          sampleNotes[action.payload?.id as keyof typeof sampleNotes] || "",
      };
    case "SET_CURRENT_NOTE":
      return { ...state, currentNote: action.payload };
    default:
      return state;
  }
}

// Context Provider
export const AppProvider = ({ children }: PropsWithChildren) => {
  const { notes, notesCategories, questions, blogs } = useInit();

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_NOTES", payload: notes });
    dispatch({ type: "SET_QUESTIONS", payload: questions });
    dispatch({ type: "SET_NOTE_CATEGORY", payload: notesCategories });
    dispatch({ type: "SET_BLOGS", payload: blogs });
  }, [notes, questions, notesCategories, blogs]);
  const value = { state, dispatch };
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
