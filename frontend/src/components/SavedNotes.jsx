import { toast } from "sonner";

function SavedNotes({ notes, onNoteDeleted }) {
  async function deleteNote(noteId) {
    try {
      const response = await fetch(`http://localhost:8000/notes/${noteId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete note.");
        return;
      }
      onNoteDeleted(noteId);

      toast.success("Note deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete note.");
      console.log(error);
    }
  }

  function openHTML(noteId) {
    window.open(`http://localhost:8000/notes/${noteId}/html`, "_blank");
  }

  return (
    <div className="rounded-xl border border-[#DFDACF] bg-[#F5F2E7] p-4">
      <h2 className="text-xl tracking-tighter text-[#928889]">Saved Notes</h2>

      <div className="mt-4 space-y-3">
        {notes.length === 0 ? (
          <p className="mt-4 text-sm text-[#766E70]">No saved notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              className="rounded-lg border border-[#DFDACF] bg-[#FDFBF5] p-4"
              key={note.id}
            >
              <h3 className="font-medium text-[#281E16]">
                {note.title || "Untitled Note"}
              </h3>
              <p className="mt-1 text-sm text-[#766E70]">
                {new Date(note.created_at).toLocaleDateString()}
              </p>
              <div className="mt-4 flex gap-2">
                <button 
                onClick={() => openHTML(note.id)}
                className="cursor-pointer rounded-lg border border-[#DFDACF] bg-[#F0EBDE] px-4 py-2 text-sm">
                  HTML
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="cursor-pointer rounded-lg bg-[#873C16] px-4 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedNotes;
