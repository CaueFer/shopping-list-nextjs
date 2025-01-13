"use client";

import { ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";

function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detecta iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    // Detecta modo standalone (já instalado)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Manipula evento beforeinstallprompt para Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e); // Armazena o evento para disparar mais tarde
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt(); // Chama o prompt de instalação
      setDeferredPrompt(null); // Reseta o evento após o uso
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-xl font-semibold mb-4">Obtenha nosso APP</h3>
      <button
        onClick={handleInstallClick}
        className="flex flex-row  justify-center items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        disabled={!deferredPrompt || isStandalone}
      > 
       Instalar <ArrowDownToLine size={16} />
      </button>
      {isIOS && (
        <p className="mt-4 text-gray-700">
          Para instalar este aplicativo no seu dispositivo iOS, toque no botão
          de compartilhamento{" "}
          <span role="img" aria-label="ícone de compartilhamento">⎋</span> e
          depois em &quot;Adicionar à Tela de Início&quot;
          <span role="img" aria-label="ícone de adicionar"> ➕</span>.
        </p>
      )}
    </div>
  );
}

export default InstallPwa;
