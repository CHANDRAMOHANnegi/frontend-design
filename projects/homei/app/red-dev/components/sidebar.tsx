import React from "react";
import { QuestionType } from "../type";

type SidebarProps = {
  questions: QuestionType[];
  onSelect: (question: QuestionType) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ questions, onSelect }) => {
  return (
    <div className="w-1/4 bg-white shadow-lg h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      <ul>
        {questions.map((q) => (
          <li
            key={q.id}
            className="p-2 cursor-pointer hover:bg-blue-100 rounded"
            onClick={() => onSelect(q)}
          >
            {q.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
