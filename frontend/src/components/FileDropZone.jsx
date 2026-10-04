import { useState } from "react";
import { toast } from "sonner";

function FileDropZone({ setContent, onNoteUploaded }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 1_000_000;

  async function uploadFile(file) {
    if (!file) {
      toast.error("No file selected for upload.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".md")) {
      toast.error("Only markdown (.md) files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the 1MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/notes/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();

        toast.error(data.detail || "Upload failed.");
        return;
      }

      const data = await response.json();

      setContent(data.content);
      onNoteUploaded(data);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
      console.log("error", error);
    }
  }

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);

          const droppedFile = event.dataTransfer.files[0];
          uploadFile(droppedFile)
        }}
        className={`w-full rounded-xl border border-dashed px-4 py-8 text-center ${
          isDragging
            ? "border-[#873C16] bg-[#F0EBDE]"
            : "border-[#DFDACF] bg-[#FFFDF9]"
        }`}
      >
        Drop a .md file here, or{" "}
        <label className="cursor-pointer font-semibold text-[#973C3A] underline">
          browse your files
          <input
            type="file"
            accept=".md"
            className="hidden"
            onChange={(event) => {
              setFile(event.target.files[0]);
              uploadFile(event.target.files[0]);
            }}
          />
        </label>
      </div>
      {file && (
        <p className="mt-3 text-sm text-[#766E70]">
          Selected file: {file.name}
        </p>
      )}
    </div>
  );
}

export default FileDropZone;
