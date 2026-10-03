import MarkdownNotesPage from "./pages/MarkdownNotesPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <MarkdownNotesPage />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
