import React from "react";
import { QuestionsView } from "./questions";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <QuestionsView slug={slug} />
    </div>
  );
}

export default Page;
