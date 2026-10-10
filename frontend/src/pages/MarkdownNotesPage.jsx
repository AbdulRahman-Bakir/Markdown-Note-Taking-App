import Header from "../components/Header";
import FileDropZone from "../components/FileDropZone";
import MarkdownEditor from "../components/MarkdownEditor";
import SavedNotes from "../components/SavedNotes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { API_URL } from "../services/api";

function MarkdownNotesPage() {
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  function handleNoteDeleted(noteId) {
    setSavedNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );

    // The editor was showing the note that just got deleted: reset it.
    if (noteId === editingNoteId) {
      setEditingNoteId(null);
      setContent("");
    }
  }

  function handleNoteSelected(noteId) {
    setEditingNoteId(noteId);
  }

  useEffect(() => {
    async function fetchSavedNotes() {
      try {
        const response = await fetch(`${API_URL}/notes/`);

        if (!response.ok) {
          toast.error("Failed to fetch saved notes.");
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
      <Header noteCount={savedNotes.length} />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <FileDropZone
            onNoteUploaded={(note) => {
              setSavedNotes((currentNotes) => [...currentNotes, note]);
              // The uploaded note is now the one being edited, so Save updates it
              // instead of creating a duplicate.
              setEditingNoteId(note.id);
            }}
          />
          <MarkdownEditor
            // Changing the key remounts the editor, which resets its local
            // state (title, tab, grammar results) when a different note is
            // selected or the current one is deleted.
            key={editingNoteId ?? "new"}
            content={content}
            setContent={setContent}
            onNoteSave={(note) => {
              setSavedNotes((currentNotes) => {
                if (editingNoteId === null) {
                  return [...currentNotes, note];
                }

                return currentNotes.map((currentNote) =>
                  currentNote.id === note.id ? note : currentNote,
                );
              });
              // After the first save of a new note, further saves must update it.
              setEditingNoteId(note.id);
            }}
            editingNoteId={editingNoteId}
          />
        </section>
        <aside>
          <SavedNotes
            notes={savedNotes}
            onNoteDeleted={handleNoteDeleted}
            onNoteSelected={handleNoteSelected}
          />
        </aside>
      </main>
    </div>
  );
}

export default MarkdownNotesPage;
