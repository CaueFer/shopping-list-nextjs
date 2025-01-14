import { showSuccessAlert } from "@/components/alerts/successAlert";
import { Lista } from "@/core/interfaces/lista.interface";
import { listItem } from "@/core/interfaces/listItem.interface";
import { useState } from "react";

function useCopyLinkToClipboard() {
  const [copyResponse, setCopySuccess] = useState<boolean | null>(null);

  const copyLinkToClipboard = (currentUrl: URL | string) => {
    try {
      navigator.clipboard
        .writeText(currentUrl.toString())
        .then(() => {
          setCopySuccess(true);
          showSuccessAlert("Copiado", "Link copiado, envie para quer quiser compartilhar!");
        })
        .catch((err) => {
          console.error("Erro ao copiar o link: ", err);
          setCopySuccess(true);
        });
    } catch (error) {
      console.error("Erro ao gerar o link: ", error);
      setCopySuccess(true);
    }
  };

  return {
    copyResponse,
    copyLinkToClipboard,
  };
}

export default useCopyLinkToClipboard;
