import React from 'react'
import { Card } from '../components';

export const NotesView = ({ state, dispatch }) => {
  console.log(state);
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded-lg ${state.selectedNoteCategory?.color
                ?.replace("text-", "bg-")
                ?.replace("100", "500")}`}
            >
              {/* <state.selectedNoteCategory.icon className="w-5 h-5 text-white" /> */}
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
};
