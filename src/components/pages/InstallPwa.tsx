"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";

function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detecta iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    // Detecta modo standalone (já instalado)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Manipula evento beforeinstallprompt para Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e); // Armazena o evento para disparar mais tarde
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt(); // Chama o prompt de instalação
      setDeferredPrompt(null); // Reseta o evento após o uso
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md flex flex-row gap-3">
      <div className="flex flex-1 flex-col justify-between">
        <h3 className="text-xl font-semibold">Obtenha nosso APP</h3>
        <button
          onClick={handleInstallClick}
          className="flex flex-row  justify-center items-center gap-2 px-4 py-2 w-36 h-[50px] bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition"
          disabled={!deferredPrompt || isStandalone}
        >
          Instalar <ArrowDownToLine size={16} />
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
            .
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center px-4">
        <div className="custom-rating flex flex-col justify-center items-center">
          <span className="text-sm">4.3</span>
          <Rating
            value={4}
            readonly
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <Image
          className="border border-gray-400 rounded-lg"
          src="/web-app-manifest-192x192.png"
          alt="App icon"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}

export default InstallPwa;
