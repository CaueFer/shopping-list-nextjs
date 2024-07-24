export function Footer() {
  return (
    <footer className="px-4 bg-white w-full flex h-24 text-black rounded-t-lg">
      <div className="flex-1 flex flex-col items-center justify-center  text-sm ">
        <i className="bx bx-home-alt text-2xl"></i>
        <span>Home</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center  text-sm ">
        <i className="bx bx-search-alt text-2xl"></i>
        <span>Listas</span>
      </div>

      <div className="flex flex-col items-center justify-center relative  w-[75px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-blue w-[60px] h-[60px] rounded-full z-10"></div>
        <i className="bx bx-plus text-4xl font-bold z-20 text-white"></i>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center  text-sm ">
        <i className="bx bx-send text-2xl"></i>
        <span>Enviar</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-sm ">
        <i className="bx bx-home-alt text-2xl"></i>
        <span>Listas</span>
      </div>
    </footer>
  );
}
