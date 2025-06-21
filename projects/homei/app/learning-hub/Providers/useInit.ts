import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useInit = () => {
  const { data: notes } = useSWR("http://localhost:3000/api/notes", fetcher);

  const { data: questions } = useSWR(
    "http://localhost:3000/api/problems",
    fetcher
  );
  const { data: notesCategories } = useSWR(
    "http://localhost:3000/api/notes/categories",
    fetcher
  );

    const { data: blogs } = useSWR(
    "http://localhost:3000/api/blogs",
    fetcher
  );

  return {
    notes,
    questions,
    notesCategories,
    blogs
  };
};
