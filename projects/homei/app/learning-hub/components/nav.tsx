import { BookOpen, Code, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="flex p-4 border-b border-gray-200">
      <div
        className="p-4 border-b border-gray-200"
        onClick={() => {
          router.push("/learning-hub");
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Learning Hub</h1>
        </div>
      </div>

      <nav className="space-y-2 flex">
        {[
          {
            view: "problems",
            icon: Code,
            label: "Problems",
            href: "/learning-hub/dsa",
          },
          {
            view: "blog",
            icon: BookOpen,
            label: "Blog",
            href: "/learning-hub/blogs",
          },
          {
            view: "notes",
            icon: FileText,
            label: "Notes",
            href: "/learning-hub/notes",
          },
        ].map(({ view, icon: Icon, label, href }) => (
          <button
            key={view}
            onClick={() => {
              router.push(href);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-full ${"text-gray-600 hover:bg-gray-100"}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
