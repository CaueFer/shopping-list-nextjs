"use client";

import { useEffect, useState } from "react";

function InstallPwa() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-xl font-semibold mb-4">Instalar Aplicativo</h3>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Adicionar à Tela Inicial
      </button>
      {isIOS && (
        <p className="mt-4 text-gray-700">
          Para instalar este aplicativo no seu dispositivo iOS, toque no botão
          de compartilhamento{" "}
          <span role="img" aria-label="ícone de compartilhamento">
            ⎋
          </span>{" "}
          e depois em &quot;Adicionar à Tela de Início&quot;
          <span role="img" aria-label="ícone de adicionar">
            {" "}
            ➕
          </span>
          . .
        </p>
      )}
    </div>
  );
}

export default InstallPwa;
