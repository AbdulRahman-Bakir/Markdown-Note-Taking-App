function Header({ noteCount }) {
  return (
    <header className="border-b border-[#DFDACF] bg-[#FDFBF5]">
      <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row sm:items-center  sm:justify-between gap-4">
        <div className="">
          <h1 className="text-3xl text-[#281E16] tracking-tighter">Inkwell</h1>
          <p className="text-[#80766C] text-[15px] tracking-wide">
            Upload markdown, check the grammar, save and read it rendered.
          </p>
        </div>
        <button className="w-fit rounded-2xl border border-[#DFDACF] px-4 py-1.5 text-sm text-[#80766C]">
          {noteCount} saved {noteCount === 1 ? "note" : "notes"}
        </button>
      </div>
    </header>
  );
}

export default Header;
