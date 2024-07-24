
export function NavListas() {



  return (
    <>
      <header className="px-6 py-4 bg-white w-full flex h-16 text-black flex items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <span>Lista de Compras</span>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center text-2xl">
          <i className="bx bx-trash "></i>
          <i className="bx bx-filter "></i>
          <i className="bx bx-dots-vertical-rounded "></i>
        </div>
      </header>
    </>
  );
}
