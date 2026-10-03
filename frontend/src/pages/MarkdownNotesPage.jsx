import Header from "../components/Header";
import FileDropZone from "../components/FileDropZone";
import MarkdownEditor from "../components/MarkdownEditor";
import SavedNotes from "../components/SavedNotes";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function MarkdownNotesPage() {
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  function handleNoteDeleted(noteId) {
    setSavedNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );
  }

  useEffect(() => {
    async function fetchSavedNotes() {
      try {
        const response = await fetch("http://localhost:8000/notes/");

        if (!response.ok) {
          toast.error;
          return;
        }

        const data = await response.json();
        setSavedNotes(data);
      } catch (error) {
        toast.error("Failed to fetch saved notes.");
        console.log(error);
      }
    }

    fetchSavedNotes();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[#FAF7EF]">
      <Header />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <FileDropZone setContent={setContent} />
          <MarkdownEditor
            content={content}
            setContent={setContent}
            onNoteSave={(note) => {
              setSavedNotes((currentNotes) => [...currentNotes, note]);
            }}
          />
        </section>
        <aside>
          <SavedNotes notes={savedNotes} onNoteDeleted={handleNoteDeleted} />
        </aside>
      </main>
    </div>
  );
}

export default MarkdownNotesPage;
