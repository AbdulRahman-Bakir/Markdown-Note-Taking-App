function SavedNotes() {
  return (
    <div className="rounded-xl border border-[#DFDACF] bg-[#F5F2E7] p-4">
      <h2 className="text-xl tracking-tighter text-[#928889]">
        Saved Notes
      </h2>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-[#DFDACF] bg-[#FDFBF5] p-4">
          <h3 className="font-medium text-[#281E16]">
            Weekly notes
          </h3>

          <p className="mt-1 text-sm text-[#766E70]">
            September 30, 2026
          </p>

          <div className="mt-4 flex gap-2">
            <button className="cursor-pointer rounded-lg border border-[#DFDACF] bg-[#F0EBDE] px-4 py-2 text-sm">
              HTML
            </button>

            <button className="cursor-pointer rounded-lg bg-[#873C16] px-4 py-2 text-sm text-white">
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#DFDACF] bg-[#FDFBF5] p-4">
          <h3 className="font-medium text-[#281E16]">
            Project ideas
          </h3>

          <p className="mt-1 text-sm text-[#766E70]">
            September 29, 2026
          </p>

          <div className="mt-4 flex gap-2">
            <button className="cursor-pointer rounded-lg border border-[#DFDACF] bg-[#F0EBDE] px-4 py-2 text-sm">
              HTML
            </button>

            <button className="cursor-pointer rounded-lg bg-[#873C16] px-4 py-2 text-sm text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedNotes;