"use client";

import { Nav } from "@/components/layout/nav";
import { Lista } from "@/core/interfaces/lista.interface";
import useCopyLinkToClipboard from "@/hooks/copyToClipboard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function EnviarList() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");

  const serverURL = process.env.NEXT_PUBLIC_API_URL;

  const { copyResponse, copyLinkToClipboard } = useCopyLinkToClipboard();

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState<string | null>(null);
  const [listPassword, setListaPassword] = useState<string | null>(null);

  const getLists = async () => {
    setIsLoading(true);

    //console.log(owner);
    try {
      const url = new URL(`${serverURL}/api/getList`);
      if (owner) url.searchParams.append("owner", owner);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        //console.log(data);
        setLists(data);
        setIsLoading(false);
        setError(null);
      } else {
        const error = await response.json();
        console.error("Error get list:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error get lists", error);
      setIsLoading(false);
    }
  };

  const linkToClipboard = async (item: Lista) => {
    const currentUrl = new URL(window.location.href);

    currentUrl.search = "";

    currentUrl.searchParams.set("name", item.name);
    currentUrl.searchParams.set("password", item.password);

    copyLinkToClipboard(currentUrl);
  };

  const handleJoinList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(serverURL + "/api/joinList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: listName,
          password: listPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        router.push(
          `/lista?listId=${data.list.id}&listName=${encodeURIComponent(
            data.list.name
          )}`
        );
        setIsLoading(false);
      } else {
        const error = await response.json();
        console.error("Error joining list:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error joining list:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const name = searchParams.get("name");
    const pass = searchParams.get("password");

    if (name) setListName(name);
    if (pass) setListaPassword(pass);
  }, [searchParams]);

  useEffect(() => {
    if (listName && listPassword) handleJoinList();
    else getLists();
  }, [listName, listPassword]);

  return (
    <>
      <Nav title="Enviar listas" />
      <main className="flex-grow bg-theme-gray relative overflow-x-clip">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-14 h-14 border-8 text-theme-blue text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-theme-blue rounded-full"></div>
              Carregando...
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6 h-full">
            {lists.length > 0 ? (
              <>
                <h1>Clique na lista que deseja compartilhar.</h1>
                {lists.map((lista: Lista) => {
                  return (
                    <div
                      key={lista.id}
                      className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center"
                      onClick={() => {
                        linkToClipboard(lista);
                      }}
                    >
                      <i className="bx bx-share-alt text-sm"></i>
                      <h2>{lista.name}</h2>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1>Nenhuma lista cadatrada!</h1>
            )}
          </div>
        )}
      </main>
    </>
  );
}

const EnviarListWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnviarList />
    </Suspense>
  )
}

export default EnviarListWrapper;
