import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownEditor({ content, setContent }) {
  const [activeTab, setActiveTab] = useState("write");
  const [showGrammar, setShowGrammar] = useState(false);
  const [title, setTitle] = useState("Untitled note");
  return (
    <>
      <div className="border border-[#DFDACF] bg-[#FFFDF9] mt-4 rounded-xl">
        <div className="flex flex-col gap-3 border-b border-[#DFDACF] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Give your note a title..."
            className="min-w-0 flex-1 bg-transparent text-2xl font-semibold tracking-tight text-[#973C3A] placeholder:text-[#B8B0A8] outline-none"
          />

          <div className="flex w-fit shrink-0 rounded border border-[#DFDACF] p-0.5">
            <button
              onClick={() => setActiveTab("write")}
              className={`cursor-pointer rounded px-4 py-1 text-sm ${
                activeTab === "write"
                  ? "bg-[#873C16] text-white"
                  : "text-[#766E70]"
              }`}
            >
              Write
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`cursor-pointer rounded px-4 py-1 text-sm ${
                activeTab === "preview"
                  ? "bg-[#873C16] text-white"
                  : "text-[#766E70]"
              }`}
            >
              Preview
            </button>
          </div>
        </div>
        {activeTab === "write" ? (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="# Start writing markdown..."
            className="min-h-100 w-full resize-y bg-[#FFFDF9] p-4 font-mono text-base  leading-6 text-[#281E16] outline-none placeholder:text-[#928889] focus:border-[#873C16]"
          />
        ) : (
          <div className="min-h-100 p-4 text-[#281E16]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 text-3xl font-bold">{children}</h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-2xl font-semibold">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-5 text-xl font-semibold">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 leading-7">{children}</p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-1 pl-6">
                    {children}
                  </ol>
                ),

                li: ({ children }) => <li>{children}</li>,

                blockquote: ({ children }) => (
                  <blockquote className="mb-4 border-l-4 border-[#873C16] pl-4 italic text-[#766E70]">
                    {children}
                  </blockquote>
                ),

                code: ({ children }) => (
                  <code className="rounded bg-[#F0EBDE] px-1.5 py-0.5 font-mono text-sm">
                    {children}
                  </code>
                ),

                pre: ({ children }) => (
                  <pre className="mb-4 overflow-x-auto rounded-lg bg-[#281E16] p-4 font-mono text-sm text-white">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-[#F0EBDE]">{children}</thead>
                ),

                th: ({ children }) => (
                  <th className="border border-[#DFDACF] px-3 py-2 text-left font-semibold text-[#281E16]">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border border-[#DFDACF] px-3 py-2 text-[#766E70]">
                    {children}
                  </td>
                ),

                tr: ({ children }) => (
                  <tr className="even:bg-[#FDFBF5]">{children}</tr>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <div className="border-t border-[#DFDACF] p-4 flex gap-3">
          <button
            onClick={() => setShowGrammar(true)}
            className="cursor-pointer rounded-lg tracking-wide border border-[#DFDACF] px-6 py-2 bg-[#F0EBDE] text-sm"
          >
            Check grammar
          </button>
          <button className="cursor-pointer rounded-lg tracking-wide px-6 py-2 bg-[#873C16] text-sm text-white">
            Save note
          </button>
        </div>
      </div>
      {showGrammar && (
        <div className="mt-4 rounded-lg border border-[#DFDACF] bg-[#FDFBF5] p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-[#281E16]">Grammar suggestions</h3>

            <div>
              <button className="cursor-pointer rounded-lg tracking-wide border border-[#DFDACF] px-6 py-2 bg-[#F0EBDE] text-sm mr-3">
                Apply all
              </button>
              <button
                onClick={() => setShowGrammar(false)}
                className="cursor-pointer rounded-lg tracking-wide px-6 py-2 bg-[#873C16] text-sm text-white"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm text-[#766E70]">No suggestions yet.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MarkdownEditor;
