import Header from "../components/Header";
import FileDropZone from "../components/FileDropZone";
import MarkdownEditor from "../components/MarkdownEditor";
import SavedNotes from "../components/SavedNotes";
import { useState } from "react";

function MarkdownNotesPage() {
  const [content, setContent] = useState("");

  return (
    <div className="font-sans min-h-screen bg-[#FAF7EF]">
      <Header />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <FileDropZone setContent={setContent} />
          <MarkdownEditor content={content} setContent={setContent} />
        </section>
        <aside>
          <SavedNotes />
        </aside>
      </main>
    </div>
  );
}

export default MarkdownNotesPage;
